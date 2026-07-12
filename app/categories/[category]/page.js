import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticlesByCategory } from "../../lib/markdown";
import { articleImages, categoryMeta, formatDate } from "../../lib/siteData";
import NewsletterSignup from "../../components/NewsletterSignup";

export async function generateStaticParams() {
  return Object.keys(categoryMeta).map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const meta = categoryMeta[category];

  if (!meta) return {};

  const url = `https://neutraloverdrive.com/categories/${category}/`;

  return {
    title: `${meta.title} | Neutral Overdrive`,
    description: meta.description,
    alternates: {
      canonical: `/categories/${category}/`,
    },
    openGraph: {
      title: `${meta.title} | Neutral Overdrive`,
      description: meta.description,
      url: url,
    },
    twitter: {
      title: `${meta.title} | Neutral Overdrive`,
      description: meta.description,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const meta = categoryMeta[category];

  if (!meta) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h1 className="display-heading text-[clamp(42px,6vw,72px)]">
              {meta.title}
            </h1>
            <p className="body-copy mt-5 max-w-[720px] text-[17px]">
              {meta.description}
            </p>
          </div>
          <p className="text-[14px] text-[var(--muted)]">
            {articles.length} published {articles.length === 1 ? "guide" : "guides"}
          </p>
        </div>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="divide-y divide-[var(--border)]">
            {articles.map((article) => (
              <article key={article.slug} className="grid gap-5 py-6 first:pt-0 md:grid-cols-[220px_1fr]">
                <Link href={`/categories/${category}/${article.slug}`} className="media-frame aspect-[2.1/1]">
                  <img
                    src={articleImages[article.slug] || "/neutral-overdrive-workspace.png"}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div>
                  <p className="meta-text">{formatDate(article.date)}</p>
                  <Link href={`/categories/${category}/${article.slug}`}>
                    <h2 className="mt-2 font-serif text-[28px] font-bold leading-tight tracking-[-0.025em] hover:text-[var(--accent)]">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="body-copy mt-3 max-w-[68ch] text-[15px]">
                    {article.description}
                  </p>
                  <Link
                    href={`/categories/${category}/${article.slug}`}
                    className="text-link mt-5 inline-flex items-center gap-2 text-[14px]"
                  >
                    Read guide <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:border-l lg:border-[var(--border)] lg:pl-8">
            <NewsletterSignup compact />
          </aside>
        </div>
      </section>
    </div>
  );
}
