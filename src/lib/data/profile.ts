export interface ProfileStat {
  label: string;
  value: string;
}

export interface ProfileData {
  name: string;
  alias: string;
  role: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  githubUrl: string;
  linkedinUrl: string;
  languages: string[];
  tagline: string;
  shortBio: string;
  focusArea: string;
  heroDescription: string;
  contactHeading: string;
  contactDescription: string;
  footerHeading: string;
  footerDescription: string;
  stats: {
    yearsExperience: ProfileStat;
    projectsShipped: ProfileStat;
    satisfaction: ProfileStat;
  };
}

export const profile: ProfileData = {
  name: "Gihansa Buwanayake",
  alias: "Hello I'm",
  role: "Business Analyst",
  location: "Gampaha, Sri Lanka",
  availability: "Open to projects",
  email: "gihansasenukie@gmail.com",
  phone: "+94 71 116 0306",
  whatsappNumber: "+94 71 116 0306",
  githubUrl: "https://github.com/ghsenu",
  linkedinUrl: "https://www.linkedin.com/in/gihansa-senukie/",
  languages: ["English", "Sinhala"],
  tagline: "Turning business needs into clear requirements and actionable product outcomes.",
  shortBio:
    "Business analyst focused on gathering requirements, clarifying workflows, and helping teams align product decisions with real business goals.",
  focusArea:
    "I focus on process analysis, stakeholder collaboration, documentation, and translating business problems into practical solution requirements.",
  heroDescription:
    "Combining analytical thinking with clear communication to support better decisions across web, mobile, and internal business systems.",
  contactHeading: "Let’s shape the next right solution together",
  contactDescription:
    "Available for business analysis work, requirement gathering, process improvement, and product teams that need structured support.",
  footerHeading: "Ready to turn business needs into a clearer plan?",
  footerDescription:
    "From discovery sessions to workflow mapping, I help teams move from uncertainty to actionable direction.",
  stats: {
    yearsExperience: {
      label: "Years Experience",
      value: "1+",
    },
    projectsShipped: {
      label: "Projects Shipped",
      value: "10+",
    },
    satisfaction: {
      label: "Satisfaction",
      value: "99%",
    },
  },
};
