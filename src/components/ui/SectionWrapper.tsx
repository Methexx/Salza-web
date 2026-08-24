"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: ReactNode;
  id: string;
};

export function SectionWrapper({
  as: Component = "section",
  children,
  className,
  containerClassName,
  background,
  id,
}: SectionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Component
      id={id}
      className={cn("relative isolate scroll-mt-20 overflow-hidden md:min-h-screen md:scroll-mt-24", className)}
    >
      {background ? <div className="absolute inset-0 z-0">{background}</div> : null}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 42 }}
        whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10"
      >
        <Container
          className={cn(
            "relative z-10 flex min-h-[auto] items-center py-20 sm:py-36 md:min-h-screen",
            containerClassName,
          )}
        >
          {children}
        </Container>
      </motion.div>
    </Component>
  );
}
