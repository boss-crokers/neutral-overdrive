import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CostProfitabilityModeler from "../../components/CostProfitabilityModeler";

export const metadata = {
  title: "Multi-Dimensional Cost & Profitability Modeler | Neutral Overdrive",
  description: "Consolidate customized cost analytics, allocate indirect overhead using Activity-Based Costing, and simulate inflation remediation strategies to protect company margins.",
  alternates: {
    canonical: "/tools/cost-profitability/",
  },
};

export default function CostProfitabilityPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href="/tools" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Cost & Profitability Modeler
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Consolidate cost analytics, allocate indirect expenses using driver-based methodologies, and simulate inflation-remediation pricing and operational scenarios.
        </p>
      </section>

      <section className="site-container page-section">
        <CostProfitabilityModeler />
      </section>
    </div>
  );
}
