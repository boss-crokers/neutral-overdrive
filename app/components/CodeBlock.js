"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Simple, extremely fast regex-based highlighter matching our dark/neon tech theme
function highlight(code, language = "") {
  if (!code) return "";
  
  // Escape HTML entities first to prevent rendering issues
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  if (language === "javascript" || language === "js" || language === "typescript" || language === "ts") {
    return escaped
      // Keywords (cyan)
      .replace(/\b(const|let|var|function|return|import|export|default|from|async|await|try|catch|if|else|for|while|new|class|extends|of|in|instanceof|typeof)\b/g, '<span class="text-brand-cyan font-bold">$1</span>')
      // Strings (violet)
      .replace(/(["'`])(.*?)\1/g, '<span class="text-brand-violet">$1$2$1</span>')
      // Comments (gray)
      .replace(/(\/\/.*)/g, '<span class="text-slate-500 italic">$1</span>')
      // Built-ins / Globals (cyan-400)
      .replace(/\b(console|log|error|window|document|process|require|module|React|useState|useEffect|useRef)\b/g, '<span class="text-cyan-400 font-semibold">$1</span>')
      // Numbers (orange)
      .replace(/\b(\d+)\b/g, '<span class="text-amber-500">$1</span>');
  }

  if (language === "python" || language === "py") {
    return escaped
      // Keywords (cyan)
      .replace(/\b(def|return|import|from|as|class|self|if|elif|else|for|while|in|try|except|with|async|await|lambda|print)\b/g, '<span class="text-brand-cyan font-bold">$1</span>')
      // Strings (violet)
      .replace(/(["'])(.*?)\1/g, '<span class="text-brand-violet">$1$2$1</span>')
      // Comments (gray)
      .replace(/(#.*)/g, '<span class="text-slate-500 italic">$1</span>')
      // Numbers (orange)
      .replace(/\b(\d+)\b/g, '<span class="text-amber-500">$1</span>');
  }

  if (language === "json" || language === "yaml" || language === "yml") {
    return escaped
      // Keys (cyan)
      .replace(/"([^"]+)":/g, '<span class="text-brand-cyan font-semibold">"$1"</span>:')
      // String Values (violet)
      .replace(/: \s*"(.*?)"/g, ': <span class="text-brand-violet">"$1"</span>')
      // Number & Boolean Values (orange)
      .replace(/: \s*(true|false|null|\d+)/g, ': <span class="text-amber-500">$1</span>');
  }

  // Fallback (generic syntax coloring)
  return escaped;
}

export default function CodeBlock({ code, language = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const highlightedHtml = highlight(code, language);

  return (
    <div className="w-full bg-[#080c19] border border-slate-800 rounded-xl overflow-hidden my-6 shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1226]/80 border-b border-slate-900">
        {/* Mac OS Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
          {language && (
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest ml-3">
              {language}
            </span>
          )}
        </div>
        
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-lg px-2.5 py-1.5 transition-all focus:outline-none"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-slate-300">
        <pre className="m-0">
          <code
            dangerouslySetInnerHTML={{ __html: highlightedHtml || code }}
            className="block whitespace-pre"
          />
        </pre>
      </div>
    </div>
  );
}
