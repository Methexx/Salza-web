"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const contactDetails = [
  { label: "Phone", value: "+94 711 160 306", href: "tel:+94711160306" },
  { label: "Email", value: "gihansasenukie@gmail.com", href: "mailto:gihansasenukie@gmail.com" },
  { label: "Address", value: "62/A, Gampaha, Sri Lanka" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gihansa-senukie",
    href: "https://www.linkedin.com/in/gihansa-senukie/",
  },
  {
    label: "GitHub",
    value: "github.com/ghsenu",
    href: "https://github.com/ghsenu",
  },
];

const skillGroups = [
  { label: "Programming Languages", value: "Dart, JavaScript, TypeScript, SQL" },
  { label: "Mobile App Development", value: "Flutter, MVVM Architecture" },
  { label: "Web Development", value: "React.js, Next.js" },
  { label: "Backend & APIs", value: "Node.js, RESTful APIs, API Integration" },
  { label: "Databases & Backend Services", value: "Firebase, Supabase (PostgreSQL), MongoDB" },
  { label: "Tools & Platforms", value: "Git, GitHub Actions, Postman, Figma, Docker" },
];

const projects = [
  {
    title: "Mind Print",
    link: "https://github.com/ghsenu/Mind-Print",
    description:
      "A role-based mobile and web platform for field staff to log sales and attendance, with a web admin dashboard for analytics and reporting.",
    stack: "Flutter, Dart, Supabase, PostgreSQL, Hive, Next.js, MVVM",
  },
  {
    title: "Astrolift",
    link: "https://www.dizzpy.dev/projects/astrolift",
    description:
      "A full-stack gym management web app covering memberships, workouts, payments, and attendance with role-based access for admins, trainers, and members.",
    stack: "Next.js, Node.js, Express, Docker, TypeScript, GitHub Actions",
  },
  {
    title: "Movie Ticket Booking",
    link: "https://github.com/GaruVA/movie-ticket-booking",
    description:
      "A movie ticket booking system developed in Java that simulates browsing available movies, selecting showtimes, reserving seats, and processing bookings.",
    stack: "Java, JavaScript, CSS",
  },
];

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="space-y-7">
          <SectionEyebrow label="About" />
          <div className="space-y-5">
            <h2 className="max-w-2xl text-4xl font-bold text-foreground sm:text-5xl">
              Someone who loves building softwares and Business analysis, with a focus on delivering high-quality solutions and creating meaningful user experiences.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Final-year Software Engineering undergraduate with practical experience in business
              analysis and building Flutter applications for clients, covering requirement
              gathering, stakeholder communication, and Play Store deployment.
            </p>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              My UI/UX and business analysis background helps me understand user needs, define
              clear requirements, and build apps that are both functional and great to use. I am
              always eager to pick up new technologies and grow through hands-on work.
            </p>
          </div>

          <div className="space-y-4 border-l border-accent/35 pl-5">
            {contactDetails.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-base text-foreground transition hover:text-accent sm:text-lg"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-base text-foreground sm:text-lg">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10 lg:pt-8">
          <section className="space-y-5 border-t border-border/70 pt-5 first:border-t-0 first:pt-0">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Skills</p>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                Core stack and day-to-day tooling
              </h3>
            </div>

            <div className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.label} className="space-y-2 border-b border-border/60 pb-4 last:border-b-0 last:pb-0">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                    {group.label}
                  </p>
                  <p className="text-base leading-8 text-foreground/90">{group.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5 border-t border-border/70 pt-5">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Education</p>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                Bsc Honours in Software Engineering (Plymouth University UK)
              </h3>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                NSBM Green University (2023 - Present)
              </p>
             
            </div>
          </section>

          <section className="space-y-5 border-t border-border/70 pt-5">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Projects</p>
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                Selected projects and product delivery work
              </h3>
            </div>

            <div className="space-y-6">
              {projects.map((project) => (
                <article key={project.title} className="space-y-2 border-b border-border/60 pb-5 last:border-b-0 last:pb-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-bold text-foreground transition hover:text-accent"
                  >
                    {project.title}
                  </a>
                  <p className="text-base leading-8 text-muted">{project.description}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                    {project.stack}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t border-border/70 pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Hackathons</p>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">IEEEXtreme 18.0</h3>
              <p className="text-base leading-8 text-muted">
                Completed the 24-hour global coding challenge as part of Team &quot;Team404&quot;,
                placing in the top 10 within the university ranking.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}
