import Link from "next/link";
import { articleImages, categoryMeta, formatDate } from "../lib/siteData";

export default function RelatedArticles({ articles = [], currentSlug = "" }) {
  const filtered = articles.filter((article) => article.slug !== currentSlug).slice(0, 2);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[var(--border)] pt-8">
      <h3 className="font-serif text-[24px] font-bold tracking-[-0.02em]">
        Related guides
      </h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {filtered.map((article) => {
          const meta = categoryMeta[article.category] || categoryMeta["agentic-workflows"];
          return (
            <Link
              key={article.slug}
              href={`/categories/${article.category}/${article.slug}`}
              className="group grid gap-4 border-t border-[var(--border)] pt-5"
            >
              <div className="media-frame aspect-[2.1/1]">
                <img
                  src={articleImages[article.slug] || "/neutral-overdrive-workspace.png"}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-[12px] text-[var(--muted)]">{meta.label}</p>
                <h4 className="mt-2 font-serif text-[20px] font-bold leading-tight tracking-[-0.02em] group-hover:text-[var(--accent)]">
                  {article.title}
                </h4>
                <p className="mt-2 text-[13px] text-[var(--muted)]">{formatDate(article.date)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
