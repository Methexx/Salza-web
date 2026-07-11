export interface SkillCategory { title: string; description: string; tags: string[]; }

export const skillCategories: SkillCategory[] = [
  { title: "Frontend Development", description: "Building responsive, component-based interfaces and interactive web experiences.", tags: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"] },
  { title: "Backend Development", description: "Developing secure services, application logic, and maintainable RESTful APIs.", tags: ["Node.js", "Express.js", "Fastify", "Spring Boot", "Java", "JWT", "MVC"] },
  { title: "Databases", description: "Designing schemas, modelling application data, and integrating persistent storage.", tags: ["MySQL", "MongoDB", "PostgreSQL", "Firebase", "Supabase"] },
  { title: "DevOps & Delivery", description: "Supporting consistent development and deployment with modern delivery workflows.", tags: ["Docker", "CI/CD Pipelines", "Vercel", "Git", "GitHub"] },
  { title: "Architecture & Engineering", description: "Structuring applications for clear data flow, dependable integration, and long-term maintainability.", tags: ["Application Architecture", "RESTful Services", "State Management", "API Integration", "Performance Optimization"] },
  { title: "Tools & Collaboration", description: "Working efficiently across design, API testing, AI-assisted development, and collaborative team environments.", tags: ["Postman", "Figma", "Framer", "Copilot", "Claude Code", "Slack", "Notion", "Jira", "Communication", "Team Coordination", "People Management"] },
];
