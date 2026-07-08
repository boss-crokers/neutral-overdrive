import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getArticleBySlug(slug) {
  try {
    const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      metadata: {
        slug,
        ...data,
      },
      content,
    };
  } catch (error) {
    console.error(`Error loading article: ${slug}`, error);
    return null;
  }
}

export function getAllArticles() {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }
    const files = fs.readdirSync(CONTENT_DIR);
    const articles = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const article = getArticleBySlug(slug);
        return article ? article.metadata : null;
      })
      .filter(Boolean)
      // Sort by date descending
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return articles;
  } catch (error) {
    console.error("Error listing articles", error);
    return [];
  }
}

export function getArticlesByCategory(category) {
  return getAllArticles().filter((article) => article.category === category);
}

export function getTopicCounts() {
  const articles = getAllArticles();
  
  let toolsCount = 4;
  try {
    const toolsDir = path.join(process.cwd(), "app", "tools");
    if (fs.existsSync(toolsDir)) {
      toolsCount = fs.readdirSync(toolsDir).filter(file => {
        const fullPath = path.join(toolsDir, file);
        return fs.statSync(fullPath).isDirectory();
      }).length;
    }
  } catch (e) {
    console.error("Error reading tools directory", e);
  }

  return {
    "Workflows": articles.filter(a => a.category === "agentic-workflows").length,
    "Finance Automation": articles.filter(a => a.category === "financial-automation").length,
    "Comparisons": articles.filter(a => a.category === "video-generation").length,
    "Prompts": articles.filter(a => a.category === "image-generation").length,
    "Tools & APIs": toolsCount,
    "Optimization": articles.filter(a => {
      const text = `${a.title} ${a.slug} ${a.description}`.toLowerCase();
      return text.includes("optimize") || text.includes("cost") || text.includes("compliance") || text.includes("allocation") || text.includes("schema") || text.includes("enforcement");
    }).length,
    "RAG & Data": articles.filter(a => {
      const text = `${a.title} ${a.slug} ${a.description}`.toLowerCase();
      return text.includes("rag") || text.includes("vector") || text.includes("database") || text.includes("data") || text.includes("tenant");
    }).length,
    "Agents": articles.filter(a => {
      const text = `${a.title} ${a.slug} ${a.description}`.toLowerCase();
      return text.includes("agent") || text.includes("loop") || text.includes("framework") || text.includes("orchestration") || text.includes("logging");
    }).length,
    "Content & Marketing": articles.filter(a => {
      const text = `${a.title} ${a.slug} ${a.description}`.toLowerCase();
      return text.includes("midjourney") || text.includes("video") || text.includes("creative") || text.includes("pipeline") || text.includes("marketing") || text.includes("invoicing") || text.includes("reports");
    }).length,
    "Code & DevOps": articles.filter(a => {
      const text = `${a.title} ${a.slug} ${a.description}`.toLowerCase();
      return text.includes("code") || text.includes("logging") || text.includes("guidelines") || text.includes("uspto") || text.includes("api") || text.includes("allocation");
    }).length,
  };
}
