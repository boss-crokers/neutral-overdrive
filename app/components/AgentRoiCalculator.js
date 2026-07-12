'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Bot, HelpCircle, ChevronRight, RefreshCw, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

const MODELS = [
  { id: 'gemini-3.5-flash', name: 'Google Gemini 3.5 Flash', inputPrice: 1.50, outputPrice: 9.00 },
  { id: 'gemini-3.1-pro', name: 'Google Gemini 3.1 Pro', inputPrice: 2.00, outputPrice: 12.00 },
  { id: 'gemini-3-flash', name: 'Google Gemini 3 Flash', inputPrice: 0.50, outputPrice: 3.00 },
  { id: 'gemini-3.1-flash-lite', name: 'Google Gemini 3.1-lite', inputPrice: 0.25, outputPrice: 1.50 },
  { id: 'claude-5-fable', name: 'Anthropic Claude Fable 5', inputPrice: 10.00, outputPrice: 50.00 },
  { id: 'claude-5-sonnet', name: 'Anthropic Claude Sonnet 5', inputPrice: 2.00, outputPrice: 10.00 },
  { id: 'claude-4-8-opus', name: 'Anthropic Claude Opus 4.8', inputPrice: 5.00, outputPrice: 25.00 },
  { id: 'claude-4-5-haiku', name: 'Anthropic Claude Haiku 4.5', inputPrice: 1.00, outputPrice: 5.00 },
  { id: 'gpt-5-6-sol', name: 'OpenAI GPT-5.6 Sol', inputPrice: 5.00, outputPrice: 30.00 },
  { id: 'gpt-5-6-terra', name: 'OpenAI GPT-5.6 Terra', inputPrice: 2.50, outputPrice: 15.00 },
  { id: 'gpt-5-6-luna', name: 'OpenAI GPT-5.6 Luna', inputPrice: 1.00, outputPrice: 6.00 },
  { id: 'gpt-5-5', name: 'OpenAI GPT-5.5 (Legacy)', inputPrice: 5.00, outputPrice: 30.00 },
  { id: 'gpt-5-4', name: 'OpenAI GPT-5.4 (Legacy)', inputPrice: 2.50, outputPrice: 15.00 },
  { id: 'gpt-5-4-mini', name: 'OpenAI GPT-5.4-Mini (Legacy)', inputPrice: 0.75, outputPrice: 4.50 }
];

