import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PillProps = {
  children: ReactNode;
  className?: string;
};

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "clipped-corner-sm inline-flex items-center border border-border bg-bg-elevated-2 px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
