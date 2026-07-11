import { About } from "@/components/sections/About";
import { AchievementsBlock } from "@/components/sections/AchievementsBlock";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { InterfacesShowcase } from "@/components/sections/InterfacesShowcase";
import { Projects } from "@/components/sections/Projects";
import { Volunteering } from "@/components/sections/Volunteering";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Volunteering />
      <Certifications />
      <AchievementsBlock />
      <Projects />
      <InterfacesShowcase />
      <Contact />
    </>
  );
}
