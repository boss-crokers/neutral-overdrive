export const articleImages = {
  "midjourney-mastery": "/midjourney-portrait.jpg",
  "kling-video-techniques": "/kling-cinematic.jpg",
  "agentic-rag-orchestration": "/agentic-flow.jpg",
  "gemini-json-schema-enforcement": "/gemini-json-schema.jpg",
  "kling-vs-luma-video-comparison": "/kling-vs-luma.jpg",
  "best-vector-databases-gemini-agentic-loops": "/vector-databases.jpg",
  "ai-compliance-framework": "/agentic-flow.jpg",
  "automate-invoicing-make-sheets": "/agentic-flow.jpg",
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
};

export const topics = [
  { name: "Workflows", count: 42, href: "/categories/agentic-workflows" },
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
