import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import InspectionSummarizer from "../../components/InspectionSummarizer";

export const metadata = {
  title: "Technical Inspection Summarizer | Neutral Overdrive",
  description: "Translate scary, forty-page technical residential home inspection report PDFs into simple, plain English summaries.",
};

export default function InspectionSummarizerPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href="/tools" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(32px,6vw,52px)]">
          Technical Inspection Summarizer
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Upload a heavy, forty-page home inspection report PDF and translate it into a reassuring plain-English summary. Focuses on Safety, Maintenance, and Cosmetics.
        </p>
      </section>

      <section className="site-container page-section">
        <InspectionSummarizer />
      </section>
    </div>
  );
}
