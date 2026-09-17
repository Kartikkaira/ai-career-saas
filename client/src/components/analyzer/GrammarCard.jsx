import React from 'react';
import { SpellCheck } from 'lucide-react';

export const GrammarCard = ({ grammarAndClarity = [] }) => {
  if (!grammarAndClarity || grammarAndClarity.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(79,70,229,0.06)] space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <SpellCheck className="w-4 h-4 text-[#4f46e5]" />
          Grammar, Tone & Clarity Improvements ({grammarAndClarity.length})
        </h4>
        <span className="text-xs text-slate-400">Readability Checks</span>
      </div>

      <div className="space-y-3">
        {grammarAndClarity.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block">{item.issue}</span>
              {item.context && <span className="text-[11px] text-slate-500">Context: {item.context}</span>}
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium shrink-0">
              <span>Fix:</span>
              <span className="text-slate-900 font-bold">{item.correction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
