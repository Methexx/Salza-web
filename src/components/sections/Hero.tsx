import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { profile } from "@/lib/data/profile";
import profileImg from "../../../Assets/new-Photoroom.png";

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
        </div>

        <div className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm lg:max-w-none">
          <div className="clipped-corner relative overflow-hidden border border-border bg-bg-elevated/80 p-3 sm:p-4 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="clipped-corner-sm relative aspect-[4/5] overflow-hidden border border-accent/20 bg-[radial-gradient(circle_at_top,_rgba(249,115,0,0.16),_transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
              <Image
                src={profileImg}
                alt={`${profile.name} profile portrait`}
                fill
                priority
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 380px, 88vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/18 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
