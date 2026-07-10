export interface SkillCategory {
  title: string;
  description: string;
  tags: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Test Automation",
    description:
      "Designing maintainable automated coverage for critical user flows and repeatable regression checks.",
    tags: ["Selenium", "Playwright", "Cypress", "Regression Testing"],
  },
  {
    title: "API Testing",
    description:
      "Validating backend contracts, response integrity, and service reliability across key integrations.",
    tags: ["Postman", "REST Assured", "API Validation", "Contract Testing"],
  },
  {
    title: "Performance",
    description:
      "Measuring scalability under pressure and identifying bottlenecks before they affect real users.",
    tags: ["JMeter", "Load Testing", "Stress Testing", "Performance Analysis"],
  },
  {
    title: "CI/CD",
    description:
      "Integrating quality checks into pipelines so test feedback arrives early and consistently.",
    tags: ["GitHub Actions", "Jenkins", "Pipeline QA", "Release Checks"],
  },
  {
    title: "Mobile Testing",
    description:
      "Supporting cross-platform coverage for mobile experiences across functional and usability layers.",
    tags: ["Android", "iOS", "Appium", "Device Coverage"],
  },
  {
    title: "Security",
    description:
      "Including practical security-minded validation as part of broader software quality reviews.",
    tags: ["OWASP Basics", "Vulnerability Checks", "Secure QA", "Risk Review"],
  },
  {
    title: "Development",
    description:
      "Using development fluency to communicate with engineers and build quality tooling when needed.",
    tags: ["React", "JavaScript", "Next.js", "Java", "Node.js", "Flutter"],
  },
  {
    title: "Test Management",
    description:
      "Planning coverage, documenting findings clearly, and aligning quality work with delivery goals.",
    tags: ["Test Planning", "Bug Reporting", "Test Cases", "QA Documentation"],
  },
];
