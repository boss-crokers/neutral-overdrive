import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DividendCalculator from "../../components/DividendCalculator";

export const metadata = {
  title: "Dividend Snowball Simulator | Neutral Overdrive",
  description: "Calculate and visualize long-term portfolio growth, DRIP compounding effects, and annual passive dividend income.",
};

export default function DividendCalculatorPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href="/tools" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Dividend Snowball Simulator
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Model investment compounding growth, project annual passive dividend cashflow, and visualize the impact of reinvesting distributions over time.
        </p>
      </section>

      <section className="site-container page-section">
        <DividendCalculator />
      </section>
    </div>
  );
}
