import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByCategory } from "../../lib/markdown";
import AdUnit from "../../components/AdUnit";
import { Image, Video, Cpu, ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";

// Pre-define metadata for category hubs
const CATEGORY_META = {
  "image-generation": {
    title: "Image Generation Hub",
    description: "Explore masterclasses on prompting systems, camera lenses, stylization coefficients, and composition metrics for Midjourney and DALL-E.",
    icon: Image,
    accentColor: "text-brand-cyan",
    glowColor: "from-cyan-500/10 via-[#060913] to-[#060913]",
    badgeClass: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20"
  },
  "video-generation": {
    title: "Video Generation Hub",
    description: "Discover prompt vectors for virtual camera controls (panning, dollying, zooming), physics engines, and consistency tools in Kling AI.",
    icon: Video,
    accentColor: "text-brand-violet",
    glowColor: "from-purple-500/10 via-[#060913] to-[#060913]",
    badgeClass: "text-brand-violet bg-brand-violet/10 border-brand-violet/20"
  },
  "agentic-workflows": {
    title: "Agentic Workflows Hub",
    description: "Deploy production-grade orchestration code, multi-agent hierarchies, RAG models, and autonomous tool integrations using the Gemini API and Google Antigravity SDK.",
    icon: Cpu,
    accentColor: "text-emerald-400",
    glowColor: "from-emerald-500/10 via-[#060913] to-[#060913]",
    badgeClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
  }
};

export async function generateStaticParams() {
  return [
    { category: "image-generation" },
    { category: "video-generation" },
    { category: "agentic-workflows" }
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  const meta = CATEGORY_META[category];
  
  if (!meta) return {};
  
  return {
    title: `${meta.title} | Neutral Overdrive`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  const meta = CATEGORY_META[category];

  if (!meta) {
    notFound();
  }

  const articles = getArticlesByCategory(category);
  const Icon = meta.icon;

  const imageMap = {
    "midjourney-mastery": "/midjourney-portrait.jpg",
    "kling-video-techniques": "/kling-cinematic.jpg",
    "agentic-rag-orchestration": "/agentic-flow.jpg"
  };

  return (
    <div className="w-full">
      {/* Category Hero Header */}
      <section className={`relative overflow-hidden pt-16 pb-12 border-b border-dark-border bg-gradient-to-b ${meta.glowColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-6 uppercase tracking-wider"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={`p-2.5 bg-slate-900 border border-slate-800 rounded-xl ${meta.accentColor}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${meta.badgeClass}`}>
                  Category Repository
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                {meta.title}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {meta.description}
              </p>
            </div>
            
            {/* Quick stats */}
            <div className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl flex items-center gap-4 text-center md:text-right">
              <div>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
                  Published Workflows
                </span>
                <span className={`text-2xl font-mono font-black ${meta.accentColor}`}>
                  {articles.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid + Sidebar Ad Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Article List Grid (Left) */}
          <div className="flex-1 w-full">
            {articles.length === 0 ? (
              <div className="text-center py-16 bg-[#0a0f1d] border border-slate-900 rounded-2xl">
                <p className="text-slate-500 text-sm">No articles published in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article) => (
                  <article
                    key={article.slug}
                    className="group bg-[#0a0f1d] border border-slate-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-800 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    {/* Header Image */}
                    <Link
                      href={`/categories/${category}/${article.slug}`}
                      className="aspect-video relative overflow-hidden bg-slate-950 block"
                    >
                      <img
                        src={imageMap[article.slug] || "/midjourney-portrait.jpg"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d]/90 via-transparent to-transparent" />
                    </Link>

                    {/* Meta & Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/categories/${category}/${article.slug}`}>
                          <h3 className="text-xl font-bold text-white hover:text-brand-cyan transition-colors mb-3 leading-snug">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6">
                          {article.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                        <Link
                          href={`/categories/${category}/${article.slug}`}
                          className="text-xs font-bold text-brand-cyan group-hover:text-cyan-300 transition-colors flex items-center gap-1"
                        >
                          Launch Workflow <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Right Sidebar Ad Unit */}
          <aside className="w-full lg:w-[300px] flex-shrink-0 lg:sticky lg:top-24 hidden md:flex md:justify-center">
            <AdUnit type="sidebar-skyscraper" />
          </aside>

        </div>
      </div>
    </div>
  );
}
