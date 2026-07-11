import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { achievements } from "@/lib/data/achievements";

export function AchievementsBlock() {
  return <SectionWrapper id="achievements"><div className="w-full space-y-12"><SectionHeading eyebrow="Achievements" title="Milestones and recognition" description="Placeholder entries ready for your confirmed achievements." /><div className="grid gap-6 md:grid-cols-3">{achievements.map((item) => <article key={item.name} className="rounded-2xl border border-border bg-bg-elevated/75 p-6"><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{item.year}</p><h3 className="mt-4 text-xl font-bold text-foreground">{item.name}</h3><p className="mt-3 text-sm leading-7 text-muted">{item.result}</p></article>)}</div></div></SectionWrapper>;
}
