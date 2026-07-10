import type { SVGProps } from "react";
import { Globe2, Mail } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { profile } from "@/lib/data/profile";
import { HeroTerminal } from "./HeroTerminal";

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.36-3.9-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.11c.98 0 1.95.13 2.86.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>;
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M5.34 7.84A2.34 2.34 0 1 0 5.34 3.16a2.34 2.34 0 0 0 0 4.68ZM3.32 20.84h4.04V9.16H3.32v11.68ZM9.7 9.16h3.87v1.6h.06c.54-1.02 1.86-2.1 3.82-2.1 4.09 0 4.84 2.69 4.84 6.19v5.99h-4.03v-5.31c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.4H9.7V9.16Z" /></svg>;
}

const socialLinks = [
  { label: "GitHub", href: profile.githubUrl, icon: GitHubIcon },
  { label: "LinkedIn", href: profile.linkedinUrl, icon: LinkedInIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "Website", href: profile.websiteUrl, icon: Globe2 },
];

export function Hero() {
  return (
    <SectionWrapper
      id="hero"
      className="pt-4 sm:pt-8"
      containerClassName="items-start pt-20 pb-10 sm:pt-28 sm:pb-20"
    >
      <div className="grid w-full gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start">
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.38em] text-muted">
            {profile.alias}
          </p>
          <div className="space-y-4 sm:space-y-5">
            <h1 className="accent-glow-text text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="font-display text-xl font-semibold tracking-[-0.02em] text-accent sm:text-3xl">{profile.role}</p>
            <p className="max-w-2xl text-base leading-7 text-muted sm:text-xl sm:leading-8">
              {profile.tagline}
            </p>
            <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              {profile.heroDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#contact" className="w-full sm:w-auto">Work with me</Button>
            <Button href="#projects" variant="ghost" className="w-full sm:w-auto">
              View projects
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="mr-1 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted">
              Connect
            </span>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                title={label}
                className="clipped-corner-sm inline-flex h-11 w-11 items-center justify-center border border-border bg-bg-elevated/70 text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-accent hover:accent-glow-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Icon aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl items-center lg:min-h-[28rem] lg:max-w-none">
          <HeroTerminal />
        </div>
      </div>
    </SectionWrapper>
  );
}
