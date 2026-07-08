'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function DividendCalculator() {
  // State for user inputs
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [dividendYield, setDividendYield] = useState(3.5); // Typical for SCHD
  const [annualGrowth, setAnnualGrowth] = useState(5.0); // Typical for DGRO
  const [years, setYears] = useState(20);
  const [reinvest, setReinvest] = useState(true);

  // Mounted state for hydration safety
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Calculate compound growth data
  const chartData = useMemo(() => {
    let currentBalance = principal;
    let totalPrincipal = principal;
    let accumulatedDividends = 0;
    let accumulatedGrowth = 0;
    
    const data = [];

    // Year 0
    data.push({
      year: 0,
      Principal: totalPrincipal,
      Dividends: 0,
      Growth: 0,
      Total: currentBalance,
    });

    for (let i = 1; i <= years; i++) {
      const yearlyContribution = monthlyContribution * 12;
      totalPrincipal += yearlyContribution;

      const yearlyGrowth = currentBalance * (annualGrowth / 100);
      const yearlyDividend = currentBalance * (dividendYield / 100);

      accumulatedGrowth += yearlyGrowth;
      accumulatedDividends += yearlyDividend;

      if (reinvest) {
        currentBalance += yearlyContribution + yearlyGrowth + yearlyDividend;
      } else {
        currentBalance += yearlyContribution + yearlyGrowth;
      }

      data.push({
        year: i,
        Principal: Math.round(totalPrincipal),
        Dividends: reinvest ? Math.round(accumulatedDividends) : 0,
        Growth: Math.round(accumulatedGrowth),
        Total: Math.round(currentBalance),
        ProjectedYearlyIncome: Math.round(currentBalance * (dividendYield / 100))
      });
    }
    return data;
  }, [principal, monthlyContribution, dividendYield, annualGrowth, years, reinvest]);

  // Extract final metrics for the hero display
  const finalYear = chartData[chartData.length - 1];

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm h-[500px] flex items-center justify-center font-sans text-neutral-800 dark:text-neutral-100">
        <div className="text-[var(--muted)] text-[14px] animate-pulse">Loading Dividend Simulator...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm font-sans text-neutral-800 dark:text-neutral-100">
      
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Final Portfolio Value</p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">
            ${finalYear.Total.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Annual Dividend Income</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            ${(finalYear.ProjectedYearlyIncome || 0).toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Total Principal Invested</p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-1">
            ${finalYear.Principal.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Initial Investment ($)</label>
            <input 
              type="number" 
              value={principal} 
              onChange={(e) => setPrincipal(Number(e.target.value))} 
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-100" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Monthly Contribution ($)</label>
            <input 
              type="number" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Number(e.target.value))} 
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-100" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Dividend Yield (%)</label>
            <input 
              type="number" 
              step="0.1" 
              value={dividendYield} 
              onChange={(e) => setDividendYield(Number(e.target.value))} 
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-100" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Expected Annual Price Growth (%)</label>
            <input 
              type="number" 
              step="0.1" 
              value={annualGrowth} 
              onChange={(e) => setAnnualGrowth(Number(e.target.value))} 
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-neutral-100" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Time Horizon: {years} Years</label>
            <input 
              type="range" 
              min="1" 
              max="40" 
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))} 
              className="w-full accent-blue-600 cursor-pointer" 
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              id="reinvest" 
              checked={reinvest} 
              onChange={(e) => setReinvest(e.target.checked)} 
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer" 
            />
            <label htmlFor="reinvest" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">Reinvest Dividends (DRIP)</label>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="w-full lg:w-2/3 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4b5563" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4b5563" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorDividends" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area type="monotone" dataKey="Principal" stackId="1" stroke="#4b5563" fill="url(#colorPrincipal)" />
              <Area type="monotone" dataKey="Growth" stackId="1" stroke="#8b5cf6" fill="url(#colorGrowth)" />
              {reinvest && (
                <Area type="monotone" dataKey="Dividends" stackId="1" stroke="#2563eb" fill="url(#colorDividends)" />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
      <div className="mt-8 border-t border-[var(--border)] pt-4 text-[11px] leading-relaxed text-[var(--muted)]">
        <p>
          * <strong>Disclaimer:</strong> This calculator is for educational and illustrative purposes only. Calculations are estimates and do not guarantee future returns, dividend yields, or performance. Neutral Overdrive does not provide financial, investment, or tax advice. Consult a certified financial advisor before making any investment decisions.
        </p>
      </div>
    </div>
  );
}
