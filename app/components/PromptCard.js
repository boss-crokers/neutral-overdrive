"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function PromptCard({
  imageUrl = "",
  promptText = "",
  model = "AI model",
  aspectRatio = "16:9",
  seed = "N/A",
  stylize = "N/A",
  title = "Example output",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy prompt: ", error);
    }
  };

  return (
    <div className="my-9 grid overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--surface)] md:grid-cols-[0.95fr_1.05fr]">
      <div className="aspect-video bg-[var(--surface-subtle)] md:aspect-auto">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-[13px] text-[var(--muted)]">
            No image provided
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-serif text-[22px] font-bold tracking-[-0.02em]">
              Prompt example
            </h4>
            <p className="mt-1 text-[13px] text-[var(--muted)]">{model}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--border)] px-3 py-2 text-[12px] font-medium hover:border-[var(--border-strong)]"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="mt-5 rounded-[6px] border border-[var(--border)] bg-[var(--surface-subtle)] p-4 font-mono text-[13px] leading-6 text-[var(--muted-strong)]">
          {promptText}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-4">
          {[
            ["Aspect", aspectRatio],
            ["Stylize", stylize],
            ["Seed", seed],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[12px] text-[var(--muted)]">{label}</p>
              <p className="mt-1 truncate font-mono text-[13px] font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
