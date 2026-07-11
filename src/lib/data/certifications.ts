export interface Certification { issuer: string; title: string; date: string; skills: string[]; }

export const certifications: Certification[] = [
  { issuer: "Placeholder Provider", title: "Full-Stack Web Development Certification", date: "Details coming soon", skills: ["Full Stack", "Web Development"] },
  { issuer: "Placeholder Provider", title: "Backend & API Development Certification", date: "Details coming soon", skills: ["Backend", "REST APIs"] },
  { issuer: "Placeholder Provider", title: "Cloud & DevOps Fundamentals", date: "Details coming soon", skills: ["Cloud", "DevOps"] },
];
