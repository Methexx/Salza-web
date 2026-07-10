export interface WorkExperienceEntry {
  role: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
}

export interface CredentialEntry {
  title: string;
  institution: string;
  period: string;
  type: "degree" | "certification";
}

export const workExperience: WorkExperienceEntry[] = [
  {
    role: "Programe Analyst Team Member",
    organization: "IEEE Student Branch, NSBM Green University",
    period: "2024",
    description:
      "Supported program analysis by gathering requirements, documenting workflows, coordinating tasks, and preparing progress updates for the team.",
    tags: ["Program Analysis", "Requirements Gathering", "Workflow Documentation", "Team Coordination"],
  },
];

export const educationEntries: CredentialEntry[] = [
  {
    title: "BSc Honours in Software Engineering (Plymouth University UK)",
    institution: "NSBM Green University",
    period: "2023 - Present",
    type: "degree",
  },
  {
    title: "Certification course in English Language Proficiency",
    institution: "Aquinas College, Colombo",
    period: "2020 - 2022",
    type: "certification",
  },
];

