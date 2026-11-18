export const profile = {
  name: "Shivansh Thakral",
  location: "Chennai, India",
  email: "shivanshthakral03@gmail.com",
  github: "https://github.com/shivanshthakral",
  linkedin: "https://www.linkedin.com/in/shivansh-thakral-9b70b7217/",
  education: "B.Tech Computer Science and Engineering",
  institution: "SRM Institute of Science and Technology",
  period: "2023–2027",
  cgpa: "9.44",
};
export const projects = [
  {
    id: "healthpredict",
    number: "01",
    name: "HealthPredict AI",
    category: "MACHINE LEARNING · HEALTHCARE",
    short: "Turning complex data\ninto clearer possibilities.",
    color: "mint",
    stack: ["Python", "Flask", "MongoDB", "Scikit-Learn", "XGBoost", "React"],
    description:
      "A healthcare analytics platform connecting data preprocessing, feature engineering, and predictive modelling with REST APIs and automated validation.",
    problem:
      "Healthcare datasets need careful preparation and reliable processing before they can support useful analysis.",
    solution:
      "A connected analytics workflow: prepare the data, engineer meaningful features, run predictive models, and make the results accessible through an application interface.",
    stages: ["Prepare", "Model", "Interpret"],
    note: "Conceptual data-flow illustration. No patient data or clinical predictions are shown.",
  },
  {
    id: "contentstack",
    number: "02",
    name: "Contentstack Accelerator",
    category: "AI WORKFLOWS · AUTOMATION",
    short: "Less repetition.\nMore room to create.",
    color: "copper",
    stack: [
      "Next.js",
      "Node.js",
      "Document AI",
      "API Integrations",
      "Gamma API",
    ],
    description:
      "An AI-driven workflow platform for document processing, content generation, and connected API integrations.",
    problem:
      "Moving information between documents, content systems, and presentation tools creates repetitive manual work.",
    solution:
      "Bring document workflows, information processing, and AI-assisted content generation into a connected pipeline designed to reduce repetitive content-management effort.",
    stages: ["Ingest", "Transform", "Compose"],
    note: "Representative workflow illustration, not a screenshot of the product.",
  },
  {
    id: "crm",
    number: "03",
    name: "AI-powered CRM",
    category: "INTELLIGENT PRODUCTS · FULL STACK",
    short: "Connecting people.\nUnderstanding the signal.",
    color: "lilac",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "OpenAI APIs"],
    description:
      "A customer relationship management platform bringing engagement, campaigns, automation, analytics, and AI-assisted functionality together.",
    problem:
      "Customer interactions and campaign information become harder to act on when they are scattered across separate tools.",
    solution:
      "A shared application for engagement and campaign workflows, supported by dashboards, analytics, automation, and AI-assisted features.",
    stages: ["Connect", "Understand", "Engage"],
    note: "Representative engagement network. All nodes are illustrative.",
  },
] as const;
export type Project = (typeof projects)[number];
export const experience = [
  {
    company: "Espire Infolabs",
    full: "Espire Infolabs Pvt. Ltd.",
    role: "Software Engineering Trainee",
    date: "MAY 2025 — APR 2026",
    year: "2025–26",
    text: "From multi-source information to dependable automation.",
    details: [
      "Contributed to AI-powered workflow automation processing 500+ inputs across PDFs, URLs, APIs, and structured datasets.",
      "Worked on backend workflows, REST APIs, validation pipelines, and automation.",
      "Designed and executed 50+ test cases; supported debugging, deployment, and iteration.",
    ],
  },
  {
    company: "Rajkumari Foundation",
    full: "Rajkumari Foundation",
    role: "Learning & Development Intern",
    date: "JAN — MAR 2025",
    year: "2025",
    text: "Making complex ideas feel approachable.",
    details: [
      "Supported learning sessions and student mentoring.",
      "Planned learning activities and adapted explanations.",
      "Developed communication and problem-solving skills.",
    ],
  },
  {
    company: "PharmaLex",
    full: "PharmaLex India Pvt. Ltd.",
    role: "Technology Trainee",
    date: "JUN — JUL 2024",
    year: "2024",
    text: "Understanding the systems behind the work.",
    details: [
      "Supported workflow analysis, testing, documentation, and process validation.",
      "Worked across technical and business teams.",
    ],
  },
];
export const constellations = [
  {
    name: "Intelligence",
    subtitle: "FROM DATA TO POSSIBILITY",
    tech: ["Python", "Scikit-Learn", "XGBoost", "Document AI", "OpenAI APIs"],
    description:
      "Preparing information, finding patterns, and making intelligent features useful in real products.",
    project: "HealthPredict AI",
  },
  {
    name: "Systems",
    subtitle: "THE STRUCTURE BENEATH",
    tech: ["Node.js", "Express.js", "Flask", "MongoDB", "REST APIs"],
    description:
      "Connecting services with careful validation, dependable data flows, and a clear application architecture.",
    project: "Contentstack Accelerator",
  },
  {
    name: "Interfaces",
    subtitle: "WHERE PEOPLE MEET SOFTWARE",
    tech: ["React", "Next.js", "TypeScript", "Three.js", "CSS"],
    description:
      "Building expressive interfaces that make complex systems understandable. TypeScript, React, and CSS bring this portfolio to life.",
    project: "AI-powered CRM",
  },
];
export const certifications = [
  "AWS Certified Developer – Associate",
  "SAP Generative AI Certification",
  "Google for Developers AI-ML Virtual Internship",
  "Contentstack Implementation Certification",
  "MATLAB Certification",
];
