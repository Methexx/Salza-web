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
    slug: "Ticket Booking Platform",
    title: "Ticket Booking Platform",
    category: "Collaborative Full-Stack Event Platform",
    description: "A role-based ticket marketplace where buyers discover and book events, sellers manage events and ticket inventory, and admins control approvals and transactions.",
    overview: "The Ticket Booking Platform is a collaborative full-stack application built with Next.js 15, React 19, TypeScript, Prisma, and MongoDB. It supports buyers, sellers, and administrators through one connected event marketplace. Sellers complete email verification and administrative approval before creating events and ticket inventory; buyers create bookings and payments; and administrators supervise users, event approvals, financial transactions, and platform operations.",
    challenge: "A multi-role ticket marketplace must keep authentication, seller onboarding, event approval, ticket availability, bookings, sales, payments, and money movement consistent across several user journeys. The platform also needed secure password recovery, time-limited verification tokens, reliable email delivery, cache-aware lookups, and protected admin access without exposing sensitive account information.",
    impact: "The architecture establishes a scalable event commerce foundation with controlled seller access, structured booking and payment states, traceable transactions, Redis-backed security workflows, and responsive user experiences for marketplace discovery and administration.",
    tags: ["Next.js 15", "React 19", "TypeScript", "Prisma", "MongoDB", "NextAuth", "Redis", "Tailwind CSS"],
    status: "concept",
    githubUrl: githubProfile,
    summaryLabel: "Ticket booking platform case study",
    screenshots: shot("Ticket Booking Platform", "Main image placeholder — the updated ticket marketplace visual will be added shortly."),
    identity: [
      { label: "Project Type", value: "Collaborative full-stack web application" },
      { label: "Contribution", value: "Exact personal modules to be confirmed from Git history or contribution notes" },
      { label: "User Roles", value: "Admin, seller, and buyer" },
      { label: "Platform", value: "Responsive Next.js event ticket marketplace" },
      { label: "Data Model", value: "MongoDB with Prisma ORM" },
    ],
    technologyStack: [
      { layer: "Application", technology: "Next.js 15 and React 19", purpose: "Server and client experiences for buyers, sellers, and administrators" },
      { layer: "Language", technology: "TypeScript", purpose: "Type-safe application, API, validation, and state-management code" },
      { layer: "UI", technology: "Tailwind CSS 4, shadcn/ui, and Radix UI", purpose: "Responsive interfaces and accessible reusable components" },
      { layer: "Authentication", technology: "NextAuth and JWT", purpose: "Credential sign-in, sessions, verification checks, and role-aware access" },
      { layer: "Database", technology: "MongoDB", purpose: "Persistent users, events, tickets, bookings, sales, payments, and transactions" },
      { layer: "ORM", technology: "Prisma 6", purpose: "Typed data models, relations, database access, and schema management" },
      { layer: "Cache", technology: "Upstash Redis", purpose: "Authentication caching and expiring verification or password-reset tokens" },
      { layer: "Validation", technology: "Zod", purpose: "Request validation, strong password rules, and field-specific error feedback" },
      { layer: "Security", technology: "bcrypt", purpose: "Password hashing and secure credential comparison" },
      { layer: "Email", technology: "Nodemailer", purpose: "Verification, password recovery, and seller approval messages" },
      { layer: "State", technology: "Redux Toolkit", purpose: "Shared client-side application state across booking experiences" },
      { layer: "Uploads", technology: "UploadThing", purpose: "Managed image and file upload workflows" },
    ],
    featureGroups: [
      {
        title: "Role-Based Platform Access",
        items: [
          "Buyer Role: Discover approved events, choose ticket types and quantities, create bookings, and complete payment workflows.",
          "Seller Role: Register with identity and company information, verify email ownership, await admin approval, and manage event inventory.",
          "Admin Role: Access protected administrative routes, review sellers, approve events, supervise transactions, and manage platform operations.",
          "Middleware protects admin pages and redirects authenticated users according to their assigned role.",
          "NextAuth credentials, JWT sessions, Redis caching, and verification-state checks work together across authentication flows.",
        ],
      },
      {
        title: "Seller Onboarding & Approval",
        items: [
          "Seller registration collects name, contact, identity, company, and address information.",
          "Zod validates submitted fields before user creation.",
          "bcrypt hashes seller passwords before MongoDB persistence.",
          "New seller accounts begin unverified with a pending administrative approval status.",
          "Email verification uses a token and email pair, hashed token storage, a 24-hour expiry, and one-time invalidation.",
          "Verification status checks query Redis first and fall back to MongoDB when the cache is unavailable.",
          "Resending a verification email invalidates the previous token before creating a replacement.",
        ],
      },
      {
        title: "Events & Ticket Inventory",
        items: [
          "Sellers create events with title, description, date, time, location, collection, subcollection, and banner image data.",
          "Events move through draft, pending, approved, or rejected states before publication.",
          "Admin approval records the approving user and approval timestamp.",
          "Each event supports multiple ticket types with price, total quantity, remaining inventory, and availability state.",
          "Event collections support structured marketplace browsing and categorization.",
        ],
      },
      {
        title: "Booking, Sales & Payments",
        items: [
          "Buyers create bookings against an event with ticket type, quantity, total amount, booking state, and payment state.",
          "Booking states distinguish pending, confirmed, cancelled, and failed workflows.",
          "A completed booking can connect to one sale containing ticket quantity, total price, and sale status.",
          "Buyer information is stored against a sale for fulfillment and contact workflows.",
          "Payment records support card and PayPal methods with pending, completed, or failed statuses.",
          "Payment references and timestamps support traceability across completed purchases.",
        ],
      },
    ],
    detailSections: [
      {
        title: "Authentication & Session Management",
        items: [
          "NextAuth exposes sign-in and session endpoints through the application API.",
          "Credential authentication validates email and password before comparing bcrypt hashes.",
          "JWT-backed sessions carry user identity and role information across protected workflows.",
          "Redis caches frequently accessed user data to reduce repeated database reads.",
          "Authentication logic checks account verification status and returns controlled custom errors when access requirements are not met.",
        ],
      },
      {
        title: "Password Recovery Security",
        items: [
          "Forgot-password requests are validated through Zod before processing.",
          "The endpoint always returns a generic response, preventing attackers from discovering registered email addresses.",
          "Cryptographically secure reset tokens are hashed and stored in Redis with a one-hour expiry.",
          "Reset requests verify both the token and associated email before changing credentials.",
          "New passwords must satisfy validation rules and are persisted only after bcrypt hashing.",
          "Successful resets invalidate tokens immediately, making each reset link single-use.",
        ],
      },
      {
        title: "Financial Transaction Model",
        items: [
          "Transactions connect each sale to sender, recipient, and processing administrator records.",
          "Transaction types distinguish buyer payments, administrative payments, and seller payments.",
          "Direction fields record incoming and outgoing money movement.",
          "Amount, currency, status, reference, processing user, and timestamps provide an auditable financial trail.",
          "Pending, completed, and failed states support controlled settlement workflows.",
        ],
      },
      {
        title: "Data Architecture",
        items: [
          "The Prisma schema models users, events, tickets, bookings, sales, buyer information, payments, transactions, settings, and event collections.",
          "MongoDB ObjectIds connect relational-style Prisma associations across marketplace records.",
          "Unique email, user ID, sale, payment, booking, and settings constraints protect important one-to-one or identity relationships.",
          "Created and updated timestamps provide lifecycle visibility across accounts, events, bookings, and platform settings.",
          "Enumerated roles and workflow statuses keep approval, booking, payment, and transaction state transitions explicit.",
        ],
      },
      {
        title: "Email & Token Services",
        items: [
          "Nodemailer sends seller verification, password recovery, and account approval or rejection emails.",
          "HTML templates inject user-specific links and status information into each message.",
          "Token utilities handle cryptographic generation, hashing, expiration, storage, retrieval, and invalidation.",
          "Separate Redis mappings connect tokens and emails while avoiding raw token persistence.",
          "Retry-aware error handling supports more dependable email workflows.",
        ],
      },
      {
        title: "Frontend & Engineering Tooling",
        items: [
          "Redux Toolkit and React Redux provide shared client state while SessionProvider exposes authentication state.",
          "Framer Motion, Swiper, and Embla Carousel support animated and media-rich user experiences.",
          "Next Image is configured for GitHub avatars, TMDB artwork, media sources, and Unsplash content.",
          "Biome, ESLint, TypeScript, and Husky support formatting, validation, and commit-time development quality.",
          "Prisma generation and deployment scripts prepare the data client and synchronize schema changes.",
        ],
      },
      {
        title: "Contribution Note",
        items: [
          "The supplied schema and API documentation verify the platform architecture and implemented modules.",
          "They do not identify which teammate authored each feature.",
          "The personal-contribution section should be finalized using Git commits, pull requests, or a written list of the modules completed by Methum.",
        ],
      },
    ],
  },
  {
    slug: "ABC Cinema Movie Ticket Booking System",
    title: "ABC Cinema Movie Ticket Booking System",
    category: "Java Web Application",
    description: "A full-featured online cinema reservation system with dedicated customer and administrator experiences for movie discovery, showtime selection, booking, and platform management.",
    overview: "ABC Cinema is an online movie ticket reservation system created as part of a second-year university project. Built with Java Servlets, JSP, HTML, CSS, JavaScript, and MariaDB/MySQL, it gives customers a user-friendly interface for browsing available movies and booking tickets while providing administrators with a dedicated dashboard for movie listings, users, bookings, and reviews.",
    challenge: "The platform needed to connect movie discovery, authenticated customer accounts, showtime selection, reservations, user booking history, and administrative management within one traditional Java web application. It also required responsive interfaces, dependable database access, and clear separation between customer and admin workflows.",
    impact: "ABC Cinema delivered a complete second-year web project that digitized the movie reservation journey and centralized cinema administration. The system gave customers a clearer booking experience while providing administrators with structured control over movies, users, tickets, bookings, and feedback.",
    tags: ["Web", "Java", "Servlets", "JSP", "HTML", "CSS", "JavaScript", "MariaDB", "MySQL"],
    status: "concept",
    githubUrl: githubProfile,
    summaryLabel: "ABC Cinema project case study",
    screenshots: shot("ABC Cinema Movie Ticket Booking System", "Main image placeholder — the updated ABC Cinema application visual will be added shortly."),
    identity: [
      { label: "Project Type", value: "Second-year university web project" },
      { label: "My Role", value: "UI designer and frontend developer" },
      { label: "Platforms", value: "Customer web application and admin dashboard" },
      { label: "Backend", value: "Java Servlets and JSP" },
      { label: "Database", value: "MariaDB / MySQL" },
    ],
    technologyStack: [
      { layer: "Backend", technology: "Java Servlets", purpose: "Request handling, authentication, booking logic, and administrative operations" },
      { layer: "Server Views", technology: "JSP", purpose: "Dynamic customer and administrator page rendering" },
      { layer: "Frontend", technology: "HTML, CSS, and JavaScript", purpose: "Responsive interfaces, interactions, forms, and booking experiences" },
      { layer: "Database", technology: "MariaDB / MySQL", purpose: "Persistent users, movies, showtimes, bookings, tickets, and review records" },
      { layer: "Configuration", technology: "dbconfig.properties", purpose: "Database and email-related application configuration" },
      { layer: "Development", technology: "IntelliJ IDEA", purpose: "Java web application development and project management" },
    ],
    featureGroups: [
      {
        title: "My Role & Contributions",
        items: [
          "Owned the complete UI design and frontend development from initial concept through delivery.",
          "Designed responsive customer and administrator experiences using HTML, CSS, JavaScript, and JSP views.",
          "Created movie browsing, authentication, showtime selection, booking, profile, and booking-history interfaces.",
          "Designed the admin dashboard for movie, user, ticket, booking, and review management workflows.",
          "Integrated frontend forms and interactions with Java Servlet request handlers and database-backed operations.",
          "Supported authentication and authorization experiences across customer and administrator access.",
          "Helped test the complete application and prepare it for project delivery.",
        ],
      },
      {
        title: "User Platform",
        items: [
          "Authentication: Register and sign in through secure customer account workflows.",
          "Movie Browsing: Explore available movie listings with relevant details.",
          "Showtime Selection: Review available sessions before creating a reservation.",
          "Ticket Booking: Select a showtime and complete the movie ticket reservation flow.",
          "Profile Management: Review account information and previously created bookings.",
        ],
      },
      {
        title: "Admin Dashboard",
        items: [
          "Movie Management: Add, update, and remove cinema movie listings.",
          "User Management: Review and manage registered customer accounts.",
          "Ticket & Booking Management: Monitor reservations and booking records.",
          "Reviews Management: Oversee customer reviews and platform feedback.",
          "Dedicated Admin Access: Keep operational tools separate from customer booking workflows.",
        ],
      },
    ],
    detailSections: [
      {
        title: "Customer Booking Journey",
        items: [
          "Customers begin by registering or signing into an existing account.",
          "The movie catalogue presents available cinema titles and supporting information.",
          "Movie detail and showtime interfaces guide users toward an available session.",
          "The booking flow captures the selected movie, showtime, and required reservation information.",
          "Profile pages give customers continued visibility into their booking records.",
        ],
      },
      {
        title: "Java Web Architecture",
        items: [
          "Java Servlets process incoming customer and administrator requests.",
          "JSP pages render dynamic server-backed interfaces for each workflow.",
          "HTML and CSS define the responsive visual system while JavaScript adds client-side interaction.",
          "Application layers separate customer functionality from administrative management features.",
          "Database-backed operations persist account, movie, showtime, reservation, and review information.",
        ],
      },
      {
        title: "Database & Configuration",
        items: [
          "MariaDB / MySQL provides persistent relational storage for the cinema platform.",
          "Database queries support movie listings, user accounts, bookings, tickets, and management records.",
          "The dbconfig.properties file centralizes database and email configuration values.",
          "Structured data access keeps customer reservations connected to the correct user, movie, and showtime.",
          "The project source separates primary application code, static assets, and environment-specific configuration.",
        ],
      },
      {
        title: "Frontend & UX Delivery",
        items: [
          "The complete interface was designed to make movie discovery and booking understandable for regular users.",
          "Responsive layouts support the customer and admin experiences across different screen sizes.",
          "Consistent navigation, forms, controls, and feedback states connect the full reservation journey.",
          "Administrator screens prioritize efficient access to movies, users, tickets, bookings, and reviews.",
          "Frontend behavior was integrated with Servlet endpoints and JSP-rendered application state.",
        ],
      },
      {
        title: "Project Structure",
        items: [
          "src/main contains the primary source code for both user and administrator functionality.",
          "static/assets/images stores the visual assets used throughout the cinema interface.",
          "dbconfig.properties stores database and email-related configuration.",
          "The project was developed and organized through IntelliJ IDEA.",
        ],
      },
      {
        title: "Delivery Outcome",
        items: [
          "Completed as a functional second-year university web application.",
          "Provides distinct customer booking and administrator management experiences.",
          "Demonstrates Java Servlet and JSP integration with a relational database and responsive frontend.",
          "Covers the core cinema workflow from movie discovery through booking administration and review oversight.",
        ],
      },
    ],
  },
  {
    slug: "Screeenc USB Only Screen Sharing",
    title: "Screeenc USB-Only Screen Sharing",
    category: "Mobile & Native Systems Project",
    description: "A USB-only screen sharing solution that streams a Windows desktop to Android with low latency and no Wi-Fi, internet, or browser technologies.",
    overview: "Screeenc is a screen sharing system designed to stream a live Windows desktop screen to an Android device using only a USB cable. The project avoids Wi-Fi, internet-based transport, and browser technologies, instead relying on officially supported APIs and USB tunneling through ADB port forwarding. The Android receiver is fully implemented with hardware-accelerated H.264 decoding, foreground service support, USB connection detection, and a Flutter-based status interface, while the Windows sender is planned to handle screen capture and encoding through native Windows APIs.",
    challenge: "Delivering responsive screen mirroring over a USB-only connection requires a complete native media pipeline: desktop capture, low-latency H.264 encoding, framed TCP transport, ADB tunneling, hardware decoding, Android background behavior, and reliable rendering. The system also needed to stay entirely in user mode and avoid unsupported hooks, DRM bypasses, kernel drivers, or internet-based transport.",
    impact: "The implemented Android receiver proves the core USB transport and native decoding architecture while providing a clean Flutter status experience. The design establishes a compliant path toward a complete Windows-to-Android screen sharing system using supported platform APIs and hardware acceleration.",
    tags: ["Mobile", "Flutter", "Kotlin", "MediaCodec", "H.264", "TCP Sockets", "ADB", "DXGI"],
    status: "concept",
    githubUrl: githubProfile,
    summaryLabel: "Screeenc systems project case study",
    screenshots: shot("Screeenc USB-Only Screen Sharing", "Main image placeholder — the final Screeenc receiver and streaming visual will be added shortly."),
    identity: [
      { label: "Project Type", value: "Solo native systems and mobile project" },
      { label: "My Role", value: "System architect and Android receiver developer" },
      { label: "Current Status", value: "Android receiver implemented; native Windows sender planned" },
      { label: "Connection", value: "USB cable through ADB port forwarding" },
      { label: "Network Requirement", value: "No Wi-Fi or internet connection required" },
    ],
    technologyStack: [
      { layer: "Mobile UI", technology: "Flutter and Material 3", purpose: "Connection status, receiver controls, and clean Android user experience" },
      { layer: "Native Android", technology: "Kotlin", purpose: "Platform channels, foreground service, USB state, and native media integration" },
      { layer: "Decoder", technology: "Android MediaCodec", purpose: "Hardware-accelerated H.264/AVC video decoding" },
      { layer: "Rendering", technology: "SurfaceView", purpose: "Efficient display of decoded video frames on Android" },
      { layer: "Transport", technology: "TCP sockets", purpose: "Stream encoded video data through a reliable local byte connection" },
      { layer: "USB Tunnel", technology: "ADB port forwarding", purpose: "Forward localhost TCP traffic between Windows and Android through USB" },
      { layer: "Windows Capture", technology: "DXGI Desktop Duplication", purpose: "Planned native desktop frame capture through supported Windows APIs" },
      { layer: "Windows Encoding", technology: "Windows Media Foundation", purpose: "Planned hardware-assisted H.264 encoding on the sender" },
      { layer: "Sender Languages", technology: "C++ or C#", purpose: "Planned native Windows capture, encoding, and transport implementation" },
    ],
    featureGroups: [
      {
        title: "My Role & Implementation",
        items: [
          "Designed the full end-to-end architecture for streaming Windows screen content to Android over USB.",
          "Built the Android receiver application using Flutter and Kotlin with platform channel integration.",
          "Implemented TCP-based H.264 video receiving and hardware-accelerated decoding with MediaCodec.",
          "Added foreground service behavior, persistent notification handling, and automatic USB connection-state detection.",
          "Structured the project around officially supported APIs and user-mode-only techniques without security bypasses.",
          "Prepared the architecture for native Windows sender development using DXGI Desktop Duplication and Media Foundation.",
        ],
      },
      {
        title: "Android Receiver",
        items: [
          "Hardware H.264 Decoding: Use MediaCodec for efficient hardware-accelerated video processing.",
          "USB Tunnel Streaming: Receive TCP video data forwarded through ADB over a physical USB cable.",
          "Foreground Service: Keep the receiver active through notification-based Android background behavior.",
          "USB Detection: Reflect connection availability automatically as the attached USB state changes.",
          "Flutter Status UI: Display live receiver and connection state through a focused mobile interface.",
          "Native Rendering: Present decoded frames through SurfaceView for efficient playback.",
        ],
      },
    ],
    detailSections: [
      {
        title: "End-to-End System Architecture",
        items: [
          "The planned Windows sender captures desktop frames through the DXGI Desktop Duplication API.",
          "Windows Media Foundation encodes captured frames as a low-latency H.264/AVC stream.",
          "The sender publishes encoded data through a TCP socket bound to localhost.",
          "ADB port forwarding tunnels the localhost connection through the USB cable to Android.",
          "The Kotlin receiver reads the H.264 stream, supplies encoded data to MediaCodec, and renders decoded output through SurfaceView.",
          "Flutter communicates with the native Android layer through platform channels and presents receiver status to the user.",
        ],
      },
      {
        title: "Native Android Media Pipeline",
        items: [
          "Kotlin owns the performance-sensitive socket, decoding, service, and rendering workflows.",
          "MediaCodec uses device hardware where available to reduce CPU usage and decoding latency.",
          "SurfaceView gives the decoder a native rendering surface instead of routing video frames through Flutter widgets.",
          "Foreground service behavior helps Android keep the receiver active during an ongoing screen sharing session.",
          "Notification state makes the background receiver visible and controllable under Android platform requirements.",
        ],
      },
      {
        title: "USB Transport Design",
        items: [
          "The platform uses a direct USB cable rather than Wi-Fi discovery or internet relay services.",
          "ADB port forwarding maps host and device TCP ports without requiring a custom USB kernel driver.",
          "TCP provides ordered, reliable delivery for the encoded H.264 byte stream.",
          "Local-only transport reduces infrastructure requirements and keeps screen data away from external networks.",
          "Connection-state detection informs the mobile interface when the expected USB pathway becomes available or unavailable.",
        ],
      },
      {
        title: "Planned Windows Sender",
        items: [
          "C++ or C# will provide native access to Windows screen capture, media encoding, and socket APIs.",
          "DXGI Desktop Duplication is planned for officially supported high-performance desktop capture.",
          "Windows Media Foundation is planned for H.264 encoding with hardware acceleration where supported.",
          "The sender will frame encoded output for TCP delivery and maintain the local connection forwarded by ADB.",
          "The sender remains a native desktop component rather than a web or browser-based screen capture tool.",
        ],
      },
      {
        title: "Security & Compliance",
        items: [
          "Uses officially supported Microsoft and Android APIs only.",
          "Runs entirely in user mode without kernel drivers, system hooks, or privileged capture modifications.",
          "Does not bypass DRM or attempt to capture protected secure surfaces.",
          "Keeps transport USB-only with no dependency on Wi-Fi, internet services, or web communication.",
          "ADB forwarding is used as a supported developer transport mechanism rather than a security bypass.",
        ],
      },
      {
        title: "Current Delivery Status",
        items: [
          "The Android receiver, native decoding pipeline, foreground service behavior, USB state handling, and Flutter status interface are implemented.",
          "The project architecture and transport strategy are defined end to end.",
          "The Windows capture and encoding sender remains the next planned implementation phase.",
          "The current receiver work validates the core mobile and USB-tunnel direction before sender completion.",
        ],
      },
    ],
  },
  {
    slug: "Gym Management System",
    title: "AstroLift Gym Management Platform",
    category: "Collaborative Full-Stack Web Platform",
    description: "A production-ready gym management platform centralizing memberships, workout programs, payments, attendance, and real-time operations for admins, trainers, and members.",
    overview: "AstroLift is a production-ready gym management platform built to centralize everyday gym operations in one system. It provides structured access for admins, trainers, and members while supporting workout tracking, membership management, payment workflows, attendance logging, and real-time updates. The application is fully Dockerized, making setup and team collaboration smoother across development environments.",
    challenge: "Gym operations often become fragmented across member records, workout plans, attendance sheets, and payment tracking tools. AstroLift needed to unify these workflows while preserving focused permissions for admins, trainers, and members, maintaining dependable frontend-backend data flow, and providing a repeatable development environment for the project team.",
    impact: "The delivered platform gives gym teams one structured system for daily operations, improves visibility into membership and workout activity, supports more efficient attendance and billing workflows, and provides a scalable Docker-based foundation for continued full-stack development.",
    tags: ["Web", "Next.js", "Node.js", "Express", "Docker", "Docker Compose", "Jest", "Team Project"],
    status: "live",
    githubUrl: githubProfile,
    summaryLabel: "AstroLift gym management case study",
    screenshots: shot("AstroLift Gym Management Platform", "Main image placeholder — the updated AstroLift platform visual will be added shortly."),
    identity: [
      { label: "Project Type", value: "Collaborative production-ready full-stack web platform" },
      { label: "My Role", value: "Major full-stack contributor across product workflows and implementation" },
      { label: "User Roles", value: "Admin, trainer, and member" },
      { label: "Delivery", value: "Dockerized frontend and backend with team-friendly development workflows" },
      { label: "Core Scope", value: "Memberships, workouts, payments, attendance, and real-time operations" },
    ],
    technologyStack: [
      { layer: "Frontend", technology: "Next.js", purpose: "Responsive admin, trainer, and member interfaces" },
      { layer: "Backend", technology: "Node.js and Express", purpose: "Gym business logic, API endpoints, and operational data workflows" },
      { layer: "Containerization", technology: "Docker", purpose: "Consistent frontend and backend environments across development machines" },
      { layer: "Orchestration", technology: "Docker Compose", purpose: "Coordinate application services through development and production setups" },
      { layer: "Testing", technology: "Jest", purpose: "Automated validation for application behavior and core implementation" },
      { layer: "Code Quality", technology: "ESLint and Prettier", purpose: "Consistent code standards, formatting, and maintainability" },
      { layer: "Git Workflow", technology: "Husky", purpose: "Commit-time quality checks and shared team safeguards" },
      { layer: "Configuration", technology: "Environment variables", purpose: "Manage backend configuration without hardcoding environment-specific values" },
    ],
    featureGroups: [
      {
        title: "Team Contribution & My Role",
        items: [
          "Made a major hands-on contribution to the collaborative project across both product behavior and implementation.",
          "Contributed heavily to full-stack implementation across frontend and backend features.",
          "Helped build role-based experiences for admin, trainer, and member workflows.",
          "Worked on core modules including memberships, workout tracking, attendance, and payment-related flows.",
          "Supported API integration and dependable data flow between the Next.js frontend and Express backend.",
          "Contributed to improving the project structure and Docker-based development setup.",
          "Collaborated on testing, code quality, and workflow consistency using shared tooling and team practices.",
          "Helped refine the user experience so daily gym operations could be completed more efficiently.",
        ],
      },
      {
        title: "User Roles & Platform Access",
        items: [
          "Admin Panel: Manage memberships, payments, attendance records, and overall gym operations.",
          "Trainer Workspace: Create workout programs, track member progress, and monitor assigned activities.",
          "Member Portal: View workouts, follow assigned programs, and stay updated with gym activity.",
          "Role-Based Access: Keep platform actions focused and secure by exposing workflows relevant to each user type.",
        ],
      },
      {
        title: "Core Gym Operations",
        items: [
          "Membership Management: Organize member records and subscription-related workflows.",
          "Workout Tracking: Create assigned workout plans and provide progress visibility.",
          "Payments & Billing: Support billing-related processes and payment tracking.",
          "Attendance Logging: Record attendance and surface real-time operational updates.",
          "Operational Visibility: Bring common gym activities into one connected platform instead of separate manual tools.",
        ],
      },
    ],
    detailSections: [
      {
        title: "Admin Experience",
        items: [
          "Centralize high-level gym operations within a dedicated administrative workspace.",
          "Review and maintain membership information and subscription-related records.",
          "Track attendance activity and support day-to-day operational oversight.",
          "Manage payment-related workflows and maintain clearer billing visibility.",
          "Coordinate platform activity across trainers and members through role-aware access.",
        ],
      },
      {
        title: "Trainer & Member Workflows",
        items: [
          "Trainers create structured workout programs and assign relevant activities to members.",
          "Progress tracking helps trainers monitor how members move through assigned plans.",
          "Members access their workout information through a focused personal portal.",
          "Assigned programs provide members with a clearer path through their gym activity.",
          "Shared updates keep trainers and members aligned without exposing unrelated administrative controls.",
        ],
      },
      {
        title: "Frontend & Backend Integration",
        items: [
          "Next.js delivers responsive role-based experiences across administration, training, and member workflows.",
          "Node.js and Express provide the backend API layer and gym-specific business logic.",
          "Frontend modules consume backend endpoints for memberships, workouts, attendance, and payment-related data.",
          "Integration work focuses on consistent request handling, operational state, and reliable data presentation.",
          "Collaborative development keeps frontend behavior aligned with backend contracts and shared feature requirements.",
        ],
      },
      {
        title: "Dockerized Architecture",
        items: [
          "Frontend and backend services run together through Docker Compose.",
          "Containerization reduces machine-specific setup differences across the project team.",
          "Backend configuration is supplied through environment variables instead of hardcoded values.",
          "A separate development Compose setup supports hot reloading during active implementation.",
          "Production-oriented configuration prepares the full-stack application for more dependable delivery.",
        ],
      },
      {
        title: "Testing & Code Quality",
        items: [
          "Jest supports automated testing for application behavior and implementation confidence.",
          "ESLint identifies code-quality issues and encourages consistent engineering standards.",
          "Prettier maintains shared formatting across collaborative contributions.",
          "Husky adds commit-time safeguards to the team's Git workflow.",
          "Shared tooling improves consistency as frontend, backend, and infrastructure changes evolve together.",
        ],
      },
      {
        title: "Delivery Outcome",
        items: [
          "Delivered as a production-ready full-stack gym management application.",
          "Consolidates memberships, workouts, payments, and attendance into one structured system.",
          "Supports distinct operational experiences for admins, trainers, and members.",
          "Docker and Docker Compose provide a repeatable, team-friendly setup across environments.",
          "The architecture creates a scalable foundation for expanding gym operations and future features.",
        ],
      },
    ],
  },
];

export const allProjects = featuredProjects;

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => createProjectRouteSlug(project.slug) === slug);
}
