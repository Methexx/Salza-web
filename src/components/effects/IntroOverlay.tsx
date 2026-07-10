"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const introName = "METHUM PATHIRANA";
const storageKey = "methum-portfolio-intro-seen";

export function IntroOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem(storageKey)) {
      setIsVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      setTypedName(introName);
      const reducedTimer = window.setTimeout(() => setIsVisible(false), 700);
      return () => {
        window.clearTimeout(reducedTimer);
        document.body.style.overflow = previousOverflow;
      };
    }

    let character = 0;
    let finishTimer = 0;
    const startTimer = window.setTimeout(() => {
      const typingTimer = window.setInterval(() => {
        character += 1;
        setTypedName(introName.slice(0, character));

        if (character >= introName.length) {
          window.clearInterval(typingTimer);
          finishTimer = window.setTimeout(() => setIsVisible(false), 900);
        }
      }, 95);

      return () => window.clearInterval(typingTimer);
    }, 250);

    const skipIntro = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", skipIntro);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener("keydown", skipIntro);
      document.body.style.overflow = previousOverflow;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isVisible && typedName) {
      window.sessionStorage.setItem(storageKey, "true");
      document.body.style.overflow = "";
    }
  }, [isVisible, typedName]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="portfolio-intro"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#030303] px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.035, filter: "blur(12px)" }}
          transition={{ duration: prefersReducedMotion ? 0.25 : 0.8, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Welcome to Methum Pathirana's portfolio"
        >
          <motion.div
            aria-hidden="true"
            className="absolute h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-[130px]"
            animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.7, 0.25], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />

          <div className="relative flex w-full flex-col items-center text-center">
            <motion.p
              className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.45em] text-accent sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Full-Stack Developer
            </motion.p>

            <div className="flex min-h-[1.1em] items-center justify-center font-display text-[clamp(2.55rem,10vw,9rem)] font-bold uppercase leading-none tracking-[-0.055em] text-[#f2f2f2]">
              <span>{typedName}</span>
              <span className="intro-name-cursor ml-[0.06em] h-[0.78em] w-[0.055em] bg-accent" />
            </div>

            <motion.div
              className="mt-7 h-px bg-accent shadow-[0_0_16px_rgba(50,95,254,0.8)]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: typedName ? "min(12rem, 45vw)" : 0, opacity: typedName ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
