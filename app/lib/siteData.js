export const articleImages = {
  "midjourney-mastery": "/midjourney-portrait.jpg",
  "kling-video-techniques": "/kling-cinematic.jpg",
  "agentic-rag-orchestration": "/agentic-flow.jpg",
  "gemini-json-schema-enforcement": "/gemini-json-schema.jpg",
  "kling-vs-luma-video-comparison": "/kling-vs-luma.jpg",
  "best-vector-databases-gemini-agentic-loops": "/vector-databases.jpg",
  "ai-compliance-framework": "/agentic-flow.jpg",
  "automate-invoicing-make-sheets": "/agentic-flow.jpg",
  "automate-dividend-growth-portfolio-reports": "/agentic-flow.jpg",
};

export const categoryMeta = {
  "agentic-workflows": {
    label: "Workflows",
    title: "AI workflow guides",
    description:
      "Step-by-step systems for agents, retrieval, structured outputs, and production prompts.",
  },
  "video-generation": {
    label: "Comparisons",
    title: "Model comparisons",
    description:
      "Practical notes on video models, prompt controls, costs, and output quality.",
  },
  "image-generation": {
    label: "Prompts",
    title: "Prompt library",
    description:
      "Reusable prompt structures for image generation, visual consistency, and creative direction.",
  },
  "financial-automation": {
    label: "Finance",
    title: "Financial automation guides",
    description:
      "Operational shortcuts for wealth managers, brokers, and advisors using AI pipelines.",
  },
};

export const topics = [
  { name: "Workflows", href: "/categories/agentic-workflows" },
  { name: "Finance Automation", href: "/categories/financial-automation" },
  { name: "Comparisons", href: "/categories/video-generation" },
  { name: "Prompts", href: "/categories/image-generation" },
  { name: "Tools & APIs", href: "/tools" },
  { name: "Optimization", href: "/categories/agentic-workflows" },
  { name: "RAG & Data", href: "/categories/agentic-workflows" },
  { name: "Agents", href: "/categories/agentic-workflows" },
  { name: "Content & Marketing", href: "/categories/image-generation" },
  { name: "Code & DevOps", href: "/categories/agentic-workflows" },
];

export const popularResources = [
  { label: "AI Governance & Security Certification Roadmap", href: "/resources/certification-roadmap" },
  { label: "Token calculator", href: "/tools/token-calculator" },
  { label: "L2 Diagnostic Triage Engine", href: "/tools/triage-engine" },
  { label: "Dividend calculator", href: "/tools/dividend-calculator" },
  { label: "Inspection summarizer", href: "/tools/inspection-summarizer" },
  { label: "Model pricing comparison", href: "/resources" },
  { label: "Prompt templates library", href: "/templates" },
  { label: "RAG evaluation checklist", href: "/categories/agentic-workflows" },
  { label: "LLM API rate limits", href: "/resources" },
];

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
