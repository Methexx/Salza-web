"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from "react";

import { MOBILE_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  label?: React.ReactNode;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center justify-center rounded-lg border-2 border-border bg-bg-elevated shadow-md transition-colors duration-200 hover:border-accent ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child,
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = "", isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-7 left-1/2 w-fit whitespace-pre rounded-md border border-border bg-bg-elevated px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground shadow-[0_8px_20px_rgb(var(--bg)/0.55)]`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = "" }: DockIconProps) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 74,
  distance = 140,
  panelHeight = 68,
  baseItemSize = 52,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isCompact = useMediaQuery("(max-width: 480px)");
  // Magnification is driven by mousemove, so it is inert on touch. Below md on a
  // touch device, drop it for a plain labelled row instead.
  const isTouchMobile = useMediaQuery(`${MOBILE_QUERY} and (hover: none)`);

  const effectiveBaseItemSize = isCompact ? Math.min(baseItemSize, 44) : baseItemSize;
  const effectiveMagnification = isCompact ? Math.min(magnification, 52) : magnification;
  const effectiveDistance = isCompact ? Math.min(distance, 90) : distance;
  const effectivePanelHeight = isCompact ? Math.min(panelHeight, 60) : panelHeight;

  const maxHeight = useMemo(
    () => Math.max(effectivePanelHeight, effectiveMagnification + effectiveMagnification / 2 + 4),
    [effectivePanelHeight, effectiveMagnification],
  );

  if (isTouchMobile) {
    return (
      <div
        className="grid w-full max-w-[22rem] grid-cols-5 gap-2"
        role="toolbar"
        aria-label="Social links"
      >
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={item.onClick}
            className={`flex flex-col items-center gap-1.5 ${item.className ?? ""}`}
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-border bg-bg-elevated shadow-md">
              {item.icon}
            </span>
            <span className="w-full truncate text-center font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ height: maxHeight, scrollbarWidth: "none" }} className="relative flex w-fit max-w-full items-end">
      <motion.div
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={`${className} relative flex w-fit items-end gap-2 rounded-2xl border-2 border-border bg-bg-elevated/40 px-2.5 pb-2 sm:gap-4 sm:px-4`}
        style={{ height: effectivePanelHeight }}
        role="toolbar"
        aria-label="Social links"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={effectiveDistance}
            magnification={effectiveMagnification}
            baseItemSize={effectiveBaseItemSize}
            label={item.label}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}
