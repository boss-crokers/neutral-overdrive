import Link from "next/link";
import { Rss } from "lucide-react";

const columns = [
  {
    title: "Content",
    links: [
      { label: "Guides", href: "/categories" },
      { label: "Comparisons", href: "/categories/video-generation" },
      { label: "Templates", href: "/templates" },
      { label: "Downloads", href: "/downloads" },
      { label: "Tools", href: "/tools" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Prompt library", href: "/templates" },
      { label: "Checklists", href: "/resources" },
      { label: "Glossary", href: "/resources" },
      { label: "API references", href: "/resources" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About", href: "/about" },
      { label: "Editorial process", href: "/about" },
      { label: "Contribute", href: "/advertise" },
      { label: "Advertise", href: "/advertise" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Cookie policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="site-container py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_2.6fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-block text-[22px] font-black leading-[0.88] tracking-[-0.04em]"
              aria-label="Neutral Overdrive home"
            >
              <span className="block">NEUTRAL</span>
              <span className="block">OVERDRIVE</span>
            </Link>
            <p className="mt-5 max-w-[260px] text-[14px] leading-6 text-[var(--muted)]">
              Practical AI workflow guides, comparisons, templates, and tools for people doing real work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[12px] font-semibold text-[var(--foreground)]">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[var(--muted)] hover:text-[var(--foreground)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between gap-5 md:items-end">
            <p className="text-[13px] text-[var(--muted)]">
              &copy; {new Date().getFullYear()} Neutral Overdrive
            </p>
            <div className="flex items-center gap-4 text-[13px] font-semibold text-[var(--foreground)]">
              <a href="https://github.com" aria-label="GitHub" className="hover:text-[var(--accent)]">
                GitHub
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-[var(--accent)]">
                LinkedIn
              </a>
              <Link href="/feed.xml" aria-label="RSS" className="hover:text-[var(--accent)]">
                <Rss className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
