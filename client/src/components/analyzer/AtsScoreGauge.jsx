import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

export const AtsScoreGauge = ({ score = 0, executiveSummary = '', roleName = 'Target Position' }) => {
  const getScoreInfo = (s) => {
    if (s >= 85) {
      return {
        label: 'Exceptional (Top 5%)',
        accentColor: '#3D4A2E',
        barColor: 'bg-[#3D4A2E]',
        badgeBg: 'bg-[#3D4A2E] text-white',
        grade: 'A+',
        verdict: 'High probability of passing Tier-1 enterprise ATS algorithms (Workday, Taleo, Greenhouse).',
      };
    }
    if (s >= 70) {
      return {
        label: 'Competitive Match',
        accentColor: '#B8571E',
        barColor: 'bg-[#B8571E]',
        badgeBg: 'bg-[#B8571E] text-white',
        grade: 'B+',
        verdict: 'Solid foundation. Adding target keywords and quantifying achievements will push you above 90%.',
      };
    }
    if (s >= 55) {
      return {
        label: 'Needs Optimization',
        accentColor: '#B8571E',
        barColor: 'bg-[#B8571E]',
        badgeBg: 'bg-[#D8C9A8] text-[#15130F]',
        grade: 'C',
        verdict: 'At risk of algorithmic filter rejection due to passive verbs or missing skills keywords.',
      };
    }
    return {
      label: 'Critical Revision Required',
      accentColor: '#2A1F18',
      barColor: 'bg-[#2A1F18]',
      badgeBg: 'bg-[#2A1F18] text-[#F7F4ED]',
      grade: 'D',
      verdict: 'Lacks standard single-column ATS parseable structure, action verbs, or technical keywords.',
    };
  };

  const info = getScoreInfo(score);

  return (
    <div className="bg-[#FAF8F3] p-6 sm:p-8 rounded-3xl border border-[#15130F]/10 shadow-xs text-[#15130F]">
      {/* Pattern from hero: Label top left + badge top right */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-[#5C564E] font-sans">
          Résumé score · ATS analysis
        </span>
        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-full ${info.badgeBg}`}
        >
          {info.label}
        </span>
      </div>

      {/* Live Data Row: Target Role on left + Large Serif Score on right */}
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#15130F]">
            {roleName || 'Senior Candidate Draft'}
          </h3>
          <p className="text-xs text-[#5C564E] mt-0.5">
            Calibrated against 12,000+ verified hiring scans
          </p>
        </div>

        <div className="text-right">
          <span className="font-serif text-4xl sm:text-5xl font-normal text-[#15130F]">
            {score}
          </span>
          <span className="font-serif text-2xl font-light text-[#5C564E] ml-1">%</span>
        </div>
      </div>

      {/* Flat Progress Bar (From hero pattern) */}
      <div className="w-full bg-[#E8E3D7] rounded-full h-2.5 overflow-hidden mb-4">
        <div
          className={`${info.barColor} h-2.5 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
        />
      </div>

      {/* Bottom Metrics Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#15130F]/10 text-xs">
        <div>
          <p className="text-[11px] text-[#5C564E]">ATS parse rate</p>
          <p className="font-serif text-base font-normal text-[#15130F]">{score}/100</p>
        </div>
        <div>
          <p className="text-[11px] text-[#5C564E]">Tone grade</p>
          <p className="font-serif text-base font-normal text-[#15130F]">{info.grade}</p>
        </div>
        <div>
          <p className="text-[11px] text-[#5C564E]">Recruiter skim</p>
          <p className="font-serif text-base font-normal text-[#15130F]">
            {score >= 75 ? 'Pass (<6s)' : 'Flagged'}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-[#5C564E]">Format index</p>
          <p className="font-serif text-base font-normal text-[#15130F]">Single-column</p>
        </div>
      </div>

      {/* Executive Summary */}
      {executiveSummary && (
        <div className="mt-5 p-4 rounded-2xl bg-[#EFECE3]/70 border border-[#15130F]/10 text-xs text-[#25211C] leading-relaxed">
          <p className="font-semibold text-[#15130F] mb-1 font-serif">Executive summary verdict:</p>
          <p>{executiveSummary}</p>
        </div>
      )}
    </div>
  );
};
