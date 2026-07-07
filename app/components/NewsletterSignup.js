"use client";

import { useState } from "react";
import { Mail, CheckCircle, Sparkles } from "lucide-react";

export default function NewsletterSignup({ title = "Subscribe to Prompt Injections" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("https://formspree.io/f/mdarjwbv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        // Cache locally in localStorage for backup
        const existing = JSON.parse(localStorage.getItem("neutral_subscribers") || "[]");
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem("neutral_subscribers", JSON.stringify(existing));
        }
        setSubmitted(true);
        setEmail("");
      } else {
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          setErrorMsg(data.errors.map((err) => err.message).join(", "));
        } else {
          setErrorMsg("Oops! There was a problem submitting your email.");
        }
      }
    } catch (err) {
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden w-full bg-[#0a0f1d]/60 border border-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
      {/* Decorative Neon Blurs */}
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-brand-violet/10 rounded-full blur-2xl pointer-events-none" />

      {submitted ? (
        <div className="text-center py-6 animate-pulse flex flex-col items-center gap-3">
          <CheckCircle className="h-10 w-10 text-emerald-400" />
          <h4 className="text-lg font-bold text-white">Subscription Activated!</h4>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            Welcome to Neutral Overdrive. You are now queued to receive prompt bundles and SDK updates directly in your inbox.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-full text-[9px] font-semibold text-brand-cyan tracking-wider uppercase mb-3">
              <Sparkles className="h-3 w-3" /> Core Dev Newsletter
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2">
              {title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly production-grade prompt parameters, camera-panning motion settings, and multi-agent Python scripts. No spam, unsubscribe anytime.
            </p>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative min-w-[240px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-850 focus:border-brand-cyan text-slate-200 text-sm rounded-xl focus:outline-none placeholder:text-slate-600 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="py-2.5 px-6 bg-gradient-to-tr from-brand-cyan to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-black text-xs font-black rounded-xl uppercase tracking-wider transition-all shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 min-w-[110px] text-center"
              >
                {loading ? "Adding..." : "Subscribe"}
              </button>
            </form>
            {errorMsg && (
              <p className="text-[10px] text-red-400 mt-2 font-medium">{errorMsg}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
