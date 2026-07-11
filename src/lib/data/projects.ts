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
    slug: "Greenie Sustainability Platform",
    title: "Greenie Social Platform",
    category: "Collaborative Gamified Web Platform",
    description: "A gamified social platform that encourages environmental consciousness through challenges, rewards, real-time updates, and community engagement.",
    overview: "Greenie is a social platform that gamifies environmental consciousness. Users can participate in eco-friendly challenges, earn points and badges, share their progress, and connect with like-minded individuals. The web platform combines structured sustainability activities with real-time leaderboards and social interaction to make environmentally responsible habits more engaging and visible.",
    challenge: "Environmental awareness platforms can struggle to maintain long-term participation when learning and action feel passive. Greenie needed to transform eco-friendly activities into motivating social experiences while supporting live progress, responsive access, secure user data, and scalable challenge management.",
    impact: "Greenie turns individual environmental action into a shared community experience. Its challenge, reward, leaderboard, and social systems encourage recurring participation while giving administrators the tools needed to manage content, users, engagement, and reward distribution.",
    tags: ["Web", "Next.js", "React", "Node.js", "Express", "MongoDB", "Socket.io", "Team Project"],
    status: "concept",
    githubUrl: githubProfile,
    summaryLabel: "Greenie social platform case study",
    screenshots: shot("Greenie Social Platform", "Main image placeholder — the final Greenie platform visual will be added when supplied."),
    identity: [
      { label: "Project Type", value: "Collaborative university web project" },
      { label: "Team", value: "Four-person development team" },
      { label: "My Role", value: "Frontend Developer" },
      { label: "Platform", value: "Responsive web application" },
      { label: "Core Experience", value: "Environmental challenges, gamification, social engagement, and real-time progress" },
    ],
    technologyStack: [
      { layer: "Frontend", technology: "Next.js and React", purpose: "Complete responsive user interface and component-based web experience" },
      { layer: "Backend", technology: "Node.js and Express", purpose: "REST API services, authentication workflows, and application business logic" },
      { layer: "Database", technology: "MongoDB", purpose: "User profiles, challenges, progress, rewards, posts, and platform content" },
      { layer: "Real-Time", technology: "Socket.io", purpose: "Live leaderboards, progress changes, and social updates" },
      { layer: "Integration", technology: "REST APIs", purpose: "Connect frontend workflows with authentication, data, and gamification services" },
      { layer: "Performance", technology: "Lazy loading", purpose: "Reduce initial loading cost and improve the experience across devices" },
    ],
    featureGroups: [
      {
        title: "My Contribution (Team Project)",
        items: [
          "Worked as the frontend developer within a four-person project team.",
          "Developed the complete frontend using Next.js and React.",
          "Implemented real-time functionality with Socket.io for live platform updates.",
          "Created responsive layouts and interactions for mobile and desktop users.",
          "Built frontend experiences for the gamification system, including points, badges, and leaderboards.",
          "Integrated backend APIs for user authentication, challenge data, progress, rewards, and social content.",
          "Optimized frontend performance and introduced lazy loading to improve user experience.",
          "Collaborated closely with backend developers to align API contracts and complete feature integration.",
        ],
      },
      {
        title: "User Features",
        items: [
          "Challenge Participation: Join eco-friendly challenges and track individual progress.",
          "Social Sharing: Share completed activities, achievements, and sustainability progress with friends.",
          "Rewards System: Earn points, badges, and eco-rewards through platform participation.",
          "Community Interaction: Discover and connect with environmentally conscious users.",
          "Live Progress: Receive real-time leaderboard and challenge progress updates through Socket.io.",
        ],
      },
      {
        title: "Admin Features",
        items: [
          "Challenge Management: Create, update, organize, and manage environmental challenges.",
          "User Analytics: Review engagement, participation, and platform activity.",
          "Content Moderation: Monitor and moderate user-generated posts and shared progress.",
          "Reward Distribution: Configure and manage platform points, badges, and reward systems.",
        ],
      },
    ],
    detailSections: [
      {
        title: "Gamification System",
        items: [
          "Points provide immediate feedback when users participate in challenges and complete activities.",
          "Badges recognize milestones and give users visible evidence of environmental progress.",
          "Leaderboards create friendly competition and make community participation more engaging.",
          "Eco-rewards connect platform activity with longer-term motivation and achievement.",
        ],
      },
      {
        title: "Real-Time Experience",
        items: [
          "Socket.io delivers live leaderboard changes without requiring a full page refresh.",
          "Challenge progress can update as participation data changes across connected users.",
          "Real-time social updates make the platform feel active and community-driven.",
          "Frontend state is synchronized with live events while retaining API-based data loading for core records.",
        ],
      },
      {
        title: "Frontend Engineering",
        items: [
          "Next.js and React provide a structured, component-based foundation for the complete web interface.",
          "Responsive layouts support challenge participation, social interaction, and administrative tasks across mobile and desktop screens.",
          "Reusable components keep challenge cards, reward displays, leaderboards, and social content visually consistent.",
          "Lazy loading reduces unnecessary initial work and improves perceived performance for content-heavy pages.",
        ],
      },
      {
        title: "Backend & Data Integration",
        items: [
          "The Node.js and Express backend exposes APIs for authentication, users, challenges, progress, rewards, and social activity.",
          "MongoDB stores flexible platform data for users, environmental challenges, achievements, posts, and engagement records.",
          "Frontend API integration handles authenticated requests, data presentation, loading states, and error feedback.",
          "Close coordination with backend developers helped maintain consistent payloads and reliable feature behavior.",
        ],
      },
      {
        title: "Key Platform Outcomes",
        items: [
          "Real-time leaderboards and progress tracking make participation visible and timely.",
          "Points and badges turn environmental action into a rewarding, repeatable experience.",
          "Social functionality supports community building around shared sustainability goals.",
          "Responsive design keeps the complete platform accessible across device sizes.",
          "Admin tools provide the operational control required to maintain challenges, content, engagement, and rewards.",
        ],
      },
    ],
  },
  {
    slug: "ABC Cinema Movie Ticket Booking System", title: "ABC Cinema – Movie Ticket Booking System", category: "Java Web Application",
    description: "A secure movie booking system with showtime selection, reservations, sessions, and persistent storage.",
    overview: "Engineered the backend using Java Servlets and JSP, integrating MariaDB for persistent storage and normalized booking data.",
    challenge: "Maintain reliable user sessions and booking state while keeping cinema and reservation data consistent.",
    impact: "Delivered a responsive booking experience with session handling and normalized database design.",
    tags: ["Java", "Servlets", "JSP", "MariaDB"], status: "concept", githubUrl: githubProfile,
    screenshots: shot("ABC Cinema", "Image placeholder — the updated movie booking visual will be added shortly."),
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
    screenshots: shot("Gym Management Dashboard", "Image placeholder — the updated gym management visual will be added shortly."),
    featureGroups: [{ title: "Platform Capabilities", items: ["Admin, trainer, and member role-based access", "Membership and payment management", "Workout programs and progress tracking", "Attendance tracking and real-time updates"] }],
  },
];

export const allProjects = featuredProjects;

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => createProjectRouteSlug(project.slug) === slug);
}
