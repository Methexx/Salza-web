"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { profile } from "@/lib/data/profile";

const contactDetails = [
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Address", value: profile.address },
  { label: "Website", value: "methum.space", href: profile.websiteUrl },
  { label: "LinkedIn", value: "linkedin.com/in/methum", href: profile.linkedinUrl },
  { label: "GitHub", value: "github.com/Methexx", href: profile.githubUrl },
];

const skillGroups = [
  { label: "Programming Languages", value: "JavaScript, TypeScript, Java, SQL" },
  { label: "Frontend", value: "React.js, Next.js, HTML5, CSS3, responsive UI, component-based architecture, state management" },
  { label: "Backend", value: "Node.js, Express.js, Fastify, Spring Boot, RESTful APIs, JWT authentication, MVC" },
  { label: "Databases", value: "MySQL, MongoDB, PostgreSQL, Firebase, Supabase, schema design and data modelling" },
  { label: "DevOps & Tools", value: "Docker, CI/CD, Vercel, Git, GitHub, Postman, Figma, Framer" },
  { label: "AI & Collaboration", value: "Figma Make, Copilot, Antigravity, Claude Code, Slack, Notion, Jira" },
];

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="space-y-7">
          <SectionEyebrow label="About" />
          <div className="space-y-5">
            <h2 className="max-w-2xl text-4xl font-bold text-foreground sm:text-5xl">Full-stack engineering from interface to infrastructure.</h2>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{profile.shortBio}</p>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{profile.focusArea}</p>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">Familiar with Agile development practices and eager to contribute to real-world software engineering projects while continuously improving technical skills.</p>
          </div>
          <div className="space-y-4 border-l border-accent/35 pl-5">
            {contactDetails.map((item) => <div key={item.label} className="space-y-1"><p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">{item.label}</p>{item.href ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="text-base text-foreground transition hover:text-accent sm:text-lg">{item.value}</a> : <p className="text-base text-foreground sm:text-lg">{item.value}</p>}</div>)}
          </div>
        </div>
        <div className="space-y-10 lg:pt-8">
          <section className="space-y-5"><p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Skills</p><h3 className="text-2xl font-bold text-foreground sm:text-3xl">Core stack and engineering practices</h3><div className="space-y-4">{skillGroups.map((group) => <div key={group.label} className="space-y-2 border-b border-border/60 pb-4 last:border-b-0"><p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">{group.label}</p><p className="text-base leading-8 text-foreground/90">{group.value}</p></div>)}</div></section>
          <section className="space-y-5 border-t border-border/70 pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">Education</p>
            <div className="space-y-3 border-b border-border/60 pb-5">
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl">BSc (Hons) Software Engineering</h3>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">NSBM Green University · Plymouth University UK</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">Diploma in Human Resource Management</h3>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">SITC Campus · 2022 - 2023</p>
            </div>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}
