export const dynamic = "force-static";

import { getAllArticles } from "../../lib/markdown";

export async function GET() {
  let articles = [];
  try {
    articles = getAllArticles();
  } catch (e) {
    console.error("Error reading articles for search database", e);
  }

  const searchDb = articles.map((article) => ({
    title: article.title,
    slug: article.slug,
    category: article.category,
    description: article.description,
  }));

  return new Response(JSON.stringify(searchDb), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
