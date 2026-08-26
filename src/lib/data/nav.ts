export interface SectionLink {
  id: "about" | "skills" | "projects" | "experience" | "contact";
  href: "#about" | "#skills" | "#projects" | "#experience" | "#contact";
  label: string;
}

export interface SectionMeta {
  id: "hero" | SectionLink["id"] | "volunteering";
  label: string;
  eyebrow: string;
  heading: string;
}

export const navLinks: SectionLink[] = [
  { id: "about", href: "#about", label: "Expertise" },
  { id: "skills", href: "#skills", label: "Tech Stack" },
  { id: "projects", href: "#projects", label: "Work" },
  { id: "experience", href: "#experience", label: "Journey" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export const sectionMeta: Record<SectionMeta["id"], SectionMeta> = {
  hero: {
    id: "hero",
    label: "Home",
    eyebrow: "Portfolio",
    heading: "Full-stack software engineer",
  },
  about: {
    id: "about",
    label: "About",
    eyebrow: "About",
    heading: "Profile and working focus",
  },
  skills: {
    id: "skills",
    label: "Skills",
    eyebrow: "Skills",
    heading: "Engineering capabilities across the stack",
  },
  experience: {
    id: "experience",
    label: "Experience",
    eyebrow: "Experience",
    heading: "Work, learning, and growth",
  },
  volunteering: {
    id: "volunteering",
    label: "Volunteering",
    eyebrow: "Volunteering",
    heading: "Volunteering timeline",
  },
  projects: {
    id: "projects",
    label: "Projects",
    eyebrow: "Projects",
    heading: "Full-stack products and engineering projects",
  },
  contact: {
    id: "contact",
    label: "Contact",
    eyebrow: "Contact",
    heading: "Start the conversation",
  },
};
