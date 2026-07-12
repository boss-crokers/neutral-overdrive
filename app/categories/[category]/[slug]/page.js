import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllArticles, getArticleBySlug, getArticlesByCategory } from "../../../lib/markdown";
import { articleImages, categoryMeta, formatDate, popularResources } from "../../../lib/siteData";
import MarkdownRenderer from "../../../components/MarkdownRenderer";
import AuthorBio from "../../../components/AuthorBio";
import RelatedArticles from "../../../components/RelatedArticles";
import NewsletterSignup from "../../../components/NewsletterSignup";

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  const image = articleImages[slug] || "/neutral-overdrive-workspace.png";
  const url = `https://neutraloverdrive.com/categories/${category}/${slug}/`;

  return {
    title: `${article.metadata.title} | Neutral Overdrive`,
    description: article.metadata.description,
    alternates: {
      canonical: `/categories/${category}/${slug}/`,
    },
    openGraph: {
      title: `${article.metadata.title} | Neutral Overdrive`,
      description: article.metadata.description,
      type: "article",
      url: url,
      images: [
        {
          url: image,
          alt: article.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.metadata.title} | Neutral Overdrive`,
      description: article.metadata.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticleBySlug(slug);
  const meta = categoryMeta[category];

  if (!article || !meta) notFound();

  const { metadata, content } = article;
  const relatedArticles = getArticlesByCategory(category);
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    author: {
      "@type": "Person",
      name: metadata.author,
      url: "https://neutraloverdrive.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Neutral Overdrive",
      logo: {
        "@type": "ImageObject",
        url: "https://neutraloverdrive.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://neutraloverdrive.com/categories/${category}/${slug}`,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href={`/categories/${category}`} className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to {meta.label}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
          <div>
            <p className="text-[14px] font-semibold text-[var(--accent)]">{meta.label}</p>
            <h1 className="display-heading mt-4 max-w-[900px] text-[clamp(42px,6vw,72px)]">
              {metadata.title}
            </h1>
            <p className="body-copy mt-5 max-w-[760px] text-[17px]">
              {metadata.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-5 text-[13px] text-[var(--muted)]">
              <span>{metadata.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(metadata.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                12 min read
              </span>
            </div>
          </div>

          <div className="media-frame aspect-[1.6/1]">
            <img
              src={articleImages[slug] || "/neutral-overdrive-workspace.png"}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,780px)_320px] lg:justify-between">
          <article>
            <MarkdownRenderer content={content} prompts={metadata.prompts} />
            <AuthorBio authorName={metadata.author} />
            <RelatedArticles articles={relatedArticles} currentSlug={slug} />
          </article>

          <aside className="space-y-8 lg:border-l lg:border-[var(--border)] lg:pl-8">
            <NewsletterSignup compact />
            <div>
              <h2 className="font-serif text-[24px] font-bold tracking-[-0.02em]">
                Popular resources
              </h2>
              <ul className="mt-5 space-y-3">
                {popularResources.map((resource) => (
                  <li key={resource.label}>
                    <Link href={resource.href} className="text-link text-[14px]">
                      {resource.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
