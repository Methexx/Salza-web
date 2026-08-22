"use client";

import { useEffect, useRef } from "react";

import { profile } from "@/lib/data/profile";
import styles from "./Hero.module.css";

const nameParts = profile.name.trim().split(/\s+/);
const firstName = nameParts[0] ?? profile.name;
const lastName = nameParts.slice(1).join(" ") || firstName;

const taglineAccentWord = "reliable";
const heroImageSrc = "/hero/cyber.png";

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

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  alpha: number;
  flicker: number;
}

export function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    if (!prefersReducedMotion) {
      stage.addEventListener("mousemove", handleMouseMove);
      stage.addEventListener("mouseleave", handleMouseLeave);
    }

    if (prefersReducedMotion) {
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

    const makeParticle = (): Particle => ({
      x: Math.random() * width,
      y: height + Math.random() * 40,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.6 + 0.25,
      drift: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.25,
      flicker: Math.random() * 0.02 + 0.01,
    });

    const resize = () => {
      const rect = visual.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    const initParticles = () => {
      particles = Array.from({ length: 70 }, makeParticle);
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += particle.drift;
        particle.alpha += (Math.random() - 0.5) * particle.flicker;
        particle.alpha = Math.max(0.1, Math.min(0.85, particle.alpha));

        if (particle.y < -10) {
          Object.assign(particle, makeParticle(), { y: height + 10 });
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 106, 40, ${particle.alpha})`;
        ctx.shadowColor = "rgba(230,74,14,0.8)";
        ctx.shadowBlur = 4;
        ctx.fill();
      });

      frameId = requestAnimationFrame(tick);
    };

    resize();
    initParticles();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      stage.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={stageRef}
      className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden pt-20 sm:pt-24"
    >
      <div className={styles.heroBg} aria-hidden="true" />

      <div className="relative z-[5] flex items-start justify-between gap-6 px-5 pt-10 sm:px-10">
        <div className="flex items-baseline gap-[18px]">
          <span className="font-mono text-[13px] text-bg opacity-60">01</span>
          <div>
            <b className="block font-body text-sm font-semibold tracking-[0.02em] text-bg">
              Full-stack engineering / Based in {profile.location}
            </b>
            <div className="mt-1 font-mono text-[11.5px] tracking-[0.03em] text-bg/65">
              WORK FOOTPRINT — {profile.location.toUpperCase()} · REMOTE
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">System Status</div>
          <div className="mt-[2px] font-body text-[13px] font-bold tracking-[0.08em] text-foreground">
            SHIPPING
          </div>
          <div className="ml-auto mt-[6px] h-[3px] w-[90px] overflow-hidden rounded-sm bg-foreground/15">
            <span className="block h-full w-[82%] bg-accent" />
          </div>
        </div>
      </div>

      <div className="relative z-[5] px-5 pt-6 leading-[0.86] sm:px-10">
        <span className="block font-display text-[clamp(52px,9.5vw,148px)] font-medium uppercase tracking-[-0.01em] text-foreground">
          {firstName}
        </span>
        <span
          className={`${styles.headlineOutline} block font-display text-[clamp(52px,9.5vw,148px)] font-medium uppercase tracking-[-0.01em]`}
          style={{ marginTop: "-0.05em" }}
        >
          {lastName}
        </span>
      </div>

      <div
        className={`${styles.heroSide} absolute right-10 top-[calc(150px+5rem)] z-[5] max-w-[330px] text-left sm:top-[calc(150px+6rem)]`}
      >
        <p className="font-display text-[22px] leading-[1.4] text-foreground">
          {renderTagline(profile.tagline, taglineAccentWord)}
        </p>
      </div>

      <div
        className={`${styles.identityStat} absolute right-10 top-[calc(340px+5rem)] z-[5] text-right sm:top-[calc(340px+6rem)]`}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">Build Confidence</div>
        <div className="mt-[2px] font-body text-2xl font-bold text-foreground">99.2%</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/50">
          Shipped &amp; stable
        </div>
      </div>

      <div
        ref={parallaxRef}
        className={`${styles.heroVisualParallax} absolute bottom-0 right-[14%] z-[3] h-[92%] w-[42%]`}
        style={{ willChange: "transform", transition: "transform 0.25s ease-out" }}
      >
        <div ref={visualRef} className={styles.heroVisual}>
          <div className={styles.heroVisualGlow} />

          <div className={`${styles.orbitRing} ${styles.orbitRing1}`}>
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
              <circle cx="396" cy="100" r="4.5" fill="#E64A0E" style={{ filter: "drop-shadow(0 0 6px #E64A0E)" }} />
            </svg>
          </div>

          <div className={`${styles.orbitRing} ${styles.orbitRing2}`}>
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

          <div
            className={styles.heroVisualPlaceholder}
            style={heroImageSrc ? { border: "none", background: "none" } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="heroImg" src={heroImageSrc} alt={`${profile.name} hero portrait`} />
            {!heroImageSrc && (
              <span className="relative z-[2] font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-foreground/40">
                Hero visual placeholder
                <br />
                swap in licensed asset
                <br />
                or Three.js wireframe here
              </span>
            )}
            <canvas ref={canvasRef} className={styles.particleCanvas} />
          </div>
        </div>
      </div>

      <div className="relative z-[5] flex items-end justify-between gap-6 px-5 pb-11 sm:px-10">
        <div className="text-bg">
          <h2 className="font-display text-[clamp(24px,3vw,34px)] font-medium leading-[1.15]">{profile.role}</h2>
          <p className="mt-[10px] font-mono text-[11px] tracking-[0.04em] text-bg/65">
            PUBLIC IDENTITY: {profile.name.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-[10px] text-foreground">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Scroll to explore</span>
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-accent text-[13px] text-accent">
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}
