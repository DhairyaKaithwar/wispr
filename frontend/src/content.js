export const hero = {
  positioning: "Full-stack engineer who builds reliable backends, agentic AI systems and the frontends on top of them.",
  subline: "I learn most from what breaks. Here are four failures and how I fixed them.",
};

export const timeline = [
  {
    year: "2025 → now",
    digits: "2025",
    range: "July 2025 – present",
    entry: "SDE 1, Digicraft.AI",
    meta: "Software Development Engineer 1, Digicraft.AI, New Delhi (July 2025 – present)",
    details: [
      "Built NestJS microservices and a 14-step event-driven order state machine for an ONDC mutual-fund platform.",
      "Built catalog ingestion normalizing 20+ providers into 12+ MongoDB collections; incremental sync over 3,000+ records.",
      "Built an agentic FastAPI + Gemini backend with 18 typed tools and deterministic guardrails.",
      "Built a React/TypeScript admin platform with a schema-driven form engine and 3-level RBAC; mentored 2 interns.",
    ],
  },
  {
    year: "2025",
    digits: "2025",
    range: "January – July 2025",
    entry: "Software Engineer Intern, NIC (Jan–Jul)",
    meta: "Software Engineer Intern, National Informatics Centre, New Delhi (January – July 2025)",
    details: [
      "Built GovDrive, a secure multi-tenant data platform with RBAC across admin, tenant and user roles.",
      "Built its React/Redux analytics dashboard for large national datasets.",
    ],
  },
  {
    year: "2023",
    digits: "2023",
    range: "2023–2025",
    entry: "MCA, University of Delhi (2023–2025)",
    details: ["AIR 18 in CUET PG DU MCA"],
  },
  {
    year: "2020",
    digits: "2020",
    range: "2020–2023",
    entry: "BSc Mathematics, CSJM University, Kanpur (2020–2023)",
    details: [],
    placeholder: "start of the timeline line, in your own words",
  },
];

export const exhibits = [
  {
    title: "The cron that ran twice",
    Problem: "Enrichment of 3,000+ schemes overran its interval; a second instance started on the same batch.",
    Decision: "Redis distributed lock with ownership token, bounded concurrency, throttling. BullMQ deferred.",
    Outcome: "Only one batch runs at a time.",
    Lesson: "Know when sophistication is justified.",
  },
  {
    title: "The same transaction, twice",
    Problem: "ONDC callbacks can repeat; check-then-process races let both handlers act.",
    Decision: "message_id idempotency key, atomic ownership, callback reconciliation. Kafka rejected.",
    Outcome: "Repeated delivery no longer repeats the business effect.",
    Lesson: "Design for at-least-once delivery.",
  },
  {
    title: "Processing data that hadn't changed",
    Problem: "Full syncs reprocessed 3,000+ records across providers, schemes, plans, fulfillments.",
    Decision: "Entity-level incremental sync, stable IDs, soft-delete. CDC deferred.",
    Outcome: "~99.8% fewer records processed per cycle (internal measurement).",
    Lesson: "Sync what changed, not everything.",
  },
  {
    title: "The LLM can't own business logic",
    Problem: "Gemini sometimes produced plans before gathering inputs.",
    Decision: "Live per-request tool schemas, server-side category-path to ID resolution, server-side invariant. Fine-tuning and critic LLM rejected.",
    Outcome: "Backend controls every workflow transition.",
    Lesson: "The LLM owns the language; the backend owns the correctness.",
  },
];

export const skills = [
  { group: "Backend", items: "Node.js, NestJS, Express, Python, FastAPI, REST, microservices, event-driven design" },
  { group: "Data", items: "MongoDB, Redis, Elasticsearch, MySQL, ETL pipelines, schema design" },
  { group: "AI", items: "LLM function calling, Gemini, agentic workflows, guardrails, stateful dialogue" },
  { group: "Frontend", items: "React 18, TypeScript, Redux, MobX-State-Tree, React Router v6, Vite, Tailwind" },
  { group: "Quality and delivery", items: "Jest, mocking, Docker, Jenkins, Grafana, Git, Jira, Agile" },
];

export const achievementTiles = [
  { lead: "AIR ", figure: "18", count: false, rest: "", caption: "CUET PG DU MCA (2023)" },
  { lead: "", figure: "99.37", count: true, rest: " percentile", caption: "Naukri Campus Young Turks (2024)" },
  { lead: "", figure: "300+", count: true, rest: " problems solved", caption: "across LeetCode, GFG, CodeStudio; 5 LeetCode badges" },
];

export const roles = ["Full-stack engineer", "Backend engineer", "Builder of agentic AI systems"];

export const links = {
  resume: "",
  linkedin: "https://www.linkedin.com/in/dhairya-kaithwar-570033133",
  github: "https://github.com/DhairyaKaithwar",
  email: "mailto:dhairya9d@gmail.com",
};

export const contact = { statement: "Let's build something reliable together" };
