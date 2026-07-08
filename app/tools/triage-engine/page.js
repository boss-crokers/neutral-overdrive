import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import L2TriageEngine from "../../components/L2TriageEngine";

export const metadata = {
  title: "L2 Diagnostic Triage Engine | Neutral Overdrive",
  description: "Paste raw server stack traces, application logs, or messy user bug reports. The engine will instantly isolate the root failure and draft an escalation ticket.",
};

export default function L2TriageEnginePage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-8 md:py-10">
        <Link href="/tools" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to tools
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(32px,6vw,52px)]">
          L2 Diagnostic Triage Engine
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Isolate database connection timeouts, syntax exceptions, and API timeout loops from raw logs instantly. Generate a standard escalation runbook and ticket summary.
        </p>
      </section>

      <section className="site-container page-section">
        <L2TriageEngine />
      </section>
    </div>
  );
}
