"use client";

import { useState } from "react";
import { Copy, Check, Info } from "lucide-react";

export default function PromptCard({
  imageUrl = "",
  promptText = "",
  model = "Midjourney v6",
  aspectRatio = "16:9",
  seed = "N/A",
  stylize = "250",
  title = "Generated Output"
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy prompt: ", err);
    }
  };

  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-hidden my-8 shadow-2xl flex flex-col md:flex-row group hover:border-slate-700/80 transition-all duration-300">
      
      {/* Image Section - Left/Top */}
      <div className="w-full md:w-1/2 aspect-video md:aspect-square relative bg-slate-950 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-purple-950/20 to-cyan-950/20 flex items-center justify-center text-slate-500 text-xs">
            No image provided
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] text-brand-cyan font-bold tracking-widest uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-full">
            {model}
          </span>
        </div>
      </div>

      {/* Details Section - Right/Bottom */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between gap-6 bg-gradient-to-b from-[#0d1224] to-[#0a0f1d]">
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              System Prompt
            </h4>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-lg px-2.5 py-1.5 transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          {/* Prompt Box */}
          <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl text-sm font-mono text-slate-300 select-all leading-relaxed break-words shadow-inner">
            {promptText}
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="border-t border-slate-800/60 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Info className="h-3.5 w-3.5 text-brand-cyan" />
            <span className="font-semibold uppercase tracking-wider">Parameters</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-950/40 border border-slate-800/40 rounded-lg p-2.5">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">
                Aspect Ratio
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {aspectRatio}
              </span>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/40 rounded-lg p-2.5">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">
                Stylize
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {stylize}
              </span>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/40 rounded-lg p-2.5">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-0.5">
                Seed
              </span>
              <span className="text-xs font-mono font-bold text-white truncate max-w-full block">
                {seed}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
