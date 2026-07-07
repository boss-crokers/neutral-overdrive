import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Neutral Overdrive",
  description: "Terms and conditions governing the copying, licensing, and usage of our AI prompt templates and orchestration code.",
};

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <article className="bg-[#0a0f1d]/40 border border-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        <header className="mb-8 pb-6 border-b border-slate-900 flex items-center gap-3">
          <span className="p-2 bg-brand-violet/10 border border-brand-violet/20 rounded-lg text-brand-violet">
            <Scale className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: July 6, 2026</p>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">
          <p>
            Welcome to Neutral Overdrive. These terms and conditions outline the rules and regulations for the use of Neutral Overdrive&apos;s Website, located at neutraloverdrive.com.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Neutral Overdrive if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">License & Code Copying</h2>
          <p>
            Unless otherwise stated, Neutral Overdrive and/or its licensors own the intellectual property rights for all material on Neutral Overdrive. All intellectual property rights are reserved. You may access this from Neutral Overdrive for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>
            However, we actively encourage code deployment! You are explicitly permitted to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Copy and customize our prompt engineering formulas for your generative AI runs.</li>
            <li>Use the orchestration code snippets (such as the Python/Javascript Antigravity SDK templates) in your personal and commercial software applications.</li>
          </ul>
          <p>
            You must not:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Republish our full tutorial articles or sell them as premium course content without written consent.</li>
            <li>Scrape site data to train competing AI models or content generation networks.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">Disclaimer of Liability</h2>
          <p>
            The prompt configurations, API costs, and system setups provided here are for educational purposes. We do not guarantee that the prompts will produce identical visual layouts or output tokens on every API run due to the stochastic nature of Large Language Models (LLMs).
          </p>
          <p>
            Neutral Overdrive will not be held liable for any API billing charges, model behavior alterations, or structural failures that result from deploying the code patterns shown on this website.
          </p>

          <h2 className="text-xl font-bold text-white mt-8">Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </article>
    </div>
  );
}
