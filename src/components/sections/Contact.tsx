"use client";

import { ExternalLink, Globe2, Send } from "lucide-react";
import type { FormEvent, SVGProps } from "react";
import { useState } from "react";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { profile } from "@/lib/data/profile";

type ContactFormState = { email: string; message: string; name: string };

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.36-3.9-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.11c.98 0 1.95.13 2.86.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>;
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M5.34 7.84A2.34 2.34 0 1 0 5.34 3.16a2.34 2.34 0 0 0 0 4.68ZM3.32 20.84h4.04V9.16H3.32v11.68ZM9.7 9.16h3.87v1.6h.06c.54-1.02 1.86-2.1 3.82-2.1 4.09 0 4.84 2.69 4.84 6.19v5.99h-4.03v-5.31c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.4H9.7V9.16Z" /></svg>;
}

const socialCards = [
  { label: "GitHub", description: "Explore my projects", href: profile.githubUrl, icon: GitHubIcon },
  { label: "LinkedIn", description: "Let’s connect", href: profile.linkedinUrl, icon: LinkedInIcon },
  { label: "Portfolio", description: "Visit my website", href: profile.websiteUrl, icon: Globe2 },
];

const initialFormState: ContactFormState = { email: "", message: "", name: "" };

function buildWhatsappUrl(formState: ContactFormState) {
  const text = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
  const digits = profile.whatsappNumber?.replace(/\D/g, "") ?? "";
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://api.whatsapp.com/send?text=${text}`;
}

export function Contact() {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(buildWhatsappUrl(formState), "_blank", "noopener,noreferrer");
  };

  return (
    <SectionWrapper
      id="contact"
      className="bg-transparent"
      containerClassName="items-center py-20 sm:py-28"
      background={
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(11,15,22,0.62)_14%,#0b0f16_28%,#0b0f16_72%,rgba(11,15,22,0.72)_88%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(50,95,254,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(50,95,254,0.055)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_76%,transparent_100%)]" />
          <div className="absolute inset-y-0 left-0 w-3/5 bg-[radial-gradient(circle_at_45%_48%,rgba(50,95,254,0.14),transparent_64%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_24%,black_74%,transparent_100%)]" />
        </div>
      }
    >
      <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(28rem,0.95fr)] lg:gap-16 xl:gap-24">
        <div className="space-y-9">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">Contact</p>
            <h2 className="text-4xl font-bold tracking-[-0.035em] text-foreground sm:text-6xl">Let’s work together</h2>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Have an internship opportunity or project in mind? Send a quick message—I usually respond within 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            {socialCards.map(({ label, description, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex min-h-20 items-center gap-4 rounded-2xl border border-border bg-[#101724]/85 px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/[0.08] hover:shadow-[0_14px_44px_rgba(50,95,254,0.12)] sm:px-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1"><span className="block text-base font-semibold text-foreground">{label}</span><span className="mt-0.5 block text-sm text-muted">{description}</span></span>
                <ExternalLink aria-hidden="true" className="h-5 w-5 text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-[#101724]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8 lg:p-9">
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">Send a Message</h3>
          <div className="mt-7 space-y-5">
            <label className="sr-only" htmlFor="contact-name">Your name</label>
            <input id="contact-name" required value={formState.name} onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))} className="min-h-14 w-full rounded-xl border border-border bg-[#0d1524] px-4 text-base text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/15" placeholder="Your Name" />
            <label className="sr-only" htmlFor="contact-email">Email address</label>
            <input id="contact-email" required type="email" value={formState.email} onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))} className="min-h-14 w-full rounded-xl border border-border bg-[#0d1524] px-4 text-base text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/15" placeholder="Email Address" />
            <label className="sr-only" htmlFor="contact-message">Your message</label>
            <textarea id="contact-message" required value={formState.message} onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))} className="min-h-40 w-full resize-y rounded-xl border border-border bg-[#0d1524] px-4 py-4 text-base text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/15" placeholder="Your Message" />
            <button type="submit" className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-accent bg-accent px-5 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-accent-bright hover:shadow-[0_0_28px_rgba(50,95,254,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#101724]">
              <Send aria-hidden="true" className="h-4 w-4" /> Send Message
            </button>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}
