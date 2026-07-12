import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AgentRoiCalculator from "../../components/AgentRoiCalculator";

export const metadata = {
  title: "AI Agent ROI & Automation Calculator | Neutral Overdrive",
  description: "Calculate the return on investment of automating workflows with AI agents. Estimate token costs, manual fallback costs, payback period, and 3-year ROI.",
  alternates: {
    canonical: "/tools/agent-roi/",
  },
};

export default function AgentRoiCalculatorPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href="/tools" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          AI Agent ROI Calculator
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Model manual process labor against agent automation costs. Simulate API token spend, human verification audits, manual fallbacks, and project cumulative payback periods.
        </p>
      </section>

      <section className="site-container page-section">
        <AgentRoiCalculator />
      </section>
    </div>
  );
}
