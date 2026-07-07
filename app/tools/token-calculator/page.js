"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdUnit from "../../components/AdUnit";
import { ArrowLeft, Calculator, Sparkles, Cpu, HelpCircle } from "lucide-react";

const MODELS = [
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    inputCostPerMillion: 0.075,
    outputCostPerMillion: 0.30,
    contextWindow: "1M tokens"
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    inputCostPerMillion: 1.25,
    outputCostPerMillion: 5.00,
    contextWindow: "2M tokens"
  },
  {
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    inputCostPerMillion: 1.00,
    outputCostPerMillion: 5.00,
    contextWindow: "200k tokens"
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    inputCostPerMillion: 3.00,
    outputCostPerMillion: 15.00,
    contextWindow: "200k tokens"
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    inputCostPerMillion: 0.15,
    outputCostPerMillion: 0.60,
    contextWindow: "128k tokens"
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    inputCostPerMillion: 2.50,
    outputCostPerMillion: 10.00,
    contextWindow: "128k tokens"
  }
];

export default function TokenCalculator() {
  const [selectedModelId, setSelectedModelId] = useState(MODELS[0].id);
  const [inputTokens, setInputTokens] = useState(15000);
  const [outputTokens, setOutputTokens] = useState(5000);
  const [runsPerMonth, setRunsPerMonth] = useState(1000);
  const [pricing, setPricing] = useState({ inputCost: 0, outputCost: 0, runCost: 0, totalMonthlyCost: 0 });

  const activeModel = MODELS.find((m) => m.id === selectedModelId) || MODELS[0];

  useEffect(() => {
    // Calculate cost metrics
    const inputCost = (inputTokens / 1_000_000) * activeModel.inputCostPerMillion;
    const outputCost = (outputTokens / 1_000_000) * activeModel.outputCostPerMillion;
    const runCost = inputCost + outputCost;
    const totalMonthlyCost = runCost * runsPerMonth;

    setPricing({
      inputCost: inputCost.toFixed(5),
      outputCost: outputCost.toFixed(5),
      runCost: runCost.toFixed(4),
      totalMonthlyCost: totalMonthlyCost.toFixed(2)
    });
  }, [selectedModelId, inputTokens, outputTokens, runsPerMonth, activeModel]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main interactive area */}
        <div className="flex-1 w-full bg-[#0a0f1d]/40 border border-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="mb-10 pb-6 border-b border-slate-900 flex items-center gap-3">
            <span className="p-2.5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Calculator className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-white">AI API Token Cost Calculator</h1>
              <p className="text-sm text-slate-400 mt-1">Estimate developer API billing fees dynamically across leading LLM providers.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Form Fields */}
            <div className="space-y-6">
              {/* Select Model */}
              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                  Select AI Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModelId(model.id)}
                      className={`p-4 text-left rounded-2xl border transition-all ${
                        selectedModelId === model.id
                          ? "bg-brand-cyan/5 border-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.1)] text-white"
                          : "bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="block text-xs text-slate-500 font-mono tracking-wider mb-1">
                        {model.provider}
                      </span>
                      <span className="block font-bold text-sm">
                        {model.name}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-2 font-mono">
                        Ctx: {model.contextWindow}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Tokens */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                    Input (Prompt) Tokens
                  </label>
                  <input
                    type="number"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-right text-xs font-mono focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <input
                  type="range"
                  min="100"
                  max="200000"
                  step="500"
                  value={inputTokens}
                  onChange={(e) => setInputTokens(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>100 tkn</span>
                  <span>100k tkn</span>
                  <span>200k tkn</span>
                </div>
              </div>

              {/* Output Tokens */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                    Output (Completion) Tokens
                  </label>
                  <input
                    type="number"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-right text-xs font-mono focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <input
                  type="range"
                  min="50"
                  max="64000"
                  step="100"
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>50 tkn</span>
                  <span>32k tkn</span>
                  <span>64k tkn</span>
                </div>
              </div>

              {/* Runs per Month */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                    API Calls / Month
                  </label>
                  <input
                    type="number"
                    value={runsPerMonth}
                    onChange={(e) => setRunsPerMonth(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-right text-xs font-mono focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <input
                  type="range"
                  min="10"
                  max="100000"
                  step="500"
                  value={runsPerMonth}
                  onChange={(e) => setRunsPerMonth(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>10 calls</span>
                  <span>50k calls</span>
                  <span>100k calls</span>
                </div>
              </div>
            </div>

            {/* Calculations Dashboard Output */}
            <div className="bg-[#070b16] border border-slate-900 rounded-2xl p-6 flex flex-col justify-between shadow-inner">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-semibold text-brand-cyan tracking-wider uppercase">
                  <Sparkles className="h-3 w-3" /> Estimate Metrics
                </span>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-900/60">
                    <span className="text-xs text-slate-400">Selected Model Rate (In / Out)</span>
                    <span className="text-xs font-mono font-semibold text-white">
                      ${activeModel.inputCostPerMillion} / ${activeModel.outputCostPerMillion} <span className="text-[10px] text-slate-500">per 1M</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-900/60">
                    <span className="text-xs text-slate-400">Estimated Prompt Cost</span>
                    <span className="text-xs font-mono font-semibold text-slate-200">${pricing.inputCost}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-900/60">
                    <span className="text-xs text-slate-400">Estimated Completion Cost</span>
                    <span className="text-xs font-mono font-semibold text-slate-200">${pricing.outputCost}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-900">
                    <span className="text-xs font-bold text-slate-300">Cost Per Single API Call</span>
                    <span className="text-sm font-mono font-bold text-brand-cyan">${pricing.runCost}</span>
                  </div>
                </div>
              </div>

              {/* Total Monthly Projection */}
              <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col justify-center text-center bg-slate-950/40 p-4 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">
                  Estimated Monthly Billing
                </span>
                <span className="text-4xl font-mono font-black text-white glow-cyan tracking-tight">
                  ${pricing.totalMonthlyCost}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-2">
                  Projected across {runsPerMonth.toLocaleString()} automated calls
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Advertisement Slot */}
        <aside className="w-full lg:w-[300px] flex-shrink-0 flex flex-col items-center gap-6">
          <div className="w-full p-6 bg-[#0a0f1d]/40 border border-slate-900 rounded-2xl flex flex-col gap-4 text-center">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Direct Tool Sponsorship
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Advertise your dev tool directly on this high-traffic calculator. Reaching 50,000+ AI developers monthly.
            </p>
            <Link
              href="/advertise"
              className="py-2.5 bg-brand-cyan hover:bg-cyan-400 text-black text-xs font-extrabold rounded-lg tracking-wider uppercase transition-colors"
            >
              Book Sponsorship Slot
            </Link>
          </div>
          <AdUnit type="sidebar-skyscraper" />
        </aside>
      </div>
    </div>
  );
}
