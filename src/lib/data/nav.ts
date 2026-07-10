export interface SectionLink {
  id: "about" | "projects" | "contact";
  href: "#about" | "#projects" | "#contact";
  label: string;
}

export interface SectionMeta {
  id: "hero" | SectionLink["id"] | "skills" | "experience" | "volunteering" | "certifications";
  label: string;
  eyebrow: string;
  heading: string;
}

export const navLinks: SectionLink[] = [
  { id: "about", href: "#about", label: "About" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export const sectionMeta: Record<SectionMeta["id"], SectionMeta> = {
  hero: {
    id: "hero",
    label: "Home",
    eyebrow: "Portfolio",
    heading: "Quality-driven engineer",
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
    heading: "Quality capabilities across the stack",
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
  certifications: {
    id: "certifications",
    label: "Certifications",
    eyebrow: "Certifications",
    heading: "Credentials and continued learning",
  },
  projects: {
    id: "projects",
    label: "Projects",
    eyebrow: "Projects",
    heading: "Platforms and QA case studies",
  },
  contact: {
    id: "contact",
    label: "Contact",
    eyebrow: "Contact",
    heading: "Start the conversation",
  },
};
