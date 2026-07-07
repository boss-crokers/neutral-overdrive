"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldAlert, X } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = localStorage.getItem("neutral_cookie_consent");
    if (!hasConsented) {
      // Delay display slightly for premium UX feel
      const timer = setTimeout(() => setShowConsent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("neutral_cookie_consent", "accepted");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("neutral_cookie_consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="glass-panel border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
        
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-brand-cyan mt-0.5">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Cookie Consent & Ad Settings</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              We use cookies to analyze web traffic and personalize our sponsorships. By clicking accept, you consent to third-party cookies as detailed in our{" "}
              <Link href="/privacy" className="text-brand-cyan hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={handleDecline}
            className="px-4 py-2 hover:bg-slate-900 border border-transparent rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-brand-cyan hover:bg-cyan-400 text-black rounded-lg transition-colors shadow-lg hover:shadow-cyan-500/20"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
