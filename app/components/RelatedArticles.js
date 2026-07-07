import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default function RelatedArticles({ articles = [], currentSlug = "" }) {
  // Filter out current article and limit to 2
  const filtered = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 2);

  if (filtered.length === 0) return null;

  const imageMap = {
    "midjourney-mastery": "/midjourney-portrait.jpg",
    "kling-video-techniques": "/kling-cinematic.jpg",
    "agentic-rag-orchestration": "/agentic-flow.jpg"
  };

  const badgeColors = {
    "image-generation": "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
    "video-generation": "text-brand-violet bg-brand-violet/10 border-brand-violet/20",
    "agentic-workflows": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
  };

  const categoryLabel = {
    "image-generation": "Image Gen",
    "video-generation": "Video Gen",
    "agentic-workflows": "Agentic Workflows"
  };

  return (
    <div className="border-t border-slate-900 pt-10 mt-10">
      <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-6">
        Related AI Workflows
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((article) => (
          <div
            key={article.slug}
            className="group p-4 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-900 hover:border-slate-850 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300"
          >
            <div>
              {/* Preview image */}
              <Link
                href={`/categories/${article.category}/${article.slug}`}
                className="aspect-video relative overflow-hidden bg-slate-950 rounded-xl mb-4 block"
              >
                <img
                  src={imageMap[article.slug] || "/midjourney-portrait.jpg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>

              <span className={`inline-block text-[9px] font-bold tracking-widest uppercase border px-2 py-0.5 rounded-full mb-3 ${badgeColors[article.category]}`}>
                {categoryLabel[article.category]}
              </span>
              
              <Link href={`/categories/${article.category}/${article.slug}`}>
                <h4 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1 leading-snug">
                  {article.title}
                </h4>
              </Link>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-1">
                {article.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-900/60 pt-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
              <Link
                href={`/categories/${article.category}/${article.slug}`}
                className="text-[10px] font-black text-brand-cyan hover:text-cyan-300 transition-colors flex items-center gap-0.5"
              >
                Explore Workflow <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
