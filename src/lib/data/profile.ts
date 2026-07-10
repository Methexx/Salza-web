export interface ProfileStat { label: string; value: string; }

export interface ProfileData {
  name: string; alias: string; role: string; location: string; availability: string;
  email: string; phone: string; whatsappNumber?: string; githubUrl: string;
  linkedinUrl: string; websiteUrl: string; address: string; languages: string[];
  tagline: string; shortBio: string; focusArea: string; heroDescription: string;
  contactHeading: string; contactDescription: string; footerHeading: string;
  footerDescription: string;
  stats: { yearsExperience: ProfileStat; projectsShipped: ProfileStat; satisfaction: ProfileStat; };
}

export const profile: ProfileData = {
  name: "Methum Pathirana",
  alias: "Hello I'm",
  role: "Undergraduate Software Engineer (Full Stack)",
  location: "Panadura, Sri Lanka",
  address: "No 364/2, Watabage, Thanthirimulla, Panadura",
  availability: "Open to software engineering opportunities",
  email: "methum.edu@gmail.com",
  phone: "+94 71 2181 4104",
  whatsappNumber: "+94 71 2181 4104",
  websiteUrl: "https://www.methum.space",
  githubUrl: "https://github.com/Methexx",
  linkedinUrl: "https://www.linkedin.com/in/methum",
  languages: ["English", "Sinhala"],
  tagline: "Building reliable full-stack products from polished interfaces to scalable backend services.",
  shortBio: "Software Engineering undergraduate with hands-on experience building dynamic web applications, backend services, RESTful APIs, and database-driven products.",
  focusArea: "I work across React, Next.js, Node.js, Express.js, Spring Boot, Java, and modern databases, supported by Docker, Git, GitHub, and CI/CD workflows.",
  heroDescription: "Combining frontend craft, backend engineering, database design, and practical DevOps to turn ideas into complete, maintainable applications.",
  contactHeading: "Let’s build something useful together",
  contactDescription: "Available for full-stack development, backend engineering, collaborative software projects, internships, and graduate opportunities.",
  footerHeading: "Have a product idea or engineering opportunity?",
  footerDescription: "Let’s create a fast, reliable, and thoughtfully engineered digital product.",
  stats: {
    yearsExperience: { label: "Engineering Focus", value: "Full Stack" },
    projectsShipped: { label: "Projects", value: "5+" },
    satisfaction: { label: "Current Study", value: "BSc (Hons)" },
  },
};
