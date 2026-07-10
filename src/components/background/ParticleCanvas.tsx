"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ParticleDirection = "bottom-to-top" | "top-to-bottom" | "static" | "none";
type ParticleInteraction = "magnetic" | "none";

type ParticleCanvasProps = {
  className?: string;
  config: {
    ambientMotion?: boolean;
    colorVar: string;
    density: number;
    direction: ParticleDirection;
    fadeOut: boolean;
    interaction?: ParticleInteraction;
    opacityMultiplier?: number;
    speed: number;
  };
  theme?: string;
};

type Particle = {
  baseOpacity: number;
  baseSize: number;
  driftX: number;
  driftY: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

const DEPTH_BANDS = [
  { opacityRange: [0.18, 0.24], sizeRange: [0.55, 1], speedRange: [0.12, 0.2] },
  { opacityRange: [0.24, 0.32], sizeRange: [0.95, 1.45], speedRange: [0.2, 0.32] },
  { opacityRange: [0.3, 0.4], sizeRange: [1.3, 1.95], speedRange: [0.32, 0.48] },
] as const;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  return prefersReducedMotion;
}

function parseRgbToken(colorToken: string) {
  const [red = "255", green = "255", blue = "255"] = colorToken.trim().split(/\s+/);

  return { red, green, blue };
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createAmbientParticle(width: number, height: number, speedScale: number): Particle {
  const band = DEPTH_BANDS[Math.floor(Math.random() * DEPTH_BANDS.length)];
  const angle = randomBetween(0, Math.PI * 2);
  const speed = randomBetween(band.speedRange[0], band.speedRange[1]) * speedScale;

  return {
    baseOpacity: randomBetween(band.opacityRange[0], band.opacityRange[1]),
    baseSize: randomBetween(band.sizeRange[0], band.sizeRange[1]),
    driftX: randomBetween(-0.2, 0.2),
    driftY: randomBetween(-0.16, 0.16),
    offsetX: 0,
    offsetY: 0,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    x: Math.random() * width,
    y: Math.random() * height,
  };
}

function createDirectionalParticle(
  width: number,
  height: number,
  direction: Exclude<ParticleDirection, "static" | "none">,
  speedScale: number,
): Particle {
  const band = DEPTH_BANDS[Math.floor(Math.random() * DEPTH_BANDS.length)];
  const speed = randomBetween(band.speedRange[0], band.speedRange[1]) * 6.5 * speedScale;
  const driftX = randomBetween(-0.12, 0.12);

  return {
    baseOpacity: randomBetween(band.opacityRange[0], band.opacityRange[1]),
    baseSize: randomBetween(band.sizeRange[0], band.sizeRange[1]),
    driftX,
    driftY: 0,
    offsetX: 0,
    offsetY: 0,
    velocityX: driftX,
    velocityY: direction === "bottom-to-top" ? -speed : speed,
    x: Math.random() * width,
    y: direction === "bottom-to-top" ? height + Math.random() * 28 : -Math.random() * 28,
  };
}

function createStaticParticle(width: number, height: number): Particle {
  const band = DEPTH_BANDS[Math.floor(Math.random() * DEPTH_BANDS.length)];

  return {
    baseOpacity: randomBetween(band.opacityRange[0], band.opacityRange[1]),
    baseSize: randomBetween(band.sizeRange[0], band.sizeRange[1]),
    driftX: 0,
    driftY: 0,
    offsetX: 0,
    offsetY: 0,
    velocityX: 0,
    velocityY: 0,
    x: Math.random() * width,
    y: Math.random() * height,
  };
}

function createParticle(
  width: number,
  height: number,
  config: ParticleCanvasProps["config"],
): Particle {
  if (config.direction === "bottom-to-top" || config.direction === "top-to-bottom") {
    return createDirectionalParticle(width, height, config.direction, config.speed);
  }

  if (config.ambientMotion) {
    return createAmbientParticle(width, height, config.speed);
  }

  return createStaticParticle(width, height);
}

function wrapAmbientParticle(particle: Particle, width: number, height: number) {
  const margin = 28;

  if (particle.x < -margin) {
    particle.x = width + margin;
  } else if (particle.x > width + margin) {
    particle.x = -margin;
  }

  if (particle.y < -margin) {
    particle.y = height + margin;
  } else if (particle.y > height + margin) {
    particle.y = -margin;
  }
}

export function ParticleCanvas({ className, config, theme }: ParticleCanvasProps) {
  const {
    ambientMotion,
    colorVar,
    density,
    direction,
    fadeOut,
    interaction = "none",
    opacityMultiplier = 1,
    speed,
  } = config;
  const resolvedConfig = useMemo(
    () => ({
      ambientMotion,
      colorVar,
      density,
      direction,
      fadeOut,
      interaction,
      opacityMultiplier,
      speed,
    }),
    [ambientMotion, colorVar, density, direction, fadeOut, interaction, opacityMultiplier, speed],
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const lastFrameTimeRef = useRef<number>(0);
  const cursorTargetRef = useRef({ x: 0, y: 0, active: false });
  const cursorFrameRef = useRef<number>();
  const [isInView, setIsInView] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [supportsMagneticField, setSupportsMagneticField] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canUseMagneticField =
      interaction === "magnetic" &&
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    setSupportsMagneticField(canUseMagneticField);

    if (!canUseMagneticField || prefersReducedMotion) {
      cursorTargetRef.current = { x: 0, y: 0, active: false };
      return;
    }

    let pendingPosition = { x: 0, y: 0, active: false };

    const flushPointer = () => {
      cursorTargetRef.current = pendingPosition;
      cursorFrameRef.current = undefined;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pendingPosition = { x: event.clientX, y: event.clientY, active: true };

      if (!cursorFrameRef.current) {
        cursorFrameRef.current = window.requestAnimationFrame(flushPointer);
      }
    };

    const handlePointerLeave = () => {
      pendingPosition = { x: 0, y: 0, active: false };

      if (!cursorFrameRef.current) {
        cursorFrameRef.current = window.requestAnimationFrame(flushPointer);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      if (cursorFrameRef.current) {
        window.cancelAnimationFrame(cursorFrameRef.current);
      }
    };
  }, [interaction, prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const parent = canvas.parentElement;

    if (!parent) {
      return;
    }

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      // Cap particle counts so the global field stays smooth alongside the footer canvas.
      const densityScale = isMobileViewport ? 0.48 : 1;
      const rawCount =
        direction === "none" ? 0 : Math.round((width * height * density * densityScale) / 13000);
      const maxCount = interaction === "magnetic"
        ? isMobileViewport ? 72 : 180
        : isMobileViewport ? 46 : 110;
      const targetCount = Math.max(0, Math.min(maxCount, rawCount));

      particlesRef.current = Array.from({ length: targetCount }, () =>
        createParticle(width, height, resolvedConfig),
      );
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, [
    ambientMotion,
    density,
    direction,
    interaction,
    isMobileViewport,
    speed,
    resolvedConfig,
    theme,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const colorValue = getComputedStyle(document.documentElement).getPropertyValue(colorVar);
    const { red, green, blue } = parseRgbToken(colorValue);
    const isAnimated =
      !prefersReducedMotion &&
      (ambientMotion || direction === "bottom-to-top" || direction === "top-to-bottom");
    const viewportOpacityMultiplier = isMobileViewport ? 0.62 : 1;
    const shouldUseMagneticField =
      supportsMagneticField && interaction === "magnetic" && !prefersReducedMotion;
    const magneticRadius = 160;
    const magneticStrength = 42;
    const returnEase = 0.14;

    const drawParticle = (particle: Particle, alpha: number, size: number) => {
      const drawX = particle.x + particle.offsetX;
      const drawY = particle.y + particle.offsetY;
      const gradient = context.createRadialGradient(drawX, drawY, 0, drawX, drawY, size * 2.25);

      gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(${red}, ${green}, ${blue}, ${alpha * 0.45})`);
      gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);

      context.beginPath();
      context.fillStyle = gradient;
      context.arc(drawX, drawY, size * 2.25, 0, Math.PI * 2);
      context.fill();
    };

    const drawFrame = (timestamp: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const delta = lastFrameTimeRef.current
        ? Math.min((timestamp - lastFrameTimeRef.current) / 16.67, 2)
        : 1;

      lastFrameTimeRef.current = timestamp;
      context.clearRect(0, 0, width, height);

      if (direction === "none" || density <= 0) {
        return;
      }

      particlesRef.current.forEach((particle) => {
        if (direction === "bottom-to-top" || direction === "top-to-bottom") {
          particle.x += particle.velocityX * delta;
          particle.y += particle.velocityY * delta;

          if (direction === "bottom-to-top" && particle.y < -32) {
            Object.assign(particle, createParticle(width, height, resolvedConfig));
          } else if (direction === "top-to-bottom" && particle.y > height + 32) {
            Object.assign(particle, createParticle(width, height, resolvedConfig));
          }
        } else if (ambientMotion) {
          particle.x += (particle.velocityX + particle.driftX) * delta;
          particle.y += (particle.velocityY + particle.driftY) * delta;
          wrapAmbientParticle(particle, width, height);
        }

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (shouldUseMagneticField && cursorTargetRef.current.active) {
          const dx = particle.x - cursorTargetRef.current.x;
          const dy = particle.y - cursorTargetRef.current.y;
          const distance = Math.hypot(dx, dy);

          if (distance < magneticRadius && distance > 0.001) {
            const falloff = 1 - distance / magneticRadius;
            const force = falloff * falloff * magneticStrength;
            targetOffsetX = (dx / distance) * force;
            targetOffsetY = (dy / distance) * force;
          }
        }

        particle.offsetX += (targetOffsetX - particle.offsetX) * returnEase * delta;
        particle.offsetY += (targetOffsetY - particle.offsetY) * returnEase * delta;

        const progress =
          direction === "bottom-to-top"
            ? 1 - particle.y / Math.max(height, 1)
            : direction === "top-to-bottom"
              ? particle.y / Math.max(height, 1)
              : 0;
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        const alpha =
          (fadeOut ? particle.baseOpacity * (1 - clampedProgress) : particle.baseOpacity) *
          opacityMultiplier *
          viewportOpacityMultiplier;
        const size =
          fadeOut && direction !== "static"
            ? Math.max(0.4, particle.baseSize * (1 - clampedProgress * 0.45))
            : particle.baseSize;

        drawParticle(particle, alpha, size);
      });
      if (isAnimated && isInView) {
        animationFrameRef.current = window.requestAnimationFrame(drawFrame);
      }
    };

    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    if (direction === "none" || density <= 0) {
      return;
    }

    if (!isAnimated || !isInView) {
      drawFrame(performance.now());
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(drawFrame);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    ambientMotion,
    colorVar,
    density,
    direction,
    fadeOut,
    interaction,
    opacityMultiplier,
    speed,
    isInView,
    isMobileViewport,
    prefersReducedMotion,
    supportsMagneticField,
    resolvedConfig,
    theme,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
