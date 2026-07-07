import Link from "next/link";
import { Mail } from "lucide-react";

const AUTHORS = {
  "Pete Overdrive": {
    role: "Workflow editor",
    bio: "Writes practical guides on model APIs, retrieval systems, structured output, and agent workflows.",
    initials: "PO",
  },
  "Sofia Vance": {
    role: "Visual systems editor",
    bio: "Edits prompt guides for image generation, visual consistency, creative direction, and production workflows.",
    initials: "SV",
  },
  "Neutral Overdrive Team": {
    role: "Editorial team",
    bio: "Maintains tested guides, comparison notes, templates, and tools for AI builders and operators.",
    initials: "NO",
  },
};

export default function AuthorBio({ authorName = "Neutral Overdrive Team" }) {
  const author = AUTHORS[authorName] || AUTHORS["Neutral Overdrive Team"];

  return (
    <section className="my-10 border-t border-[var(--border)] pt-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border border-[var(--border)] bg-[var(--surface-subtle)] text-[13px] font-bold">
          {author.initials}
        </span>
        <div>
          <p className="text-[13px] text-[var(--muted)]">Written by</p>
          <h3 className="mt-1 font-serif text-[22px] font-bold tracking-[-0.02em]">
            {authorName}
          </h3>
          <p className="mt-1 text-[14px] font-medium text-[var(--muted-strong)]">
            {author.role}
          </p>
          <p className="mt-3 max-w-[66ch] text-[14px] leading-6 text-[var(--muted)]">
            {author.bio}
          </p>
          <Link
            href="/advertise"
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            <Mail className="h-4 w-4" />
            Contact editor
          </Link>
        </div>
      </div>
    </section>
  );
}
