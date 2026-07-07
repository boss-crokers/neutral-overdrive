import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen, Compass, Award } from "lucide-react";

export const metadata = {
  title: "About Us & Editorial Standards | Neutral Overdrive",
  description: "Learn about the mission, creators, and rigorous testing standards behind our AI prompt engineering tutorials.",
};

export default function AboutPage() {
  const team = [
    {
      name: "Pete Overdrive",
      role: "Lead Architect & Prompt Engineer",
      bio: "Former AI researcher focusing on temporal video architectures and agentic system orchestration. Pete designs our core pipeline code templates.",
      avatar: "P"
    },
    {
      name: "Sofia Vance",
      role: "UI/UX Designer & Midjourney Guru",
      bio: "Visual artist specializing in photographic prompts, focal lengths, and rendering composition metrics. Sofia leads our Image Generation column.",
      avatar: "S"
    }
  ];

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
          <span className="p-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-brand-cyan">
            <Compass className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-white">About Neutral Overdrive</h1>
            <p className="text-xs text-slate-500 mt-1">Our Mission, Standards & Technical Team</p>
          </div>
        </header>

        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-8">
          <p className="text-lg text-slate-200">
            Neutral Overdrive is a premium developer repository and research journal dedicated to the science of **Generative AI Prompt Engineering and Multi-Agent Code Orchestration**. 
          </p>

          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-brand-cyan" /> Our Editorial Quality Standards
            </h2>
            <p>
              Unlike standard content farms, we do not compile untested or generic prompt lists. Every single prompt and code template published on Neutral Overdrive goes through our testing lifecycle:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><strong>100+ Iterations:</strong> Prompts are run at least 100 times to verify consistency and reduce random seeds variance.</li>
              <li><strong>Exact Parameters:</strong> We provide precise parameter flags (aspect ratios, stylization values, variety steps) alongside exact model builds.</li>
              <li><strong>Compilable Sandboxed Code:</strong> All Python and JavaScript orchestrations are fully tested in local environments before being written as code blocks.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              Meet the Technical Editorial Staff
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {team.map((member) => (
                <div key={member.name} className="p-6 bg-slate-950/60 border border-slate-850 rounded-2xl flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center font-bold text-black text-sm">
                      {member.avatar}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-white leading-tight">{member.name}</h4>
                      <p className="text-xs text-brand-cyan mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900">
            <h2 className="text-xl font-bold text-white mb-3">Sponsorship & Advertisements</h2>
            <p>
              We partner with industry-leading AI developer networks, hardware manufacturers, and cloud infrastructure companies. If you are interested in sponsoring our newsletter or display slots, please visit our dedicated{" "}
              <Link href="/advertise" className="text-brand-cyan font-bold hover:underline">
                Advertising Specs Page
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
