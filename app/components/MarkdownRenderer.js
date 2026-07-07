"use client";

import ReactMarkdown from "react-markdown";
import AdUnit from "./AdUnit";
import PromptCard from "./PromptCard";
import CodeBlock from "./CodeBlock";

export default function MarkdownRenderer({ content, prompts = {} }) {
  if (!content) return null;

  const parts = content.split(/(\[\[AdUnit:.*?\]\]|\[\[PromptCard:.*?\]\])/g);

  const markdownComponents = {
    pre({ children }) {
      return <div className="my-7">{children}</div>;
    },
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !className || !String(children).includes("\n");
      const codeString = String(children).replace(/\n$/, "");

      if (isInline) {
        return (
          <code {...props}>
            {children}
          </code>
        );
      }

      return <CodeBlock code={codeString} language={match ? match[1] : "code"} />;
    },
    a({ href, children }) {
      return (
        <a href={href} className="text-link">
          {children}
        </a>
      );
    },
  };

  return (
    <div className="prose prose-neutral max-w-none">
      {parts.map((part, index) => {
        const adMatch = part.match(/^\[\[AdUnit:\s*(.*?)\s*\]\]$/);
        if (adMatch) {
          return <AdUnit key={`ad-${index}`} type={adMatch[1]} />;
        }

        const promptMatch = part.match(/^\[\[PromptCard:\s*(.*?)\s*\]\]$/);
        if (promptMatch) {
          const promptData = prompts[promptMatch[1]] || {};
          return (
            <PromptCard
              key={`prompt-${index}`}
              title={promptData.title || "Example prompt"}
              imageUrl={promptData.imageUrl}
              promptText={promptData.promptText}
              model={promptData.model}
              aspectRatio={promptData.aspectRatio}
              stylize={promptData.stylize}
              seed={promptData.seed}
            />
          );
        }

        return (
          <ReactMarkdown key={`md-${index}`} components={markdownComponents}>
            {part}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
