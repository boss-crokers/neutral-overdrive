import Link from "next/link";
import { Sparkles, Terminal, FileCode, Copy, Layers, Cpu, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Premium Prompt Packs & Agent Templates",
  description: "Download verified, production-ready system prompts, camera-panning motion settings, and multi-agent Python scripts for your LLM loops.",
};

const TEMPLATES = [
  {
    id: "gemini-agent-loop",
    title: "Gemini 1.5 Pro Agent Loop Script",
    category: "Python Script",
    description: "Production-grade agent orchestrator script featuring structured Pydantic schemas, automated tool call integrations, and context token fallback handlers.",
    price: "$19.99",
    features: [
      "OpenAPI-compatible JSON Schema generator",
      "GenAI SDK wrapper scripts in Python",
      "System prompt template for structured output",
      "Dynamic tool-calling callback routers"
    ],
    icon: Cpu,
    accent: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    glow: "from-emerald-500/10 via-[#060913]"
  },
  {
    id: "midjourney-photorealism-vault",
    title: "Midjourney v6 Photorealism Vault",
    category: "Prompt Pack",
    description: "50+ verified prompt formulas for ultra-realistic studio lighting, virtual camera lenses (anamorphic, macro), and style stylization coefficients.",
    price: "$9.99",
    features: [
      "Camera parameter templates (Shutter speed, ISO, Focal lengths)",
      "Vibrant cinematic lighting modifiers",
      "High-converting style & stylize parameters",
      "Copy-paste aspect ratio grids"
    ],
    icon: Sparkles,
    accent: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
    glow: "from-cyan-500/10 via-[#060913]"
  },
  {
    id: "multi-agent-rag-orchestrator",
    title: "Multi-Agent RAG Orchestrator",
    category: "Python/Node Template",
    description: "Ready-to-use RAG script featuring hierarchical agent routers, Pinecone/Supabase embeddings builders, and semantic query context filters.",
    price: "$29.99",
    features: [
      "Pinecone & pgvector index automation",
      "Document chunking and embed pipeline (Gemini text-embedding-004)",
      "Hierarchical agent router script",
      "Metadata query filter scripts"
    ],
    icon: Terminal,
    accent: "text-brand-violet bg-brand-violet/10 border-brand-violet/20",
    glow: "from-purple-500/10 via-[#060913]"
  }
];

export default function TemplatesPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Gradient Blurs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-brand-violet/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-brand-cyan tracking-wider uppercase mb-6 shadow-md">
            <Layers className="h-4 w-4" /> Digital Shop
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Premium Prompt Packs & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-cyan via-cyan-400 to-brand-violet bg-clip-text text-transparent">
              Agentic Scripts
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Download production-ready prompt engineering databases, virtual camera presets, and pre-configured multi-agent orchestration files to ship your projects faster.
          </p>
        </div>
      </section>

      {/* Templates Shop Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((tpl) => {
            const Icon = tpl.icon;
            return (
              <div
                key={tpl.id}
                className="group relative flex flex-col bg-[#0a0f1d] border border-slate-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-850"
              >
                {/* Visual Top Glow */}
                <div className={`absolute top-0 inset-x-0 h-40 bg-gradient-to-b ${tpl.glow} to-transparent opacity-60 pointer-events-none`} />

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${tpl.accent}`}>
                        {tpl.category}
                      </span>
                      <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-900">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-extrabold text-white mb-4 leading-snug group-hover:text-brand-cyan transition-colors">
                      {tpl.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {tpl.description}
                    </p>

                    {/* Features List */}
                    <div className="border-t border-slate-900/80 pt-6 mb-8">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">
                        What's Included:
                      </h4>
                      <ul className="space-y-3">
                        {tpl.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
                            <span className="text-brand-cyan mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="border-t border-slate-900/80 pt-6 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                        Price
                      </span>
                      <span className="text-2xl font-black text-white">
                        {tpl.price}
                      </span>
                    </div>
                    <Link
                      href="/advertise"
                      className="py-3 px-6 bg-gradient-to-tr from-brand-cyan to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-black text-xs font-black rounded-xl uppercase tracking-wider transition-all shadow-lg hover:shadow-cyan-500/10 flex items-center gap-1.5"
                    >
                      Instant Download <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-16 bg-[#0a0f1d]/40 border border-slate-900 rounded-3xl p-8 text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-brand-violet/5 rounded-full blur-2xl pointer-events-none" />
          
          <h4 className="text-lg font-bold text-white mb-2 relative z-10">
            Need a Custom Script or Prompt Suite?
          </h4>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-6 relative z-10 leading-relaxed">
            We architect production-grade LLM integrations, fine-tuning setups, and prompt configurations tailored to your data schema.
          </p>
          <Link
            href="/advertise"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-brand-cyan hover:text-cyan-300 transition-colors relative z-10 tracking-widest"
          >
            Get Custom Consultation <ArrowRight className="h-4.5 w-4.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
