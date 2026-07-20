export interface AchievementEntry {
  title: string;
  year: string;
  name: string;
  status: string;
  details: string;
}

export const achievements: AchievementEntry[] = [
  {
    title: "IEEE Xtreme Global Hackathon",
    year: "2024",
    name: "Placeholder Person One",
    status: "Software Engineer",
    details: "Top place at NSBM Green University and top 5 among all state and non-state universities in Sri Lanka.",
  },
  {
    title: "Uxverse",
    year: "2024",
    name: "Placeholder Person Two",
    status: "UI/UX Designer",
    details: "First place at Uxverse, hosted by the IEEE Society of NSBM Green University.",
  },
  {
    title: "Morahackthon",
    year: "2024",
    name: "Placeholder Person Three",
    status: "Hackathon Participant",
    details: "Participated in Morahackthon 2024.",
  },
];
