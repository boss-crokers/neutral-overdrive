import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Recommended AI Resources",
  description: "A practical directory of AI APIs, hosting, databases, and workflow tools.",
};

const resourceCategories = [
  {
    title: "Model APIs",
    items: [
      ["OpenAI API Platform", "Models, embeddings, structured output, and application APIs.", "https://openai.com/api"],
      ["Google Gemini Developer Portal", "Gemini models, long-context workflows, and embeddings.", "https://ai.google.dev"],
      ["Midjourney", "Image generation for visual exploration and prompt testing.", "https://midjourney.com"],
    ],
  },
  {
    title: "Infrastructure",
    items: [
      ["Vercel", "Next.js hosting and frontend deployments.", "https://vercel.com"],
      ["Supabase", "Postgres, pgvector, auth, and storage for AI products.", "https://supabase.com"],
      ["Qdrant", "Vector search for retrieval and agent memory.", "https://qdrant.tech"],
    ],
  },
  {
    title: "Workflow references",
    items: [
      ["Prompt templates", "Reusable prompt structures and examples.", "/templates"],
      ["Token calculator", "Estimate API cost before scaling a workflow.", "/tools/token-calculator"],
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Recommended AI resources.
        </h1>
        <p className="body-copy mt-5 max-w-[700px] text-[17px]">
          A short directory of tools we reference in guides: model APIs, hosting, databases, and workflow utilities.
        </p>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-9 lg:grid-cols-3">
          {resourceCategories.map((category) => (
            <section key={category.title} className="border-t border-[var(--border)] pt-5">
              <h2 className="font-serif text-[28px] font-bold tracking-[-0.02em]">
                {category.title}
              </h2>
              <div className="mt-5 divide-y divide-[var(--border)]">
                {category.items.map(([name, description, href]) => {
                  const external = href.startsWith("http");
                  const Component = external ? "a" : Link;
                  return (
                    <Component
                      key={name}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="block py-5"
                    >
                      <span className="flex items-center justify-between gap-4 font-semibold">
                        {name}
                        {external && <ExternalLink className="h-4 w-4 text-[var(--muted)]" />}
                      </span>
                      <span className="mt-2 block text-[14px] leading-6 text-[var(--muted)]">
                        {description}
                      </span>
                    </Component>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 max-w-[74ch] border-t border-[var(--border)] pt-6 text-[12px] leading-relaxed text-[var(--muted)]">
          <strong>Affiliate Disclosure:</strong> Some external links on this page are affiliate referral links. If you click through and create an account or make a purchase, we may receive a commission at no additional cost to you. We only recommend tools that we actively test and trust in our production workflows.
        </p>
      </section>
    </div>
  );
}
