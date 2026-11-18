// Deliberately deterministic. No generative model, network calls, or invented profile facts.
export const topics = [
  {
    id: "health",
    words: [
      "health",
      "healthpredict",
      "predict",
      "machine learning",
      "xgboost",
      "scikit",
    ],
    title: "HealthPredict AI",
    text: "HealthPredict AI connects data preprocessing, feature engineering, predictive modelling, REST APIs, and automated validation. Its stack includes Python, Flask, MongoDB, Scikit-Learn, XGBoost, and React. The supplied profile does not include clinical validation or measured model accuracy.",
    href: "#work",
    label: "Explore selected work",
  },
  {
    id: "content",
    words: ["contentstack", "document", "gamma"],
    title: "Contentstack Accelerator",
    text: "Contentstack Accelerator brings document workflows, AI content generation, information processing, and API integrations into one platform to reduce repetitive content-management effort. Its stack includes Next.js, Node.js, Document AI, API integrations, and Gamma API.",
    href: "#work",
    label: "Explore selected work",
  },
  {
    id: "crm",
    words: ["crm", "customer", "campaign"],
    title: "AI-powered CRM",
    text: "The CRM project covers customer engagement, campaigns, automation, analytics, dashboards, and AI-assisted functionality. Its stack is React, Node.js, Express.js, MongoDB, and OpenAI APIs. A public live demo has not been verified.",
    href: "#work",
    label: "Explore selected work",
  },
  {
    id: "experience",
    words: [
      "espire",
      "experience",
      "job",
      "work history",
      "trainee",
      "employment",
    ],
    title: "Engineering in practice",
    text: "Shivansh was a Software Engineering Trainee at Espire Infolabs from May 2025 to April 2026. He contributed to AI workflow automation processing 500+ multi-source inputs, worked on backend workflows and REST APIs, and designed and executed 50+ test cases. Earlier roles were at Rajkumari Foundation and PharmaLex India.",
    href: "#journey",
    label: "Read the journey",
  },
  {
    id: "tech",
    words: ["technolog", "stack", "skill", "language", "framework", "backend"],
    title: "A connected toolkit",
    text: "Across the supplied projects, Shivansh works with Python, Flask, Scikit-Learn, XGBoost, React, Next.js, Node.js, Express.js, MongoDB, Document AI, and API integrations. His interests connect AI and machine learning, backend systems, automation, data analytics, and creative engineering.",
    href: "#constellation",
    label: "Explore the constellation",
  },
  {
    id: "contact",
    words: [
      "contact",
      "connect",
      "email",
      "hire",
      "linkedin",
      "github",
      "reach",
    ],
    title: "Start a conversation",
    text: "You can reach Shivansh at shivanshthakral03@gmail.com. His GitHub and LinkedIn profiles are linked in the contact section. He is based in Chennai, India.",
    href: "#contact",
    label: "Go to contact",
  },
  {
    id: "about",
    words: [
      "education",
      "study",
      "university",
      "srm",
      "cgpa",
      "about",
      "who",
      "resume",
    ],
    title: "The human behind the systems",
    text: "Shivansh Thakral is pursuing a B.Tech in Computer Science and Engineering at SRM Institute of Science and Technology, 2023–2027. His supplied CGPA is 9.44. He is interested in AI, software engineering, backend systems, automation, and creative product development. An original resume file has not been supplied.",
    href: "#about",
    label: "Meet Shivansh",
  },
  {
    id: "recognition",
    words: ["award", "rank", "icpc", "hack", "certif", "achiev"],
    title: "Milestones along the way",
    text: "The supplied profile lists Global Rank 103 at the ICPC Taiwan Online Programming Contest, 2nd position at HackNova, 3rd position at Foundathon, and clearing the college internal round of Smart India Hackathon. Certifications include AWS Developer – Associate, SAP Generative AI, Google AI-ML Virtual Internship, Contentstack Implementation, and MATLAB.",
    href: "#recognition",
    label: "View recognition",
  },
  {
    id: "projects",
    words: [
      "project",
      "built",
      "build",
      "portfolio",
      "work",
      "interesting",
      "automation",
      "ai",
    ],
    title: "Three directions, one curiosity",
    text: "The selected work includes HealthPredict AI for predictive healthcare analytics, Contentstack Accelerator for AI-driven document and content workflows, and an AI-powered CRM for engagement and campaigns. Each connects intelligent processing with a practical software interface.",
    href: "#work",
    label: "Enter selected work",
  },
];
export function explore(input) {
  const q = String(input).trim().toLowerCase().slice(0, 500);
  if (!q)
    return {
      title: "Where shall we begin?",
      text: "Choose a suggested topic or ask about projects, experience, technologies, education, or contact details.",
    };
  const matches = topics
    .map((t) => ({
      topic: t,
      score:
        t.words.reduce((n, w) => n + (q.includes(w) ? w.length : 0), 0) +
        (t.id === "crm" && /\bcrm\b/.test(q) ? 30 : 0) +
        (t.id === "health" && /healthpredict/i.test(q) ? 30 : 0) +
        (t.id === "content" && /contentstack/i.test(q) ? 30 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (matches.length) return matches[0].topic;
  return {
    title: "That is outside my knowledge",
    text: "I can search the supplied portfolio facts about projects, experience, technologies, education, recognition, and contact details. I am an on-device explorer, not a generative AI, and cannot infer facts or answer general questions.",
  };
}
