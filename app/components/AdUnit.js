"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AdUnit({ type = "in-article-banner" }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!visible || !mounted) return null;

  // Render ad units based on their type
  // Standard fixed ad slot sizes to avoid Cumulative Layout Shift (CLS)
  if (type === "top-leaderboard") {
    return (
      <div className="flex flex-col items-center my-6">
        <span className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">
          Advertisement
        </span>
        {/* Exact reserved dimensions: Desktop 728x90, Mobile 320x50 */}
        <div className="relative w-[320px] h-[50px] md:w-[728px] md:h-[90px] bg-slate-950/60 border border-dashed border-slate-800 rounded-lg flex items-center justify-center overflow-hidden transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/10 to-transparent animate-pulse" />
          <div className="text-center z-10">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Premium Banner Ad
            </p>
            <p className="text-[9px] text-slate-600 font-mono">
              <span className="md:hidden">320 x 50 (Mobile)</span>
              <span className="hidden md:inline">728 x 90 (Leaderboard)</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "sidebar-skyscraper") {
    return (
      <div className="flex flex-col items-center sticky top-24">
        <span className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">
          Advertisement
        </span>
        {/* Exact reserved dimensions: 300x600 Skyscraper */}
        <div className="w-[300px] h-[600px] bg-slate-950/60 border border-dashed border-slate-800 rounded-lg flex flex-col items-center justify-center p-4 overflow-hidden transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
              Sponsor Showcase
            </p>
            <div className="w-16 h-16 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500 text-xs">
              Ad Logo
            </div>
            <p className="text-xs text-slate-500 mb-2">Placeholder Slot</p>
            <p className="text-[9px] text-slate-600 font-mono">300 x 600 (Skyscraper)</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "in-article-banner") {
    return (
      <div className="flex flex-col items-center my-8">
        <span className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">
          Sponsored Link
        </span>
        {/* Exact reserved dimensions: Desktop 336x280, Mobile 300x250 */}
        <div className="w-[300px] h-[250px] md:w-[336px] md:h-[280px] bg-slate-950/60 border border-dashed border-slate-800 rounded-lg flex items-center justify-center overflow-hidden transition-all shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
          <div className="text-center p-4">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Inline Contextual Ad
            </p>
            <p className="text-xs text-slate-500 max-w-[240px] mb-3 mx-auto">
              This unit is formatted to prevent Cumulative Layout Shift (CLS) on dynamic load.
            </p>
            <p className="text-[9px] text-slate-600 font-mono">
              <span className="md:hidden">300 x 250 (Mobile Rect)</span>
              <span className="hidden md:inline">336 x 280 (Large Rect)</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "bottom-anchor") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-md py-2 shadow-2xl animate-slide-up">
        <div className="relative flex flex-col items-center">
          {/* Dismiss button */}
          <button
            onClick={() => setVisible(false)}
            className="absolute -top-3 -right-3 md:-right-6 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-full p-1 transition-colors shadow-lg"
            aria-label="Dismiss ad"
          >
            <X className="h-3 w-3" />
          </button>
          
          <span className="text-[9px] text-slate-500 tracking-widest uppercase mb-1">
            Sponsored Overlay
          </span>
          {/* Exact reserved dimensions: Desktop 728x90, Mobile 320x50 */}
          <div className="w-[320px] h-[50px] md:w-[728px] md:h-[90px] bg-slate-950/80 border border-dashed border-slate-800 rounded flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Sticky Anchor Ad
              </p>
              <p className="text-[8px] md:text-[9px] text-slate-600 font-mono">
                <span className="md:hidden">320 x 50 (Mobile Overlay)</span>
                <span className="hidden md:inline">728 x 90 (Desktop Anchor)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
