import { getAllArticles } from "./lib/markdown";

export default async function sitemap() {
  const baseUrl = "https://neutraloverdrive.com";
  
  // 1. Static routes
  const staticPaths = [
    "",
    "/about",
    "/advertise",
    "/privacy",
    "/terms",
    "/resources",
    "/tools/token-calculator",
    "/categories/image-generation",
    "/categories/video-generation",
    "/categories/agentic-workflows",
  ];

  const staticEntries = staticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic article routes
  let articles = [];
  try {
    articles = getAllArticles();
  } catch (e) {
    console.error("Error reading articles for sitemap", e);
  }

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/categories/${article.category}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
