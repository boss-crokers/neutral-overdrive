"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Lightbulb,
  Shield,
  AlertTriangle,
  ClipboardList,
  Briefcase,
  CheckCircle2,
  Download,
  BookOpen,
  Users,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";

// Certification Data Definition
const certifications = [
  {
    id: "cais",
    code: "CAIS",
    title: "Certified AI Scientist",
    subtitle: "AI Foundation",
    focus: "Start Here – Build AI Literacy",
    color: "blue",
    glowColor: "rgba(14, 165, 233, 0.4)",
    borderColor: "border-sky-500/30",
    bgClass: "from-sky-500/10 to-transparent",
    icon: Lightbulb,
    badge: "Level 1",
    description: "Establishes a solid baseline in technical AI concepts, prompt engineering, and machine learning models. Ideal for engineers and developers transitioning into the AI space.",
    prepTime: "40–60 hours",
    level: "Technical Foundation",
    provider: "Academic and professional AI training organizations",
    topics: [
      "Machine Learning (ML), Deep Learning (DL), Natural Language Processing (NLP), and Computer Vision (CV) basics",
      "Generative AI mechanics, tokenization, and vector embeddings",
      "Advanced prompt design, temperature controls, and system messaging",
      "AI Ethics, model bias mitigation, and Cloud AI deployment strategy"
    ],
    studyResource: {
      title: "Model Prompting & System Architecture Guidelines",
      href: "/templates",
      label: "View Prompt Library"
    }
  },
  {
    id: "aaism",
    code: "AAISM",
    title: "AI Security Management",
    subtitle: "AI Security",
    focus: "Secure AI Systems",
    color: "blue",
    glowColor: "rgba(14, 165, 233, 0.4)",
    borderColor: "border-sky-500/30",
    bgClass: "from-sky-500/10 to-transparent",
    icon: Shield,
    badge: "Level 2",
    description: "Focuses on securing AI applications, system architecture, and defending LLM pipelines from adversarial manipulation.",
    prepTime: "30–50 hours",
    level: "Intermediate / Security Engineer",
    provider: "Cloud security and AppSec professional bodies",
    topics: [
      "AI Security Architecture (PII scrubbing, middleware design, input validation)",
      "Adversarial threats: prompt injection, data poisoning, and model inversion",
      "Model guardrails (Vertex AI Safety Filters, Guardrails AI, Llama Guard)",
      "Lifecycle security controls: access management and sandboxed code execution"
    ],
    studyResource: {
      title: "AI Agent Compliance & Security Guardrails Guide",
      href: "/categories/agentic-workflows/ai-compliance-framework",
      label: "Read Security Guide"
    }
  },
  {
    id: "aair",
    code: "AAIR",
    title: "AI Risk Management",
    subtitle: "AI Risk",
    focus: "Manage AI Risk",
    color: "orange",
    glowColor: "rgba(249, 115, 22, 0.4)",
    borderColor: "border-orange-500/30",
    bgClass: "from-orange-500/10 to-transparent",
    icon: AlertTriangle,
    badge: "Level 3",
    description: "Addresses organizational risk, compliance audits, and evaluation frameworks. Bridges the gap between technical threat modeling and governance policies.",
    prepTime: "30–45 hours",
    level: "Risk Analyst / Compliance Auditor",
    provider: "Enterprise risk assessment and audit standard bodies",
    topics: [
      "AI Risk Frameworks: NIST AI RMF, ISO/IEC 23894, and ISO 42001 compliance standards",
      "Continuous threat monitoring, shadow AI discovery, and system audit logs",
      "Risk assessment of third-party model APIs, data licensing, and copyright exposure",
      "Model validation, hallucination detection, and metric definitions"
    ],
    studyResource: {
      title: "RAG Evaluation Checklist",
      href: "/categories/agentic-workflows",
      label: "Browse RAG Checklists"
    }
  },
  {
    id: "aigp",
    code: "AIGP",
    title: "AI Governance Professional",
    subtitle: "AI Governance",
    focus: "Govern AI Programs",
    color: "blue",
    glowColor: "rgba(14, 165, 233, 0.4)",
    borderColor: "border-sky-500/30",
    bgClass: "from-sky-500/10 to-transparent",
    icon: ClipboardList,
    badge: "Level 4",
    description: "The gold standard for legal, policy, and compliance professionals establishing corporate AI steering committees and meeting regulatory guidelines.",
    prepTime: "40–50 hours",
    level: "Privacy & Compliance Leads",
    provider: "International Association of Privacy Professionals (IAPP)",
    topics: [
      "Global AI Laws & Standards: EU AI Act, White House Blueprint, G7 Guidelines",
      "Implementing AI governance structures, impact assessments, and registry tables",
      "Responsible AI lifecycle: bias, transparency, explainability, and human-in-the-loop",
      "Establishing enterprise AI steering policies, training requirements, and usage guidelines"
    ],
    studyResource: {
      title: "IAPP AIGP Official Certification Website",
      href: "https://iapp.org/certify/aigp/",
      label: "Official IAPP Site"
    }
  },
  {
    id: "cciso",
    code: "CCISO",
    title: "Chief Information Security Officer",
    subtitle: "Executive Cybersecurity",
    focus: "Lead at the Executive Level",
    color: "blue",
    glowColor: "rgba(14, 165, 233, 0.4)",
    borderColor: "border-sky-500/30",
    bgClass: "from-sky-500/10 to-transparent",
    icon: Briefcase,
    badge: "Level 5",
    description: "The ultimate executive-level certification for alignment of information security program governance, operations, and AI strategy at the board level.",
    prepTime: "60–80 hours",
    level: "C-Suite / Director of Security",
    provider: "EC-Council and top executive cyber governance frameworks",
    topics: [
      "Enterprise security program governance & executive leadership",
      "Vendor security assessment, third-party AI system integration, and corporate GRC",
      "Board-level strategic planning, incident response pipelines, and threat containment",
      "Integrating AI-driven cybersecurity tools into standard enterprise operations"
    ],
    studyResource: {
      title: "EC-Council CCISO Certification Overview",
      href: "https://www.eccouncil.org/train-certify/chief-information-security-officer-cciso/",
      label: "Official EC-Council Site"
    }
  }
];

