"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import type { CSSProperties, ElementType } from "react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, SplitText);

type ShuffleProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  shuffleDirection?: "left" | "right" | "up" | "down";
  duration?: number;
  ease?: string;
  stagger?: number;
  threshold?: number;
  tag?: ElementType;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  respectReducedMotion?: boolean;
};

const introStorageKey = "methum-portfolio-intro-seen";

export default function Shuffle({
  text,
  className = "",
  style,
  shuffleDirection = "right",
  duration = 0.35,
  ease = "power3.out",
  stagger = 0.03,
  threshold = 0.1,
  tag: Tag = "p",
  triggerOnce = true,
  respectReducedMotion = true,
}: ShuffleProps) {
  const rootRef = useRef<HTMLElement>(null);
  const hasPlayedRef = useRef(false);
  const splitRef = useRef<SplitText | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const syncIntro = () => setIntroComplete(true);
    if (window.sessionStorage.getItem(introStorageKey)) syncIntro();
    window.addEventListener("portfolio:intro-complete", syncIntro);
    return () => window.removeEventListener("portfolio:intro-complete", syncIntro);
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const { contextSafe } = useGSAP({ scope: rootRef });

  const play = contextSafe(() => {
    const element = rootRef.current;
    if (!element) return;
    if (respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    splitRef.current?.revert();
    splitRef.current = new SplitText(element, { type: "words,chars", smartWrap: true });
    const chars = splitRef.current.chars;
    const horizontal = shuffleDirection === "left" || shuffleDirection === "right";
    const distance = shuffleDirection === "right" || shuffleDirection === "down" ? -105 : 105;

    gsap.fromTo(
      chars,
      horizontal ? { xPercent: distance, opacity: 0 } : { yPercent: distance, opacity: 0 },
      {
        ...(horizontal ? { xPercent: 0 } : { yPercent: 0 }),
        opacity: 1,
        duration,
        ease,
        stagger: (index) => (index % 2 === 0 ? index * stagger * 0.55 : index * stagger),
        clearProps: "transform,opacity",
        onComplete: () => {
          splitRef.current?.revert();
          splitRef.current = null;
        },
      },
    );
  });

  useEffect(() => {
    if (!introComplete || !inView || (triggerOnce && hasPlayedRef.current)) return;
    hasPlayedRef.current = true;
    play();
  }, [inView, introComplete, play, triggerOnce]);

  useEffect(() => () => splitRef.current?.revert(), []);

  return <Tag ref={rootRef} className={className} style={style}>{text}</Tag>;
}
