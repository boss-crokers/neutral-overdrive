"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const MODEL_SOURCES = [
  { label: "OpenAI pricing", href: "https://openai.com/api/pricing/" },
  { label: "Gemini API pricing", href: "https://ai.google.dev/gemini-api/docs/pricing" },
  { label: "Claude pricing", href: "https://claude.com/platform/api" },
  { label: "Fable 5 availability", href: "https://www.anthropic.com/news/claude-fable-5-mythos-5" },
];

const MODELS = [
  { id: "gpt-5.6-sol", name: "GPT-5.6 Sol", provider: "OpenAI", inputCostPerMillion: 5, outputCostPerMillion: 30, note: "Released July 9, 2026; flagship reasoning & agency" },
  { id: "gpt-5.6-terra", name: "GPT-5.6 Terra", provider: "OpenAI", inputCostPerMillion: 2.5, outputCostPerMillion: 15, note: "Released July 9, 2026; balanced reasoning/speed" },
  { id: "gpt-5.6-luna", name: "GPT-5.6 Luna", provider: "OpenAI", inputCostPerMillion: 1, outputCostPerMillion: 6, note: "Released July 9, 2026; low-cost efficiency tier" },
  { id: "gpt-5.5-legacy", name: "GPT-5.5 (Legacy)", provider: "OpenAI", inputCostPerMillion: 5, outputCostPerMillion: 30, note: "Legacy reasoning model, April 2026" },
  { id: "gpt-5.4-legacy", name: "GPT-5.4 (Legacy)", provider: "OpenAI", inputCostPerMillion: 2.5, outputCostPerMillion: 15, note: "Legacy computer-use model, March 2026" },
  { id: "gpt-5.4-mini-legacy", name: "GPT-5.4 mini (Legacy)", provider: "OpenAI", inputCostPerMillion: 0.75, outputCostPerMillion: 4.5, note: "Legacy mini efficiency tier" },
  { id: "claude-fable-5", name: "Claude Fable 5", provider: "Anthropic", inputCostPerMillion: 10, outputCostPerMillion: 50, note: "Long-running agents, Claude API" },
  { id: "claude-opus-4.8", name: "Claude Opus 4.8", provider: "Anthropic", inputCostPerMillion: 5, outputCostPerMillion: 25, note: "Complex agentic coding and enterprise work" },
  { id: "claude-sonnet-5", name: "Claude Sonnet 5", provider: "Anthropic", inputCostPerMillion: 2, outputCostPerMillion: 10, note: "Intro rate through Aug 31, 2026" },
  { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", provider: "Anthropic", inputCostPerMillion: 1, outputCostPerMillion: 5, note: "Fastest Claude tier" },
  { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash", provider: "Google", inputCostPerMillion: 1.5, outputCostPerMillion: 9, note: "Standard paid tier" },
  { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro", provider: "Google", inputCostPerMillion: 2, outputCostPerMillion: 12, note: "Standard tier, prompts <= 200K" },
  { id: "gemini-3", name: "Gemini 3", provider: "Google", inputCostPerMillion: 0.5, outputCostPerMillion: 3, note: "Fast text, image, and video rate" },
  { id: "gemini-3.1-flash-lite", name: "Gemini 3.1-lite", provider: "Google", inputCostPerMillion: 0.25, outputCostPerMillion: 1.5, note: "Ultra-low cost text API" },
];

function NumberField({ label, value, min, max, step, onChange }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-4 text-[14px] font-semibold">
        {label}
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(Math.max(0, parseInt(event.target.value, 10) || 0))}
          className="theme-input h-9 w-28 px-2 text-right font-mono text-[13px]"
        />
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(parseInt(event.target.value, 10))}
        className="mt-4 w-full accent-[var(--accent)]"
      />
    </label>
  );
}

export default function TokenCalculatorClient() {
  const [selectedModelId, setSelectedModelId] = useState(MODELS[0].id);
  const [inputTokens, setInputTokens] = useState(15000);
  const [outputTokens, setOutputTokens] = useState(5000);
  const [runsPerMonth, setRunsPerMonth] = useState(1000);

  const activeModel = MODELS.find((model) => model.id === selectedModelId) || MODELS[0];
  const inputCost = (inputTokens / 1_000_000) * activeModel.inputCostPerMillion;
  const outputCost = (outputTokens / 1_000_000) * activeModel.outputCostPerMillion;
  const runCost = inputCost + outputCost;
  const totalMonthlyCost = runCost * runsPerMonth;
  const pricing = {
    inputCost: inputCost.toFixed(5),
    outputCost: outputCost.toFixed(5),
    runCost: runCost.toFixed(4),
    totalMonthlyCost: totalMonthlyCost.toFixed(2),
  };

  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          AI API token cost calculator
        </h1>
        <p className="body-copy mt-5 max-w-[680px] text-[17px]">
          Estimate text-token API spend before a workflow runs. Rates were refreshed July 10, 2026 from official provider pricing.
        </p>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="font-serif text-[28px] font-bold tracking-[-0.02em]">
              Model and volume
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setSelectedModelId(model.id)}
                  className={`rounded-[8px] border p-4 text-left transition-colors ${
                    selectedModelId === model.id
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span className="block text-[12px] text-[var(--muted)]">{model.provider}</span>
                  <span className="mt-1 block text-[15px] font-semibold">{model.name}</span>
                  <span className="mt-3 block font-mono text-[12px] text-[var(--muted)]">
                    {model.note}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-9 space-y-8 border-t border-[var(--border)] pt-8">
              <NumberField label="Input tokens" value={inputTokens} min="100" max="200000" step="500" onChange={setInputTokens} />
              <NumberField label="Output tokens" value={outputTokens} min="50" max="64000" step="100" onChange={setOutputTokens} />
              <NumberField label="API calls per month" value={runsPerMonth} min="10" max="100000" step="500" onChange={setRunsPerMonth} />
            </div>
          </div>

          <aside className="rule-card h-fit p-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-[28px] font-bold tracking-[-0.02em]">
              Estimate
            </h2>
            <dl className="mt-6 divide-y divide-[var(--border)]">
              {[
                ["Selected rate", `$${activeModel.inputCostPerMillion} / $${activeModel.outputCostPerMillion} per 1M`],
                ["Prompt cost", `$${pricing.inputCost}`],
                ["Completion cost", `$${pricing.outputCost}`],
                ["Single API call", `$${pricing.runCost}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-5 py-4 text-[14px]">
                  <dt className="text-[var(--muted)]">{label}</dt>
                  <dd className="text-right font-mono font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-[var(--border)] pt-6">
              <p className="text-[13px] text-[var(--muted)]">Estimated monthly billing</p>
              <p className="mt-2 font-mono text-[44px] font-bold tracking-[-0.04em]">
                ${pricing.totalMonthlyCost}
              </p>
              <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">
                Based on {runsPerMonth.toLocaleString()} calls with the selected token mix.
              </p>
            </div>
            <div className="mt-6 border-t border-[var(--border)] pt-6 text-[12px] leading-relaxed text-[var(--muted)]">
              <p>
                Estimates exclude cached-input discounts, batch/flex/priority modes, grounding, tools, tax, and regional multipliers.
              </p>
              <p className="mt-3">
                * Disclaimer: Calculations are estimates only based on standard API list rates. Neutral Overdrive is not liable for cloud provider billing spikes, service interruptions, or software outcomes.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                {MODEL_SOURCES.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    className="text-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
