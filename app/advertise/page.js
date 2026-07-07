"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Megaphone, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";

export default function AdvertisePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", budget: "under-1000", message: "" });

  const stats = [
    { value: "150K+", label: "Monthly Pageviews" },
    { value: "45K+", label: "Subscribed Developers" },
    { value: "3.2%", label: "Average Ad CTR" },
    { value: "$125", label: "Estimated RPM" }
  ];

  const packages = [
    {
      name: "Standard Skyscraper",
      specs: "300 x 600 px Sticky Sidebar",
      price: "$20 / CPM",
      features: ["Sticky desktop placement", "Rotates across all articles", "Zero CLS styling reserved"]
    },
    {
      name: "Inline Article Sponsor",
      specs: "336 x 280 px Box Ad",
      price: "$25 / CPM",
      features: ["Placed inside body content", "High CTR positioning", "Targeted by category keyword"]
    },
    {
      name: "Weekly Newsletter Blast",
      specs: "Email Sponsor Banner",
      price: "$500 / Issue",
      features: ["Exclusive single-sponsor", "Sent to 45,000+ developer inbox", "Includes custom copy prompt"]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-wider"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <div className="bg-[#0a0f1d]/40 border border-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        <header className="mb-10 pb-6 border-b border-slate-900 flex items-center gap-3">
          <span className="p-2.5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-xl text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Megaphone className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Direct Sponsorship Booking</h1>
            <p className="text-sm text-slate-400 mt-1">Get your product in front of developers, prompt engineers, and AI managers.</p>
          </div>
        </header>

        {/* Dynamic Traffic Stats */}
        <section className="mb-12">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-6">
            Audience Traffic Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-5 bg-slate-950/60 border border-slate-900 rounded-2xl text-center shadow-inner">
                <span className="block text-3xl font-extrabold text-white font-mono glow-cyan mb-1">
                  {stat.value}
                </span>
                <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="mb-12">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-6">
            Sponsorship Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.name} className="p-6 bg-slate-950/40 border border-slate-900 rounded-2xl flex flex-col justify-between hover:border-slate-800 transition-colors">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{pkg.name}</h4>
                  <span className="text-[10px] text-brand-cyan font-mono font-bold tracking-wider">
                    {pkg.specs}
                  </span>
                  
                  <div className="my-4 text-2xl font-black text-white font-mono">
                    {pkg.price}
                  </div>

                  <ul className="space-y-2 border-t border-slate-900/60 pt-4 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-violet block" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Booking Form */}
        <section className="border-t border-slate-900 pt-10">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-white text-center mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="h-5 w-5 text-brand-cyan" /> Campaign Inquiry Form
            </h3>
            <p className="text-xs text-slate-400 text-center mb-8">
              Submit your budget and specs, and our advertising team will reply with inventory availability in 24 hours.
            </p>

            {formSubmitted ? (
              <div className="p-8 bg-slate-950/60 border border-brand-cyan/20 rounded-2xl text-center shadow-inner animate-pulse">
                <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-2">Inquiry Successfully Sent</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you! Our ad manager will reach out to you shortly at <span className="text-brand-cyan font-semibold">{formData.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-brand-cyan rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-brand-cyan rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="AI Corp"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-brand-cyan rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Estimated Monthly Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-850 focus:border-brand-cyan rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none"
                    >
                      <option value="under-1000">Under $1,000 / mo</option>
                      <option value="1000-5000">$1,000 - $5,000 / mo</option>
                      <option value="5000-10000">$5,000 - $10,000 / mo</option>
                      <option value="over-10000">Over $10,000 / mo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">Campaign Message / Spec Details</label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the product you want to advertise and your preferred campaign dates..."
                    className="w-full bg-slate-950 border border-slate-850 focus:border-brand-cyan rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-brand-cyan to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-black font-extrabold rounded-xl text-sm uppercase tracking-wider transition-all"
                >
                  Submit Inquiry Request
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
