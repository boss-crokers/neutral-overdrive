import Link from "next/link";
import AdUnit from "../components/AdUnit";
import { ArrowLeft, ExternalLink, ShieldCheck, Sparkles, Zap, HardDrive, LayoutTemplate } from "lucide-react";

export const metadata = {
  title: "Recommended AI Resources & Affiliate Hub | Neutral Overdrive",
  description: "Curated collection of industry-leading development hosting, design suites, and API access tools used in our workflows.",
};

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Generative Model Engines",
      icon: Sparkles,
      color: "text-brand-cyan",
      items: [
        {
          name: "OpenAI API Platform",
          description: "Developer API access for GPT-4o, structured JSON outputs, and fast embeddings indexing.",
          tag: "Industry Standard",
          url: "https://openai.com/api",
          badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
        },
        {
          name: "Google Gemini Developer Portal",
          description: "Access Gemini 1.5 Pro and Flash with 2-million token context windows. Free tier available.",
          tag: "Recommended",
          url: "https://ai.google.dev",
          badgeColor: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20"
        },
        {
          name: "Midjourney Membership",
          description: "High-fidelity photographic art generation. Access discord bot or direct web alpha platform.",
          tag: "Best for Art",
          url: "https://midjourney.com",
          badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20"
        }
      ]
    },
    {
      title: "Cloud & Storage Foundations",
      icon: HardDrive,
      color: "text-brand-violet",
      items: [
        {
          name: "Vercel Hosting",
          description: "Serverless deployments, Next.js optimization, and global edge network caching.",
          tag: "Highly Recommended",
          url: "https://vercel.com",
          badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20"
        },
        {
          name: "Supabase Database Portal",
          description: "Open-source Firebase alternative. Complete with PostgreSQL, vector search embeddings, and storage buckets.",
          tag: "Best SQL Backend",
          url: "https://supabase.com",
          badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
        }
      ]
    },
    {
      title: "Orchestration & Coding IDEs",
      icon: LayoutTemplate,
      color: "text-emerald-400",
      items: [
        {
          name: "Google Antigravity SDK",
          description: "Build autonomous multi-agent developer groups and code-execution sandboxes seamlessly.",
          tag: "Free & Open Source",
          url: "https://github.com",
          badgeColor: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20"
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main Resource Directory */}
        <div className="flex-1 w-full bg-[#0a0f1d]/40 border border-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          
          <header className="mb-10 pb-6 border-b border-slate-900">
            <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold tracking-widest uppercase mb-3">
              <Zap className="h-4 w-4" /> Affiliate Showcase
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-3">
              Recommended Developer Tools
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate referral links. If you click through and create an account or make a purchase, we may receive a commission at no additional cost to you. We only recommend high-signal tools that we actively test and trust in our production workflows.
            </p>
          </header>

          {/* Directory Listings */}
          <div className="space-y-10">
            {resourceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className={category.color}><Icon className="h-4.5 w-4.5" /></span>
                    {category.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-5 bg-slate-950/60 border border-slate-900 hover:border-slate-800 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 group shadow-inner"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
                              {item.name}
                            </h4>
                            <span className={`text-[9px] font-bold tracking-wider uppercase border px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 py-2 px-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 hover:text-white rounded-lg flex items-center justify-center gap-1.5 transition-all"
                        >
                          Visit Resource <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Affiliate Disclosure */}
          <div className="mt-12 p-4 bg-slate-950/40 border border-slate-900 rounded-xl flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-slate-500 leading-relaxed">
              <strong>Referral Disclosure:</strong> Some of the links above contain affiliate parameters. Neutral Overdrive receives a small commission on qualifying sign-ups or subscription starts. We remain committed to objective editorial standards—we only recommend tools we have tested and integrated into dynamic codebase workflows.
            </p>
          </div>

        </div>

        {/* Ad sidebar */}
        <aside className="w-full lg:w-[300px] flex-shrink-0 flex flex-col items-center gap-6">
          <AdUnit type="sidebar-skyscraper" />
        </aside>

      </div>
    </div>
  );
}
