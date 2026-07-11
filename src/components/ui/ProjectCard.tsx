import Image from "next/image";
import Link from "next/link";

import { Pill } from "@/components/ui/Pill";
import { createProjectRouteSlug, type ProjectEntry } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectEntry;
  variant: "platform" | "caseStudy";
};

const variantStyles = {
  platform: "bg-bg-elevated/90",
  caseStudy: "bg-bg-elevated-2/70",
};

export function ProjectCard({ project, variant }: ProjectCardProps) {
  const previewShot = project.screenshots[0];

  return (
    <Link
      href={`/projects/${createProjectRouteSlug(project.slug)}`}
      scroll
      className={cn(
        "group clipped-corner flex h-full flex-col border border-border p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_48px_rgba(50,95,254,0.12)]",
        variantStyles[variant],
      )}
      data-cursor="interactive"
    >
      <div className="clipped-corner-sm relative mb-6 overflow-hidden border border-accent/15 bg-bg/70">
        <div className="relative h-40">
          {previewShot?.imageSrc ? (
            <>
              <Image
                src={previewShot.imageSrc}
                alt={previewShot.title}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover object-top transition duration-500 group-hover:scale-[1.03] group-hover:brightness-[0.42]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,4,1,0.58)_0%,rgba(7,4,1,0.18)_32%,rgba(7,4,1,0.82)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(7,4,1,0.74)_0%,rgba(7,4,1,0.34)_32%,rgba(7,4,1,0.9)_100%)]" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(50,95,254,0.22),transparent_34%),linear-gradient(135deg,rgba(50,95,254,0.12),transparent_55%)] opacity-80 transition duration-500 group-hover:scale-110 group-hover:opacity-100" />
              <div className="relative flex h-full items-end p-5">
                <div className="space-y-2 transition duration-500 group-hover:translate-y-[-4px] group-hover:scale-[1.02]">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent">
                    Project Preview
                  </p>
                  <p className="max-w-xs text-sm leading-7 text-muted">
                    Open the detail page for screenshots, summary, and repository access.
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="min-h-[6.75rem] space-y-2 transition duration-500 group-hover:translate-y-[-4px] group-hover:scale-[1.02]">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent">
                Project Preview
              </p>
              <p className="max-w-xs overflow-hidden text-sm leading-7 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                {previewShot?.caption ?? "Open the detail page for screenshots, summary, and repository access."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
            {project.category}
          </p>
          <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
        </div>
      </div>

      <p className="mt-5 flex-1 text-base leading-8 text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      <span className="mt-7 inline-flex font-mono text-xs uppercase tracking-[0.24em] text-foreground underline-offset-4 transition group-hover:text-accent group-hover:underline">
        View project details
      </span>
    </Link>
  );
}
