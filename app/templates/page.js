import Link from "next/link";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

export const metadata = {
  title: "Prompt Templates and Agent Scripts",
  description: "Download reusable prompts, scripts, and workflow templates for practical AI work.",
};

const templates = [
  {
    title: "Gemini 3.1 Pro Agent Loop Script",
    type: "Python script",
    description:
      "A starter loop for structured outputs, tool callbacks, and fallback handling in Gemini workflows.",
    price: "Free",
    originalPrice: "$19.99",
    href: "/downloads/gemini-agent-loop.zip",
    detail: "Includes Python scripts, JSON schema helpers, and system prompt examples.",
  },
  {
    title: "Midjourney v6 Photorealism Vault",
    type: "Prompt pack",
    description:
      "Camera, lens, lighting, and aspect-ratio formulas for controlled image generation.",
    price: "Free",
    originalPrice: "$9.99",
    href: "/downloads/midjourney-photorealism-vault.md",
    detail: "Includes 50 prompt patterns and parameter notes.",
  },
  {
    title: "AI Compliance & System Audit Checklist",
    type: "Audit framework",
    description:
      "A structured framework to audit AI agent loops for data leakage, user consent compliance, and model input security.",
    price: "Free",
    originalPrice: "$24.99",
    href: "/downloads/ai-compliance-audit-checklist.md",
    detail: "Includes standard system prompt guardrails, data retention worksheets, and risk scoring matrices.",
  },
  {
    title: "Multi-Agent RAG Orchestrator",
    type: "Template plan",
    description:
      "A reference architecture for routing, retrieval, chunking, and vector search workflows.",
    price: "$29.99",
    href: "/advertise",
    detail: "Available as a custom build request while the public template is prepared.",
  },
];

export default function TemplatesPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Prompt templates and agent scripts.
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Reusable files for common AI workflows: prompting, structured output, retrieval, and model testing.
        </p>
      </section>

      <section className="site-container page-section">
        <div className="divide-y divide-[var(--border)]">
          {templates.map((template) => (
            <article key={template.title} className="grid gap-5 py-7 first:pt-0 md:grid-cols-[1fr_160px]">
              <div>
                <p className="text-[13px] font-semibold text-[var(--accent)]">{template.type}</p>
                <h2 className="mt-2 font-serif text-[32px] font-bold leading-tight tracking-[-0.025em]">
                  {template.title}
                </h2>
                <p className="body-copy mt-3 max-w-[72ch] text-[15px]">{template.description}</p>
                <p className="mt-4 text-[14px] text-[var(--muted)]">{template.detail}</p>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <div className="flex items-baseline gap-2">
                  {template.originalPrice && (
                    <span className="font-mono text-[14px] text-[var(--muted)] line-through">
                      {template.originalPrice}
                    </span>
                  )}
                  <p className={`font-mono text-[20px] font-bold ${template.price === "Free" ? "text-emerald-500" : ""}`}>
                    {template.price}
                  </p>
                </div>
                <Link
                  href={template.href}
                  download={template.href.endsWith(".zip") ? "gemini-agent-loop.zip" : undefined}
                  className={template.price === "Free" ? "button-primary" : "button-secondary"}
                >
                  {template.price === "Free" ? "Download" : "Request access"}
                  {template.price === "Free" ? <Download className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {/* Legal Software Disclaimer */}
        <p className="mt-12 text-[11px] leading-relaxed text-[var(--muted)] max-w-4xl border-t border-[var(--border)] pt-6">
          * Software Disclaimer: All downloadable scripts, parameters, and prompts are provided &quot;as is&quot; without warranties of any kind. Neutral Overdrive does not guarantee model performance, compatibility with local host configurations, or API stability. Users are solely responsible for testing files in a sandbox environment and securing their own API keys.
        </p>
      </section>
    </div>
  );
}
