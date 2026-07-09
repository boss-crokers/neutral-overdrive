"use client";

import { Download } from "lucide-react";

export default function DownloadButton({ href, filename, className, children }) {
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error("Failed to fetch resource");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed, falling back to direct link:", err);
      // fallback to normal link/download behavior
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={className}
      style={{ cursor: "pointer" }}
    >
      Download
      <Download className="h-4 w-4" />
    </button>
  );
}
