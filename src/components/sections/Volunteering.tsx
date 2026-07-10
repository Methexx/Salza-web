import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";

const affiliations = [
  { title: "Design & Developer Team Lead", subtitle: "IEEE NSBM Student Branch", description: "Leading design and development contributions for the university chapter.", tags: ["Leadership", "Design", "Development"] },
  { title: "Member", subtitle: "FOSS Community · NSBM Green University", description: "Engaging with open-source learning, collaboration, and the campus developer community.", tags: ["Open Source", "Community"] },
  { title: "Event Coordinator", subtitle: "Compuvate Associate", description: "Coordinating event activities and working with teams to support successful delivery.", tags: ["Coordination", "Teamwork"] },
  { title: "Member", subtitle: "CSSL GenZ Chapter · NSBM Green University", description: "Participating in computing-focused student and professional community initiatives.", tags: ["CSSL", "Technology Community"] },
];

export function Volunteering() {
  return <SectionWrapper id="volunteering"><div className="w-full space-y-12"><SectionHeading eyebrow="Affiliations" title="Leadership and community involvement" description="Technical leadership and active involvement across university engineering communities." /><Timeline>{affiliations.map((entry) => <TimelineItem key={`${entry.title}-${entry.subtitle}`} title={entry.title} subtitle={entry.subtitle} period="Current affiliation" description={entry.description} meta={<div className="flex flex-wrap gap-2 pt-2">{entry.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div>} />)}</Timeline></div></SectionWrapper>;
}
