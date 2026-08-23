import { ProjectsSectionBackground } from "@/components/background/ProjectsSectionBackground";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { featuredProjects } from "@/lib/data/projects";

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      background={<ProjectsSectionBackground />}
    >
      <div className="w-full space-y-10 sm:space-y-12">
        <h2 className="text-4xl font-bold sm:text-5xl">
          <span className="text-foreground">Selected</span>{" "}
          <span className="text-accent accent-glow-text">Works</span>
        </h2>

        <section className="space-y-6">
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
              <span>View more projects</span>
            </a>
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
}
