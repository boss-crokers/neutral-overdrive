"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Heart } from "lucide-react";

export default function VariableInjector({
  templateId,
  title,
  modelBadge,
  rawTemplate,
  description,
  whyItWorks,
  isFavorited = false,
  onToggleFavorite,
}) {
  const [values, setValues] = useState({});
  const [copied, setCopied] = useState(false);

  // 1. Extract unique variables like [PRODUCT_NAME] using Regex
  const variables = useMemo(() => {
    const matches = rawTemplate.match(/\[(.*?)\]/g);
    if (!matches) return [];
    // Remove the brackets and deduplicate the array
    return Array.from(new Set(matches.map((m) => m.slice(1, -1))));
  }, [rawTemplate]);

  // 2. Compute the final template with user inputs injected
  const injectedTemplate = useMemo(() => {
    let result = rawTemplate;
    variables.forEach((v) => {
      // Fallback to the bracketed variable if input is empty
      const val = values[v] || `[${v}]`;
      result = result.replaceAll(`[${v}]`, val);
    });
    return result;
  }, [rawTemplate, variables, values]);

  // 3. Handle Clipboard Action
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(injectedTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-5 sm:p-6 bg-surface border border-border rounded-xl shadow-soft">
      {/* LEFT COLUMN: Metadata & Inputs */}
      <div className="w-full lg:w-[38%] flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-mono font-semibold tracking-wider bg-[var(--surface-subtle)] text-[var(--muted-strong)] border border-border rounded">
                {templateId}
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-[var(--accent-soft)] text-[var(--accent)] rounded">
                {modelBadge}
              </span>
              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={onToggleFavorite}
                  className="ml-auto inline-flex items-center justify-center p-1.5 rounded-full border border-border bg-surface text-[var(--muted)] hover:text-rose-500 hover:border-rose-300 transition-colors cursor-pointer"
                  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`h-4 w-4 transition-transform active:scale-90 ${
                      isFavorited ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>
              )}
            </div>
            <h3 className="text-[19px] font-bold text-[var(--foreground)] tracking-tight mt-1">
              {title}
            </h3>
            <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
              {description}
            </p>
          </header>

          {/* Dynamic Input Fields */}
          {variables.length > 0 && (
            <div className="flex flex-col gap-3.5 pt-4 border-t border-border">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                Configure Variables
              </h4>
              <div className="grid gap-3">
                {variables.map((variable) => (
                  <div key={variable} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={`${templateId}-${variable}`}
                      className="text-[13px] font-semibold text-[var(--muted-strong)]"
                    >
                      {variable.replace(/_/g, " ")}
                    </label>
                    <input
                      id={`${templateId}-${variable}`}
                      type="text"
                      placeholder={`Enter ${variable.toLowerCase().replace(/_/g, " ")}...`}
                      value={values[variable] || ""}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [variable]: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 text-[13px] bg-[var(--surface-subtle)] border border-border rounded focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-shadow text-[var(--foreground)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Why it Works Sidebar / Card Footer */}
        {whyItWorks && (
          <div className="pt-3 border-t border-border text-[12px] text-[var(--muted)] italic leading-relaxed">
            <span className="font-semibold not-italic text-[var(--muted-strong)]">
              Mechanism:
            </span>{" "}
            {whyItWorks}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Code Block Output */}
      <div className="w-full lg:w-[62%] flex flex-col rounded-lg overflow-hidden border border-border bg-[var(--surface-subtle)] min-h-[220px] max-h-[600px]">
        <div className="flex items-center justify-between px-4 py-3.5 bg-surface border-b border-border">
          <span className="text-[11px] font-mono text-[var(--muted)]">
            prompt.txt
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-[var(--muted-strong)] bg-surface border border-border rounded hover:bg-[var(--surface-subtle)] hover:border-[var(--border-strong)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--accent)] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
        </div>
        <div className="p-4 overflow-auto flex-1 font-mono text-[13px] leading-relaxed text-[var(--foreground)] bg-[var(--surface-subtle)]">
          <pre className="whitespace-pre-wrap select-all font-mono">
            {injectedTemplate}
          </pre>
        </div>
      </div>
    </div>
  );
}
