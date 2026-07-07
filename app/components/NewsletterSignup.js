"use client";

import { useState } from "react";

export default function NewsletterSignup({
  title = "Get practical AI guides in your inbox",
  compact = false,
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Enter a valid email address.");
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
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const existing = JSON.parse(localStorage.getItem("neutral_subscribers") || "[]");
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem("neutral_subscribers", JSON.stringify(existing));
        }
        setSubmitted(true);
        setEmail("");
      } else {
        setErrorMsg("The signup did not go through. Please try again.");
      }
    } catch (error) {
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rule-card p-6">
        <h3 className="font-serif text-[22px] font-bold tracking-[-0.02em]">
          You are subscribed.
        </h3>
        <p className="body-copy mt-2 text-[14px]">
          New guides, templates, and tool notes will land in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className={`rule-card ${compact ? "p-6" : "p-7 md:p-8"}`}>
      <h3 className="font-serif text-[24px] font-bold leading-tight tracking-[-0.02em]">
        {title}
      </h3>
      <p className="body-copy mt-3 text-[14px]">
        No hype. Just useful tutorials, templates, and tools every week.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          type="email"
          value={email}
          disabled={loading}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="theme-input h-11 w-full px-3 text-[14px]"
        />
        <button type="submit" disabled={loading} className="button-primary w-full">
          {loading ? "Subscribing" : "Subscribe"}
        </button>
      </form>
      {errorMsg && <p className="mt-3 text-[12px] text-[var(--danger)]">{errorMsg}</p>}
      <p className="mt-4 text-[12px] text-[var(--muted)]">
        Join builders and operators who want fewer claims and better examples.
      </p>
    </div>
  );
}
