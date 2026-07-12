"use client";

import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  AlertTriangle, 
  CheckCircle, 
  ChevronRight, 
  Loader2, 
  Copy, 
  ShieldAlert, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Lock 
} from "lucide-react";
import Link from "next/link";

const PIPELINE_STEPS = [
  "Initializing Gemini 3.5 Flash triage model context...",
  "Applying security filters and scrubbing potential PII data...",
  "Analyzing stack trace lines and identifying target fault module...",
  "Evaluating environment variables and determining business impact...",
  "Isolating exception and building remediation runbook..."
];

export default function L2TriageEngine() {
  const [logInput, setLogInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [report, setReport] = useState(null);
  const [copied, setCopied] = useState(false);

  // Cycle through realistic loading steps
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
      }, 0);
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < PIPELINE_STEPS.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 400);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isAnalyzing]);

  const handleSampleLog = () => {
    setLogInput(`[2026-07-07 14:22:01] FATAL src/app/api/v2/auth/route.js:142 - Connection timeout to authentication database cluster.
at Pool.connect (/node_modules/pg/lib/pool.js:204:11)
at async processRequest (src/app/api/v2/auth/route.js:89:5)
STATUS: 500 Internal Server Error | ENV: Production-US-East
User Impact: 42 clients received failed authentication tokens in a 4-minute window. Ticket opened by monitored alarm.`);
  };

  const runTriage = () => {
    if (!logInput.trim()) return;
    setIsAnalyzing(true);
    setReport(null);

    // Simulate enterprise-level AI parsing latency
    setTimeout(() => {
      setIsAnalyzing(false);
      setReport({
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        status: "CRITICAL CRASH",
        errorCore: "Database Connection Timeout (FATAL)",
        failingModule: "src/app/api/v2/auth/route.js (Line 142)",
        environment: "Production-US-East",
        priority: "P1 - High Business Impact",
        summary: "The application support layer detected a fatal database pool connection timeout. The auth API is completely failing to handshake with the primary PostgreSQL cluster, resulting in downstream authentication loops for end-users.",
        nextSteps: [
          "Verify the connection strings and security groups for the US-East database cluster.",
          "Check the active connection pool limit inside pool.js to rule out unreleased client hooks.",
          "Escalate to the Database Administration (DBA) team if cluster resource utilization is >90%."
        ]
      });
    }, 2200);
  };

  const copyToClipboard = () => {
    if (!report) return;

    let text = `## L2 Triage Summary Report\n`;
    text += `**Timestamp:** ${report.timestamp}\n`;
    text += `**Priority:** ${report.priority}\n`;
    text += `**Environment:** ${report.environment}\n`;
    text += `**Primary Exception:** ${report.errorCore}\n\n`;
    text += `### Identified Root Cause Fault\n`;
    text += `\`\`\`\n${report.failingModule}\n\`\`\`\n\n`;
    text += `### Summary\n${report.summary}\n\n`;
    text += `### Recommended Mitigation Runbook\n`;
    report.nextSteps.forEach((step, idx) => {
      text += `${idx + 1}. ${step}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 font-sans">
      
      {/* Triage Workspace Box */}
      <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-sm transition-colors">
        {!report ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--accent)]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">L2 Diagnostic Triage Engine</h2>
                <p className="text-xs text-[var(--muted)]">Simulated Production pipeline analyzer</p>
              </div>
            </div>
            
            <p className="text-sm text-[var(--muted)] mt-2 mb-6">
              Paste raw server stack traces, application logs, or messy user bug reports. The engine will instantly isolate the root failure and draft an escalation ticket.
            </p>

            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-strong)]">
                Raw Log / Stack Trace Input
              </label>
              <button 
                type="button" 
                onClick={handleSampleLog}
                className="text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold transition-colors"
              >
                Load Sample Error Log
              </button>
            </div>

            <textarea
              value={logInput}
              onChange={(e) => setLogInput(e.target.value)}
              placeholder="Paste your unformatted logs here (e.g. from Cloudwatch, Datadog, or crash emails)..."
              disabled={isAnalyzing}
              className="w-full h-48 p-4 font-mono text-xs bg-neutral-950 text-emerald-400 rounded-xl border border-neutral-800 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none shadow-inner disabled:opacity-70"
            />

            <button
              onClick={runTriage}
              disabled={!logInput.trim() || isAnalyzing}
              className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:bg-neutral-300 disabled:dark:bg-neutral-800 text-white text-sm font-semibold rounded-lg transition-colors w-full sm:w-auto self-end cursor-pointer disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> 
                  <span>Analyzing Log...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" /> 
                  <span>Run Triage Analysis</span>
                </>
              )}
            </button>

            {/* Diagnostic loading screen */}
            {isAnalyzing && (
              <div className="mt-6 p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl animate-pulse">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    {PIPELINE_STEPS[currentStep]}
                  </p>
                </div>
                <div className="w-full bg-[var(--border)] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-[var(--accent)] h-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / PIPELINE_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Diagnostic Report View */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
                <div>
                  <h2 className="text-lg font-bold text-[var(--foreground)]">Triage Summary Report</h2>
                  <p className="text-xs text-[var(--muted)] mt-0.5">Generated at {report.timestamp}</p>
                </div>
              </div>
              <button 
                className="mt-4 sm:mt-0 flex items-center gap-2 px-3 py-1.5 bg-[var(--surface-subtle)] hover:bg-[var(--border)] text-[var(--foreground)] text-xs font-semibold rounded-lg border border-[var(--border)] transition-colors cursor-pointer"
                onClick={copyToClipboard}
              >
                <Copy className="w-3.5 h-3.5 text-[var(--muted)]" /> 
                <span>{copied ? "Copied!" : "Copy Ticket Markdown"}</span>
              </button>
            </div>

            {/* Metadata Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Priority Level</span>
                <p className="text-sm font-bold text-rose-700 dark:text-rose-400 mt-0.5">{report.priority}</p>
              </div>
              <div className="p-3 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl">
                <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">Environment</span>
                <p className="text-sm font-bold text-[var(--foreground)] mt-0.5">{report.environment}</p>
              </div>
              <div className="p-3 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl">
                <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">Primary Exception</span>
                <p className="text-sm font-bold text-[var(--foreground)] mt-0.5 truncate">{report.errorCore}</p>
              </div>
            </div>

            {/* Root Cause Card */}
            <div className="mb-6 p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl">
              <h3 className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Identified Root Cause Fault
              </h3>
              <p className="text-sm font-mono text-red-600 dark:text-red-400 font-bold bg-[var(--surface)] p-2.5 rounded border border-[var(--border)] break-all">
                {report.failingModule}
              </p>
              <p className="text-sm text-[var(--muted-strong)] mt-3 leading-relaxed">
                {report.summary}
              </p>
            </div>

            {/* Actionable Next Steps */}
            <div className="p-4 border border-[var(--border)] rounded-xl">
              <h3 className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-3">Recommended Mitigation Runbook</h3>
              <ul className="space-y-2.5">
                {report.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--muted-strong)]">
                    <ChevronRight className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => { setReport(null); setLogInput(""); }}
              className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mx-auto cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Clear and Parse New Log
            </button>
          </div>
        )}
      </div>

      {/* Promotion / CTA Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* B2B Enterprise CTA Card */}
        <div className="p-6 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[var(--accent)] mb-3">
              <Cpu className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Enterprise Architecture</span>
            </div>
            <h3 className="font-serif text-[20px] font-bold leading-snug text-[var(--foreground)] mb-2">
              Scaling Application Support?
            </h3>
            <p className="text-[14px] leading-relaxed text-[var(--muted)]">
              We build production-grade, secure LLM pipelines that tie straight into internal monitoring telemetry. Let’s talk architecture.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <Link 
              href="/advertise"
              className="text-link inline-flex items-center gap-2 text-[14px] font-semibold"
            >
              Let&apos;s talk architecture <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Premium Link Card */}
        <div className="p-6 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all rounded-2xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-3">
              <Lock className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Security & Compliance</span>
            </div>
            <h3 className="font-serif text-[20px] font-bold leading-snug text-[var(--foreground)] mb-2">
              Log Scrubbing & PII Protection
            </h3>
            <p className="text-[14px] leading-relaxed text-[var(--muted)]">
              Avoid sensitive client data or PII hitting third-party LLM endpoints. Get our premium production-ready script template to clean logs locally.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <Link 
              href="/downloads"
              className="text-link inline-flex items-center gap-2 text-[14px] font-semibold text-emerald-650 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-500"
            >
              Get Log Scrubber Template <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[var(--border)] pt-4 text-[11px] leading-relaxed text-[var(--muted)]">
        <p>
          * <strong>Disclaimer:</strong> This tool is an interactive simulation demonstrating LLM triage capabilities for educational purposes. It does not replace professional network administration, certified systems engineering, or authorized security diagnostics. Neutral Overdrive is not liable for system outages, data loss, or misconfigurations resulting from troubleshooting procedures.
        </p>
      </div>
    </div>
  );
}
