export interface Certification {
  issuer: string;
  title: string;
  date: string;
  url?: string;
  skills?: string[];
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    issuer: "LinkedIn",
    title: "Practice Exam for Agile Analysis Certification (IIBA-AAC) [Practice Exam]",
    date: "Issued Jun 2026",
    skills: ["Business Analysis", "Agile Methodologies"],
  },
  {
    issuer: "LinkedIn",
    title: "Mistakes to Avoid in Agile Project Management",
    date: "Issued Jun 2026",
    skills: ["Agile Project Management"],
  },
  {
    issuer: "LinkedIn",
    title: "Agile Project Management with Jira Cloud: 3 Advanced Topics",
    date: "Issued Jun 2026",
    skills: ["Agile Project Management", "Jira"],
  },
  {
    issuer: "LinkedIn",
    title: "Agile Project Management with Jira Cloud: 2 Lean and Agile Processes",
    date: "Issued Jun 2026",
    skills: ["Agile Project Management", "Jira"],
  },
  {
    issuer: "LinkedIn",
    title: "Agile Project Management with Jira Cloud: 1 Projects, Boards, and Issues",
    date: "Issued Jun 2026",
    skills: ["Agile Project Management", "Jira"],
  },
  {
    issuer: "Atlassian",
    title: "Atlassian Agile Project Management Professional Certificate",
    date: "Issued Jun 2026",
    skills: ["Jira"],
  },
  {
    issuer: "LinkedIn",
    title: "Agile Foundations",
    date: "Issued Jun 2026",
    skills: ["Agile Project Management", "Agile Methodologies"],
  },
  {
    issuer: "LinkedIn",
    title: "Excel for Business Analysts",
    date: "Issued Jun 2026",
    skills: ["Microsoft Excel"],
  },
  {
    issuer: "LinkedIn",
    title: "Business Analysis Foundations: Competencies",
    date: "Issued Jun 2026",
    skills: ["Business Analysis"],
  },
  {
    issuer: "LinkedIn",
    title: "Scrum Master Cert Prep",
    date: "Issued Jun 2026",
    skills: ["Project Management"],
  },
  {
    issuer: "LinkedIn",
    title: "Scrum: The Basics",
    date: "Issued Jun 2026",
    skills: ["Scrum"],
  },
  {
    issuer: "LinkedIn",
    title: "Figma: Using Auto Layout",
    date: "LinkedIn Learning",
    skills: ["Figma", "Auto Layout", "UI Design"],
  },
  {
    issuer: "LinkedIn",
    title: "Design Thinking",
    date: "LinkedIn Learning",
    skills: ["Design Thinking", "Problem Solving", "User Research"],
  },
  {
    issuer: "LinkedIn",
    title: "Figma for UX Design",
    date: "Issued Dec 2025",
    skills: ["Figma", "UX", "Prototyping"],
  },
  {
    issuer: "LinkedIn",
    title: "Figma Essential Training",
    date: "Issued Dec 2025",
    skills: ["Figma", "Interface Design", "Design Systems"],
  },
  {
    issuer: "LinkedIn",
    title: "Design Psychology: Master the Art and Science of UX Design",
    date: "Issued Sep 2025",
    skills: ["User Experience Design (UED)", "UX"],
  },
];
