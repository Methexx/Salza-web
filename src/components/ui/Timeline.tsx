import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TimelineProps = {
  children: ReactNode;
  className?: string;
};

type TimelineItemProps = {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  meta?: ReactNode;
};

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
}

export function TimelineItem({
  title,
  subtitle,
  period,
  description,
  meta,
}: TimelineItemProps) {
  return (
    <article className="clipped-corner relative border border-border bg-bg-elevated/75 p-5 pl-9 md:p-7 md:pl-12">
      <span
        aria-hidden="true"
        className="absolute left-4 top-9 h-2.5 w-2.5 bg-accent shadow-[0_0_0_6px_rgb(var(--bg))] md:left-6"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[1.28rem] top-0 w-px bg-border md:left-[1.78rem]"
      />
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground md:text-2xl">{title}</h3>
            <p className="text-base text-muted">{subtitle}</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{period}</p>
        </div>
        {description ? <p className="text-base leading-8 text-muted">{description}</p> : null}
        {meta}
      </div>
    </article>
  );
}
