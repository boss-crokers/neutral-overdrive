export const dynamic = "force-static";

import { getAllArticles } from "../lib/markdown";

export async function GET() {
  const baseUrl = "https://neutraloverdrive.com";
  let articles = [];
  try {
    articles = getAllArticles();
  } catch (e) {
    console.error("Error reading articles for RSS feed", e);
  }

  // XML construction
  let rssItemsXml = "";
  for (const article of articles) {
    const pubDate = new Date(article.date).toUTCString();
    const itemUrl = `${baseUrl}/categories/${article.category}/${article.slug}`;
    
    // Clean description entities for XML safety
    const cleanDesc = (article.description || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    const cleanTitle = (article.title || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    rssItemsXml += `
    <item>
      <title>${cleanTitle}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${cleanDesc}</description>
    </item>`;
  }

  const rssFeedXml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Neutral Overdrive - AI Prompt Engineering &amp; Workflows</title>
    <link>${baseUrl}</link>
    <description>Premium tutorials, prompt galleries, and agentic workflows.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssFeedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=18000",
    },
  });
}
