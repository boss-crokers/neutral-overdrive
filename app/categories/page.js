import Link from "next/link";
import { ArrowLeft, ArrowRight, GitBranch, BarChart3, MessageSquareText, TrendingUp } from "lucide-react";
import { getArticlesByCategory } from "../lib/markdown";
import { categoryMeta } from "../lib/siteData";
import NewsletterSignup from "../components/NewsletterSignup";

export const metadata = {
  title: "Guides by Category | Neutral Overdrive",
  description: "Browse practical AI workflow guides, model comparisons, prompt design, and financial automation systems by topic.",
  alternates: {
    canonical: "/categories/",
  },
  openGraph: {
    title: "Guides by Category | Neutral Overdrive",
    description: "Browse practical AI workflow guides, model comparisons, prompt design, and financial automation systems by topic.",
    url: "https://neutraloverdrive.com/categories/",
  },
  twitter: {
    title: "Guides by Category | Neutral Overdrive",
    description: "Browse practical AI workflow guides, model comparisons, prompt design, and financial automation systems by topic.",
  },
};

const categoryIcons = {
  "agentic-workflows": GitBranch,
  "video-generation": BarChart3,
  "image-generation": MessageSquareText,
  "financial-automation": TrendingUp,
};

export default function CategoriesPage() {
  const categoriesList = Object.keys(categoryMeta).map((key) => {
    const meta = categoryMeta[key];
    const articles = getArticlesByCategory(key);
    return {
      slug: key,
      label: meta.label,
      title: meta.title,
      description: meta.description,
      count: articles.length,
      icon: categoryIcons[key] || GitBranch,
    };
  });

  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Guides by Category
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Explore step-by-step systems, model comparisons, prompt design, and financial automation systems.
        </p>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-8 md:grid-cols-2">
            {categoriesList.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <article
                  key={cat.slug}
                  className="flex flex-col justify-between p-6 bg-[var(--surface-subtle)] border border-border rounded-2xl hover:border-[var(--border-strong)] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border text-[var(--accent)]">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-strong)] bg-surface border border-border px-2.5 py-1 rounded-full">
                        {cat.count} {cat.count === 1 ? "guide" : "guides"}
                      </span>
                    </div>
                    <h2 className="mt-5 font-serif text-[28px] font-bold leading-tight tracking-[-0.02em] text-[var(--foreground)]">
                      {cat.title}
                    </h2>
                    <p className="body-copy mt-3 text-[14.5px] leading-relaxed text-[var(--muted-strong)]">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="text-link inline-flex items-center gap-2 text-[14px] font-semibold"
                    >
                      Browse {cat.label.toLowerCase()} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="lg:border-l lg:border-[var(--border)] lg:pl-8">
            <NewsletterSignup compact />
          </aside>
        </div>
      </section>
    </div>
  );
}
