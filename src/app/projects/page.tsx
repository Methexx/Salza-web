import type { Metadata } from "next";

import { CalmSectionBackground } from "@/components/background/CalmSectionBackground";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { allProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects | Methum Pathirana",
  description: "Explore all full-stack, web, mobile, and collaborative software engineering projects by Methum Pathirana.",
};

export default function AllProjectsPage() {
  return (
    <SectionWrapper
      id="all-projects"
      className="pt-8"
      containerClassName="items-start pt-28 sm:pt-36"
      background={<CalmSectionBackground />}
    >
      <div className="w-full space-y-12">
        <SectionHeading
          eyebrow="Project Archive"
          title="All Projects"
          description="A complete collection of full-stack platforms, web applications, mobile systems, and collaborative engineering work."
        />

        <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="platform" />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
