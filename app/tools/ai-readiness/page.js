import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AiReadinessChecker from "../../components/AiReadinessChecker";

export const metadata = {
  title: "AI Strategy Compass | Neutral Overdrive",
  description: "Audit your business or project across data pipelines, compliance frameworks, safety guardrails, and teams to build a secure generative AI roadmap.",
  alternates: {
    canonical: "/tools/ai-readiness/",
  },
};

export default function AiReadinessPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href="/tools" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          AI Strategy Compass
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Audit your organization across data pipelines, safety filters, compliance frameworks, and teams to build a secure AI roadmap.
        </p>
      </section>

      <section className="site-container page-section">
        <AiReadinessChecker />
      </section>
    </div>
  );
}
