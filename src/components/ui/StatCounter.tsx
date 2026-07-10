import type { ProfileStat } from "@/lib/data/profile";

type StatCounterProps = {
  stat: ProfileStat;
};

export function StatCounter({ stat }: StatCounterProps) {
  return (
    <div className="clipped-corner border border-border bg-bg-elevated/80 p-6">
      {/* TODO: replace static values with a count-up treatment if the design calls for it. */}
      <div className="font-mono text-3xl font-medium uppercase tracking-[-0.03em] text-foreground sm:text-4xl">
        {stat.value}
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.26em] text-muted">
        {stat.label}
      </p>
    </div>
  );
}
