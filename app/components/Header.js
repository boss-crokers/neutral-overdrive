"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const FALLBACK_SEARCH_DATABASE = [
  {
    title: "Midjourney v6 Mastery: Advanced Photorealism & Aspect Ratios",
    slug: "midjourney-mastery",
    category: "image-generation",
    description: "Prompt structures for controlled image generation.",
  },
  {
    title: "Kling AI Cinema Workflows: Camera Pan & Zoom Control",
    slug: "kling-video-techniques",
    category: "video-generation",
    description: "Video prompting notes for camera movement and consistency.",
  },
  {
    title: "Agentic RAG Orchestration: Multi-Agent Gemini & Antigravity SDK",
    slug: "agentic-rag-orchestration",
    category: "agentic-workflows",
    description: "A practical RAG workflow for routed agent systems.",
  },
  {
    title: "Strict Structured JSON Outputs in Gemini",
    slug: "gemini-json-schema-enforcement",
    category: "agentic-workflows",
    description: "Schema enforcement with Pydantic and Gemini.",
  },
  {
    title: "Kling AI vs Luma Dream Machine",
    slug: "kling-vs-luma-video-comparison",
    category: "video-generation",
    description: "A side-by-side video model comparison.",
  },
  {
    title: "The Best Vector Databases for Gemini API Agentic Loops",
    slug: "best-vector-databases-gemini-agentic-loops",
    category: "agentic-workflows",
    description: "Pinecone, Supabase, and Qdrant for AI memory.",
  },
  {
    title: "Automate Dividend-Growth Portfolio Reports for Client Reviews",
    slug: "automate-dividend-growth-portfolio-reports",
    category: "financial-automation",
    description: "A zero-code architecture guide to building an ETF portfolio reporting pipeline using Make.com, financial APIs, and the Gemini API.",
  },
];

const navLinks = [
  { href: "/categories", label: "Guides" },
  { href: "/categories/video-generation", label: "Comparisons" },
  { href: "/templates", label: "Templates" },
  { href: "/downloads", label: "Downloads" },
  { href: "/tools", label: "Tools" },
  { href: "/resources", label: "Resources" },
];

function Wordmark() {
  return (
    <Link
      href="/"
      className="font-sans text-[22px] font-black leading-[0.88] tracking-[-0.04em]"
      aria-label="Neutral Overdrive home"
    >
      <span className="block">NEUTRAL</span>
      <span className="block">OVERDRIVE</span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchDb, setSearchDb] = useState(FALLBACK_SEARCH_DATABASE);

  useEffect(() => {
    fetch("/api/search/")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setSearchDb(data);
        }
      })
      .catch((err) => console.error("Failed to load search database", err));
  }, []);

  useEffect(() => {
    function closeOnOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  const results = query.trim()
    ? searchDb.filter((item) => {
        const needle = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(needle) ||
          item.description.toLowerCase().includes(needle) ||
          item.category.toLowerCase().includes(needle)
        );
      })
    : searchDb.slice(0, 4);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="site-container">
        <div className="flex min-h-[82px] items-center justify-between gap-6">
          <Wordmark />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                  }}
                  className={`text-[14px] font-medium transition-colors ${
                    active
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted-strong)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <div ref={searchRef} className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-[4px] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
                aria-label="Search guides"
              >
                <Search className="h-5 w-5" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-12 w-[360px] rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-soft)]">
                  <input
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search guides, prompts, APIs"
                    className="theme-input h-10 w-full px-3 text-[14px]"
                  />
                  <div className="mt-3 divide-y divide-[var(--border)]">
                    {results.map((result) => (
                      <button
                        key={result.slug}
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                          router.push(`/categories/${result.category}/${result.slug}`);
                        }}
                        className="block w-full py-3 text-left"
                      >
                        <span className="block text-[13px] font-semibold text-[var(--foreground)]">
                          {result.title}
                        </span>
                        <span className="mt-1 block text-[12px] leading-5 text-[var(--muted)]">
                          {result.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-[var(--border)] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--border)] py-4 lg:hidden">
            <nav className="grid gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[4px] px-2 py-3 text-[15px] font-medium hover:bg-[var(--surface-subtle)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex justify-start">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
