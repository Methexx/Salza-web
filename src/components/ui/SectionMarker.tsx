type SectionMarkerProps = {
  number: string;
  title: string;
};

export function SectionMarker({ number, title }: SectionMarkerProps) {
  return (
    <div className="mb-10 mt-16 space-y-4 sm:mb-14 sm:mt-24">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-accent sm:text-sm">{number}</span>
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/70 sm:text-xs sm:tracking-[0.32em]">
          {title}
        </span>
      </div>
      <div className="h-px w-full bg-border" />
    </div>
  );
}
