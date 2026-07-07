"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

function escapeHtml(code) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function CodeBlock({ code, language = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="my-7 overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <span className="font-mono text-[12px] text-[var(--muted)]">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--border)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--muted-strong)] hover:border-[var(--border-strong)]"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto bg-[var(--surface-subtle)] p-4">
        <pre className="m-0 font-mono text-[13px] leading-6 text-[var(--foreground)]">
          <code
            className="block whitespace-pre"
            dangerouslySetInnerHTML={{ __html: escapeHtml(code) }}
          />
        </pre>
      </div>
    </div>
  );
}
