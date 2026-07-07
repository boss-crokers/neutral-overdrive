import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticlesByCategory, getAllArticles } from "../../../lib/markdown";
import MarkdownRenderer from "../../../components/MarkdownRenderer";
import AdUnit from "../../../components/AdUnit";
import AuthorBio from "../../../components/AuthorBio";
import RelatedArticles from "../../../components/RelatedArticles";
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  let articles = [];
  try {
    articles = getAllArticles();
  } catch (e) {
    console.error(e);
  }
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.metadata.title} | Neutral Overdrive`,
    description: article.metadata.description,
  };
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { metadata, content } = article;
  const relatedArticles = getArticlesByCategory(category);

  // Visual meta maps
  const categoryLabel = {
    "image-generation": "Image Gen",
    "video-generation": "Video Gen",
    "agentic-workflows": "Agentic Workflows"
  };

  const badgeColors = {
    "image-generation": "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
    "video-generation": "text-brand-violet bg-brand-violet/10 border-brand-violet/20",
    "agentic-workflows": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": metadata.title,
    "description": metadata.description,
    "datePublished": metadata.date,
    "author": {
      "@type": "Person",
      "name": metadata.author,
      "url": "https://neutraloverdrive.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Neutral Overdrive",
      "logo": {
        "@type": "ImageObject",
        "url": "https://neutraloverdrive.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://neutraloverdrive.com/categories/${category}/${slug}`
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* Back Link */}
      <Link
        href={`/categories/${category}`}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to {categoryLabel[category]} Hub
      </Link>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Main Content Pane (Left) */}
        <article className="flex-1 w-full bg-[#0a0f1d]/40 border border-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-sm">
          
          {/* Article Header */}
          <header className="mb-10 pb-8 border-b border-slate-900">
            <span className={`inline-block text-xs font-extrabold tracking-widest uppercase border px-3 py-1 rounded-full mb-6 ${badgeColors[category]}`}>
              {categoryLabel[category]}
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              {metadata.title}
            </h1>
            
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-brand-cyan" />
                <span className="font-semibold text-slate-300">{metadata.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span>
                  {new Date(metadata.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-500" />
                <span>5 min read</span>
              </span>
            </div>
          </header>

          {/* Render MDX with Shortcode Component Injection */}
          <MarkdownRenderer content={content} prompts={metadata.prompts} />

          {/* Author Bio Details (E-E-A-T) */}
          <AuthorBio authorName={metadata.author} />

          {/* Related Articles Carousel Recirculation */}
          <RelatedArticles articles={relatedArticles} currentSlug={slug} />
          
        </article>

        {/* Sticky Right Sidebar (Right) */}
        <aside className="w-full lg:w-[300px] flex-shrink-0 lg:sticky lg:top-24 flex flex-col items-center gap-6">
          <AdUnit type="sidebar-skyscraper" />
        </aside>

      </div>
    </div>
  );
}
