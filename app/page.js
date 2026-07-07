import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  ChartLine,
  Code2,
  Database,
  FileText,
  GitBranch,
  ListChecks,
  MessageSquareText,
  Search,
  Wrench,
} from "lucide-react";
import { getAllArticles } from "./lib/markdown";
import { articleImages, categoryMeta, formatDate, popularResources, topics } from "./lib/siteData";
import NewsletterSignup from "./components/NewsletterSignup";

const topicIcons = {
  Workflows: GitBranch,
  Comparisons: BarChart3,
  Prompts: MessageSquareText,
  "Tools & APIs": Wrench,
  Optimization: ChartLine,
  "RAG & Data": Database,
  Agents: Bot,
  "Content & Marketing": FileText,
  "Code & DevOps": Code2,
};

function FeaturedGuide({ article }) {
  const meta = categoryMeta[article.category] || categoryMeta["agentic-workflows"];

  return (
    <article className="grid gap-5 border-b border-[var(--border)] py-5 last:border-b-0 sm:grid-cols-[176px_1fr_98px]">
      <Link href={`/categories/${article.category}/${article.slug}`} className="media-frame block aspect-[2.35/1] sm:aspect-[2.15/1]">
        <img
          src={articleImages[article.slug] || "/neutral-overdrive-workspace.png"}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
      </Link>
      <div>
        <Link href={`/categories/${article.category}/${article.slug}`}>
          <h3 className="font-serif text-[20px] font-bold leading-tight tracking-[-0.02em] hover:text-[var(--accent)]">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 max-w-[46ch] text-[14px] leading-6 text-[var(--muted)]">
          {article.description}
        </p>
      </div>
      <div className="flex flex-row items-start justify-between gap-4 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="meta-text">{formatDate(article.date)}</p>
          <p className="meta-text mt-3">12 min read</p>
        </div>
        <Link
          href={`/categories/${article.category}/${article.slug}`}
          className="text-[13px] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
        >
          {meta.label}
        </Link>
      </div>
    </article>
  );
}

function GraphitePreview({ articles }) {
  return (
    <div className="graphite-preview pointer-events-none absolute -bottom-16 -right-12 hidden w-[440px] rounded-[8px] border border-[#344044] bg-[#101619] p-5 text-[#f3f5f3] shadow-[0_18px_45px_rgba(0,0,0,0.32)] xl:block">
      <div className="flex items-start justify-between">
        <div className="text-[15px] font-black leading-[0.9] tracking-[-0.04em]">
          <span className="block">NEUTRAL</span>
          <span className="block">OVERDRIVE</span>
        </div>
        <div className="flex gap-5 text-[8px] text-[#c3cbcd]">
          <span>Guides</span>
          <span>Comparisons</span>
          <span>Templates</span>
          <span>Tools</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_1.1fr] gap-5">
        <div>
          <h3 className="font-serif text-[20px] font-bold leading-[1.05] tracking-[-0.03em]">
            Practical AI workflow guides for people shipping real work.
          </h3>
          <p className="mt-3 text-[9px] leading-4 text-[#b6bec0]">
            Step-by-step tutorials, model comparisons, prompt templates, and developer tools.
          </p>
        </div>
        <div className="overflow-hidden rounded-[5px] border border-[#344044]">
          <img src="/neutral-overdrive-workspace.png" alt="" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-[1.2fr_1fr_1fr] gap-4 border-t border-[#344044] pt-4">
        <div>
          <p className="text-[10px] font-semibold">Featured guides</p>
          <div className="mt-3 space-y-3">
            {articles.slice(0, 3).map((article) => (
              <div key={article.slug} className="grid grid-cols-[40px_1fr] gap-2">
                <img
                  src={articleImages[article.slug] || "/neutral-overdrive-workspace.png"}
                  alt=""
                  className="h-7 w-full rounded-[3px] object-cover"
                />
                <div>
                  <p className="line-clamp-1 text-[8px] font-semibold">{article.title}</p>
                  <p className="mt-1 text-[7px] text-[#8f9b9f]">{formatDate(article.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold">Browse by topic</p>
          <div className="mt-3 space-y-2">
            {topics.slice(0, 6).map((topic) => (
              <div key={topic.name} className="flex justify-between border-b border-[#263237] pb-1 text-[8px]">
                <span>{topic.name}</span>
                <span className="text-[#8f9b9f]">{topic.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold">Popular resources</p>
          <div className="mt-3 space-y-2 text-[8px] text-[#b6d6ff]">
            {popularResources.slice(0, 5).map((resource) => (
              <p key={resource.label}>{resource.label}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const articles = getAllArticles();
  const featured = articles.slice(0, 4);

  return (
    <div className="overflow-hidden">
      <section className="site-container relative border-b border-[var(--border)] py-9 md:py-11">
        <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1fr]">
          <div>
            <h1 className="display-heading max-w-[680px] text-[clamp(42px,5.2vw,64px)]">
              Practical AI workflow guides for people shipping real work.
            </h1>
            <p className="body-copy mt-6 max-w-[560px] text-[16px] md:text-[17px]">
              Step-by-step tutorials, model comparisons, prompt templates, and developer tools, tested in real projects and updated weekly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#featured-guides" className="button-primary">
                Browse guides <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tools/token-calculator" className="button-secondary">
                Use token calculator <ListChecks className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="media-frame aspect-[2.45/1.08] relative">
            <img
              src="/neutral-overdrive-workspace.png"
              alt="Laptop on a bright desk showing an AI workflow document."
              className="h-full w-full object-cover"
            />
            <GraphitePreview articles={articles} />
          </div>
        </div>
      </section>

      <section id="featured-guides" className="site-container page-section">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.95fr_0.78fr]">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-serif text-[26px] font-bold tracking-[-0.02em]">
                Featured guides
              </h2>
              <Link href="/categories/agentic-workflows" className="text-link text-[13px]">
                View all guides <ArrowRight className="inline h-3.5 w-3.5" />
              </Link>
            </div>
            <div>
              {featured.map((article) => (
                <FeaturedGuide key={article.slug} article={article} />
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="font-serif text-[26px] font-bold tracking-[-0.02em]">
              Browse by topic
            </h2>
            <div className="mt-5 divide-y divide-[var(--border)]">
              {topics.map((topic) => {
                const Icon = topicIcons[topic.name] || Search;
                return (
                  <Link
                    key={topic.name}
                    href={topic.href}
                    className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-3 text-[15px] hover:text-[var(--accent)]"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{topic.name}</span>
                    <span className="text-[13px] text-[var(--muted)]">{topic.count}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="space-y-8 border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <NewsletterSignup title="Get practical AI guides in your inbox" compact />

            <div>
              <h2 className="font-serif text-[24px] font-bold tracking-[-0.02em]">
                Popular resources
              </h2>
              <ul className="mt-5 space-y-3">
                {popularResources.map((resource) => (
                  <li key={resource.label}>
                    <Link href={resource.href} className="text-link flex items-center gap-2 text-[14px]">
                      <FileText className="h-4 w-4" />
                      {resource.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
