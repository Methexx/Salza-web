import { CalmSectionBackground } from "@/components/background/CalmSectionBackground";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { sectionMeta } from "@/lib/data/nav";
import { featuredProjects } from "@/lib/data/projects";

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      background={
        <div aria-hidden="true" className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_76%,transparent_100%)]">
          <CalmSectionBackground />
        </div>
      }
    >
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

          <div className="flex justify-center pt-3">
            <a
              href="/projects"
              className="group inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.16em] text-accent transition duration-300 hover:text-accent-bright hover:drop-shadow-[0_0_10px_rgba(50,95,254,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg sm:text-base"
            >
              <span>View all projects</span>
            </a>
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
}
