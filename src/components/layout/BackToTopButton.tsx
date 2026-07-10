"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 18,
        scale: isVisible ? 1 : 0.92,
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed bottom-5 right-4 z-[60] clipped-corner-sm border border-accent/35 bg-bg-elevated/88 p-3 text-accent shadow-[0_0_24px_rgba(249,115,0,0.16)] backdrop-blur-md hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:bottom-8 sm:right-8"
      aria-label="Back to top"
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
}
