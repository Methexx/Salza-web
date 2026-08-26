export interface CredentialEntry { title: string; institution: string; period: string; type: "degree" | "certification"; }
export interface AffiliationEntry { title: string; subtitle: string; description: string; tags: string[]; }

export const affiliations: AffiliationEntry[] = [
  { title: "Design & Developer Team Lead", subtitle: "IEEE NSBM Student Branch", description: "Leading design and development contributions for the university chapter.", tags: ["Leadership", "Design", "Development"] },
  { title: "Member", subtitle: "FOSS Community · NSBM Green University", description: "Engaging with open-source learning, collaboration, and the campus developer community.", tags: ["Open Source", "Community"] },
  { title: "Event Coordinator", subtitle: "Compuvate Associate", description: "Coordinating event activities and working with teams to support successful delivery.", tags: ["Coordination", "Teamwork"] },
  { title: "Member", subtitle: "CSSL GenZ Chapter · NSBM Green University", description: "Participating in computing-focused student and professional community initiatives.", tags: ["CSSL", "Technology Community"] },
];

export const educationEntries: CredentialEntry[] = [
  { title: "BSc (Hons) Software Engineering (Plymouth University UK)", institution: "NSBM Green University", period: "Undergraduate", type: "degree" },
  { title: "Diploma in Human Resource Management", institution: "SITC Campus", period: "2022 - 2023", type: "certification" },
];
