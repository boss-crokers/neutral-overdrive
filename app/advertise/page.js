"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const packages = [
  ["Article sponsor", "A clearly labeled sponsor placement near relevant guides."],
  ["Newsletter sponsor", "A sponsor mention in the weekly guide digest."],
  ["Resource listing", "A reviewed listing in the resource directory."],
];

export default function AdvertisePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <div>
      <section className="site-container border-b border-[var(--border)] py-9 md:py-12">
        <Link href="/" className="text-link inline-flex items-center gap-2 text-[14px]">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="display-heading mt-8 max-w-[900px] text-[clamp(42px,6vw,72px)]">
          Reach people building AI workflows.
        </h1>
        <p className="body-copy mt-5 max-w-[720px] text-[17px]">
          Sponsor practical guides, templates, and tools read by operators who compare models, test prompts, and ship AI-enabled work.
        </p>
      </section>

      <section className="site-container page-section">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-serif text-[32px] font-bold tracking-[-0.025em]">
              Sponsorship options
            </h2>
            <div className="mt-6 divide-y divide-[var(--border)]">
              {packages.map(([name, description]) => (
                <div key={name} className="py-5">
                  <h3 className="text-[18px] font-semibold">{name}</h3>
                  <p className="body-copy mt-2 text-[15px]">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rule-card p-6">
            {formSubmitted ? (
              <div>
                <h2 className="font-serif text-[30px] font-bold tracking-[-0.02em]">
                  Inquiry received.
                </h2>
                <p className="body-copy mt-3">
                  We will reply at {formData.email} with availability and fit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-serif text-[30px] font-bold tracking-[-0.02em]">
                  Send an inquiry
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-[13px] font-semibold">
                    Name
                    <input
                      required
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      className="theme-input mt-2 h-11 w-full px-3"
                    />
                  </label>
                  <label className="block text-[13px] font-semibold">
                    Work email
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      className="theme-input mt-2 h-11 w-full px-3"
                    />
                  </label>
                </div>
                <label className="block text-[13px] font-semibold">
                  Company
                  <input
                    value={formData.company}
                    onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                    className="theme-input mt-2 h-11 w-full px-3"
                  />
                </label>
                <label className="block text-[13px] font-semibold">
                  What would you like to sponsor?
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    className="theme-input mt-2 w-full resize-none px-3 py-3"
                  />
                </label>
                <button type="submit" className="button-primary">
                  Submit inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
