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
    slug: "Universe System",
    title: "UniVerse School Management Platform",
    category: "School Management & Parent Supervision Platform",
    description: "A full-stack school management platform connecting admins, teachers, security staff, and parents through a unified backend, web dashboard, and mobile app.",
    overview: "UniVerse is a large-scale school management system built as a final year project to unify school operations across multiple user groups. The platform combines a Fastify backend, a Next.js web dashboard, and a Flutter mobile app to support admins, teachers, security staff, and parents in one connected ecosystem. It includes attendance management, QR-based gate tracking, results publishing, messaging, announcements, complaints handling, lost and found reporting, push notifications, and an AI-powered RAG chatbot for policy-aware assistance.",
    challenge: "School operations are often split across disconnected tools, manual records, and separate communication channels. UniVerse needed to create one secure role-aware ecosystem that could manage academic workflows, gate activity, parent visibility, communication, support requests, and policy-aware assistance across web and mobile experiences.",
    impact: "The resulting multi-platform system centralizes operational and academic workflows, gives parents timely visibility into student activity, supports faster communication between school stakeholders, and establishes a deployment-ready technical foundation for future school-wide expansion.",
    tags: ["Web", "Mobile", "Fastify", "Next.js", "Flutter", "TypeScript", "PostgreSQL", "Docker", "Firebase", "Gemini"],
    status: "concept",
    githubUrl: githubProfile,
    summaryLabel: "UniVerse platform case study",
    screenshots: shot("UniVerse School Management Platform", "Main platform image placeholder — the final UniVerse project visual will be added when supplied."),
    identity: [
      { label: "Project Type", value: "Final year software engineering project" },
      { label: "Role", value: "Full-Stack Developer and System Designer" },
      { label: "Platforms", value: "Fastify backend, Next.js web dashboard, and Flutter mobile app" },
      { label: "Primary Users", value: "Admins, teachers, security staff, parents, and pending users" },
      { label: "Delivery Model", value: "Multi-application monorepo with Docker and CI support" },
    ],
    technologyStack: [
      { layer: "Backend", technology: "Fastify", purpose: "High-performance API services, role-aware business logic, and platform integrations" },
      { layer: "Web", technology: "Next.js and React", purpose: "Administrative, teacher, and security dashboard workflows" },
      { layer: "Mobile", technology: "Flutter", purpose: "Structured parent-facing access to attendance, results, notices, support, and student status" },
      { layer: "Language", technology: "TypeScript", purpose: "Type-safe backend and web application development" },
      { layer: "ORM", technology: "Prisma", purpose: "Schema modelling, migrations, and structured database access" },
      { layer: "Database", technology: "PostgreSQL", purpose: "Relational storage for users, school records, attendance, results, and operational data" },
      { layer: "Cache", technology: "Redis", purpose: "Fast temporary data access and supporting backend workflows" },
      { layer: "Notifications", technology: "Firebase", purpose: "Push notification delivery and parent alert workflows" },
      { layer: "AI", technology: "Gemini and RAG", purpose: "Policy-aware assistance, retrieval workflows, and AI-assisted school support" },
      { layer: "Infrastructure", technology: "Docker", purpose: "Consistent local development and production-oriented service orchestration" },
      { layer: "Delivery", technology: "CI workflows and Vercel", purpose: "Automated quality checks and deployment-ready frontend configuration" },
    ],
    featureGroups: [
      {
        title: "My Role & Implementation",
        items: [
          "Designed and implemented the full system structure across backend, web, and mobile application layers.",
          "Built role-based access flows for admins, teachers, security staff, parents, and pending users.",
          "Developed core modules including attendance, gate logs, announcements, messaging, complaints, and results management.",
          "Integrated the Fastify API with the Next.js dashboard, Flutter parent app, and Firebase notification workflows.",
          "Set up the monorepo structure, Docker-based development flow, environment configuration, and supporting tooling.",
          "Implemented AI-assisted school support through RAG-based backend workflows and retrieval logic.",
          "Maintained project quality through testing support, documentation, and structured development practices.",
        ],
      },
      {
        title: "Platform Roles & Access",
        items: [
          "Admin Role: Manage overall school operations, users, notices, complaints, attendance, and reporting flows.",
          "Teacher Role: Handle classes, attendance, results, messages, and class-scoped notices.",
          "Security Role: Manage gate logs, QR scanning, and student entry-exit monitoring.",
          "Parent Access: Use the mobile app to track attendance, notifications, results, notices, support, and student status.",
          "Pending User Flow: Support controlled onboarding and approval before users receive platform permissions.",
        ],
      },
      {
        title: "Core Academic & Gate Features",
        items: [
          "QR-based gate IN/OUT scanning with entry-exit monitoring and parent alerts.",
          "Automatic checkout logic to support accurate daily gate records.",
          "Daily attendance sessions and batch attendance submission workflows.",
          "Calendar-based attendance views for reviewing student history.",
          "Publishable term results with structured access for teachers and parents.",
        ],
      },
      {
        title: "Communication & Support",
        items: [
          "Messaging threads connecting relevant school users through structured conversations.",
          "School-wide and class-scoped announcements with targeted visibility.",
          "AI-assisted draft suggestions for clearer and faster communication.",
          "Complaints triage and handling workflows for structured issue resolution.",
          "Lost and found reporting for submitting, tracking, and resolving item reports.",
          "Push notifications and email-based approval flows for time-sensitive updates.",
        ],
      },
    ],
    detailSections: [
      {
        title: "Backend & AI Services",
        items: [
          "Fastify provides the central API layer for authentication, permissions, academic modules, gate operations, messaging, and support workflows.",
          "Prisma manages relational models and database access across PostgreSQL-backed school records.",
          "Redis supports fast temporary state and performance-sensitive backend workflows.",
          "Firebase integration delivers push notifications for attendance, gate activity, notices, and other parent-facing alerts.",
          "Gemini-powered RAG services retrieve relevant school policy context before generating assistance, helping responses remain grounded in approved information.",
        ],
      },
      {
        title: "Web Dashboard",
        items: [
          "Next.js, React, TypeScript, and Tailwind CSS power role-specific admin, teacher, and security workflows.",
          "Dashboard access and available actions change according to authenticated role and assigned permissions.",
          "Web modules cover user administration, notices, complaints, attendance, results, messaging, and operational reporting.",
          "Security-facing screens support QR scanning and gate log visibility for entry-exit supervision.",
        ],
      },
      {
        title: "Parent Mobile Application",
        items: [
          "Flutter provides the parent-facing mobile experience through structured feature modules.",
          "Parents can review attendance, term results, notices, notifications, support information, and current student status.",
          "Gate and attendance events connect to alert workflows so parents receive timely updates.",
          "Mobile features consume the same Fastify API used by the web platform, keeping data and permissions consistent across applications.",
        ],
      },
      {
        title: "Architecture & Monorepo",
        items: [
          "A shared npm workspace organizes backend, frontend, and supporting packages within one coordinated repository.",
          "The Flutter application is maintained alongside the web and API layers as part of the complete platform delivery.",
          "Environment configuration separates local development requirements from deployment-ready settings.",
          "Shared tooling and structured scripts reduce setup friction and keep development practices consistent across applications.",
        ],
      },
      {
        title: "Docker & Development Workflow",
        items: [
          "The Docker development stack supports hot reload across backend, frontend, and Redis services.",
          "A separate production compose setup prepares services for production-oriented execution.",
          "Containerized dependencies make onboarding more predictable and reduce environment differences between contributors.",
          "Database, cache, API, and web services can be coordinated through repeatable development commands.",
        ],
      },
      {
        title: "Quality & Delivery",
        items: [
          "Husky and commitlint support consistent commit practices and local quality safeguards.",
          "CI workflows provide automated validation for the multi-application codebase.",
          "Testing support, technical documentation, and structured development practices are included within the final year project scope.",
          "Vercel configuration prepares the Next.js dashboard for web deployment while production compose files support service delivery.",
        ],
      },
    ],
  },
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
