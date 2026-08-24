import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProjectDetailBackLink } from "@/components/ui/ProjectDetailBackLink";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { allProjects, createProjectRouteSlug, getProjectBySlug } from "@/lib/data/projects";

type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: createProjectRouteSlug(project.slug) }));
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const metaItems = [
    { label: "Client", value: project.client },
    { label: "Timeline", value: project.timeline },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const coverShot = project.screenshots[0];
  const roleItems = project.featureGroups?.[0]?.items ?? [];
  const extraFeatureGroups = (project.featureGroups ?? []).slice(1);

  const currentIndex = allProjects.findIndex((entry) => entry.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const nextCoverShot = nextProject.screenshots[0];

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0c0d0d] pb-24 pt-24 sm:pt-28">
      <Container>
        <ProjectDetailBackLink
          fallbackHref="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-muted transition hover:text-accent max-md:-m-2 max-md:p-2"
        />

        <div className="mt-6 w-full">
          {/* Hero */}
          <div className="space-y-4">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                  {project.category}
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground max-md:leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                  {project.title}
                </h1>
              </div>

              {metaItems.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:flex-wrap md:justify-end md:gap-x-10">
                  {metaItems.map((item) => (
                    <div key={item.label}>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {coverShot ? (
            <div className="mt-12 bg-gradient-to-b from-[#1b2536] to-[#12161d] p-4 sm:p-8 md:p-16">
              {coverShot.imageSrc ? (
                <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                  <Image
                    src={coverShot.imageSrc}
                    alt={coverShot.title}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                </div>
              ) : (
                <div
                  className={`relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-gradient-to-br ${coverShot.tone}`}
                />
              )}
            </div>
          ) : null}

          <div className="mt-8 space-y-4">
            <p className="max-w-4xl text-lg leading-8 text-muted sm:text-xl">
              {project.description}
            </p>

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {project.tags.join(" / ")}
            </p>
          </div>

          {/* 01 — Overview */}
          <div>
            <SectionMarker number="01" title="Overview" />
            <p className="max-w-3xl text-base leading-7 text-foreground/90 md:text-lg md:leading-8">{project.overview}</p>
          </div>

          {/* 02 — Challenge & Solution */}
          <div>
            <SectionMarker number="02" title="Challenge & Solution" />
            <div className="space-y-10">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                  The Challenge
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                  The Impact
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{project.impact}</p>
              </div>
            </div>
          </div>

          {/* 03 — Key Screens */}
          {project.screenshots.length > 0 ? (
            <div>
              <SectionMarker number="03" title="Key Screens" />

              <div className="space-y-12">
                {project.screenshots
                  .filter((shot) => shot.orientation !== "mobile")
                  .map((shot) => (
                    <div key={shot.title}>
                      {shot.imageSrc ? (
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={shot.imageSrc}
                            alt={shot.title}
                            fill
                            className="object-contain object-top md:object-cover"
                            sizes="(min-width: 1024px) 80vw, 100vw"
                          />
                        </div>
                      ) : (
                        <div
                          className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${shot.tone}`}
                        />
                      )}
                      <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                        {shot.title}
                      </p>
                    </div>
                  ))}
              </div>

              {project.screenshots.some((shot) => shot.orientation === "mobile") ? (
                <div className="mt-12 grid grid-cols-2 gap-3 md:gap-6">
                  {project.screenshots
                    .filter((shot) => shot.orientation === "mobile")
                    .map((shot) => (
                      <div key={shot.title}>
                        {shot.imageSrc ? (
                          <div className="relative aspect-[9/16] w-full overflow-hidden">
                            <Image
                              src={shot.imageSrc}
                              alt={shot.title}
                              fill
                              className="object-contain"
                              sizes="50vw"
                            />
                          </div>
                        ) : (
                          <div
                            className={`relative aspect-[9/16] w-full overflow-hidden bg-gradient-to-br ${shot.tone}`}
                          />
                        )}
                        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                          {shot.title}
                        </p>
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* 04 — Process */}
          {roleItems.length > 0 ? (
            <div>
              <SectionMarker number="04" title="Process" />
              <ol className="space-y-6">
                {roleItems.map((item, index) => (
                  <li key={item} className="flex gap-5">
                    <span className="mt-0.5 shrink-0 font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-7 text-foreground/90">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {/* 05 — Feature Breakdown */}
          {extraFeatureGroups.length > 0 ? (
            <div>
              <SectionMarker number="05" title="Feature Breakdown" />
              <div className="space-y-10">
                {extraFeatureGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                      {group.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((item) => {
                        const separatorIndex = item.indexOf(": ");
                        const hasLabel = separatorIndex > -1;
                        const label = hasLabel ? item.slice(0, separatorIndex) : null;
                        const rest = hasLabel ? item.slice(separatorIndex + 2) : item;

                        return (
                          <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>
                              {label ? (
                                <span className="font-semibold text-foreground">{label}: </span>
                              ) : null}
                              {rest}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* 06 — Project Details */}
          {project.identity?.length ? (
            <div>
              <SectionMarker number="06" title="Project Details" />
              <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {project.identity.map((item) => (
                  <div key={item.label}>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 text-base text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* 07 — Tech Stack */}
          {project.technologyStack?.length ? (
            <div>
              <SectionMarker number="07" title="Tech Stack" />
              <div className="divide-y divide-border/40">
                {project.technologyStack.map((item) => (
                  <div
                    key={`${item.layer}-${item.technology}`}
                    className="flex flex-col gap-1 py-5 first:pt-0 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <p className="w-full shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-accent sm:w-40">
                      {item.layer}
                    </p>
                    <p className="flex-1 text-base leading-7 text-muted">
                      <span className="font-display text-lg font-semibold text-foreground">
                        {item.technology}
                      </span>
                      {" — "}
                      {item.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* 08 — Architecture */}
          {project.detailSections?.length ? (
            <div>
              <SectionMarker number="08" title="Architecture" />
              <div className="space-y-12">
                {project.detailSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                      {section.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* 09 — Repository */}
          <div>
            <SectionMarker number="09" title="Repository" />
            <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:gap-8">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-foreground transition hover:text-accent"
              >
                View source on GitHub
                <ArrowUpRightIcon className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {project.liveUrl ? (
                <Button href={project.liveUrl} target="_blank" rel="noreferrer">
                  View live project
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-24 sm:mt-32">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Next Project</p>

          <Link
            href={`/projects/${createProjectRouteSlug(nextProject.slug)}`}
            className="group mt-6 flex flex-col gap-8 overflow-hidden rounded-2xl border border-border bg-bg-elevated/50 p-6 transition duration-300 hover:border-accent/40 sm:flex-row sm:items-center sm:p-10"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:w-1/2">
              {nextCoverShot?.imageSrc ? (
                <Image
                  src={nextCoverShot.imageSrc}
                  alt={nextCoverShot.title}
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${nextCoverShot?.tone ?? "from-accent/20 via-transparent to-transparent"}`}
                />
              )}
            </div>

            <div className="flex-1 space-y-4">
              <h3 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                {nextProject.title}
              </h3>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {nextProject.category}
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-accent transition-all duration-200 group-hover:gap-3">
                View Project
                <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
