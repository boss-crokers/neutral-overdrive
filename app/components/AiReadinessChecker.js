'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Settings,
  Shield,
  AlertTriangle,
  ClipboardList,
  Users,
  Award,
  Info,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  FileText,
  RefreshCw,
  Play,
  Sparkles,
  Target,
  LineChart,
  Percent,
  Briefcase
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

// Pillar Definitions and 25 Audit Questions
const AUDIT_PILLARS = [
  {
    id: "strategy",
    title: "Strategy & Alignment",
    icon: ClipboardList,
    color: "#3b82f6", // Blue
    description: "Evaluates business-case definition, leadership commitment, steering structures, and ROI planning.",
    questions: [
      { id: "q1", label: "Business Case & ROI", text: "Do you have defined business cases and ROI metrics for proposed generative AI features?" },
      { id: "q2", label: "Executive Leadership Alignment", text: "Is leadership aligned on AI steering budgets, project prioritization, and corporate risk tolerance?" },
      { id: "q3", label: "AI Steering Committee", text: "Do you have a multidisciplinary steering committee (tech, legal, operations) governing AI initiatives?" },
      { id: "q4", label: "Lifecycle Gates & Roadmaps", text: "Is there a clear product roadmap defining prototyping, security reviews, and production release gates?" },
      { id: "q5", label: "Third-Party Vendor Steerage", text: "Do you evaluate third-party model APIs for uptime SLA, rate limits, and compliance lock-in?" }
    ]
  },
  {
    id: "data",
    title: "Data Infrastructure & Privacy",
    icon: DatabaseIcon,
    color: "#10b981", // Green
    description: "Evaluates RAG pipeline readiness, data security, PII protection, and copyright exposure.",
    questions: [
      { id: "q6", label: "Data Pipeline Readiness", text: "Are data pipelines structured and optimized to feed Retrieval-Augmented Generation (RAG) vector indices?" },
      { id: "q7", label: "PII & Proprietary Leak Defense", text: "Do you scrub PII (names, SSNs) and private code before prompting external public model APIs?" },
      { id: "q8", label: "Vector Search Capabilities", text: "Do you have vector databases (e.g. pgvector, Qdrant) with robust metadata-filtering capabilities?" },
      { id: "q9", label: "Data Copyright & Licensing", text: "Have you verified the licensing and copyright terms of documents and data used to feed or fine-tune models?" },
      { id: "q10", label: "Deduplication & Index Quality", text: "Do you deduplicate documents to avoid feeding models contradictory or redundant context?" }
    ]
  },
  {
    id: "tech",
    title: "Tech Stack & R&D Capability",
    icon: Settings,
    color: "#8b5cf6", // Purple
    description: "Evaluates API integrations, orchestrators, cache management, fallback logic, and engineering standards.",
    questions: [
      { id: "q11", label: "API & Schema Standards", text: "Do you utilize standard SDKs (e.g., Gemini SDK, LangChain) and enforce strict, validated JSON schemas?" },
      { id: "q12", label: "Uptime & Fallback Redundancy", text: "Have you implemented fallback models and API endpoint rotation to handle rate limits and regional downtime?" },
      { id: "q13", label: "Latency & Stream Optimization", text: "Do you optimize token response latency and implement streaming UI to improve user experience?" },
      { id: "q14", label: "Semantic Cache Integration", text: "Do you cache recurring semantic queries (e.g. using Redis) to reduce prompt API costs?" },
      { id: "q15", label: "Local Model Capabilities", text: "Can you run smaller local models (e.g. Llama 3, Gemma 2) for low-cost, offline, or private workflows?" }
    ]
  },
  {
    id: "governance",
    title: "Governance, Security & Risk",
    icon: Shield,
    color: "#f59e0b", // Amber
    description: "Evaluates adversarial threat defense, safety guardrails, audit logging, and regulatory alignment.",
    questions: [
      { id: "q16", label: "Adversarial Threat Defense", text: "Have you implemented prompt-validation filters to block prompt injection and system instruction leaks?" },
      { id: "q17", label: "Model Safety Filters", text: "Do you use input/output safety guardrails (e.g., Vertex AI Safety Filters, Llama Guard)?" },
      { id: "q18", label: "Audit Logging & Controls", text: "Do you record full prompt and response logs, including token counts and latency, for auditing?" },
      { id: "q19", label: "Regulatory Standard Alignment", text: "Are your AI systems aligned with global laws (e.g. EU AI Act, NIST AI RMF, ISO 42001)?" },
      { id: "q20", label: "IP Infringement Protection", text: "Do you have controls to detect and prevent models from outputting copyrighted materials or licensed code?" }
    ]
  },
  {
    id: "talent",
    title: "Talent & Organizational Culture",
    icon: Users,
    color: "#ec4899", // Pink
    description: "Evaluates AI training, acceptable use policies, ethics, change management, and human-in-the-loop controls.",
    questions: [
      { id: "q21", label: "AI Literacy & Prompt Skills", text: "Do developers and business units receive formal training on prompt engineering and model capabilities?" },
      { id: "q22", label: "Acceptable Use Policy", text: "Is there a documented corporate policy defining approved generative AI models and data inputs for employees?" },
      { id: "q23", label: "Ethical AI Framework", text: "Have you established guidelines governing fairness, transparency, and bias reduction in generative tools?" },
      { id: "q24", label: "Workforce Change Management", text: "Do you have resources to transition and upskill employees whose tasks are automated by AI?" },
      { id: "q25", label: "Human-in-the-Loop Oversight", text: "Are critical model decisions or client-facing drafts audited by human experts before deployment?" }
    ]
  }
];

function DatabaseIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
    </svg>
  );
}

const SCORE_LEVELS = [
  { value: 0, label: "0: None", desc: "No planning or capability exists." },
  { value: 1, label: "1: Initial", desc: "Ad-hoc, informal testing with isolated prototypes." },
  { value: 2, label: "2: Defined", desc: "Formally documented strategy with active developer sandboxes." },
  { value: 3, label: "3: Implemented", desc: "Operationalized in production workflows with safety guardrails." },
  { value: 4, label: "4: Optimized", desc: "Continuous automated audits, security scans, and strategic steering." }
];

export default function AiReadinessChecker() {
  const [mounted, setMounted] = useState(false);
  
  // Navigation & Interactive steps
  const [activeStep, setActiveStep] = useState(1); // 1: Introduction, 2: Self-Audit, 3: Lift Playground, 4: Executive Report
  const [expandedPillar, setExpandedPillar] = useState("strategy");
  
  // Quiz answers state: { q1: score, q2: score, ... }
  const [answers, setAnswers] = useState(() => {
    const initial = {};
    AUDIT_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        initial[q.id] = null; // Unanswered initially
      });
    });
    return initial;
  });

  // Playground simulation lift inputs
  const [simulateDataLift, setSimulateDataLift] = useState(0);
  const [simulateGovernanceLift, setSimulateGovernanceLift] = useState(0);
  const [simulateTechLift, setSimulateTechLift] = useState(0);

  // Sync state on mount for hydration safety
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Preset quick fill: L1 (Initial), L3 (Practitioner), L5 (Vanguard)
  const handleQuickFill = (level) => {
    const filled = {};
    let score = 0;
    if (level === 'initial') score = 1;
    if (level === 'practitioner') score = 3;
    if (level === 'vanguard') score = 4;

    AUDIT_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        // Add slight random deviation for realism
        const dev = Math.max(0, Math.min(4, score + (Math.random() > 0.6 ? 1 : Math.random() > 0.8 ? -1 : 0)));
        filled[q.id] = dev;
      });
    });
    setAnswers(filled);
  };

  const handleReset = () => {
    const reset = {};
    AUDIT_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        reset[q.id] = null;
      });
    });
    setAnswers(reset);
    setSimulateDataLift(0);
    setSimulateGovernanceLift(0);
    setSimulateTechLift(0);
    setExpandedPillar("strategy");
    setActiveStep(1);
  };

  // Check how many questions have been answered
  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(val => val !== null).length;
  }, [answers]);

  const totalQuestions = 25;
  const isQuizComplete = answeredCount === totalQuestions;

  // Calculate scores per pillar and overall
  const scores = useMemo(() => {
    const pillarScores = {};
    let totalScoreSum = 0;
    let totalMaxPossible = 0;

    AUDIT_PILLARS.forEach(p => {
      let pillarSum = 0;
      let pillarMax = 0;
      
      p.questions.forEach(q => {
        const val = answers[q.id];
        // If unanswered, treat as 0 for scoring
        const scoreVal = val !== null ? val : 0;
        pillarSum += scoreVal;
        pillarMax += 4; // Max rating is 4
      });

      const percentage = (pillarSum / pillarMax) * 100;
      pillarScores[p.id] = {
        sum: pillarSum,
        max: pillarMax,
        percentage: Math.round(percentage)
      };

      totalScoreSum += pillarSum;
      totalMaxPossible += pillarMax;
    });

    const overallPercentage = totalMaxPossible > 0 ? (totalScoreSum / totalMaxPossible) * 100 : 0;

    return {
      pillars: pillarScores,
      overall: Math.round(overallPercentage),
      sum: totalScoreSum
    };
  }, [answers]);

  // Determine Maturity Level based on overall score
  const maturity = useMemo(() => {
    const pct = scores.overall;
    if (pct <= 20) {
      return {
        level: "L1",
        name: "Ad-Hoc / Initial Exploratory",
        color: "text-red-500 bg-red-100 dark:bg-red-950 dark:text-red-200 border-red-500/20",
        description: "AI is explored in silos. No unified data, safety, or executive oversight guidelines exist. Risk exposure is high."
      };
    } else if (pct <= 40) {
      return {
        level: "L2",
        name: "Formulating / Defined Goals",
        color: "text-orange-500 bg-orange-100 dark:bg-orange-950 dark:text-orange-200 border-orange-500/20",
        description: "Basic acceptable use guidelines are defined. Prototypes are actively developed in sandboxes, but data pipelines are manual and security controls are basic."
      };
    } else if (pct <= 60) {
      return {
        level: "L3",
        name: "Practitioner / Operationalized",
        color: "text-sky-500 bg-sky-100 dark:bg-sky-950 dark:text-sky-200 border-sky-500/20",
        description: "Generative workflows are deployed in production. Standard APIs are configured with simple security filters. Team is upskilled but lacks automated audits."
      };
    } else if (pct <= 80) {
      return {
        level: "L4",
        name: "Enterprise Scaled / Governed",
        color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-500/20",
        description: "AI systems are fully audited. Multi-agent workflows are mapped to RAG databases, complying with governance laws (EU AI Act, NIST RMF). PII scrubbing is active."
      };
    } else {
      return {
        level: "L5",
        name: "AI Vanguard / Autonomous Steering",
        color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-200 border-indigo-500/20",
        description: "Leading-edge operations. Continuous automated audits, semantic caches, local model redundancy, and robust ethical oversight are embedded into the culture."
      };
    }
  }, [scores]);

  // Calculate simulated playground lift
  const simulatedScores = useMemo(() => {
    // Elevate scores based on playground sliders
    const pillarScores = { ...scores.pillars };

    // Helper to calculate simulated lift
    const getLiftedScore = (pillarId, liftVal) => {
      const current = scores.pillars[pillarId]?.percentage || 0;
      // Add lift but cap at 100
      return Math.min(100, Math.round(current + liftVal));
    };

    const simPillars = {
      strategy: scores.pillars.strategy.percentage,
      data: getLiftedScore("data", simulateDataLift),
      tech: getLiftedScore("tech", simulateTechLift),
      governance: getLiftedScore("governance", simulateGovernanceLift),
      talent: scores.pillars.talent.percentage
    };

    const overallSim = Math.round(
      (simPillars.strategy + simPillars.data + simPillars.tech + simPillars.governance + simPillars.talent) / 5
    );

    return {
      pillars: simPillars,
      overall: overallSim
    };
  }, [scores, simulateDataLift, simulateGovernanceLift, simulateTechLift]);

  // Dynamic Inefficiencies & Gaps Scoped Recommendations
  const recommendations = useMemo(() => {
    const devRecs = [];
    const managerRecs = [];
    const criticalGaps = [];

    // Strategy Gaps
    if ((answers.q1 || 0) < 2) {
      criticalGaps.push("No explicit ROI metrics or business case thresholds set for AI products.");
      managerRecs.push("Establish an AI ROI & Value Assessment framework before funding subsequent R&D prototypes.");
    }
    if ((answers.q3 || 0) < 2) {
      criticalGaps.push("Lack of multidisciplinary Steering Committee to oversee legal, ops, and tech alignment.");
      managerRecs.push("Form an AI Steering Committee with stakeholders from Engineering, Legal, and Compliance.");
    }

    // Data Gaps
    if ((answers.q7 || 0) < 2) {
      criticalGaps.push("Risk of proprietary code and customer PII leaking to third-party public API endpoints.");
      devRecs.push("Implement a middleware PII scrubbing layer (e.g. using regex, Presidio, or local models) before payload dispatch.");
      managerRecs.push("Issue clear guidance restricting employees from sending proprietary codebase text or client PII to unapproved models.");
    }
    if ((answers.q8 || 0) < 2) {
      criticalGaps.push("Inability to scale semantic contextual search (RAG) due to lack of vector database infrastructure.");
      devRecs.push("Deploy a structured vector database instance (e.g. pgvector on Supabase, or Qdrant Cloud) and define metadata tags.");
    }

    // Tech Stack Gaps
    if ((answers.q11 || 0) < 2) {
      criticalGaps.push("Unstructured model responses causing validation failure inside applications.");
      devRecs.push("Configure structured JSON schemas in developer APIs (Pydantic schema definitions combined with Google Gemini JSON modes).");
    }
    if ((answers.q14 || 0) < 2) {
      criticalGaps.push("Excessive API billing overhead due to duplicate queries being sent to LLM endpoints.");
      devRecs.push("Implement a semantic caching middleware (e.g. GPTCache or Redis Vector Cache) for high-frequency queries.");
    }

    // Governance & Security Gaps
    if ((answers.q16 || 0) < 2) {
      criticalGaps.push("Vulnerability to prompt injection and malicious override inputs.");
      devRecs.push("Apply prompt injection sanitizers and length restriction bounds on client text fields.");
    }
    if ((answers.q17 || 0) < 2) {
      criticalGaps.push("No safety content filtering layers activated on input or output streams.");
      devRecs.push("Enforce safety threshold parameters (e.g. Google Vertex Safety Blocks or Llama Guard models) in production pipelines.");
    }
    if ((answers.q19 || 0) < 2) {
      criticalGaps.push("Non-compliance with impending regulatory standards (EU AI Act, ISO 42001).");
      managerRecs.push("Audit AI products against the NIST AI Risk Management Framework (RMF) and document impact registries.");
    }

    // Talent & Culture Gaps
    if ((answers.q22 || 0) < 2) {
      criticalGaps.push("Lack of Acceptable Use Guidelines for corporate employee AI utility usage.");
      managerRecs.push("Draft and distribute a corporate 'Acceptable Use Guidelines' document identifying approved SaaS AI platforms.");
    }
    if ((answers.q25 || 0) < 2) {
      criticalGaps.push("Automated model outputs publishing directly without human auditing or expert oversight.");
      managerRecs.push("Define 'Human-in-the-Loop' workflow thresholds, requiring human audit logs for all critical client communications.");
    }

    // Default general recommendations if scores are high
    if (devRecs.length === 0) {
      devRecs.push("Implement model cost telemetry dashboards to trace exact token cost patterns.");
      devRecs.push("Incorporate automated continuous integration regression runs for semantic prompts.");
    }
    if (managerRecs.length === 0) {
      managerRecs.push("Initiate quarterly strategic AI audits to evaluate model drift and supplier dependency changes.");
      managerRecs.push("Share AI workflow case studies internally to cultivate cross-departmental automation designs.");
    }

    return {
      developer: devRecs,
      manager: managerRecs,
      gaps: criticalGaps
    };
  }, [answers]);

  // Chart data formatting for Step 2
  const pillarChartData = useMemo(() => {
    return AUDIT_PILLARS.map(p => ({
      name: p.title.split(" ")[0],
      Score: scores.pillars[p.id]?.percentage || 0,
      fill: p.color
    }));
  }, [scores]);

  if (!mounted) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center h-[550px] font-sans">
        <div className="text-[var(--muted)] text-[15px] flex items-center gap-3 animate-pulse">
          <RefreshCw className="animate-spin h-5 w-5 text-[var(--accent)]" />
          Loading AI Strategy Compass...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-soft font-sans text-[var(--foreground)] transition-all">
      
      {/* Top Banner KPI Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl relative overflow-hidden">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Audit Progress</p>
          <p className="text-2xl md:text-3xl font-bold mt-1 text-[var(--foreground)]">
            {answeredCount} <span className="text-sm font-medium text-[var(--muted)]">/ {totalQuestions}</span>
          </p>
          <span className="text-[11px] font-medium text-[var(--muted)]">Questions completed</span>
        </div>

        <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl relative overflow-hidden">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Strategy Score</p>
          <p className="text-2xl md:text-3xl font-bold mt-1 text-[var(--accent)]">
            {scores.overall}%
          </p>
          <span className="text-[11px] font-medium text-[var(--muted)]">Compliance & steering score</span>
        </div>

        <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl relative overflow-hidden md:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Steering Maturity Level</p>
          <p className={`text-lg md:text-xl font-bold mt-1.5 truncate`}>
            <span className={`inline-block mr-1.5 px-2 py-0.5 rounded-full text-xs font-bold font-mono ${maturity.level === 'L1' ? 'bg-red-200 text-red-800' : maturity.level === 'L2' ? 'bg-orange-200 text-orange-800' : 'bg-sky-200 text-sky-800'}`}>
              {maturity.level}
            </span>
            {maturity.name}
          </p>
          <span className="text-[10px] text-[var(--muted)] block mt-1 truncate">{maturity.description}</span>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="mb-8 border-b border-[var(--border)] pb-4 overflow-x-auto">
        <nav className="flex space-x-1 min-w-[700px] md:min-w-0" aria-label="Tabs">
          {[
            { step: 1, label: "1. Overview & Setup" },
            { step: 2, label: "2. Self-Audit Questionnaire" },
            { step: 3, label: "3. Simulation Lift Playground" },
            { step: 4, label: "4. Executive Roadmap & Report" }
          ].map((tab) => (
            <button
              key={tab.step}
              onClick={() => setActiveStep(tab.step)}
              className={`flex-1 py-2 px-3 text-center border-b-2 font-medium text-xs rounded-t-lg transition-all ${
                activeStep === tab.step
                  ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Step Content */}
      <div className="min-h-[380px]">

        {/* STEP 1: OVERVIEW & QUICK FILL */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                  AI Strategy Compass: Steering Secure & Scalable Workflows
                </h3>
                <p className="body-copy text-sm leading-relaxed">
                  Integrating generative AI systems into production environments requires a robust balance of architectural performance, data safety, regulatory compliance, and team alignment. 
                </p>
                <p className="body-copy text-sm leading-relaxed">
                  This interactive tool evaluates your project or business across 25 structured check-items based on professional AI standards. It identifies hidden structural vulnerabilities, generates an operational developer and manager roadmap, and simulates strategic score improvements.
                </p>

                <div className="border border-[var(--border)] p-5 rounded-xl bg-[var(--surface-subtle)] space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)]">Quick Testing Presets</h4>
                  <p className="text-xs text-[var(--muted)]">Fill the questionnaire with preset ratings to quickly preview outcomes:</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleQuickFill('initial')}
                      className="button-secondary text-xs py-1.5 px-3 w-auto cursor-pointer"
                    >
                      Preset: Ad-Hoc Explorer (Low Score)
                    </button>
                    <button
                      onClick={() => handleQuickFill('practitioner')}
                      className="button-secondary text-xs py-1.5 px-3 w-auto cursor-pointer"
                    >
                      Preset: Active Practitioner (Mid Score)
                    </button>
                    <button
                      onClick={() => handleQuickFill('vanguard')}
                      className="button-secondary text-xs py-1.5 px-3 w-auto cursor-pointer"
                    >
                      Preset: AI Vanguard (High Score)
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--surface-subtle)] space-y-4">
                <h4 className="font-serif font-bold text-base text-[var(--foreground)]">Governance Objectives</h4>
                <ul className="text-xs space-y-3 text-[var(--muted-strong)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[var(--accent)] shrink-0" />
                    <span><strong>NIST AI RMF Alignment</strong>: Map model workflows to standard security profiles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[var(--accent)] shrink-0" />
                    <span><strong>Data Leakage Prevention</strong>: Stop proprietary source files from seeding public APIs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[var(--accent)] shrink-0" />
                    <span><strong>Structure Schema Enforcement</strong>: Restrict outputs to strictly validated parameters.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SELF-AUDIT QUESTIONNAIRE */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8">
              
              {/* Question list (Accordion style by Pillar) */}
              <div className="space-y-4">
                {AUDIT_PILLARS.map((p) => {
                  const isExpanded = expandedPillar === p.id;
                  const Icon = p.icon;
                  
                  // Calculate completions for this specific pillar
                  const pillarAnswered = p.questions.filter(q => answers[q.id] !== null).length;
                  
                  return (
                    <div key={p.id} className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
                      <button
                        onClick={() => setExpandedPillar(isExpanded ? "" : p.id)}
                        className="w-full flex items-center justify-between p-4 bg-[var(--surface-subtle)] hover:bg-[var(--border)]/10 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-sm text-[var(--foreground)]">{p.title}</h4>
                            <p className="text-[10px] text-[var(--muted)]">{p.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded-full">
                            {pillarAnswered} / 5 Done
                          </span>
                          <ChevronRight className={`h-4.5 w-4.5 transition-transform text-[var(--muted)] ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 border-t border-[var(--border)] divide-y divide-[var(--border)] space-y-5">
                          {p.questions.map((q, qidx) => (
                            <div key={q.id} className="pt-4 first:pt-0 space-y-3">
                              <p className="text-xs font-bold text-[var(--foreground)]">
                                {qidx + 1}. {q.label}
                              </p>
                              <p className="text-[11px] text-[var(--muted)] leading-relaxed">{q.text}</p>
                              
                              {/* Rating Button Group */}
                              <div className="grid grid-cols-5 gap-2 max-w-[500px]">
                                {SCORE_LEVELS.map((level) => {
                                  const isSelected = answers[q.id] === level.value;
                                  return (
                                    <button
                                      key={level.value}
                                      onClick={() => setAnswers({ ...answers, [q.id]: level.value })}
                                      className={`py-2 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                                        isSelected
                                          ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-xs"
                                          : "border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--muted)] bg-[var(--surface)]"
                                      }`}
                                      title={level.desc}
                                    >
                                      {level.value}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Live Scoring Matrix */}
              <div className="space-y-6">
                <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--surface-subtle)] space-y-4">
                  <h4 className="font-serif font-bold text-base text-[var(--foreground)]">Current Maturity Dashboard</h4>
                  
                  <div className="space-y-3">
                    {AUDIT_PILLARS.map(p => {
                      const pct = scores.pillars[p.id]?.percentage || 0;
                      return (
                        <div key={p.id} className="text-xs">
                          <div className="flex justify-between font-medium">
                            <span className="text-[var(--muted-strong)]">{p.title}</span>
                            <span className="font-bold" style={{ color: p.color }}>{pct}%</span>
                          </div>
                          <div className="w-full bg-[var(--border)] h-1.5 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{ width: `${pct}%`, backgroundColor: p.color }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl text-center">
                  <p className="text-[11px] text-[var(--muted)]">Ready to examine compliance actions?</p>
                  <button
                    onClick={() => {
                      if (!isQuizComplete) {
                        // Expand first incomplete pillar
                        const incomplete = AUDIT_PILLARS.find(p => p.questions.some(q => answers[q.id] === null));
                        if (incomplete) setExpandedPillar(incomplete.id);
                      } else {
                        setActiveStep(3);
                      }
                    }}
                    className="button-primary text-xs w-full mt-3 cursor-pointer"
                  >
                    {isQuizComplete ? "View Roadmap Solutions" : "Complete Questionnaire"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: SIMULATION LIFT PLAYGROUND */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="max-w-[700px]">
              <h3 className="text-xl font-serif font-bold text-[var(--foreground)] flex items-center gap-2">
                <Target className="h-5 w-5 text-[var(--accent)]" />
                Strategic Investment Lift Simulator
              </h3>
              <p className="body-copy text-xs leading-relaxed mt-2">
                Slide the parameters below to simulate upgrading specific areas of your organization (e.g. data governance middleware or pipeline capabilities). Watch the impact on overall AI strategy maturity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Simulator Sliders */}
              <div className="lg:col-span-5 p-5 border border-[var(--border)] bg-[var(--surface-subtle)] rounded-xl space-y-6">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
                  <LineChart className="h-4.5 w-4.5 text-[var(--accent)]" />
                  Target Upgrades
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Clean Data & RAG Infrastructure</span>
                    <span className="text-[var(--accent)]">+{simulateDataLift}% Lift</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={simulateDataLift}
                    onChange={(e) => setSimulateDataLift(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                  <p className="text-[10px] text-[var(--muted)]">Build structured database pipelines and deploy dedicated vector caches.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Model Safety & Compliance Steering</span>
                    <span className="text-[var(--accent)]">+{simulateGovernanceLift}% Lift</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={simulateGovernanceLift}
                    onChange={(e) => setSimulateGovernanceLift(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                  <p className="text-[10px] text-[var(--muted)]">Activate prompt injection sanitizers and NIST governance templates.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Engineering Redundancy & JSON Schemas</span>
                    <span className="text-[var(--accent)]">+{simulateTechLift}% Lift</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={simulateTechLift}
                    onChange={(e) => setSimulateTechLift(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                  <p className="text-[10px] text-[var(--muted)]">Standardize validation schemas and add fallback rotation endpoints.</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSimulateDataLift(0);
                      setSimulateGovernanceLift(0);
                      setSimulateTechLift(0);
                    }}
                    className="button-secondary text-xs flex items-center justify-center gap-1.5 w-full cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset Simulation Sliders
                  </button>
                </div>
              </div>

              {/* Simulation Result Chart */}
              <div className="lg:col-span-7 p-5 border border-[var(--border)] bg-[var(--surface-subtle)] rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[var(--foreground)] mb-2">Simulated Strategy Comparison</h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Visualizing your current strategy score vs. simulated scores following strategic security and engineering investments.
                  </p>
                </div>

                <div className="h-[220px] my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Strategy",
                          Current: scores.pillars.strategy.percentage,
                          Simulated: simulatedScores.pillars.strategy
                        },
                        {
                          name: "Data",
                          Current: scores.pillars.data.percentage,
                          Simulated: simulatedScores.pillars.data
                        },
                        {
                          name: "Tech Stack",
                          Current: scores.pillars.tech.percentage,
                          Simulated: simulatedScores.pillars.tech
                        },
                        {
                          name: "Governance",
                          Current: scores.pillars.governance.percentage,
                          Simulated: simulatedScores.pillars.governance
                        },
                        {
                          name: "Talent",
                          Current: scores.pillars.talent.percentage,
                          Simulated: simulatedScores.pillars.talent
                        }
                      ]}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                      <YAxis tickFormatter={(val) => `${val}%`} tick={{ fill: 'var(--muted)', fontSize: 10 }} axisLine={false} width={30} />
                      <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                      <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="Current" name="Current Score" fill="var(--border-strong)" />
                      <Bar dataKey="Simulated" name="Projected Lift" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-[11px] leading-relaxed text-[var(--muted)] border-t border-[var(--border)] pt-3 flex justify-between items-center">
                  <span>Overall Simulated Score: </span>
                  <span className="font-bold text-[var(--accent)] text-sm">
                    {scores.overall}% &rarr; {simulatedScores.overall}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: EXECUTIVE ROADMAP & REPORT */}
        {activeStep === 4 && (
          <div className="space-y-6 print-section">
            <div className="flex justify-between items-start gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[var(--foreground)]">
                  AI Strategy Compass: Executive Steering Report
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Report generated on {new Date().toLocaleDateString()} | Compliance Benchmark: NIST AI RMF / ISO 42001
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="button-primary text-xs shrink-0 cursor-pointer hidden md:flex items-center gap-1.5"
              >
                <FileText className="h-3.5 w-3.5" />
                Print/Save Report
              </button>
            </div>

            {/* Critical vulnerabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--surface-subtle)] md:col-span-2 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
                  <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                  Identified AI Vulnerabilities & Gaps
                </h4>

                {recommendations.gaps.length === 0 ? (
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-green-800 dark:text-green-300">No Critical Governance Vulnerabilities</p>
                      <p className="text-[11px] text-[var(--muted)] mt-1">All foundational data security, prompt filters, and committee checkpoints have been initialized.</p>
                    </div>
                  </div>
                ) : (
                  <ul className="text-xs space-y-3 pr-1 max-h-[220px] overflow-y-auto">
                    {recommendations.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2.5 bg-[var(--surface)] p-3 border border-[var(--border)] rounded-lg">
                        <span className="h-2 w-2 bg-amber-500 rounded-full shrink-0 mt-1.5"></span>
                        <span className="text-[var(--muted-strong)] leading-relaxed">{gap}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Status details */}
              <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--surface-subtle)] space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)]">Audit Summary</h4>
                  <div className="text-xs space-y-3 mt-4">
                    <div className="flex justify-between">
                      <span>Total Check-items:</span>
                      <span className="font-bold">25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unanswered items:</span>
                      <span className="font-bold text-[var(--accent)]">{totalQuestions - answeredCount}</span>
                    </div>
                    <div className="flex justify-between border-t border-[var(--border)] pt-2 mt-2">
                      <span>Maturity Code:</span>
                      <span className="font-bold font-mono text-[var(--accent)]">{maturity.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Score:</span>
                      <span className="font-bold">{scores.overall} / 100</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-[var(--muted)] border-t border-[var(--border)] pt-2">
                  Scores calculated out of a maximum possible 100 audit points.
                </div>
              </div>
            </div>

            {/* Custom tactical roadmaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Developers Roadmap */}
              <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
                <div className="bg-[var(--surface-subtle)] p-4 border-b border-[var(--border)] flex items-center gap-2">
                  <Settings className="h-4.5 w-4.5 text-[var(--accent)]" />
                  <h4 className="font-serif font-bold text-sm text-[var(--foreground)]">Developer Tactical Action Items</h4>
                </div>
                <div className="p-5 space-y-3.5 max-h-[300px] overflow-y-auto">
                  {recommendations.developer.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs leading-relaxed text-[var(--muted-strong)]">
                      <input type="checkbox" className="rounded border-gray-300 text-[var(--accent)] mt-0.5" readOnly />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Managers Roadmap */}
              <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
                <div className="bg-[var(--surface-subtle)] p-4 border-b border-[var(--border)] flex items-center gap-2">
                  <Briefcase className="h-4.5 w-4.5 text-[var(--accent)]" />
                  <h4 className="font-serif font-bold text-sm text-[var(--foreground)]">Management & Steerage Action Items</h4>
                </div>
                <div className="p-5 space-y-3.5 max-h-[300px] overflow-y-auto">
                  {recommendations.manager.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs leading-relaxed text-[var(--muted-strong)]">
                      <input type="checkbox" className="rounded border-gray-300 text-[var(--accent)] mt-0.5" readOnly />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Wizard Action Footer */}
      <div className="mt-8 pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs">
        {activeStep > 1 ? (
          <button
            onClick={() => setActiveStep(activeStep - 1)}
            className="flex items-center gap-1 px-3 py-1.5 border border-[var(--border)] rounded-md font-semibold bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--border-strong)] cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous Step
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-md font-semibold hover:bg-red-50 cursor-pointer"
          >
            Reset Form
          </button>
        )}

        <span className="text-[var(--muted)] font-medium">
          Step {activeStep} of 4
        </span>

        {activeStep < 4 ? (
          <button
            onClick={() => setActiveStep(activeStep + 1)}
            className="button-primary text-xs flex items-center gap-1 px-4 py-1.5 cursor-pointer"
          >
            Next Step
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={() => setActiveStep(2)}
            className="button-secondary text-xs flex items-center gap-1 px-4 py-1.5 cursor-pointer"
          >
            Review Questionnaire
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Styled Print Stylesheet */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 20px !important;
          }
          button, nav, input, select, footer {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
