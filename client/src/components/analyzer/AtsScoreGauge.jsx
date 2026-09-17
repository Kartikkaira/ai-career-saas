import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

export const AtsScoreGauge = ({ score = 0, executiveSummary = '' }) => {
  const getScoreInfo = (s) => {
    if (s >= 85) {
      return {
        label: 'Exceptional (Top 5%)',
        color: 'text-[#4f46e5]',
        stroke: '#4f46e5',
        bg: 'bg-[#eef2ff] border-indigo-100',
        icon: ShieldCheck,
        verdict: 'High chance of passing Tier-1 enterprise ATS filters (Workday, Taleo, Greenhouse).',
      };
    }
    if (s >= 70) {
      return {
        label: 'Competitive Match',
        color: 'text-[#4f46e5]',
        stroke: '#4f46e5',
        bg: 'bg-[#eef2ff] border-indigo-100',
        icon: Sparkles,
        verdict: 'Good structure. Fixing missing keywords and quantifying bullets will push you above 85+.',
      };
    }
    if (s >= 55) {
      return {
        label: 'Needs Optimization',
        color: 'text-amber-700',
        stroke: '#f59e0b',
        bg: 'bg-amber-50 border-amber-200',
        icon: AlertTriangle,
        verdict: 'At risk of automated ATS rejection due to missing keywords or unquantified achievements.',
      };
    }
    return {
      label: 'Critical Revision Required',
      color: 'text-rose-700',
      stroke: '#e11d48',
      bg: 'bg-rose-50 border-rose-200',
      icon: AlertCircle,
      verdict: 'Lacks core keyword density, action verbs, or standard ATS parseable structure.',
    };
  };

  const info = getScoreInfo(score);
  const Icon = info.icon;

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(79,70,229,0.06)] flex flex-col md:flex-row items-center gap-6 sm:gap-8">
      {/* Circular Gauge */}
      <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#eef2ff"
            strokeWidth="12"
          />
          {/* Animated score arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke={info.stroke}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{score}</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">/ 100 ATS</span>
        </div>
      </div>

      {/* Details & Verdict */}
      <div className="space-y-3 flex-1 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${info.bg} ${info.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {info.label}
          </span>
          <span className="text-xs text-slate-400 font-mono">Gemini AI Evaluated</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Overall ATS Compatibility Score
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          {info.verdict}
        </p>

        {executiveSummary && (
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 italic">
            "{executiveSummary}"
          </div>
        )}
      </div>
    </div>
  );
};
