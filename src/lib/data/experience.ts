export interface WorkExperienceEntry { role: string; organization: string; period: string; description: string; tags: string[]; }
export interface CredentialEntry { title: string; institution: string; period: string; type: "degree" | "certification"; }

export const workExperience: WorkExperienceEntry[] = [
  { role: "Design & Developer Team Lead", organization: "IEEE NSBM Student Branch", period: "Present", description: "Leading design and development activities while coordinating contributors and supporting technical initiatives for the student chapter.", tags: ["Technical Leadership", "Design", "Development", "Team Coordination"] },
];

export const educationEntries: CredentialEntry[] = [
  { title: "BSc (Hons) Software Engineering (Plymouth University UK)", institution: "NSBM Green University", period: "Undergraduate", type: "degree" },
];
