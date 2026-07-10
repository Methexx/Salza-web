import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { ProjectDetailBackLink } from "@/components/ui/ProjectDetailBackLink";
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

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden pb-20 pt-32 sm:pt-36">
      <Container>
        <div className="space-y-10">
          <ProjectDetailBackLink
            fallbackHref="/#projects"
            className="inline-flex font-mono text-xs uppercase tracking-[0.24em] text-muted transition hover:text-accent"
          />

          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_22rem]">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                  {project.category}
                </p>
                <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <article className="clipped-corner border border-border bg-bg-elevated/80 p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                    Overview
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted">{project.overview}</p>
                </article>
                <article className="clipped-corner border border-border bg-bg-elevated/80 p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                    Challenge
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted">{project.challenge}</p>
                </article>
                <article className="clipped-corner border border-border bg-bg-elevated/80 p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                    Impact
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted">{project.impact}</p>
                </article>
              </div>

              {project.identity?.length ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                      Identity
                    </p>
                    <h2 className="text-3xl font-bold text-foreground">Project profile</h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {project.identity.map((item) => (
                      <article key={item.label} className="clipped-corner border border-border bg-bg-elevated/80 p-5">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                          {item.label}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-muted">{item.value}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.technologyStack?.length ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                      Stack
                    </p>
                    <h2 className="text-3xl font-bold text-foreground">Technology foundation</h2>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {project.technologyStack.map((item) => (
                      <article key={`${item.layer}-${item.technology}`} className="clipped-corner border border-border bg-bg-elevated/80 p-5">
                        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                          {item.layer}
                        </p>
                        <h3 className="mt-3 text-xl font-bold text-foreground">{item.technology}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted">{item.purpose}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.featureGroups?.length ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                      Scope
                    </p>
                    <h2 className="text-3xl font-bold text-foreground">MVP feature set</h2>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-2">
                    {project.featureGroups.map((group) => (
                      <article key={group.title} className="clipped-corner border border-border bg-bg-elevated/80 p-6">
                        <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
                        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                          {group.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                    Screenshots
                  </p>
                  <h2 className="text-3xl font-bold text-foreground">
                    {project.summaryLabel ?? "Project detail preview"}
                  </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {project.screenshots.map((shot, index) => (
                    <article
                      key={shot.title}
                      className={`clipped-corner border border-border bg-bg-elevated/80 p-4 ${
                        index === 2 ? "lg:col-span-2" : ""
                      }`}
                    >
                      {shot.imageSrc ? (
                        <div className="space-y-4">
                          <div className="clipped-corner-sm relative aspect-[16/10] overflow-hidden border border-accent/15 bg-bg">
                            <Image
                              src={shot.imageSrc}
                              alt={shot.title}
                              fill
                              className="object-cover object-top"
                              sizes="(min-width: 1024px) 50vw, 100vw"
                            />
                          </div>
                          <div className="space-y-2 px-1 pb-1">
                            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                              Screen 0{index + 1}
                            </p>
                            <h3 className="text-2xl font-bold text-foreground">{shot.title}</h3>
                            <p className="max-w-xl text-sm leading-7 text-muted">{shot.caption}</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`clipped-corner-sm relative flex aspect-[16/10] items-end overflow-hidden border border-accent/15 bg-gradient-to-br ${shot.tone} p-5`}
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />
                          <div className="relative space-y-2">
                            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                              Screen 0{index + 1}
                            </p>
                            <h3 className="text-2xl font-bold text-foreground">{shot.title}</h3>
                            <p className="max-w-xl text-sm leading-7 text-muted">{shot.caption}</p>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>

              {project.detailSections?.length ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                      Architecture
                    </p>
                    <h2 className="text-3xl font-bold text-foreground">Delivery details</h2>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-2">
                    {project.detailSections.map((section) => (
                      <article key={section.title} className="clipped-corner border border-border bg-bg-elevated/80 p-6">
                        <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                          {section.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="space-y-6">
              <article className="clipped-corner border border-border bg-bg-elevated/85 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                  Repository
                </p>
                <h2 className="mt-3 text-2xl font-bold text-foreground">GitHub repo</h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Open the repository box to view the code source, project structure, and updates.
                </p>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="clipped-corner-sm mt-5 flex items-center gap-4 border border-accent/20 bg-bg px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_0_28px_rgba(50,95,254,0.14)]"
                >
                  <img
                    src="https://github.com/favicon.ico"
                    alt=""
                    className="h-8 w-8 rounded-md"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                      Open on GitHub
                    </p>
                    <p className="truncate text-sm text-muted">{project.githubUrl}</p>
                  </div>
                </a>

                {project.liveUrl ? (
                  <Button href={project.liveUrl} className="mt-5 w-full" target="_blank" rel="noreferrer">
                    View live project
                  </Button>
                ) : null}
              </article>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