export default function RoadmapClient() {
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to AAISM (AI Security Management)
  const current = certifications[selectedIdx];

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : certifications.length - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev < certifications.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 md:py-12 transition-colors duration-200">
      <div className="site-container">
        
        {/* Navigation & Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/resources"
            className="text-link inline-flex items-center gap-2 text-[14px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to resources
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-[11px] font-semibold text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Verified Professional Roadmap
          </div>
        </div>

        <div className="max-w-[850px] mb-12">
          <h1 className="display-heading text-[clamp(34px,5vw,56px)] leading-[1.05]">
            AI Governance & Security Certification Roadmap
          </h1>
          <p className="body-copy mt-4 text-[16px] md:text-[17px] max-w-[680px]">
            The recommended educational track for modern AI and cybersecurity professionals. Proceed from baseline AI science concepts to deep threat models, organizational risk, global compliance law, and C-suite leadership.
          </p>
        </div>

        {/* Anti-Gravity Roadmap Flow Visualizer */}
        <div className="relative mb-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm overflow-hidden">
          
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#8bbcff_1px,transparent_1px),linear-gradient(to_bottom,#8bbcff_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 z-10">
            {certifications.map((cert, idx) => {
              const isSelected = idx === selectedIdx;
              const IconComponent = cert.icon;
              const isOrange = cert.color === "orange";
              
              return (
                <React.Fragment key={cert.id}>
                  {/* Node Button */}
                  <button
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-full md:w-1/5 relative text-left p-5 rounded-xl border transition-all duration-300 group cursor-pointer ${
                      isSelected
                        ? isOrange
                          ? "border-orange-500 bg-orange-500/5 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                          : "border-sky-500 bg-sky-500/5 shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                        : "border-[var(--border)] bg-[var(--surface-subtle)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    {/* Glowing highlight indicator */}
                    {isSelected && (
                      <span 
                        className={`absolute top-2 right-2 flex h-2 w-2 rounded-full ${
                          isOrange ? "bg-orange-500" : "bg-sky-500"
                        }`}
                      >
                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                          isOrange ? "bg-orange-400" : "bg-sky-400"
                        }`}></span>
                      </span>
                    )}

                    {/* Step Icon */}
                    <div 
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                        isSelected
                          ? isOrange
                            ? "bg-orange-500/10 border-orange-500/30 text-orange-500"
                            : "bg-sky-500/10 border-sky-500/30 text-sky-500"
                          : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] group-hover:text-[var(--foreground)]"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>

                    {/* Step Metadata */}
                    <div className="text-[11px] font-bold tracking-wider uppercase text-[var(--muted)]">
                      {cert.subtitle}
                    </div>
                    <div className="mt-1 font-serif text-[18px] font-bold leading-tight text-[var(--foreground)]">
                      {cert.code}
                    </div>
                    <div className="mt-1 text-[13px] text-[var(--muted)] truncate">
                      {cert.title}
                    </div>

                    <div className="mt-3 text-[11px] text-[var(--muted-strong)] border-t border-[var(--border)] pt-2 line-clamp-1">
                      {cert.focus}
                    </div>
                  </button>

                  {/* Flow Arrow (Desktop Only) */}
                  {idx < certifications.length - 1 && (
                    <div className="hidden md:flex flex-col items-center justify-center text-[var(--border-strong)] mx-1 select-none">
                      <ChevronRight className={`h-6 w-6 transition-all duration-300 ${
                        selectedIdx === idx || selectedIdx === idx + 1
                          ? "text-sky-500/60 translate-x-0.5"
                          : "opacity-40"
                      }`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Scrolling Footer Stream representation */}
          <div className="mt-6 border-t border-[var(--border)] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px]">
            <div className="flex items-center gap-2 text-[var(--muted-strong)] font-mono">
              <span className="font-semibold text-[var(--foreground)]">Start Here</span>
              <span className="text-[var(--border-strong)]">&rarr;</span>
              <span>Build AI Literacy</span>
              <span className="text-[var(--border-strong)]">&rarr;</span>
              <span>Secure AI Systems</span>
              <span className="text-[var(--border-strong)]">&rarr;</span>
              <span>Manage AI Risk</span>
              <span className="text-[var(--border-strong)]">&rarr;</span>
              <span>Govern AI Programs</span>
              <span className="text-[var(--border-strong)]">&rarr;</span>
              <span className="font-semibold text-[var(--foreground)]">Lead at C-Suite</span>
            </div>
            <div className="text-[11px] text-[var(--muted)] font-mono">
              Integrated with www.neutraloverdrive.com
            </div>
          </div>

        </div>

        {/* Selected Stage Detail Card */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
          
          {/* Main Info */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br ${
                  current.color === "orange"
                    ? "border-orange-500/30 text-orange-500 bg-orange-500/5"
                    : "border-sky-500/30 text-sky-500 bg-sky-500/5"
                }`}>
                  {React.createElement(current.icon, { className: "h-6 w-6" })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--muted)]">Stage {selectedIdx + 1}: {current.subtitle}</span>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold border ${
                      current.color === "orange"
                        ? "border-orange-500/30 bg-orange-500/10 text-orange-500"
                        : "border-sky-500/30 bg-sky-500/10 text-sky-500"
                    }`}>
                      {current.badge}
                    </span>
                  </div>
                  <h2 className="font-serif text-[28px] font-bold tracking-tight text-[var(--foreground)] mt-1">
                    {current.title} ({current.code})
                  </h2>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--surface-subtle)] text-[var(--foreground)] hover:bg-[var(--surface)] cursor-pointer"
                  title="Previous Step"
                >
                  &larr;
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--surface-subtle)] text-[var(--foreground)] hover:bg-[var(--surface)] cursor-pointer"
                  title="Next Step"
                >
                  &rarr;
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="prose-neutral">
              <p className="text-[16px] leading-relaxed text-[var(--muted-strong)]">
                {current.description}
              </p>
            </div>

            {/* Topics Checklists */}
            <div className="mt-8">
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-[var(--foreground)] mb-4">
                Precise Curriculum & Key Topics
              </h3>
              <div className="grid gap-3">
                {current.topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)]">
                    <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${
                      current.color === "orange" ? "text-orange-500" : "text-sky-500"
                    }`} />
                    <span className="text-[14px] leading-relaxed text-[var(--foreground)]">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Guide / Study Material Link */}
            {current.studyResource && (
              <div className="mt-8 border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--surface-subtle)] p-4 rounded-xl border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)]">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[var(--muted)]">RECOMMENDED STUDY REFERENCE</div>
                    <div className="text-[14px] font-semibold text-[var(--foreground)]">{current.studyResource.title}</div>
                  </div>
                </div>
                {current.studyResource.href.startsWith("http") ? (
                  <a
                    href={current.studyResource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary whitespace-nowrap text-[13px] py-1.5 px-4"
                  >
                    {current.studyResource.label}
                  </a>
                ) : (
                  <Link
                    href={current.studyResource.href}
                    className="button-primary whitespace-nowrap text-[13px] py-1.5 px-4"
                  >
                    {current.studyResource.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Meta Cards */}
          <div className="space-y-6">
            
            {/* Meta Card 1: Exam Info */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-[20px] font-bold text-[var(--foreground)]">
                Stage Diagnostics
              </h3>
              
              <div className="space-y-3.5 divide-y divide-[var(--border)]">
                
                <div className="flex items-center gap-3 pt-3 first:pt-0">
                  <Clock className="h-5 w-5 text-[var(--muted)]" />
                  <div>
                    <div className="text-[11px] font-bold text-[var(--muted)]">ESTIMATED PREP TIME</div>
                    <div className="text-[14px] font-semibold text-[var(--foreground)]">{current.prepTime}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <Users className="h-5 w-5 text-[var(--muted)]" />
                  <div>
                    <div className="text-[11px] font-bold text-[var(--muted)]">TARGET AUDIENCE LEVEL</div>
                    <div className="text-[14px] font-semibold text-[var(--foreground)]">{current.level}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <Award className="h-5 w-5 text-[var(--muted)]" />
                  <div>
                    <div className="text-[11px] font-bold text-[var(--muted)]">CERTIFICATION PROVIDER</div>
                    <div className="text-[14px] font-semibold text-[var(--foreground)]">{current.provider}</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Meta Card 2: Download Visual Blueprint */}
            <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-subtle)] p-6 shadow-sm text-center">
              <h3 className="font-serif text-[18px] font-bold text-[var(--foreground)]">
                Get the Visual Blueprint
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                Download the high-fidelity 3D holographic roadmap image created by Google Anti-Gravity.
              </p>
              
              <div className="mt-4 border border-[var(--border)] rounded-lg overflow-hidden max-h-[140px] relative group">
                <img
                  src="/neutral-overdrive-roadmap.jpg"
                  alt="High-resolution roadmap render"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <a
                href="/neutral-overdrive-roadmap.jpg"
                download="neutral-overdrive-ai-certification-roadmap.jpg"
                className="button-primary mt-4 w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="h-4 w-4" /> Download Blueprint
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
