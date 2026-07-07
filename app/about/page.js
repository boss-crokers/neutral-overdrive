import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About Neutral Overdrive",
  description: "Neutral Overdrive publishes practical AI workflow guides, comparisons, templates, and tools.",
};

const principles = [
  ["Useful before clever", "Every guide should help someone make a decision, run a test, or ship a workflow."],
  ["Examples over claims", "We prefer concrete prompts, scripts, tables, and tradeoffs over broad predictions."],
  ["Clear sponsorship boundaries", "Commercial pages and paid placements should be labeled and separate from editorial guidance."],
];

export default function AboutPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Practical AI notes for people doing the work.
        </h1>
        <p className="body-copy mt-5 max-w-[720px] text-[17px]">
          Neutral Overdrive publishes guides, comparisons, templates, and small tools for AI builders, marketers, operators, and founders.
        </p>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="font-serif text-[32px] font-bold tracking-[-0.025em]">
            Editorial standards
          </h2>
          <div className="divide-y divide-[var(--border)]">
            {principles.map(([title, description]) => (
              <div key={title} className="py-6 first:pt-0">
                <h3 className="text-[18px] font-semibold">{title}</h3>
                <p className="body-copy mt-2 max-w-[72ch] text-[15px]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
