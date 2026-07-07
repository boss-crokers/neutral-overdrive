import Link from "next/link";
import { getAllArticles } from "./lib/markdown";
import AdUnit from "./components/AdUnit";
import NewsletterSignup from "./components/NewsletterSignup";
import { Image, Video, Cpu, ArrowRight, Sparkles, BookOpen } from "lucide-react";

export default function Home() {
  const articles = getAllArticles();

  const categories = [
    {
      name: "Image Generation",
      description: "Midjourney & DALL-E 3 prompting strategies, aspect ratios, and styles.",
      href: "/categories/image-generation",
      icon: Image,
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
      accent: "text-brand-cyan hover:shadow-cyan-500/20"
    },
    {
      name: "Video Generation",
      description: "Temporal prompts, camera control workflows, and physics engine tips for Kling AI.",
      href: "/categories/video-generation",
      icon: Video,
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      accent: "text-brand-violet hover:shadow-purple-500/20"
    },
    {
      name: "Agentic Workflows",
      description: "Deep dives into multi-agent systems, Gemini API RAG, and Antigravity SDK orchestration.",
      href: "/categories/agentic-workflows",
      icon: Cpu,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
      accent: "text-emerald-400 hover:shadow-emerald-500/20"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-dark-border bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#060913] to-[#060913]">
        {/* Glow Spheres */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-24 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-brand-cyan tracking-wider uppercase mb-6 shadow-inner">
            <Sparkles className="h-3 w-3 text-brand-cyan" /> Engineering the Generative Web
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Master the Mechanics of{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-cyan-400 to-brand-violet bg-clip-text text-transparent glow-cyan">
              AI Prompting & Code
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            Welcome to the ultimate tech-forward sandbox. Discover production-grade workflows for Midjourney, DALL-E, Kling AI, and multi-agent pipelines powered by Google Antigravity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tutorials"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-tr from-brand-cyan to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-black font-extrabold rounded-xl shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2"
            >
              Explore Tutorials <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/categories/agentic-workflows"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Agentic Hub
            </Link>
          </div>
        </div>
      </section>

      {/* Top Banner Ad Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit type="top-leaderboard" />
      </div>

      {/* Category Links Hubs */}
      <section className="py-12 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`group relative p-6 bg-gradient-to-br ${cat.color} border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/60 shadow-xl overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-slate-950/80 -z-10" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 group-hover:border-slate-700 transition-colors">
                      <Icon className="h-6 w-6 text-white group-hover:text-brand-cyan transition-colors" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{cat.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Banner */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSignup />
      </section>

      {/* Latest Tutorials - Grid */}
      <section id="tutorials" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold tracking-widest uppercase mb-2">
              <BookOpen className="h-4 w-4" /> Technical Repository
            </div>
            <h2 className="text-3xl font-extrabold text-white">Latest AI Workflows</h2>
          </div>
          <p className="text-slate-400 max-w-md">
            Step-by-step developer tutorials parsing generative frameworks into reproducible parameters.
          </p>
        </div>

        {/* Masonry or Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const imageMap = {
              "midjourney-mastery": "/midjourney-portrait.jpg",
              "kling-video-techniques": "/kling-cinematic.jpg",
              "agentic-rag-orchestration": "/agentic-flow.jpg"
            };

            const colors = {
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
              <article
                key={article.slug}
                className="group flex flex-col bg-[#0a0f1d] border border-slate-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-800 hover:-translate-y-1"
              >
                {/* Image Wrap */}
                <Link
                  href={`/categories/${article.category}/${article.slug}`}
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

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`inline-block text-[10px] font-bold tracking-widest uppercase border px-2.5 py-0.5 rounded-full mb-4 ${colors[article.category]}`}>
                      {categoryLabel[article.category]}
                    </span>
                    <Link href={`/categories/${article.category}/${article.slug}`}>
                      <h3 className="text-xl font-bold text-white hover:text-brand-cyan transition-colors mb-3 leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                    <span className="text-xs text-slate-500 font-medium">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                    <Link
                      href={`/categories/${article.category}/${article.slug}`}
                      className="text-xs font-bold text-brand-cyan group-hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      Read Guide <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
