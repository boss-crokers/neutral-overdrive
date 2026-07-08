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
  { name: "Workflows", count: 42, href: "/categories/agentic-workflows" },
  { name: "Finance Automation", count: 15, href: "/categories/financial-automation" },
  { name: "Comparisons", count: 28, href: "/categories/video-generation" },
  { name: "Prompts", count: 36, href: "/categories/image-generation" },
  { name: "Tools & APIs", count: 31, href: "/tools/token-calculator" },
  { name: "Optimization", count: 26, href: "/categories/agentic-workflows" },
  { name: "RAG & Data", count: 24, href: "/categories/agentic-workflows" },
  { name: "Agents", count: 19, href: "/categories/agentic-workflows" },
  { name: "Content & Marketing", count: 22, href: "/categories/image-generation" },
  { name: "Code & DevOps", count: 21, href: "/categories/agentic-workflows" },
];

export const popularResources = [
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
