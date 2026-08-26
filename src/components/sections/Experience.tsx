import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { sectionMeta } from "@/lib/data/nav";
import {
  affiliations,
  educationEntries,
} from "@/lib/data/experience";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="w-full space-y-12">
        <SectionHeading
          eyebrow={sectionMeta.experience.eyebrow}
          title={sectionMeta.experience.heading}
        />

        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground md:text-3xl">Affiliations</h3>
          <Timeline>
            {affiliations.map((entry) => (
              <TimelineItem
                key={`${entry.title}-${entry.subtitle}`}
                title={entry.title}
                subtitle={entry.subtitle}
                period="Current affiliation"
                description={entry.description}
                meta={
                  <div className="flex flex-wrap gap-2 pt-2">
                    {entry.tags.map((tag) => (
                      <Pill key={tag}>{tag}</Pill>
                    ))}
                  </div>
                }
              />
            ))}
          </Timeline>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground md:text-3xl">Education</h3>
          <Timeline>
            {educationEntries.map((entry) => (
              <TimelineItem
                key={`${entry.title}-${entry.institution}`}
                title={entry.title}
                subtitle={entry.institution}
                period={entry.period}
              />
            ))}
          </Timeline>
        </section>
      </div>
    </SectionWrapper>
  );
}
