"use client";

const SHOW_MOCK_ADS = false;

const sizes = {
  "top-leaderboard": "h-[90px] max-w-[728px]",
  "sidebar-skyscraper": "h-[600px] w-[300px]",
  "in-article-banner": "h-[280px] max-w-[336px]",
  "bottom-anchor": "h-[72px] max-w-[728px]",
};

export default function AdUnit({ type = "in-article-banner" }) {
  if (!SHOW_MOCK_ADS) return null;

  return (
    <div className="my-6 flex justify-center">
      <div
        className={`flex w-full items-center justify-center rounded-[8px] border border-dashed border-[var(--border-strong)] bg-[var(--surface-subtle)] text-[12px] text-[var(--muted)] ${sizes[type] || sizes["in-article-banner"]}`}
      >
        Sponsored placement
      </div>
    </div>
  );
}
