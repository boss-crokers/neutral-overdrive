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
