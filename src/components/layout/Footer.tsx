"use client";

import { motion, useReducedMotion } from "framer-motion";

import LaserFlow from "@/components/effects/LaserFlow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getGmailComposeUrl } from "@/lib/contact";
import { navLinks } from "@/lib/data/nav";
import { profile } from "@/lib/data/profile";

const socialLinks = [
  { label: "LinkedIn", href: profile.linkedinUrl },
  { label: "GitHub", href: profile.githubUrl },
  { label: "Email", href: getGmailComposeUrl("Portfolio inquiry") },
];

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper
      as="footer"
      id="footer"
      className="min-h-0 border-t border-border bg-[linear-gradient(180deg,#090706_0%,#0c0908_45%,#090706_100%)]"
      containerClassName="min-h-0 sm:min-h-0 items-stretch py-10 sm:py-14"
    >
      <motion.div
        className="w-full space-y-6"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="border-b border-border/80 pb-5 text-center sm:pb-6">
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
            Designed and Developed <span className="text-accent accent-glow-text">by {profile.name}</span>
          </h3>
        </div>

        <div className="clipped-corner relative overflow-hidden border border-border bg-[radial-gradient(circle_at_top_left,rgba(50,95,254,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-5 pb-16 sm:p-8 sm:pb-20 lg:p-10 lg:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex translate-x-[-6%] translate-y-1/2 justify-center">
            <div className="relative h-[28rem] w-[86%] max-w-5xl overflow-hidden sm:h-[34rem] lg:h-[40rem]">
              <LaserFlow
                color="#325FFE"
                decay={3}
                falloffStart={1.03}
                flowSpeed={0.46}
                flowStrength={0.25}
                fogFallSpeed={0.6}
                fogIntensity={0.81}
                fogScale={0.1}
                horizontalBeamOffset={0.1}
                horizontalSizing={0.5}
                mouseTiltStrength={0}
                verticalBeamOffset={0}
                verticalSizing={1.8}
                wispDensity={2}
                wispIntensity={7.1}
                wispSpeed={15}
              />
            </div>
          </div>

          <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.85fr)]">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                  {profile.footerHeading}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  {profile.footerDescription}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#contact" className="w-full sm:w-auto">Start a conversation</Button>
                <Button href={profile.websiteUrl} variant="ghost" className="w-full sm:w-auto">
                  Visit Website
                </Button>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  Socials
                </p>
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-lg text-foreground transition hover:text-accent"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  Sitemap
                </p>
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className="block text-lg text-foreground transition hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  Location
                </p>
                <div className="space-y-2">
                  <p className="text-lg text-foreground">{profile.location}</p>
                  <div className="inline-flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="status-pulse-fast h-2.5 w-2.5 rounded-full bg-accent"
                    />
                    <p className="text-sm leading-7 text-muted">
                      Open to <span className="font-semibold text-accent accent-glow-text">internship opportunities</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
