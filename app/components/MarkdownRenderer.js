"use client";

import ReactMarkdown from "react-markdown";
import AdUnit from "./AdUnit";
import PromptCard from "./PromptCard";
import CodeBlock from "./CodeBlock";

export default function MarkdownRenderer({ content, prompts = {} }) {
  if (!content) return null;

  // Split content by shortcodes: [[AdUnit: type]] or [[PromptCard: key]]
  const parts = content.split(/(\[\[AdUnit:.*?\]\]|\[\[PromptCard:.*?\]\])/g);

  // Custom component overrides for standard Markdown elements in ReactMarkdown
  const markdownComponents = {
    // Override pre and code elements for our premium CodeBlock
    pre({ children }) {
      return <div className="my-6">{children}</div>;
    },
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !className || !String(children).includes("\n");
      const codeString = String(children).replace(/\n$/, "");

      if (isInline) {
        return (
          <code
            className="bg-slate-950/80 border border-slate-800 text-brand-cyan px-1.5 py-0.5 rounded font-mono text-xs"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <CodeBlock
          code={codeString}
          language={match ? match[1] : "code"}
        />
      );
    },
    // Customize links to look like neon accents
    a({ href, children }) {
      return (
        <a
          href={href}
          className="text-brand-cyan hover:text-cyan-300 underline underline-offset-4 decoration-brand-cyan/40 hover:decoration-cyan-300 transition-colors font-medium"
        >
          {children}
        </a>
      );
    },
    // Customize blockquotes
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-brand-violet pl-4 my-6 italic text-slate-400 bg-slate-950/20 py-2 rounded-r-lg">
          {children}
        </blockquote>
      );
    }
  };

  return (
    <div className="prose prose-invert max-w-none prose-headings:font-sans prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-white prose-li:text-slate-300">
      {parts.map((part, index) => {
        // Match [[AdUnit: type]]
        const adMatch = part.match(/^\[\[AdUnit:\s*(.*?)\s*\]\]$/);
        if (adMatch) {
          const type = adMatch[1];
          return <AdUnit key={`ad-${index}`} type={type} />;
        }

        // Match [[PromptCard: key]]
        const promptMatch = part.match(/^\[\[PromptCard:\s*(.*?)\s*\]\]$/);
        if (promptMatch) {
          const key = promptMatch[1];
          const promptData = prompts[key] || {};
          return (
            <PromptCard
              key={`prompt-${index}`}
              title={promptData.title || "Showcase Input"}
              imageUrl={promptData.imageUrl}
              promptText={promptData.promptText}
              model={promptData.model}
              aspectRatio={promptData.aspectRatio}
              stylize={promptData.stylize}
              seed={promptData.seed}
            />
          );
        }

        // Render standard Markdown chunk
        return (
          <ReactMarkdown key={`md-${index}`} components={markdownComponents}>
            {part}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
