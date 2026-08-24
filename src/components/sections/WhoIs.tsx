"use client";

import Image from "next/image";

import Dock, { type DockItemData } from "@/components/effects/Dock";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { profile } from "@/lib/data/profile";

const nameParts = profile.name.trim().split(/\s+/);
const firstName = nameParts[0] ?? profile.name;
const lastName = nameParts.slice(1).join(" ") || firstName;

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.24 9.24 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="19"
        fill="currentColor"
      >
        M
      </text>
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { label: "LinkedIn", href: profile.linkedinUrl, icon: LinkedInIcon },
  { label: "GitHub", href: profile.githubUrl, icon: GitHubIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: MailIcon },
  { label: "Medium", href: "https://medium.com/@methum.edu", icon: MediumIcon },
  { label: "X", href: "https://x.com/methexC", icon: XIcon },
];

function openSocialLink(href: string) {
  if (href.startsWith("http")) {
    window.open(href, "_blank", "noreferrer");
  } else {
    window.location.href = href;
  }
}

const dockItems: DockItemData[] = socialLinks.map((link) => ({
  label: link.label,
  onClick: () => openSocialLink(link.href),
  icon: <link.icon className="h-5 w-5 text-foreground" />,
}));

const cutCorner = "[clip-path:polygon(0_0,82%_0,100%_16%,100%_100%,0_100%)]";

export function WhoIs() {
  return (
    <SectionWrapper id="whois" className="border-t border-border/60">
      <div className="grid w-full items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[560px]">
          <div
            aria-hidden="true"
            className={`absolute -left-4 -top-4 h-full w-full border border-accent/40 ${cutCorner}`}
          />
          <div className={`relative aspect-square w-full overflow-hidden border border-border bg-bg-elevated ${cutCorner}`}>
            <Image
              src="/whois/DP2.png"
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              className="select-none object-cover [-webkit-touch-callout:none] [-webkit-user-drag:none]"
            />
          </div>
        </div>

        <div className="space-y-8">
          <SectionEyebrow label="The human behind the stack" />
          <div className="space-y-1">
            <h2 className="font-display text-5xl font-medium leading-[0.95] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              {firstName}
            </h2>
            <h2 className="font-display text-5xl font-semibold italic leading-[0.95] text-accent accent-glow-text sm:text-6xl md:text-7xl lg:text-9xl">
              {lastName}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted sm:text-xl">
            Plan it, build it, ship it, monitor it — I run the full pipeline myself. The one
            process I&apos;ve never managed to automate: continuous learning.
          </p>
          <div className="space-y-2 border-t border-border/70 pt-6">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted">
              Public identity — Dino
            </p>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted">
              Legal name — {profile.name}
            </p>
          </div>
          <Dock items={dockItems} />
        </div>
      </div>
    </SectionWrapper>
  );
}
