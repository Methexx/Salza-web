import Image from "next/image";
import Link from "next/link";

import { ProjectTagRow } from "@/components/ui/ProjectTagRow";
import { createProjectRouteSlug, type ProjectEntry } from "@/lib/data/projects";

type ProjectCardProps = {
  project: ProjectEntry;
  variant: "platform" | "caseStudy";
};

export function ProjectCard({ project }: ProjectCardProps) {
  const previewShot = project.screenshots[0];

  return (
    <Link
      href={`/projects/${createProjectRouteSlug(project.slug)}`}
      scroll
      className="group flex h-full flex-col max-md:min-w-0"
      data-cursor="interactive"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border/50 bg-bg-elevated">
        {previewShot?.imageSrc ? (
          <Image
            src={previewShot.imageSrc}
            alt={previewShot.title}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover object-top grayscale transition duration-500 max-md:grayscale-0 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(var(--accent)/0.18),transparent_40%),linear-gradient(135deg,rgb(var(--accent)/0.1),transparent_55%)]" />
        )}
      </div>

      <div className="mt-5 flex-1 space-y-2.5">
        <h3 className="font-display text-xl font-semibold leading-tight text-foreground transition duration-300 group-hover:text-accent sm:text-[1.5rem] md:text-[1.65rem]">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-muted md:line-clamp-none md:overflow-hidden md:text-ellipsis md:whitespace-nowrap">
          {project.description}
        </p>
        <ProjectTagRow tags={project.tags} />
      </div>
    </Link>
  );
}
