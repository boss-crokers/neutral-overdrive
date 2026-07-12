import Link from "next/link";
import { ArrowLeft, ArrowRight, ListChecks, TrendingUp, FileText, Terminal, Layers, ShieldCheck, Scissors, Calculator } from "lucide-react";

export const metadata = {
  title: "Interactive AI and Finance Tools",
  description: "Free web-based calculators and estimation tools for developers, wealth managers, and automation builders.",
  alternates: {
    canonical: "/tools/",
  },
};

const toolsList = [
  {
    title: "Gemini API Token Calculator",
    description: "Estimate input and output pricing, analyze prompt context window sizes, and calculate token counts for Gemini models.",
    href: "/tools/token-calculator",
    icon: ListChecks,
    badge: "Developer Utility",
  },
  {
    title: "L2 Diagnostic Triage Engine",
    description: "Paste raw server stack traces, application logs, or messy user bug reports. Instantly isolate the root failure and draft an escalation ticket.",
    href: "/tools/triage-engine",
    icon: Terminal,
    badge: "Developer Utility",
  },
  {
    title: "RAG Chunking Visualizer",
    description: "Visualize document chunking strategies, inspect text splits, and estimate embedding costs across Google Gemini, OpenAI, and Cohere.",
    href: "/tools/rag-visualizer",
    icon: Scissors,
    badge: "Developer Utility",
  },
  {
    title: "Dividend Snowball Simulator",
    description: "Visualize compounding growth curve metrics, model annual passive dividend income, and calculate DRIP compounding effects on ETFs.",
    href: "/tools/dividend-calculator",
    icon: TrendingUp,
    badge: "Finance Utility",
  },
  {
    title: "Cost & Profitability Modeler",
    description: "Model multi-dimensional cost structures, allocate overhead, and simulate pricing or operational strategies to protect margins under high inflation.",
    href: "/tools/cost-profitability",
    icon: Layers,
    badge: "Finance Utility",
  },
  {
    title: "AI Agent ROI Calculator",
    description: "Model manual process labor against agent automation costs. Simulate API token spend, human verification audits, and payback periods.",
    href: "/tools/agent-roi",
    icon: Calculator,
    badge: "Finance Utility",
  },
  {
    title: "AI Strategy Compass",
    description: "Audit your business or project across data pipelines, models, compliance guardrails, and teams to steer a secure generative AI strategy.",
    href: "/tools/ai-readiness",
    icon: ShieldCheck,
    badge: "Governance Utility",
  },
  {
    title: "Technical Inspection Summarizer",
    description: "Translate scary, forty-page technical residential home inspection report PDFs into simple, plain English summaries.",
    href: "/tools/inspection-summarizer",
    icon: FileText,
    badge: "Real Estate Utility",
  },
];

export default function ToolsPortalPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Interactive Tools
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Web-based utilities and analytical simulators built for developers, wealth managers, and builders.
        </p>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-8 md:grid-cols-2">
          {toolsList.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <article
                key={tool.title}
                className="flex flex-col justify-between p-6 bg-[var(--surface-subtle)] border border-border rounded-2xl hover:border-[var(--border-strong)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border text-[var(--accent)]">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-strong)] bg-surface border border-border px-2.5 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="mt-5 font-serif text-[28px] font-bold leading-tight tracking-[-0.02em] text-[var(--foreground)]">
                    {tool.title}
                  </h2>
                  <p className="body-copy mt-3 text-[14.5px] leading-relaxed text-[var(--muted-strong)]">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-border">
                  <Link
                    href={tool.href}
                    className="text-link inline-flex items-center gap-2 text-[14px] font-semibold"
                  >
                    Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
