"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { profile } from "@/lib/data/profile";
import { ShinyText } from "@/components/effects/ShinyText";
import styles from "./Hero.module.css";

const nameParts = profile.name.trim().split(/\s+/);
const firstName = nameParts[0] ?? profile.name;
const lastName = nameParts.slice(1).join(" ") || firstName;

const taglineAccentWord = "reliable";
const heroImageSrc = "/hero/cyber.png";
const buildConfidenceTarget = 99.8;
const buildConfidenceDurationMs = 1600;
// Orbit rings stay coded but hidden until asked for.
const SHOW_ORBIT_RINGS = false;
// Ambient particle overlay, tied to the image's own neck/chest/hair-trail detail.
const SHOW_RISING_PARTICLES = true;
// Cursor-reactive parallax stays coded but disabled until asked for.
const ENABLE_CURSOR_PARALLAX = false;

// Rough regions (fractions of the canvas box) where the artwork already has
// its own particle/circuit detail, so the animated layer reads as part of
// the image rather than scattered randomly across empty space.
const PARTICLE_ZONES = [
  { xMin: 0.02, xMax: 0.56, yMin: 0.04, yMax: 0.46, weight: 0.4 }, // behind-neck / hair-trail dissolve
  { xMin: 0.4, xMax: 0.64, yMin: 0.32, yMax: 0.64, weight: 0.3 }, // neck
  { xMin: 0.05, xMax: 0.78, yMin: 0.62, yMax: 0.98, weight: 0.3 }, // chest / shoulders
] as const;

const PARTICLE_COLORS = [
  "230, 106, 40", // base ember orange
  "255, 176, 82", // warmer amber
  "255, 214, 140", // hot highlight
] as const;

function pickParticleZone() {
  const roll = Math.random();
  let acc = 0;

  for (const zone of PARTICLE_ZONES) {
    acc += zone.weight;
    if (roll <= acc) {
      return zone;
    }
  }

  return PARTICLE_ZONES[PARTICLE_ZONES.length - 1];
}

function pickParticleColor() {
  const roll = Math.random();
  if (roll < 0.6) return PARTICLE_COLORS[0];
  if (roll < 0.85) return PARTICLE_COLORS[1];
  return PARTICLE_COLORS[2];
}

function renderTagline(tagline: string, accentWord: string) {
  const index = tagline.toLowerCase().indexOf(accentWord.toLowerCase());

  if (index === -1) {
    return tagline;
  }

  return (
    <>
      {tagline.slice(0, index)}
      <em className="italic text-accent">{tagline.slice(index, index + accentWord.length)}</em>
      {tagline.slice(index + accentWord.length)}
    </>
  );
}

type ParticleShape = "circle" | "square";
type ParticleMode = "rise" | "hover" | "drift";
type ParticleZone = (typeof PARTICLE_ZONES)[number];

interface Particle {
  zone: ParticleZone;
  shape: ParticleShape;
  mode: ParticleMode;
  color: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  angle: number;
  spin: number;
  speed: number;
  driftX: number;
  driftY: number;
  ampX: number;
  ampY: number;
  freq: number;
  t: number;
  alpha: number;
  flicker: number;
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [buildConfidence, setBuildConfidence] = useState(0);
  const [sriLankaTime, setSriLankaTime] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setBuildConfidence(buildConfidenceTarget);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / buildConfidenceDurationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setBuildConfidence(buildConfidenceTarget * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setSriLankaTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const parallax = parallaxRef.current;
    const visual = visualRef.current;
    const canvas = canvasRef.current;

    if (!stage || !parallax || !visual || !canvas) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      parallax.style.transform = `translate(${relX * -14}px, ${relY * -10}px)`;
    };

    const handleMouseLeave = () => {
      parallax.style.transform = "translate(0,0)";
    };

    if (ENABLE_CURSOR_PARALLAX && !prefersReducedMotion) {
      stage.addEventListener("mousemove", handleMouseMove);
      stage.addEventListener("mouseleave", handleMouseLeave);
    }

