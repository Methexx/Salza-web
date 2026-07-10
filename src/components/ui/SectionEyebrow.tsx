type SectionEyebrowProps = {
  label: string;
};

export function SectionEyebrow({ label }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-px w-10 bg-accent accent-glow-shadow"
      />
      <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
        {label}
      </p>
    </div>
  );
}
