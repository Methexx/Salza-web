import { About } from "@/components/sections/About";
import { AchievementsBlock } from "@/components/sections/AchievementsBlock";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { SkillsShowcase } from "@/components/sections/SkillsShowcase";
import { WhoIs } from "@/components/sections/WhoIs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoIs />
      <About />
      <Projects />
      <SkillsShowcase />
      <Experience />
      <AchievementsBlock />
    </>
  );
}
