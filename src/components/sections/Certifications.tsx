import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { certifications } from "@/lib/data/certifications";

export function Certifications() {
  return <SectionWrapper id="certifications"><div className="w-full space-y-12"><SectionHeading eyebrow="Certifications" title="Credentials and continued learning" description="Placeholder entries ready to be replaced with verified certification details." /><div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{certifications.map((item) => <article key={item.title} className="rounded-2xl border border-border bg-bg-elevated/75 p-6"><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{item.issuer}</p><h3 className="mt-4 text-xl font-bold text-foreground">{item.title}</h3><p className="mt-3 text-sm text-muted">{item.date}</p><div className="mt-5 flex flex-wrap gap-2">{item.skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}</div></article>)}</div></div></SectionWrapper>;
}
