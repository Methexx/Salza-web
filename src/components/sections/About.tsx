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

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="w-full space-y-7">
        <SectionEyebrow label="About" />
        <div className="space-y-5">
          <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Full-stack engineering from interface to infrastructure.</h2>
          <p className="text-base leading-8 text-muted sm:text-lg">{profile.shortBio}</p>
          <p className="text-base leading-8 text-muted sm:text-lg">{profile.focusArea}</p>
          <p className="text-base leading-8 text-muted sm:text-lg">Familiar with Agile development practices and eager to contribute to real-world software engineering projects while continuously improving technical skills.</p>
        </div>
        <div className="space-y-4 border-l border-accent/35 pl-5">
          {contactDetails.map((item) => <div key={item.label} className="space-y-1"><p className="font-mono text-xs uppercase tracking-[0.26em] text-accent">{item.label}</p>{item.href ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="text-base text-foreground transition hover:text-accent max-md:break-words sm:text-lg">{item.value}</a> : <p className="text-base text-foreground max-md:break-words sm:text-lg">{item.value}</p>}</div>)}
        </div>
      </div>
    </SectionWrapper>
  );
}
