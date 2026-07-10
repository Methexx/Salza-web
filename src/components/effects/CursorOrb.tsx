"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function CursorOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const hasPointerRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const canUsePointerOrb =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUsePointerOrb) {
      setIsVisible(false);
      return;
    }

    const animate = () => {
      pointerCurrentRef.current.x += (pointerTargetRef.current.x - pointerCurrentRef.current.x) * 0.16;
      pointerCurrentRef.current.y += (pointerTargetRef.current.y - pointerCurrentRef.current.y) * 0.16;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${pointerCurrentRef.current.x}px, ${pointerCurrentRef.current.y}px, 0)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const syncPointer = (event: PointerEvent) => {
      pointerTargetRef.current = { x: event.clientX, y: event.clientY };

      if (!hasPointerRef.current) {
        pointerCurrentRef.current = { x: event.clientX, y: event.clientY };
        hasPointerRef.current = true;
        setIsVisible(true);
      }

      const target = event.target;
      const interactiveElement =
        target instanceof Element ? target.closest("a, button, [data-cursor='interactive']") : null;
      setIsInteractive(Boolean(interactiveElement));
    };

    const hidePointer = () => {
      hasPointerRef.current = false;
      setIsVisible(false);
      setIsInteractive(false);
    };

    window.addEventListener("pointermove", syncPointer, { passive: true });
    window.addEventListener("pointerdown", syncPointer, { passive: true });
    window.addEventListener("pointerleave", hidePointer);
    window.addEventListener("blur", hidePointer);

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", syncPointer);
      window.removeEventListener("pointerdown", syncPointer);
      window.removeEventListener("pointerleave", hidePointer);
      window.removeEventListener("blur", hidePointer);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[80] hidden -translate-x-1/2 -translate-y-1/2 md:block",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "cursor-orb flex items-center justify-center rounded-full border border-accent/35 bg-accent/12 transition-[width,height,opacity,box-shadow,transform] duration-300",
          isInteractive ? "h-8 w-8 shadow-[0_0_24px_rgba(249,115,0,0.32)]" : "h-5 w-5 shadow-[0_0_18px_rgba(249,115,0,0.26)]",
        )}
      >
        <span
          className={cn(
            "rounded-full bg-accent transition-all duration-300",
            isInteractive ? "h-2.5 w-2.5" : "h-1.5 w-1.5",
          )}
        />
      </div>
    </div>
  );
}
