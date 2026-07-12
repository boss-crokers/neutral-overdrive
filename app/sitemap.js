export const dynamic = "force-static";

import { getAllArticles } from "./lib/markdown";
import { categoryMeta } from "./lib/siteData";

export default function sitemap() {
  const baseUrl = "https://neutraloverdrive.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/advertise",
    "/privacy",
    "/terms",
    "/resources",
    "/resources/certification-roadmap",
    "/templates",
    "/tools",
    "/tools/token-calculator",
    "/tools/ai-readiness",
    "/tools/inspection-summarizer",
    "/tools/triage-engine",
    "/tools/cost-profitability",
    "/tools/dividend-calculator",
    "/tools/rag-visualizer",
    "/tools/agent-roi",
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Category pages
  const categoryRoutes = Object.keys(categoryMeta).map((category) => ({
    url: `${baseUrl}/categories/${category}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Article pages
  const articles = getAllArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/categories/${article.category}/${article.slug}/`,
    lastModified: new Date(article.date || Date.now()),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
