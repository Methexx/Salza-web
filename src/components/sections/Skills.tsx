import { CalmSectionBackground } from "@/components/background/CalmSectionBackground";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { sectionMeta } from "@/lib/data/nav";
import { skillCategories } from "@/lib/data/skills";

export function Skills() {
  return (
    <SectionWrapper id="skills" background={<CalmSectionBackground />}>
      <div className="w-full space-y-12">
        <SectionHeading
          eyebrow={sectionMeta.skills.eyebrow}
          title={sectionMeta.skills.heading}
        />
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((skill) => (
            <article
              key={skill.title}
              className="clipped-corner border border-border bg-bg-elevated/88 p-7"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">{skill.title}</h3>
                <p className="text-base leading-8 text-muted">{skill.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {skill.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
