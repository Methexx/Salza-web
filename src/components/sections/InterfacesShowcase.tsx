"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MOBILE_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";

const slides = [
  { image: "/projects/showcase/interface-01.svg", label: "Web / Product", title: "Connected Product Experiences", description: "Clear workflows and responsive interfaces designed around real user tasks." },
  { image: "/projects/showcase/interface-02.svg", label: "Dashboard", title: "Operational Dashboards", description: "Data-rich views that keep complex systems understandable and actionable." },
  { image: "/projects/showcase/interface-03.svg", label: "Mobile / Utility", title: "Focused Mobile Flows", description: "Mobile experiences built for quick navigation, status, and everyday use." },
  { image: "/projects/showcase/interface-04.svg", label: "Systems / Platform", title: "Scalable Interface Systems", description: "Reusable patterns that create consistency across growing full-stack products." },
];

function wrappedIndex(index: number) {
  return (index + slides.length) % slides.length;
}

export function InterfacesShowcase() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const touchStartX = useRef<number | null>(null);
  const previous = () => setActive((index) => wrappedIndex(index - 1));
  const next = () => setActive((index) => wrappedIndex(index + 1));

  // Arrows are the only affordance on touch, so back them with a swipe. Touch
  // events never fire for a mouse, so desktop behaviour is untouched.
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartX.current;
    touchStartX.current = null;

    if (startX === null) {
      return;
    }

    const delta = (event.changedTouches[0]?.clientX ?? startX) - startX;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta < 0) {
      next();
    } else {
      previous();
    }
  };

  // Neighbour cards are wider on phones, so push them further out of the way.
  const neighbourOffset = isMobile ? 82 : 68;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => setActive((index) => wrappedIndex(index + 1)), 5200);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <SectionWrapper id="interfaces" className="min-h-0 md:min-h-0" containerClassName="items-center py-16 sm:py-20">
      <div className="w-full space-y-12 sm:space-y-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.72fr)] lg:items-end">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">06 — Design · UI / UX</p>
            <h2 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">Interfaces &amp; Interaction</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted lg:justify-self-end lg:text-right sm:text-lg">Product screens and flows I’ve designed—where usability meets a considered visual system.</p>
        </div>

        <div
          className="relative mx-auto h-[15rem] w-full overflow-hidden sm:h-[20rem] md:h-[27rem] lg:h-[32rem]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[10%] bg-gradient-to-r from-bg via-bg/70 to-transparent md:w-[18%]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[10%] bg-gradient-to-l from-bg via-bg/70 to-transparent md:w-[18%]" />

          {[-1, 0, 1].map((offset) => {
            const index = wrappedIndex(active + offset);
            const slide = slides[index];
            const isActive = offset === 0;
            return (
              <motion.article
                key={`${index}-${offset}`}
                className="absolute left-1/2 top-1/2 aspect-[16/10] w-[86%] max-w-4xl overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:w-[74%] md:w-[64%]"
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * neighbourOffset}%)`,
                  y: "-50%",
                  scale: isActive ? 1 : 0.82,
                  opacity: isActive ? 1 : 0.25,
                  filter: isActive ? "blur(0px)" : "blur(5px)",
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={slide.image} alt={`${slide.title} placeholder interface`} fill sizes="(min-width: 1024px) 72vw, 90vw" className="object-cover" priority={isActive} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(3,3,3,0.16)_48%,rgba(3,3,3,0.94)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 sm:p-8">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-accent sm:text-xs">{slide.label}</p>
                  <h3 className="text-xl font-bold text-white sm:text-3xl">{slide.title}</h3>
                  <p className="hidden max-w-2xl text-sm leading-7 text-white/65 sm:block sm:text-base">{slide.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-5">
          <button type="button" onClick={previous} aria-label="Previous interface" className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg-elevated/65 text-foreground transition hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex items-center gap-2" aria-label={`Slide ${active + 1} of ${slides.length}`}>{slides.map((slide, index) => <button key={slide.title} type="button" onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} className={`h-2 rounded-full transition-all duration-500 ${index === active ? "w-7 bg-accent" : "w-2 bg-muted/45 hover:bg-muted"}`} />)}</div>
          <button type="button" onClick={next} aria-label="Next interface" className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg-elevated/65 text-foreground transition hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><ChevronRight className="h-5 w-5" /></button>
          <p className="ml-2 font-mono text-xs tracking-[0.2em] text-muted"><span className="text-accent">{String(active + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
