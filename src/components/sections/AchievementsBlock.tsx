import { achievements } from "@/lib/data/achievements";

export function AchievementsBlock() {
  return (
    <div className="clipped-corner border border-border bg-bg-elevated/82 p-7">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">Beyond work</p>
        <h3 className="text-3xl font-bold text-foreground">Competitions and events</h3>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <article
            key={`${achievement.name}-${achievement.year}`}
            className="clipped-corner-sm border border-border bg-bg-elevated-2/82 p-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{achievement.year}</p>
            <h4 className="mt-3 text-2xl font-bold text-foreground">{achievement.name}</h4>
            <p className="mt-2 text-base text-muted">{achievement.result}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
