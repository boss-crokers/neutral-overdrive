'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Layers, HelpCircle, Copy, Check, Info, FileText } from 'lucide-react';

const DEFAULT_TEXT = `Agentic RAG (Retrieval-Augmented Generation) is an advanced pattern where LLMs are given tools to search, evaluate, and iteratively query databases rather than relying on a single static search step.

Unlike standard RAG, which retrieves documents once and passes them directly to the generation model, an agentic loop uses routing to determine which search queries are necessary. It can read a document, evaluate if it answers the question, and if not, execute a secondary search with refined queries.

This iterative process dramatically improves performance for complex analysis but increases API costs and token consumption. Selecting the right chunk size and overlap is key: larger chunks provide more context but consume more tokens, while smaller chunks save tokens but risk losing critical context boundary relationships.`;

export default function RagVisualizer() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [strategy, setStrategy] = useState('recursive'); // 'fixed-char', 'words', 'recursive'
  const [chunkSize, setChunkSize] = useState(150);
  const [chunkOverlap, setChunkOverlap] = useState(30);
  const [hoveredChunkIdx, setHoveredChunkIdx] = useState(null);
  const [selectedChunkIdx, setSelectedChunkIdx] = useState(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Enforce validation constraints
  const validatedSize = Math.max(10, chunkSize);
  const validatedOverlap = Math.min(Math.max(0, chunkOverlap), validatedSize - 5);

  // Simple token estimator (~4 characters per token)
  const estimateTokens = (txt) => {
    return Math.max(1, Math.round(txt.length / 4.1));
  };

  // Chunking Algorithms
  const chunks = useMemo(() => {
    if (!text.trim()) return [];

    if (strategy === 'fixed-char') {
      const result = [];
      const step = Math.max(1, validatedSize - validatedOverlap);
      let i = 0;
      while (i < text.length) {
        const chunkText = text.substring(i, i + validatedSize);
        result.push({
          id: result.length,
          text: chunkText,
          start: i,
          end: i + chunkText.length,
          tokens: estimateTokens(chunkText),
          chars: chunkText.length,
          words: chunkText.trim().split(/\s+/).filter(Boolean).length
        });
        i += step;
      }
      return result;
    }

    if (strategy === 'words') {
      const wordsOnly = text.trim().split(/\s+/).filter(Boolean);
      if (wordsOnly.length === 0) return [];

      const result = [];
      const step = Math.max(1, validatedSize - validatedOverlap);
      let i = 0;
      while (i < wordsOnly.length) {
        const chunkWords = wordsOnly.slice(i, i + validatedSize);
        const chunkText = chunkWords.join(' ');
        result.push({
          id: result.length,
          text: chunkText,
          start: text.indexOf(chunkText), // approximate
          end: text.indexOf(chunkText) + chunkText.length,
          tokens: estimateTokens(chunkText),
          chars: chunkText.length,
          words: chunkWords.length
        });
        i += step;
      }
      return result;
    }

    // Recursive Character Chunking
    if (strategy === 'recursive') {
      const separators = ["\n\n", "\n", " ", ""];
      
      const splitText = (txt, separatorIdx = 0) => {
        if (txt.length <= validatedSize) {
          return [txt];
        }
        if (separatorIdx >= separators.length) {
          // Fallback to absolute splitting
          const res = [];
          const step = Math.max(1, validatedSize - validatedOverlap);
          for (let i = 0; i < txt.length; i += step) {
            res.push(txt.substring(i, i + validatedSize));
          }
          return res;
        }

        const separator = separators[separatorIdx];
        const parts = txt.split(separator);
        const runs = [];
        let currentRun = "";

        for (let part of parts) {
          const checkTxt = currentRun ? currentRun + separator + part : part;
          if (checkTxt.length <= validatedSize) {
            currentRun = checkTxt;
          } else {
            if (currentRun) {
              runs.push(currentRun);
            }
            if (part.length > validatedSize) {
              const subSplit = splitText(part, separatorIdx + 1);
              runs.push(...subSplit);
              const lastSub = subSplit[subSplit.length - 1];
              currentRun = lastSub.substring(Math.max(0, lastSub.length - validatedOverlap));
            } else {
              currentRun = part;
            }
          }
        }
        if (currentRun) {
          runs.push(currentRun);
        }

        // Consolidated overlap merge
        const finalChunks = [];
        let buffer = "";
        for (let run of runs) {
          if (!buffer) {
            buffer = run;
          } else if ((buffer + separator + run).length <= validatedSize) {
            buffer = buffer + separator + run;
          } else {
            finalChunks.push(buffer);
            const overlapText = buffer.substring(Math.max(0, buffer.length - validatedOverlap));
            buffer = overlapText + separator + run;
          }
        }
        if (buffer) {
          finalChunks.push(buffer);
        }
        return finalChunks;
      };

      const rawChunks = splitText(text);
      return rawChunks.map((chunkTxt, idx) => ({
        id: idx,
        text: chunkTxt,
        tokens: estimateTokens(chunkTxt),
        chars: chunkTxt.length,
        words: chunkTxt.trim().split(/\s+/).filter(Boolean).length
      }));
    }

    return [];
  }, [text, strategy, validatedSize, validatedOverlap]);

  // Aggregate metrics
  const totalTokens = useMemo(() => {
    return chunks.reduce((sum, c) => sum + c.tokens, 0);
  }, [chunks]);

  const sourceTokens = useMemo(() => {
    return estimateTokens(text);
  }, [text]);

  const tokenInflation = useMemo(() => {
    if (sourceTokens === 0) return 0;
    return Math.round(((totalTokens - sourceTokens) / sourceTokens) * 100);
  }, [sourceTokens, totalTokens]);

  // Embedding pricing data
  const pricingData = useMemo(() => {
    const rateGemini = 0.02; // Per 1M tokens
    const rateOpenAI = 0.02;
    const rateCohere = 0.10;

    return [
      {
        provider: 'Google Gemini',
        model: 'text-embedding-004',
        rate: `$${rateGemini.toFixed(3)}`,
        cost: (totalTokens / 1_000_000) * rateGemini,
      },
      {
        provider: 'OpenAI',
        model: 'text-embedding-3-small',
        rate: `$${rateOpenAI.toFixed(3)}`,
        cost: (totalTokens / 1_000_000) * rateOpenAI,
      },
      {
        provider: 'Cohere',
        model: 'embed-english-v3.0',
        rate: `$${rateCohere.toFixed(3)}`,
        cost: (totalTokens / 1_000_000) * rateCohere,
      }
    ];
  }, [totalTokens]);

  const copyToClipboard = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm h-[500px] flex items-center justify-center font-sans text-neutral-800 dark:text-neutral-100">
        <div className="text-[var(--muted)] text-[14px] animate-pulse">Loading RAG visualizer...</div>
      </div>
    );
  }

  // Pre-defined color classes for highlighting chunks in the text list
  const getChunkColor = (idx) => {
    const bgColors = [
      'bg-blue-100 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200',
      'bg-indigo-100 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200',
      'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200',
      'bg-amber-100 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200',
      'bg-purple-100 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900/60 text-purple-900 dark:text-purple-200',
      'bg-rose-100 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
    ];
    return bgColors[idx % bgColors.length];
  };

  const getBorderColorClass = (idx) => {
    const borderColors = [
      'border-blue-500 text-blue-500 dark:text-blue-400',
      'border-indigo-500 text-indigo-500 dark:text-indigo-400',
      'border-emerald-500 text-emerald-500 dark:text-emerald-400',
      'border-amber-500 text-amber-500 dark:text-amber-400',
      'border-purple-500 text-purple-500 dark:text-purple-400',
      'border-rose-500 text-rose-500 dark:text-rose-400'
    ];
    return borderColors[idx % borderColors.length];
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm font-sans text-neutral-800 dark:text-neutral-100">
      
      {/* Overview Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Chunks</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
            {chunks.length}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Source Tokens</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
            {sourceTokens.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Embedded Tokens</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {totalTokens.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Overlap Inflation</p>
          <p className={`text-2xl font-bold mt-1 ${tokenInflation > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-900 dark:text-white'}`}>
            +{tokenInflation}%
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Control Column */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Strategy Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Chunking Strategy</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStrategy('recursive')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  strategy === 'recursive'
                    ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                Recursive
              </button>
              <button
                type="button"
                onClick={() => setStrategy('fixed-char')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  strategy === 'fixed-char'
                    ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                Char Count
              </button>
              <button
                type="button"
                onClick={() => setStrategy('words')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  strategy === 'words'
                    ? 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                Word Count
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 leading-normal">
              {strategy === 'recursive' && 'Tries to keep paragraphs and sentences whole first, falling back to spaces and characters.'}
              {strategy === 'fixed-char' && 'Hard partition of string strictly every N characters.'}
              {strategy === 'words' && 'Splits strictly by word counts based on spacing.'}
            </p>
          </div>

          {/* Size Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-neutral-700 dark:text-neutral-300">
                Chunk Size: {chunkSize} {strategy === 'words' ? 'words' : 'chars'}
              </span>
            </div>
            <input
              type="range"
              min={strategy === 'words' ? "10" : "50"}
              max={strategy === 'words' ? "200" : "800"}
              step={strategy === 'words' ? "5" : "10"}
              value={chunkSize}
              onChange={(e) => {
                const val = Number(e.target.value);
                setChunkSize(val);
                if (chunkOverlap >= val) {
                  setChunkOverlap(Math.max(0, val - 10));
                }
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Overlap Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-neutral-700 dark:text-neutral-300">
                Overlap Size: {chunkOverlap} {strategy === 'words' ? 'words' : 'chars'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(0, chunkSize - 10)}
              step={strategy === 'words' ? "2" : "5"}
              value={chunkOverlap}
              onChange={(e) => setChunkOverlap(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-500 leading-normal">
              Overlap keeps semantic context linking adjacent chunks, but increases token inflation.
            </p>
          </div>

          {/* Input Text box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Source Document</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="6"
              className="w-full text-xs p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-100 font-mono resize-none leading-relaxed"
              placeholder="Paste raw text here..."
            />
          </div>

          {/* Cost Estimates Matrix */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-blue-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Embedding Cost Estimation
              </h3>
            </div>
            <div className="space-y-3">
              {pricingData.map((row) => (
                <div key={row.provider} className="flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">{row.provider}</p>
                    <p className="text-[10px] text-neutral-500">{row.model} ({row.rate}/1M)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-neutral-900 dark:text-white">
                      ${row.cost < 0.00001 && row.cost > 0 ? '< 0.00001' : row.cost.toFixed(5)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-start gap-1.5 text-[10px] text-neutral-500 leading-normal">
              <Info className="h-3.5 w-3.5 flex-shrink-0 text-neutral-400 mt-0.5" />
              <p>
                Calculated as <code>Chunks × Chunk Tokens</code> embedded. Overlap compounding causes the sum of chunk tokens to exceed raw text token length.
              </p>
            </div>
          </div>

        </div>

        {/* Right Preview Work area */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Segmented Chunk Blocks ({chunks.length})
              </h2>
            </div>
            <span className="text-[11px] text-neutral-500">
              Hover over a block to highlight details. Click to copy contents.
            </span>
          </div>

          {/* Chunk Cards Stream */}
          <div className="flex-1 max-h-[580px] overflow-y-auto pr-2 space-y-3 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-950/20">
            {chunks.length === 0 ? (
              <div className="h-full flex items-center justify-center text-neutral-500 text-xs py-12">
                Paste some text or adjust size settings to visualize chunk distribution.
              </div>
            ) : (
              chunks.map((chunk, index) => {
                const isHovered = hoveredChunkIdx === index;
                const isSelected = selectedChunkIdx === index;
                const colorClass = getChunkColor(index);
                const borderClass = getBorderColorClass(index);

                return (
                  <article
                    key={chunk.id}
                    onMouseEnter={() => setHoveredChunkIdx(index)}
                    onMouseLeave={() => setHoveredChunkIdx(null)}
                    onClick={() => {
                      setSelectedChunkIdx(isSelected ? null : index);
                      copyToClipboard(chunk.text);
                    }}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 relative group ${colorClass} ${
                      isHovered ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-neutral-950 scale-[1.01]' : ''
                    } ${isSelected ? 'ring-2 ring-offset-2 ring-emerald-500 dark:ring-offset-neutral-950' : ''}`}
                  >
                    {/* Header info */}
                    <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-black/5 dark:border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-85">
                        Chunk {index + 1}
                      </span>
                      <div className="flex items-center gap-3 text-[10px] font-mono opacity-75">
                        <span>{chunk.chars} Chars</span>
                        <span>{chunk.words} Words</span>
                        <span>~{chunk.tokens} Tokens</span>
                      </div>
                    </div>

                    {/* Snippet text */}
                    <p className="text-[13px] leading-relaxed font-sans whitespace-pre-wrap select-all">
                      {chunk.text}
                    </p>

                    {/* Hover copy indicator */}
                    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
                      {copied && isSelected ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Click to Copy</span>
                        </>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Quick tips footer */}
          <div className="text-[11px] leading-relaxed text-neutral-500 bg-neutral-50 dark:bg-neutral-950 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <h4 className="font-semibold text-neutral-700 dark:text-neutral-300 mb-1">RAG Fine-Tuning Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>For search over complex API structures, standard chunk ranges of <strong>100–300 tokens</strong> are recommended.</li>
              <li>A high overlap (e.g. 15-20%) preserves continuity but leads to token redundancy. Check the <strong>Overlap Inflation</strong> metric to balance indexing costs vs. query quality.</li>
              <li>Recursive chunking is strongly preferred for long essays or manuals to avoid breaking mathematical equations or code blocks.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
