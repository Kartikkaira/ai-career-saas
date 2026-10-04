import React from 'react';
import { Lightbulb, Check, AlertTriangle } from 'lucide-react';

export const SuggestionsCard = ({ suggestions = [], strengths = [], criticalIssues = [] }) => {
  return (
    <div className="space-y-6">
      {/* Critical Issues & Strengths Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Issues */}
        {criticalIssues.length > 0 && (
          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#B8571E]/30 space-y-3 shadow-xs">
            <h5 className="text-xs font-semibold text-[#B8571E] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#B8571E]" />
              <span className="font-serif text-sm">Critical ATS rejection risks</span>
            </h5>
            <ul className="space-y-2 text-xs text-[#5C564E]">
              {criticalIssues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#B8571E] font-bold">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#3D4A2E]/30 space-y-3 shadow-xs">
            <h5 className="text-xs font-semibold text-[#3D4A2E] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#3D4A2E]" />
              <span className="font-serif text-sm">Identified strengths</span>
            </h5>
            <ul className="space-y-2 text-xs text-[#5C564E]">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#3D4A2E] font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actionable Suggestions */}
      <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-4 text-[#15130F]">
        <div className="flex items-center justify-between border-b border-[#15130F]/10 pb-3">
          <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#15130F] flex items-center gap-2">
            <span>Actionable recommendations ({suggestions.length})</span>
          </h4>
          <span className="text-xs text-[#5C564E]">Step-by-step score multipliers</span>
        </div>

        {suggestions.length === 0 ? (
          <p className="text-xs text-[#5C564E]">No specific suggestions generated.</p>
        ) : (
          <div className="space-y-3">
            {suggestions.map((sug, idx) => {
              const text = typeof sug === 'string' ? sug : sug.text || sug.message;
              const section = typeof sug === 'object' && sug.section ? sug.section : 'General';
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#15130F]/10 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#EFECE3] text-[#15130F] flex items-center justify-center text-xs font-serif shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#8A8277] uppercase tracking-wider">
                      {section}
                    </span>
                    <p className="text-xs text-[#15130F] leading-relaxed">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
