import { CalmSectionBackground } from "@/components/background/CalmSectionBackground";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { sectionMeta } from "@/lib/data/nav";
import { featuredProjects } from "@/lib/data/projects";

export function Projects() {
  return (
    <SectionWrapper id="projects" background={<CalmSectionBackground />}>
      <div className="w-full space-y-10 sm:space-y-12">
        <SectionHeading
          eyebrow={sectionMeta.projects.eyebrow}
          title={sectionMeta.projects.heading}
        />

        <section className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">Featured Projects</h3>
            <p className="text-base leading-8 text-muted">
              Full-stack projects spanning responsive interfaces, backend services, APIs, databases, real-time features, and deployment.
            </p>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} variant="platform" />
            ))}
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
}
