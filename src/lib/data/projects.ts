export interface ProjectScreenshot {
  title: string;
  caption: string;
  tone: string;
  imageSrc?: string;
}

export interface ProjectInfoItem {
  label: string;
  value: string;
}

export interface ProjectTechItem {
  layer: string;
  technology: string;
  purpose: string;
}

export interface ProjectFeatureGroup {
  title: string;
  items: string[];
}

export interface ProjectDetailSection {
  title: string;
  items: string[];
}

export interface ProjectEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  challenge: string;
  impact: string;
  tags: string[];
  status: "live" | "concept";
  githubUrl: string;
  liveUrl?: string;
  screenshots: ProjectScreenshot[];
  summaryLabel?: string;
  identity?: ProjectInfoItem[];
  technologyStack?: ProjectTechItem[];
  featureGroups?: ProjectFeatureGroup[];
  detailSections?: ProjectDetailSection[];
}

export function createProjectRouteSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const githubProfileUrl = "https://github.com/ghsenu";

export const featuredProjects: ProjectEntry[] = [
  {
    slug: "Mind Print",
    title: "Mind Print",
    category: "Featured Platform",
    description:
      "An AI-powered mental health awareness application built for Sri Lankan undergraduate students with journaling, forecasting, and privacy-secured self-care support.",
    overview:
      "MindPrint is a Flutter-based Android application that combines text journaling, voice journaling, multimodal emotion analysis, and predictive mood forecasting into a guided self-awareness experience for university students.",
    challenge:
      "The main challenge was designing a sensitive mental-health workflow that could feel safe, private, and lightweight while still handling AI analysis, offline support, biometric access, and emotionally meaningful interventions.",
    impact:
      "The resulting product direction supports earlier emotional awareness, structured journaling habits, and therapist-ready reporting while keeping the architecture practical through hosted AI APIs and Firebase-backed mobile delivery.",
    tags: ["Flutter", "Firebase", "Riverpod", "HuggingFace API", "AssemblyAI", "Mobile App"],
    status: "concept",
    githubUrl: "https://github.com/ghsenu/Mind-Print",
    summaryLabel: "MindPrint platform brief",
    identity: [
      { label: "Tagline", value: "Understand your emotions one moment at a time" },
      { label: "Platform", value: "Android application built with Flutter" },
      { label: "Target Users", value: "Sri Lankan undergraduate students" },
      { label: "MVP Version", value: "1.0.0" },
      { label: "Language Scope", value: "English first, with Sinhala and Tamil UI planned next" },
    ],
    technologyStack: [
      { layer: "Frontend", technology: "Flutter (Dart)", purpose: "Cross-platform Android interface and application flow" },
      { layer: "State", technology: "Riverpod", purpose: "Reactive state management across journaling, analytics, and settings" },
      { layer: "Auth", technology: "Firebase Auth", purpose: "Email, Google, and biometric-assisted sign-in" },
      { layer: "Database", technology: "Cloud Firestore", purpose: "User profiles, journals, emotional history, and app data" },
      { layer: "Storage", technology: "Firebase Storage", purpose: "Voice recordings and exported report assets" },
      { layer: "Notifications", technology: "Firebase Cloud Messaging", purpose: "Affirmations, reminders, and predictive alerts" },
      { layer: "Text AI", technology: "HuggingFace Inference API", purpose: "Emotion and sentiment analysis for written journals" },
      { layer: "Voice AI", technology: "AssemblyAI API", purpose: "Speech-to-text transcription and audio emotion support" },
      { layer: "Biometrics", technology: "local_auth", purpose: "Face ID and fingerprint-based login protection" },
      { layer: "Reports", technology: "pdf package", purpose: "Therapist-ready PDF export generation" },
      { layer: "Offline", technology: "Firestore Offline Persistence", purpose: "Cache-first journaling with sync after reconnection" },
    ],
    featureGroups: [
      {
        title: "Onboarding and Access",
        items: [
          "Three-slide onboarding flow covering privacy, features, and security",
          "Email registration, Google Sign-In, and Firebase password reset",
          "Baseline onboarding questionnaire for initial mood context",
          "Biometric authentication through Face ID or fingerprint",
          "Language toggle prepared for English, Sinhala, and Tamil UI",
        ],
      },
      {
        title: "Journaling and Reflection",
        items: [
          "Free-text journaling with mood selection",
          "Voice journaling with waveform visualization",
          "Text emotion and sentiment analysis through HuggingFace",
          "Voice transcription and emotional interpretation through AssemblyAI",
          "Emotion result screen with primary emotion, intensity, secondary emotions, and AI insight",
          "CBT reframing suggestions when distortion patterns are detected",
          "Journal history with search, monthly grouping, detail view, and hashtag-based reflection",
        ],
      },
      {
        title: "Analytics and Prediction",
        items: [
          "Emotional Fingerprint view for longer-term pattern recognition",
          "Daily, weekly, and monthly mood timeline charts",
          "Next 48-hour mood prediction based on recent emotional trends",
          "Predictive alert banners and push notifications when mood dips are detected",
          "Cognitive and reflective pattern summaries derived from journal history",
        ],
      },
      {
        title: "Coping Toolkit and Reports",
        items: [
          "Breathing exercises including 4-7-8 and box breathing",
          "Meditation, grounding, focus exercises, and emotion-matched ambient audio",
          "CBT exercises for thought records and reframing",
          "PDF or CSV export with date range selection and preview before download",
          "Settings for biometrics, notifications, offline sync, privacy, and help resources",
        ],
      },
    ],
    detailSections: [
      {
        title: "Bottom Navigation",
        items: [
          "Journal: journal entry flow and history review",
          "Analytics: emotional fingerprint, prediction, and patterns",
          "Coping: exercises, music, and CBT support tools",
          "Reports: report generation, preview, PDF, and CSV export",
          "Settings: language, security, notifications, sync, help, and account controls",
        ],
      },
      {
        title: "AI Integration Strategy",
        items: [
          "Hosted inference was chosen over self-deployed models to reduce infrastructure complexity and avoid Cloud Function cold-start overhead.",
          "HuggingFace handles text emotion analysis and reflection generation through REST-based inference endpoints.",
          "AssemblyAI supports both speech-to-text conversion and voice-oriented emotion interpretation workflows.",
          "Mood forecasting uses rule-based trend analysis across the previous seven days to project the next 48 hours.",
          "Cognitive distortion detection combines NLP classification with keyword-pattern checks to trigger reframing suggestions.",
        ],
      },
      {
        title: "Security and Privacy",
        items: [
          "Biometric authentication is layered on top of Firebase Auth session handling.",
          "Locally cached data is protected with AES-256 encryption.",
          "All API communication is HTTPS-only with TLS 1.2 or higher.",
          "Firestore and Firebase Storage access are scoped to the authenticated user.",
          "No third-party analytics SDKs are allowed to access journal content.",
        ],
      },
      {
        title: "MVP Boundaries",
        items: [
          "Wearable biometric integrations are intentionally out of scope for the first release.",
          "Community and social-networking features are excluded from the MVP.",
          "The project relies on pre-trained hosted APIs rather than custom ML model training.",
          "Full Sinhala and Tamil content translation is deferred beyond the initial UI toggle preparation.",
        ],
      },
    ],
    screenshots: [
      {
        title: "MindPrint Mobile Experience",
        caption: "A polished mobile UI concept showing mood onboarding, emotional check-ins, and calendar-based insight views in one mental-health-focused product flow.",
        tone: "from-orange-500/30 via-orange-400/10 to-transparent",
        imageSrc: "/projects/mindprint/healthcare-telemedicine-mobile-app.jpg",
      },
    ],
  },
  {
    slug: "Astrolift",
    title: "Astrolift - Gym Management System",
    category: "Featured Platform",
    description:
      "A full-stack gym management platform that combines memberships, workouts, payments, and attendance into one structured web application.",
    overview:
      "AstroLift is a role-based gym management and workout tracking web app built to support admins, trainers, and members with real-time operational visibility across the platform.",
    challenge:
      "Gym owners and trainers often juggle fragmented tools for memberships, attendance, payments, and workout planning, which creates admin overhead and inconsistent day-to-day tracking.",
    impact:
      "The result is a production-ready, Dockerized full-stack web app that centralizes core gym workflows, reduces admin time, and scales cleanly through structured role-based access.",
    tags: ["Next.js", "Node.js", "Express", "Docker", "Mocha", "Chai", "Web App"],
    status: "live",
    githubUrl: githubProfileUrl,
    summaryLabel: "AstroLift platform brief",
    identity: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Full-Stack Developer" },
      { label: "Type", value: "Web" },
      { label: "Origin", value: "University" },
      { label: "Delivery", value: "Complete full-stack gym management platform" },
    ],
    technologyStack: [
      { layer: "Frontend", technology: "Next.js", purpose: "Role-based web interface for admin, trainer, and member workflows" },
      { layer: "Backend", technology: "Node.js", purpose: "Server-side runtime for gym operations, updates, and business logic" },
      { layer: "API", technology: "Express", purpose: "Structured API layer for memberships, workouts, payments, and attendance" },
      { layer: "Infrastructure", technology: "Docker", purpose: "Consistent full-stack deployment and local environment packaging" },
      { layer: "Code Quality", technology: "ESLint and Husky", purpose: "Linting and commit-time safeguards for a cleaner delivery process" },
      { layer: "Testing", technology: "Mocha and Chai", purpose: "Backend validation and workflow confidence during development" },
    ],
    featureGroups: [
      {
        title: "Core Management",
        items: [
          "Role-based access for admin, trainer, and member users",
          "Membership management for handling user status and gym participation",
          "Centralized workflow structure across core gym operations",
        ],
      },
      {
        title: "Training and Engagement",
        items: [
          "Workout program creation for trainers and structured tracking for members",
          "Workout progress visibility across active training plans",
          "A unified web-based experience instead of disconnected tools",
        ],
      },
      {
        title: "Operations and Billing",
        items: [
          "Payment and billing workflow support",
          "Attendance tracking with real-time data updates",
          "Cleaner operational visibility for gym admins and staff",
        ],
      },
      {
        title: "Engineering Delivery",
        items: [
          "Full-stack architecture spanning frontend and backend responsibilities",
          "Dockerized setup for reliable development and deployment workflows",
          "Testing and code-quality tooling through Mocha, Chai, ESLint, and Husky",
        ],
      },
    ],
    detailSections: [
      {
        title: "The Problem",
        items: [
          "Gym owners and trainers need one place to manage memberships, workouts, payments, and attendance.",
          "Many available tools are fragmented, forcing teams to split work across multiple systems.",
          "Subscription-heavy platforms can also be too expensive for smaller operations or academic builds.",
        ],
      },
      {
        title: "The Solution",
        items: [
          "AstroLift brings key gym operations into a single role-based web platform.",
          "Admins, trainers, and members each get workflow-relevant access and responsibilities.",
          "Real-time updates, workout planning, attendance logging, and payment tracking work together in one system.",
        ],
      },
      {
        title: "The Outcome",
        items: [
          "Delivered as a production-ready full-stack application with Dockerized deployment support.",
          "Reduced operational friction by consolidating common gym workflows into one interface.",
          "Created a scalable foundation that saves admin time while supporting structured growth.",
        ],
      },
      {
        title: "Key Features",
        items: [
          "User roles: admin, trainer, and member",
          "Membership management",
          "Workout program creation and tracking",
          "Payments and billing workflow",
          "Attendance tracking with real-time data",
          "Dockerized full-stack architecture",
        ],
      },
    ],
    screenshots: [
      {
        title: "Member Registration Flow",
        caption: "A clean onboarding screen for new members to create accounts and enter the gym platform smoothly.",
        tone: "from-orange-500/30 via-yellow-500/10 to-transparent",
        imageSrc: "/projects/astrolift/login.png",
      },
      {
        title: "Member Dashboard",
        caption: "The member-facing dashboard brings together attendance, assigned trainers, active plans, and workout history in one place.",
        tone: "from-orange-400/25 via-orange-300/10 to-transparent",
        imageSrc: "/projects/astrolift/dashboard.png",
      },
      {
        title: "Trainer Operations View",
        caption: "A trainer-focused overview for handling member requests, plan oversight, live activity, and daily operations.",
        tone: "from-amber-400/25 via-orange-500/10 to-transparent",
        imageSrc: "/projects/astrolift/main.png",
      },
    ],
  },
  {
    slug: "Movie Ticket Booking System",
    title: "ABC Cinema - Ticket Booking System",
    category: "Featured Platform",
    description:
      "A web-based cinema ticket booking application designed to simplify reservations and deliver a smoother moviegoing experience.",
    overview:
      "ABC Cinema is a university-built booking platform that helps users browse cinema options, reserve tickets online, and move through the booking flow with a clearer and more user-friendly interface.",
    challenge:
      "Cinema ticket booking can feel fragmented when users have to navigate unclear seat selection, disconnected reservation steps, or slow communication around confirmations and updates.",
    impact:
      "The result is a cleaner web-based reservation experience backed by a Java servlet stack, responsive UI work, and database-driven booking flows that are easier for users and maintainers to navigate.",
    tags: ["Java Servlets", "JSP", "Tailwind CSS", "MariaDB", "MySQL", "Web App"],
    status: "concept",
    githubUrl: githubProfileUrl,
    summaryLabel: "ABC Cinema platform brief",
    identity: [
      { label: "Project Name", value: "ABC Cinema" },
      { label: "Type", value: "Web-based cinema ticket booking application" },
      { label: "Origin", value: "University" },
      { label: "Delivery", value: "Team project with booking, UI, and database integration work" },
      { label: "Environment", value: "Developed in IntelliJ IDEA" },
    ],
    technologyStack: [
      { layer: "Backend", technology: "Java Servlets and JSP", purpose: "Server-side booking logic, page rendering, and reservation flow handling" },
      { layer: "Frontend", technology: "Tailwind CSS", purpose: "Responsive, modern interface styling for the ticket booking journey" },
      { layer: "Database", technology: "MariaDB / MySQL", purpose: "Persistent storage for cinema, booking, and user-related data" },
      { layer: "Tooling", technology: "IntelliJ IDEA", purpose: "Primary development environment for implementation and project management" },
    ],
    featureGroups: [
      {
        title: "Booking Experience",
        items: [
          "Web-based ticket booking flow built to simplify reservations",
          "User-focused journey aimed at reducing friction across the booking process",
          "Responsive interface styling for a clearer cinema browsing experience",
        ],
      },
      {
        title: "Platform Foundation",
        items: [
          "Java servlet and JSP architecture for backend-driven application behavior",
          "Database-backed reservation workflows through MariaDB or MySQL",
          "Structured web application setup suitable for academic full-stack delivery",
        ],
      },
      {
        title: "Project Collaboration",
        items: [
          "University team-based build with shared ownership across implementation areas",
          "Figma prototype support for design direction",
          "Notion board usage for task tracking and coordination",
        ],
      },
    ],
    detailSections: [
      {
        title: "The Problem",
        items: [
          "Cinema booking should be quick and clear, but many flows become confusing when reservation steps are scattered or difficult to follow.",
          "Users benefit from a more streamlined process that helps them move from browsing to booking with less friction.",
        ],
      },
      {
        title: "The Solution",
        items: [
          "ABC Cinema packages the ticket-booking experience into a web-based application with backend-rendered flows and database support.",
          "The system focuses on a smoother user journey while keeping the implementation grounded in familiar academic full-stack technologies.",
        ],
      },
      {
        title: "Configuration Note",
        items: [
          "Email functionality depends on SMTP values configured in dbconfig.properties under src/main/resources.",
          "SMTP credentials should be requested from dizzpy before local setup.",
          "Those email credentials must stay out of the repository and should never be committed.",
        ],
      },
      {
        title: "Project Links and Team",
        items: [
          "A Figma prototype was used for interface planning and design review.",
          "A Notion board supported task tracking and team coordination.",
          "The project was built by a team, so member names can be filled in when you want to publish them.",
        ],
      },
    ],
    screenshots: [
      {
        title: "ABC Cinema Booking Experience",
        caption: "The live booking interface combines movie discovery, showtime selection, and seat-focused reservation flow in one polished cinema experience.",
        tone: "from-orange-500/30 via-red-500/10 to-transparent",
        imageSrc: "/projects/movie/abc.png",
      },
    ],
  },
  {
    slug: "Windy - Weather Forecasting",
    title: "WeatherGlass - Weather Application",
    category: "Featured Platform",
    description:
      "An interactive weather forecasting web application with city search, live geolocation, current conditions, and multi-day forecast views.",
    overview:
      "WeatherGlass is a polished Next.js weather application that lets users search by city, resolve their current location, view live weather details, and explore forecast data through animated, immersive UI patterns.",
    challenge:
      "Weather apps often feel flat or overly utilitarian, so the challenge was combining dependable forecast data with a richer user experience while still handling location access, loading states, saved cities, and forecast navigation cleanly.",
    impact:
      "The result is a more engaging forecasting experience that blends practical weather data with custom motion, charting, and atmospheric UI components, while keeping the data flow structured through internal API routes.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Recharts", "Three.js", "OpenWeather API"],
    status: "live",
    githubUrl: "https://github.com/ghsenu/Weather-Application",
    liveUrl: "https://weathersystem43.netlify.app/",
    summaryLabel: "WeatherGlass platform brief",
    identity: [
      { label: "Project Name", value: "WeatherGlass" },
      { label: "Type", value: "Interactive weather forecasting web application" },
      { label: "Platform", value: "Web" },
      { label: "Focus", value: "Forecast data, immersive UI, and location-aware weather lookup" },
      { label: "Data Source", value: "OpenWeather-backed weather and forecast endpoints" },
    ],
    technologyStack: [
      { layer: "Frontend", technology: "Next.js 14", purpose: "App Router-based weather experience with route-level forecast views" },
      { layer: "Language", technology: "TypeScript", purpose: "Typed weather models, hooks, and component logic" },
      { layer: "Motion", technology: "Framer Motion", purpose: "Animated transitions and interactive visual polish across the app" },
      { layer: "Visualization", technology: "Recharts", purpose: "Hourly forecast chart rendering and clearer forecast reading" },
      { layer: "3D / Atmosphere", technology: "Three.js and react-globe.gl", purpose: "Enhanced weather visuals and more immersive presentation" },
      { layer: "Tooling", technology: "Husky and lint-staged", purpose: "Commit-time checks and cleaner development workflow" },
    ],
    featureGroups: [
      {
        title: "Weather Discovery",
        items: [
          "City search from the landing page",
          "Featured city shortcuts for faster browsing",
          "Current-location weather lookup through browser geolocation",
        ],
      },
      {
        title: "Forecast Experience",
        items: [
          "Current weather dashboard for selected cities",
          "Dedicated 5-day forecast view",
          "Hourly forecast chart data for near-term conditions",
          "Loading and error states for failed or missing weather results",
        ],
      },
      {
        title: "Personalization",
        items: [
          "Save and unsave cities using localStorage",
          "Quick return to previously selected locations",
          "Client-side city persistence without requiring authentication",
        ],
      },
      {
        title: "Architecture and Delivery",
        items: [
          "Internal Next.js API routes for weather and forecast requests",
          "OpenWeather integration through environment-based API access",
          "Custom hooks for weather, forecast, saved-city, and geolocation flows",
          "Dedicated weather UI components for hero, details, forecast cards, particles, and background effects",
        ],
      },
    ],
    detailSections: [
      {
        title: "What Was Built",
        items: [
          "A home page with search, featured cities, and location-based weather lookup.",
          "A city dashboard for current conditions and weather detail presentation.",
          "A separate forecast route with daily and hourly weather views.",
          "A saved-cities flow that lets users bookmark locations locally.",
        ],
      },
      {
        title: "Data Flow",
        items: [
          "Client-side hooks request internal API endpoints instead of calling the weather provider directly from the UI.",
          "The weather route supports both city-based and coordinate-based lookup.",
          "The forecast route aggregates forecast entries into hourly data and five daily summaries.",
          "OpenWeather API access is protected through an environment variable on the server side.",
        ],
      },
      {
        title: "User Experience",
        items: [
          "The app uses motion, particles, and custom background layers to make forecast browsing feel more immersive.",
          "The interface is designed to feel more polished than a basic utility dashboard.",
          "Search, location access, saving cities, and route transitions are all handled as part of a smoother weather journey.",
        ],
      },
      {
        title: "Code Structure",
        items: [
          "App Router pages are split across home, dashboard, forecast, and saved-city related flows.",
          "Weather-specific UI is broken into reusable components such as WeatherHero, WeatherDetails, ForecastCard, HourlyChart, and WeatherBackground.",
          "Logic is separated into hooks and utility files for weather fetching and data shaping.",
        ],
      },
    ],
    screenshots: [
      {
        title: "Search and Location Landing",
        caption: "A visually rich landing page with city search, featured locations, and current-location weather lookup.",
        tone: "from-orange-500/30 via-orange-400/10 to-transparent",
        imageSrc: "/projects/weatherglass/main.png",
      },
      {
        title: "Current Weather Dashboard",
        caption: "A city-focused dashboard presenting live conditions, weather details, and save-city interactions.",
        tone: "from-orange-600/25 via-yellow-500/10 to-transparent",
        imageSrc: "/projects/weatherglass/indetails.png",
      },
      {
        title: "Forecast and Hourly Insights",
        caption: "Five-day forecasts and hourly chart views that turn raw weather data into a more readable experience.",
        tone: "from-amber-500/25 via-orange-300/10 to-transparent",
        imageSrc: "/projects/weatherglass/forecast.png",
      },
    ],
  },
];

export const allProjects = [...featuredProjects];

export function getProjectBySlug(slug: string) {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  return allProjects.find((project) => {
    const titleSlug = project.slug.trim().toLowerCase();
    const routeSlug = createProjectRouteSlug(project.slug);

    return normalizedSlug === titleSlug || normalizedSlug === routeSlug;
  });
}
