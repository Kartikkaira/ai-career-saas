import React from 'react';
import { Lightbulb, Check, AlertTriangle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const SuggestionsCard = ({ suggestions = [], strengths = [], criticalIssues = [] }) => {
  return (
    <div className="space-y-6">
      {/* Critical Issues & Strengths Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Issues */}
        {criticalIssues.length > 0 && (
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3 shadow-xs">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Critical ATS Rejection Risks
            </h5>
            <ul className="space-y-2 text-xs text-rose-900">
              {criticalIssues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 shadow-xs">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              Identified Strengths
            </h5>
            <ul className="space-y-2 text-xs text-emerald-900">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actionable Suggestions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(79,70,229,0.06)] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#4f46e5]" />
            Actionable Recommendations ({suggestions.length})
          </h4>
          <span className="text-xs text-slate-400">Step-by-step Score Multipliers</span>
        </div>

        {suggestions.length === 0 ? (
          <p className="text-xs text-slate-500">No specific suggestions generated.</p>
        ) : (
          <div className="space-y-4">
            {suggestions.map((item, idx) => {
              const priorityVariant =
                item.priority === 'high' ? 'danger' : item.priority === 'medium' ? 'warning' : 'primary';

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 hover:border-indigo-200 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
                      Section: {item.section || 'General'}
                    </span>
                    <Badge variant={priorityVariant} size="sm">
                      {item.priority?.toUpperCase() || 'MEDIUM'} PRIORITY
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {item.suggestion}
                  </p>

                  {item.exampleFix && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 shadow-xs">
                      <span className="text-[10px] font-mono font-bold text-[#4f46e5] uppercase tracking-wider block">
                        Example Rewrite:
                      </span>
                      <p className="font-sans italic text-slate-700">{item.exampleFix}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
