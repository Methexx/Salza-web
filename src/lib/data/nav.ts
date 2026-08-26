export interface SectionLink {
  id: "whois" | "skills" | "projects" | "experience" | "contact";
  href: "#whois" | "#skills" | "#projects" | "#experience" | "#contact";
  label: string;
}

export interface SectionMeta {
  id: "hero" | SectionLink["id"];
  label: string;
  eyebrow: string;
  heading: string;
}

export const navLinks: SectionLink[] = [
  { id: "whois", href: "#whois", label: "About" },
  { id: "projects", href: "#projects", label: "Work" },
  { id: "skills", href: "#skills", label: "Capabilities" },
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
  whois: {
    id: "whois",
    label: "About",
    eyebrow: "About",
    heading: "The human behind the stack",
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
