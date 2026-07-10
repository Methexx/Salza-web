export interface ProjectScreenshot { title: string; caption: string; tone: string; imageSrc?: string; }
export interface ProjectInfoItem { label: string; value: string; }
export interface ProjectTechItem { layer: string; technology: string; purpose: string; }
export interface ProjectFeatureGroup { title: string; items: string[]; }
export interface ProjectDetailSection { title: string; items: string[]; }
export interface ProjectEntry {
  slug: string; title: string; category: string; description: string; overview: string;
  challenge: string; impact: string; tags: string[]; status: "live" | "concept";
  githubUrl: string; liveUrl?: string; screenshots: ProjectScreenshot[]; summaryLabel?: string;
  identity?: ProjectInfoItem[]; technologyStack?: ProjectTechItem[];
  featureGroups?: ProjectFeatureGroup[]; detailSections?: ProjectDetailSection[];
}

export function createProjectRouteSlug(value: string) {
  return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const githubProfile = "https://github.com/Methexx";
const shot = (title: string, caption: string, imageSrc?: string): ProjectScreenshot[] => [{ title, caption, imageSrc, tone: "from-blue-500/30 via-indigo-400/10 to-transparent" }];

export const featuredProjects: ProjectEntry[] = [
  {
    slug: "Greenie Sustainability Platform", title: "Greenie Sustainability Platform", category: "Collaborative Full-Stack Platform",
    description: "An eco-friendly platform promoting sustainability through gamification, challenges, and community engagement.",
    overview: "A collaborative university project built with React, Firebase, and Tailwind CSS. I contributed to features across both frontend and backend development.",
    challenge: "Turn sustainable habits into an engaging digital experience that encourages continued participation.",
    impact: "Combined community features and gamified challenges in an accessible web platform.",
    tags: ["React", "Firebase", "Tailwind CSS", "Full Stack"], status: "concept", githubUrl: githubProfile,
    screenshots: shot("Greenie Platform", "Sustainability challenges, gamification, and community engagement."),
    technologyStack: [{ layer: "Frontend", technology: "React + Tailwind CSS", purpose: "Responsive, interactive platform experience" }, { layer: "Backend", technology: "Firebase", purpose: "Authentication, data, and application services" }],
  },
  {
    slug: "ABC Cinema Movie Ticket Booking System", title: "ABC Cinema – Movie Ticket Booking System", category: "Java Web Application",
    description: "A secure movie booking system with showtime selection, reservations, sessions, and persistent storage.",
    overview: "Engineered the backend using Java Servlets and JSP, integrating MariaDB for persistent storage and normalized booking data.",
    challenge: "Maintain reliable user sessions and booking state while keeping cinema and reservation data consistent.",
    impact: "Delivered a responsive booking experience with session handling and normalized database design.",
    tags: ["Java", "Servlets", "JSP", "MariaDB"], status: "concept", githubUrl: githubProfile,
    screenshots: shot("ABC Cinema", "Movie discovery, showtime selection, and secure ticket reservation.", "/projects/movie/abc.png"),
    technologyStack: [{ layer: "Backend", technology: "Java Servlets + JSP", purpose: "Booking workflows and server-rendered application logic" }, { layer: "Database", technology: "MariaDB", purpose: "Normalized persistent cinema and reservation data" }],
  },
  {
    slug: "Ticket Booking System", title: "Ticket Booking System", category: "Collaborative Next.js Platform",
    description: "A collaborative event and ticket management system built for a seamless booking experience.",
    overview: "Built with Next.js, with contributions across frontend and backend features for event discovery and ticket management.",
    challenge: "Create a clear booking flow while coordinating full-stack work across a collaborative team.",
    impact: "Delivered a deployed platform for managing events and booking tickets online.",
    tags: ["Next.js", "TypeScript", "Full Stack", "Team Project"], status: "live", githubUrl: "https://arctickets.vercel.app/", liveUrl: "https://arctickets.vercel.app/",
    screenshots: shot("Arc Tickets", "A streamlined event discovery and ticket booking experience."),
  },
  {
    slug: "Screen Mirror App", title: "Screen Mirror App – Windows to Android", category: "Cross-Platform Systems Project",
    description: "A USB-only, low-latency application for streaming a Windows desktop to an Android device.",
    overview: "Built with Flutter, Kotlin, H.264 hardware-accelerated encoding and decoding, TCP sockets, and ADB port forwarding.",
    challenge: "Transmit desktop video over USB with minimal latency while managing hardware codecs and communication between two platforms.",
    impact: "Created a focused screen-sharing architecture that avoids Wi-Fi and uses direct USB communication.",
    tags: ["Flutter", "Kotlin", "H.264", "TCP Sockets", "ADB"], status: "concept", githubUrl: githubProfile,
    screenshots: shot("USB Screen Mirror", "Low-latency Windows-to-Android streaming over a direct USB connection."),
    technologyStack: [{ layer: "Client", technology: "Flutter + Kotlin", purpose: "Android playback and native platform integration" }, { layer: "Streaming", technology: "H.264 + TCP sockets", purpose: "Hardware-accelerated video delivery over ADB forwarding" }],
  },
  {
    slug: "Gym Management System", title: "Gym Management System", category: "Collaborative Full-Stack Platform",
    description: "A role-based gym management and workout tracking system for admins, trainers, and members.",
    overview: "A collaborative Next.js and TypeScript platform covering memberships, workouts, payments, attendance, and real-time operational updates.",
    challenge: "Unify multiple gym workflows while maintaining clear permissions for three different user roles.",
    impact: "Centralized day-to-day gym operations and member progress in one responsive application.",
    tags: ["Next.js", "TypeScript", "Role-Based Access", "Real-Time Updates"], status: "concept", githubUrl: githubProfile,
    screenshots: shot("Gym Management Dashboard", "Memberships, workouts, payments, and attendance in one role-aware platform.", "/projects/astrolift/main.png"),
    featureGroups: [{ title: "Platform Capabilities", items: ["Admin, trainer, and member role-based access", "Membership and payment management", "Workout programs and progress tracking", "Attendance tracking and real-time updates"] }],
  },
];

export const allProjects = featuredProjects;

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => createProjectRouteSlug(project.slug) === slug);
}