export default function AgentRoiCalculator() {
  // Manual metrics inputs
  const [manualTasks, setManualTasks] = useState(600);
  const [manualTime, setManualTime] = useState(25); // minutes per task
  const [laborRate, setLaborRate] = useState(40); // $/hour fully loaded
  const [humanErrorRate, setHumanErrorRate] = useState(8); // %
  const [costPerError, setCostPerError] = useState(120); // $

  // AI Agent metrics inputs
  const [aiBuildCost, setAiBuildCost] = useState(6000); // $ setup cost
  const [aiSuccessRate, setAiSuccessRate] = useState(85); // %
  const [aiAuditTime, setAiAuditTime] = useState(4); // minutes per task audited
  const [aiInputTokens, setAiInputTokens] = useState(4500);
  const [aiOutputTokens, setAiOutputTokens] = useState(1200);
  const [aiModelId, setAiModelId] = useState('gemini-3.5-flash');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const activeModel = useMemo(() => {
    return MODELS.find(m => m.id === aiModelId) || MODELS[0];
  }, [aiModelId]);

  // Calculations
  const calculations = useMemo(() => {
    // 1. Manual Calculations
    const monthlyManualHours = (manualTasks * manualTime) / 60;
    const monthlyManualLaborCost = monthlyManualHours * laborRate;
    const monthlyManualErrors = manualTasks * (humanErrorRate / 100);
    const monthlyManualErrorCost = monthlyManualErrors * costPerError;
    const monthlyManualTotalCost = monthlyManualLaborCost + monthlyManualErrorCost;

    // 2. AI Calculations
    // API Tokens cost per month
    const costPerTaskTokens = (aiInputTokens * activeModel.inputPrice / 1_000_000) + 
                             (aiOutputTokens * activeModel.outputPrice / 1_000_000);
    const monthlyApiCost = manualTasks * costPerTaskTokens;

    // Human verification audit cost (runs for ALL tasks or automated tasks)
    // Let's assume we audit all tasks
    const monthlyAuditHours = (manualTasks * aiAuditTime) / 60;
    const monthlyAuditCost = monthlyAuditHours * laborRate;

    // Human fallback cost (failed tasks require manual re-work)
    const failedTasks = manualTasks * (1 - aiSuccessRate / 100);
    const monthlyFallbackHours = (failedTasks * manualTime) / 60;
    const monthlyFallbackCost = monthlyFallbackHours * laborRate;

    // Total Monthly AI Cost
    const monthlyAiTotalCost = monthlyApiCost + monthlyAuditCost + monthlyFallbackCost;

    // 3. ROI Metrics
    const netMonthlySavings = monthlyManualTotalCost - monthlyAiTotalCost;
    const paybackPeriodMonths = netMonthlySavings > 0 ? (aiBuildCost / netMonthlySavings) : null;
    const netThreeYearSavings = (netMonthlySavings * 36) - aiBuildCost;
    const roiPercentage = aiBuildCost > 0 ? (netThreeYearSavings / aiBuildCost) * 100 : 0;

    return {
      monthlyManualHours,
      monthlyManualLaborCost,
      monthlyManualErrorCost,
      monthlyManualTotalCost,
      monthlyApiCost,
      monthlyAuditCost,
      monthlyFallbackCost,
      monthlyAiTotalCost,
      netMonthlySavings,
      paybackPeriodMonths,
      netThreeYearSavings,
      roiPercentage
    };
  }, [
    manualTasks, manualTime, laborRate, humanErrorRate, costPerError,
    aiBuildCost, aiSuccessRate, aiAuditTime, aiInputTokens, aiOutputTokens, activeModel
  ]);

  // Generate chart data for 24 months
  const chartData = useMemo(() => {
    const data = [];
    const manualTotal = calculations.monthlyManualTotalCost;
    const aiTotal = calculations.monthlyAiTotalCost;

    for (let month = 0; month <= 24; month++) {
      data.push({
        month,
        'Manual Pipeline': Math.round(month * manualTotal),
        'AI Agent Pipeline': Math.round(aiBuildCost + (month * aiTotal))
      });
    }
    return data;
  }, [calculations, aiBuildCost]);

  if (!mounted) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm h-[500px] flex items-center justify-center font-sans text-neutral-800 dark:text-neutral-100">
        <div className="text-[var(--muted)] text-[14px] animate-pulse">Loading ROI calculator...</div>
      </div>
    );
  }

  const {
    monthlyManualTotalCost,
    monthlyAiTotalCost,
    netMonthlySavings,
    paybackPeriodMonths,
    netThreeYearSavings,
    roiPercentage
  } = calculations;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm font-sans text-neutral-800 dark:text-neutral-100">
      
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Net Monthly Savings</p>
          <p className={`text-2xl font-bold mt-1 ${netMonthlySavings > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-900 dark:text-white'}`}>
            {netMonthlySavings > 0 ? `$${Math.round(netMonthlySavings).toLocaleString()}` : `$${Math.round(netMonthlySavings).toLocaleString()}`}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Payback Period</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
            {paybackPeriodMonths !== null 
              ? paybackPeriodMonths <= 0.1 
                ? 'Immediate' 
                : `${paybackPeriodMonths.toFixed(1)} Months`
              : 'N/A (Negative ROI)'}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">3-Year Net Yield</p>
          <p className={`text-2xl font-bold mt-1 ${netThreeYearSavings > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-danger'}`}>
            ${Math.round(netThreeYearSavings).toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Estimated 3-Year ROI</p>
          <p className={`text-2xl font-bold mt-1 ${roiPercentage > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-danger'}`}>
            {roiPercentage > 0 ? `${Math.round(roiPercentage).toLocaleString()}%` : '0%'}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Controls Column (Left) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-5">
          
          {/* Section 1: Manual Pipeline parameters */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <span>Manual Process Parameters</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Monthly Tasks: {manualTasks}</label>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={manualTasks}
                  onChange={(e) => setManualTasks(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Minutes per Task: {manualTime}m</label>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={manualTime}
                  onChange={(e) => setManualTime(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Labor Rate ($/hr)</label>
                  <input
                    type="number"
                    value={laborRate}
                    onChange={(e) => setLaborRate(Math.max(1, Number(e.target.value)))}
                    className="w-full px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Human Error Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={humanErrorRate}
                    onChange={(e) => setHumanErrorRate(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="w-full px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Cost per Remediation ($)</label>
                <input
                  type="number"
                  value={costPerError}
                  onChange={(e) => setCostPerError(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>
          </div>

          {/* Section 2: AI Agent Parameters */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <span>AI Implementation Parameters</span>
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Setup Cost ($)</label>
                  <input
                    type="number"
                    value={aiBuildCost}
                    onChange={(e) => setAiBuildCost(Math.max(0, Number(e.target.value)))}
                    className="w-full px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Success Rate (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={aiSuccessRate}
                    onChange={(e) => setAiSuccessRate(Math.min(100, Math.max(1, Number(e.target.value))))}
                    className="w-full px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Audit Time per Task: {aiAuditTime}m</label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={aiAuditTime}
                  onChange={(e) => setAiAuditTime(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Model Selection</label>
                <select
                  value={aiModelId}
                  onChange={(e) => setAiModelId(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100 cursor-pointer"
                >
                  {MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Input Tokens</label>
                  <input
                    type="number"
                    value={aiInputTokens}
                    onChange={(e) => setAiInputTokens(Math.max(0, Number(e.target.value)))}
                    className="w-full px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Output Tokens</label>
                  <input
                    type="number"
                    value={aiOutputTokens}
                    onChange={(e) => setAiOutputTokens(Math.max(0, Number(e.target.value)))}
                    className="w-full px-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded outline-none text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Output Column: Chart & Cost Structure */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Chart Pane */}
          <div className="h-[380px] w-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Cumulative Expense Projection (24 Months)
            </h3>
            
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.15} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} label={{ value: 'Months Elapsed', position: 'insideBottom', offset: -5, fill: '#6b7280', fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                  labelFormatter={(m) => `Month ${m}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-raised)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="Manual Pipeline" stroke="#ef4444" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="AI Agent Pipeline" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Breakdown Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/20 rounded-xl">
            
            {/* Manual monthly costs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-danger mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                Manual Operations Monthly Cost
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Resource Hours:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">{Math.round(calculations.monthlyManualHours)} hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Labor Expense:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">${Math.round(calculations.monthlyManualLaborCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Error Correction:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">${Math.round(calculations.monthlyManualErrorCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold pt-1.5 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                  <span>Total Manual Cost:</span>
                  <span className="font-mono text-neutral-900 dark:text-white">${Math.round(monthlyManualTotalCost).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* AI monthly costs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                AI Operations Monthly Cost
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">API Tokens Expense:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">${Math.round(calculations.monthlyApiCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Human Audit Cost:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">${Math.round(calculations.monthlyAuditCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Human Fallback Cost:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">${Math.round(calculations.monthlyFallbackCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold pt-1.5 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                  <span>Total AI Cost:</span>
                  <span className="font-mono text-neutral-900 dark:text-white">${Math.round(monthlyAiTotalCost).toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ROI Insights Callout */}
          <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl flex gap-3 text-xs leading-normal">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Financial Analysis summary:</h4>
              {netMonthlySavings > 0 ? (
                <p>
                  Deploying the agent yields a net monthly saving of <strong>${Math.round(netMonthlySavings).toLocaleString()}</strong>.
                  With a setup cost of <strong>${aiBuildCost.toLocaleString()}</strong>, the payback period is <strong>{paybackPeriodMonths.toFixed(1)} months</strong>.
                  Over 3 years, this results in a cumulative savings pool of <strong>${Math.round(netThreeYearSavings).toLocaleString()}</strong>, delivering a <strong>{Math.round(roiPercentage).toLocaleString()}%</strong> return on investment.
                </p>
              ) : (
                <p className="text-danger font-medium">
                  Under the current parameters, the AI operations cost exceeds manual execution by <strong>${Math.round(Math.abs(netMonthlySavings)).toLocaleString()}/month</strong>. 
                  Consider improving the AI Success Rate, lowering input/output token counts, switching to a cheaper model (e.g. Gemini 3 Flash), or reducing the human verification time to achieve positive yield.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
