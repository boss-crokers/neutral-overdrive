"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("neutral_cookie_consent");
    if (!hasConsented) {
      const timer = setTimeout(() => setShowConsent(true), 4500);
      return () => clearTimeout(timer);
    }
  }, []);

  const choose = (value) => {
    localStorage.setItem("neutral_cookie_consent", value);
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-[430px]">
      <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
        <h4 className="font-serif text-[20px] font-bold tracking-[-0.02em]">
          Cookie settings
        </h4>
        <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">
          We use analytics and sponsorship cookies to understand what readers use. Read the{" "}
          <Link href="/privacy" className="text-link">
            privacy policy
          </Link>
          .
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="button-secondary min-h-9 px-4 text-[13px]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="button-primary min-h-9 px-4 text-[13px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
