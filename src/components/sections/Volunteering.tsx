import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { sectionMeta } from "@/lib/data/nav";

const volunteeringEntries = [
  {
    title: "Executive Committee Member",
    subtitle: "IEEE Student Branch - NSBM Green University",
    period: "2025 - Present",
    description:
      "Contributing to branch planning, student engagement, and event coordination while supporting initiatives that connect engineering students with practical learning, leadership, and industry-facing opportunities.",
    tags: ["IEEE", "Student Leadership", "Event Coordination"],
  },
  {
    title: "Logistics Team Member",
    subtitle: "IEEE Student Branch - NSBM Green University",
    period: "2025 - Present",
    description:
      "Handled on-ground logistics, event readiness, and team coordination for branch activities, helping deliver smoother student programs and better operational support behind each session.",
    tags: ["Operations", "Teamwork", "Event Support"],
  },
  {
    title: "IEEE Member",
    subtitle: "IEEE Sri Lanka Section",
    period: "2025 - Present",
    description:
      "Engaged with the wider IEEE network through the Sri Lanka region, staying connected to technical communities, student-led initiatives, and professional development opportunities beyond campus.",
    tags: ["Professional Community", "Engineering Network", "Continuous Learning"],
  },
  {
    title: "Past Member",
    subtitle: "CSSL Chapter of NSBM Green University",
    period: "Previous Involvement",
    description:
      "Took part in student community activities focused on computing interests, peer connection, and exposure to industry-relevant discussions within the campus technology space.",
    tags: ["CSSL", "Student Community", "Campus Engagement"],
  },
  {
    title: "Team Lead",
    subtitle: "Compuvate Association",
    period: "Recent Involvement",
    description:
      "Led team coordination and execution across association activities, helping organize work, guide contributors, and keep deliverables moving with better structure and collaboration.",
    tags: ["Team Lead", "Coordination", "Leadership"],
  },
];

export function Volunteering() {
  return (
    <SectionWrapper id="volunteering">
      <div className="w-full space-y-12">
        <SectionHeading
          eyebrow={sectionMeta.volunteering.eyebrow}
          title={sectionMeta.volunteering.heading}
          description="Leadership, logistics, and student-community involvement across IEEE, CSSL, and campus association work that strengthened coordination, communication, and team delivery."
        />

        <Timeline>
          {volunteeringEntries.map((entry) => (
            <TimelineItem
              key={`${entry.title}-${entry.subtitle}`}
              title={entry.title}
              subtitle={entry.subtitle}
              period={entry.period}
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
      </div>
    </SectionWrapper>
  );
}
