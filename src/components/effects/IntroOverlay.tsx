"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Phase = "developedBy" | "name" | null;

const FADE_DURATION = 0.5;
const NAME_HOLD_MS = 2200;
const DEVELOPED_BY_HOLD_MS = 1200;

export function IntroOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [initialPathname] = useState(() => pathname);
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("developedBy");

  useEffect(() => {
    if (initialPathname !== "/") return;

    setIsVisible(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      setPhase("name");
      const reducedTimer = window.setTimeout(() => setIsVisible(false), 700);
      return () => {
        window.clearTimeout(reducedTimer);
        document.body.style.overflow = previousOverflow;
      };
    }

    const toNameTimer = window.setTimeout(() => setPhase("name"), DEVELOPED_BY_HOLD_MS);
    const toDoneTimer = window.setTimeout(
      () => setPhase(null),
      DEVELOPED_BY_HOLD_MS + NAME_HOLD_MS
    );
    const hideTimer = window.setTimeout(
      () => setIsVisible(false),
      DEVELOPED_BY_HOLD_MS + NAME_HOLD_MS + FADE_DURATION * 1000
    );

    const skipIntro = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", skipIntro);

    return () => {
      window.clearTimeout(toNameTimer);
      window.clearTimeout(toDoneTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("keydown", skipIntro);
      document.body.style.overflow = previousOverflow;
    };
  }, [initialPathname, prefersReducedMotion]);

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("portfolio:intro-complete"));
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="portfolio-intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.25 : 0.6, ease: "easeInOut" }}
          role="status"
          aria-label="Developed by Methum Pathirana"
        >
          <AnimatePresence mode="wait">
            {phase === "developedBy" ? (
              <motion.p
                key="developed-by"
                className="font-mono text-xs uppercase tracking-[0.5em] text-accent sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
              >
                Developed By
              </motion.p>
            ) : phase === "name" ? (
              <motion.p
                key="name"
                className="font-mono text-xs uppercase tracking-[0.5em] text-accent sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
              >
                Methum Pathirana
              </motion.p>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