    if (!SHOW_RISING_PARTICLES || prefersReducedMotion) {
      return () => {
        stage.removeEventListener("mousemove", handleMouseMove);
        stage.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId = 0;
    let resizeFrame = 0;
    let lastWidth = 0;
    let isRunning = false;
    let isInView = true;
    let isPageVisible = true;

    const isMobileViewport = () => window.matchMedia("(max-width: 767px)").matches;

    const makeParticle = (zone: ParticleZone = pickParticleZone()): Particle => {
      const x = (zone.xMin + Math.random() * (zone.xMax - zone.xMin)) * width;
      const y = (zone.yMin + Math.random() * (zone.yMax - zone.yMin)) * height;
      const modeRoll = Math.random();
      const mode: ParticleMode = modeRoll < 0.4 ? "hover" : modeRoll < 0.75 ? "drift" : "rise";
      const shape: ParticleShape = Math.random() < 0.72 ? "circle" : "square";

      return {
        zone,
        shape,
        mode,
        color: pickParticleColor(),
        x,
        y,
        baseX: x,
        baseY: y,
        size: shape === "circle" ? Math.random() * 1.7 + 0.5 : Math.random() * 2.6 + 1.6,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.015,
        speed: Math.random() * 0.5 + 0.2,
        driftX: (Math.random() - 0.5) * 0.35,
        driftY: (Math.random() - 0.5) * 0.35,
        ampX: Math.random() * 6 + 2,
        ampY: Math.random() * 5 + 2,
        freq: Math.random() * 0.02 + 0.008,
        t: Math.random() * 1000,
        alpha: Math.random() * 0.55 + 0.2,
        flicker: Math.random() * 0.02 + 0.01,
      };
    };

    const resize = () => {
      const rect = visual.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const mobile = isMobileViewport();
      width = rect.width;
      height = rect.height;

      // Scale the backing buffer for device pixel ratio on mobile only, where
      // the canvas was rendering blurry. Desktop keeps its original 1:1 buffer.
      const ratio = mobile ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      // Setting width/height resets context state, so reapply the scale after.
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Mobile browsers fire resize continuously while the URL bar animates.
      // Rebuilding the whole field on every one of those is wasted work, and
      // the field is laid out from width fractions anyway.
      if (particles.length > 0 && Math.abs(rect.width - lastWidth) < 1) {
        return;
      }

      lastWidth = rect.width;
      particles = Array.from({ length: mobile ? 28 : 60 }, () => makeParticle());
    };

    const handleResize = () => {
      if (resizeFrame) {
        return;
      }

      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.t += 1;
        particle.angle += particle.spin;
        particle.alpha += (Math.random() - 0.5) * particle.flicker;
        particle.alpha = Math.max(0.12, Math.min(0.85, particle.alpha));

        const zoneTop = particle.zone.yMin * height;
        const zoneBottom = particle.zone.yMax * height;

        if (particle.mode === "rise") {
          particle.y -= particle.speed;
          particle.x += particle.driftX;

          if (particle.y < zoneTop) {
            const next = makeParticle(particle.zone);
            Object.assign(particle, next, { y: zoneBottom });
          }
        } else if (particle.mode === "drift") {
          particle.x += particle.driftX;
          particle.y += particle.driftY;

          if (particle.y < zoneTop || particle.y > zoneBottom) {
            particle.driftY *= -1;
          }

          const zoneLeft = particle.zone.xMin * width;
          const zoneRight = particle.zone.xMax * width;
          if (particle.x < zoneLeft || particle.x > zoneRight) {
            particle.driftX *= -1;
          }
        } else {
          particle.x = particle.baseX + Math.sin(particle.t * particle.freq) * particle.ampX;
          particle.y = particle.baseY + Math.cos(particle.t * particle.freq * 0.8) * particle.ampY;
        }

        ctx.save();
        ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        ctx.shadowColor = `rgba(${particle.color}, 0.8)`;
        ctx.shadowBlur = particle.shape === "square" ? 3 : 4;

        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.angle);
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }

        ctx.restore();
      });

      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (isRunning || !isInView || !isPageVisible) {
        return;
      }

      isRunning = true;
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      isRunning = false;

      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    // Don't burn a rAF loop while the hero is scrolled away or the tab is hidden.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;

        if (isInView) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 },
    );

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";

      if (isPageVisible) {
        start();
      } else {
        stop();
      }
    };

    resize();
    start();
    observer.observe(stage);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();

      if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
      }

      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stage.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={stageRef}
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-20 sm:pt-24 md:min-h-screen"
    >
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={styles.orangeCutoff} aria-hidden="true" />

      <div className="relative z-[5] -mt-2 flex flex-wrap items-start justify-between gap-x-6 gap-y-4 px-5 pt-10 sm:px-10 md:-mt-8">
        <div className="flex items-baseline gap-[18px]">
          <span className="font-mono text-[13px] text-white opacity-60">01</span>
          <div>
            <b className="block font-body text-sm font-semibold tracking-[0.02em] text-white">
              Based in {profile.location}
            </b>
            <div className="mt-1 font-mono text-[11.5px] tracking-[0.03em] text-white/65">
              WORK FOOTPRINT — SRI LANKA · UNITED KINGDOM
            </div>
            <div className="mt-1 font-mono text-[11.5px] tracking-[0.03em] text-bg/65">
              GMT +5:30 · SRI LANKA — {sriLankaTime}
            </div>
          </div>
        </div>

        <div className="w-full text-left md:w-auto md:text-right">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">System Status</div>
          <div className="mt-[2px] font-body text-[13px] font-bold tracking-[0.08em] text-foreground">
            SHIPPING
          </div>
          <div className="mt-[6px] h-[3px] w-[90px] overflow-hidden rounded-sm bg-foreground/15 md:ml-auto">
            <span className="block h-full w-[82%] bg-accent" />
          </div>
        </div>
      </div>

      <div className="relative z-[5] mt-4 px-5 pt-6 leading-[0.86] sm:px-10 md:-mt-24">
        <span className="block select-none font-display text-[clamp(64px,12.5vw,220px)] font-medium uppercase tracking-[-0.01em] text-foreground">
          {firstName}
        </span>
        <span
          className={`${styles.headlineOutline} block select-none font-display text-[clamp(48px,9vw,165px)] font-medium uppercase tracking-[-0.01em]`}
          style={{ marginTop: "-0.05em" }}
        >
          {lastName}
        </span>
      </div>

      <div
        className={styles.heroSide}
      >
        <p className="font-display text-[22px] leading-[1.4] text-foreground">
          {renderTagline(profile.tagline, taglineAccentWord)}
        </p>
      </div>

      <div
        className={styles.identityStat}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">Build Confidence</div>
        <div className="mt-[2px] font-body text-2xl font-bold text-foreground">
          {buildConfidence.toFixed(1)}%
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/50">
          Shipped &amp; stable
        </div>
      </div>

      <div
        ref={parallaxRef}
        className={styles.heroVisualParallax}
        style={{ willChange: "transform", transition: "transform 0.25s ease-out" }}
      >
        <div ref={visualRef} className={styles.heroVisual}>
          <div className={styles.heroVisualGlow} style={SHOW_ORBIT_RINGS ? undefined : { display: "none" }} />

          <div
            className={`${styles.orbitRing} ${styles.orbitRing1}`}
            style={SHOW_ORBIT_RINGS ? undefined : { display: "none" }}
          >
            <svg viewBox="0 0 400 200" width="100%" height="100%">
              <ellipse
                cx="200"
                cy="100"
                rx="196"
                ry="96"
                fill="none"
                stroke="rgba(230,106,40,0.55)"
                strokeWidth="1.4"
                strokeDasharray="2 7"
              />
              <circle cx="396" cy="100" r="4.5" fill="#FF4F03" style={{ filter: "drop-shadow(0 0 6px #FF4F03)" }} />
            </svg>
          </div>

          <div
            className={`${styles.orbitRing} ${styles.orbitRing2}`}
            style={SHOW_ORBIT_RINGS ? undefined : { display: "none" }}
          >
            <svg viewBox="0 0 400 200" width="100%" height="100%">
              <ellipse
                cx="200"
                cy="100"
                rx="196"
                ry="96"
                fill="none"
                stroke="rgba(245,241,236,0.28)"
                strokeWidth="1"
                strokeDasharray="1 5"
              />
              <circle cx="4" cy="100" r="3.5" fill="#F5F1EC" style={{ filter: "drop-shadow(0 0 5px #F5F1EC)" }} />
            </svg>
          </div>

          <div className={styles.heroVisualPlaceholder}>
            <Image
              id="heroImg"
              src={heroImageSrc}
              alt={`${profile.name} hero portrait`}
              fill
              priority
              sizes="(min-width: 901px) 42vw, 100vw"
              className={`${styles.heroVisualImg} object-contain object-bottom`}
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
            />
            {!heroImageSrc && (
              <span className="relative z-[2] font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-foreground/40">
                Hero visual placeholder
                <br />
                swap in licensed asset
                <br />
                or Three.js wireframe here
              </span>
            )}
            <canvas
              ref={canvasRef}
              className={styles.particleCanvas}
              style={SHOW_RISING_PARTICLES ? undefined : { display: "none" }}
            />
          </div>
        </div>
      </div>

      <div className={styles.heroVisualScrim} aria-hidden="true" />

      <div className="relative z-[5] flex flex-col items-start gap-6 px-5 pb-11 sm:flex-row sm:items-end sm:justify-between sm:px-10">
        <div>
          <h2 className="font-display text-[clamp(24px,3vw,34px)] font-medium leading-[1.15]">
            <span className="block text-foreground">Fullstack Engineering</span>
            <span className="block font-bold text-bg max-md:text-foreground">&amp;       DevOps Enthusiast</span>
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2 text-foreground sm:items-end">
          <ShinyText
            text="SCROLL TO INVESTIGATE"
            className="font-mono text-[11px] uppercase tracking-[0.16em]"
            color="rgb(245 239 233 / 0.55)"
            shineColor="#ffffff"
            speed={3}
            disabled={Boolean(prefersReducedMotion)}
          />
          <motion.svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </div>
      </div>

      <div className={styles.heroGrain} aria-hidden="true" />
    </section>
  );
}
