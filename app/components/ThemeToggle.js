"use client";

const STORAGE_KEY = "neutral_overdrive_theme";
const THEME_EVENT = "neutral-overdrive-theme";

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("theme-graphite", theme === "graphite");
  root.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function ThemeToggle() {
  return (
    <div
      className="grid grid-cols-2 overflow-hidden rounded-[4px] border border-[var(--border-strong)] bg-[var(--surface)] text-[12px]"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => applyTheme("light")}
        className="theme-segment theme-segment-light min-w-[78px] px-3 py-2 transition-colors"
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => applyTheme("graphite")}
        className="theme-segment theme-segment-graphite min-w-[78px] px-3 py-2 transition-colors"
      >
        Graphite
      </button>
    </div>
  );
}
