import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "Terms governing Neutral Overdrive guides, templates, code snippets, and downloads.",
};

export default function TermsPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 text-[clamp(42px,6vw,72px)]">
          Terms of service.
        </h1>
        <p className="mt-4 text-[13px] text-[var(--muted)]">Last updated: July 6, 2026</p>
      </section>

      <article className="site-container page-section prose prose-neutral max-w-[820px]">
        <p>
          By using Neutral Overdrive, you agree to these terms. If you do not agree, do not use the site.
        </p>
        <h2>Guides and templates</h2>
        <p>
          You may use code snippets, prompts, and templates in personal or commercial work unless a specific download says otherwise. You may not republish full articles or resell site content as your own product.
        </p>
        <h2>Accuracy and risk</h2>
        <p>
          AI models, APIs, pricing, and platform behavior change. Guides and calculators are educational references, not guarantees. You are responsible for testing workflows and monitoring vendor costs.
        </p>
        <h2>Downloads</h2>
        <p>
          Downloads are provided as-is. Review code before use, secure your own API keys, and test in a safe environment.
        </p>
        <h2>Governing terms</h2>
        <p>
          We may update these terms as the site, sponsorship model, and downloadable materials change.
        </p>
      </article>
    </div>
  );
}
