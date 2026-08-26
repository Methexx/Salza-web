import { About } from "@/components/sections/About";
import { AchievementsBlock } from "@/components/sections/AchievementsBlock";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Volunteering } from "@/components/sections/Volunteering";
import { WhoIs } from "@/components/sections/WhoIs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoIs />
      <Projects />
      <About />
      <Experience />
      <Volunteering />
      <AchievementsBlock />
    </>
  );
}
