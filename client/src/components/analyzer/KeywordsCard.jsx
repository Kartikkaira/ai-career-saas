import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Copy, Check, Tag } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

export const KeywordsCard = ({ matchedKeywords = [], missingKeywords = [] }) => {
  const { addToast } = useUiStore();
  const [copiedKeyword, setCopiedKeyword] = useState(null);

  const handleCopy = (kw) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    addToast(`Copied "${kw}" to clipboard!`, 'info', 2000);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const total = matchedKeywords.length + missingKeywords.length;
  const matchRate = total > 0 ? Math.round((matchedKeywords.length / total) * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(79,70,229,0.06)] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#4f46e5]" />
            ATS Keyword Coverage & Gap Analysis
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Recruiter tracking systems match your resume against mandatory skill tokens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Match Density:</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#eef2ff] text-[#4f46e5] border border-indigo-100">
            {matchRate}% ({matchedKeywords.length}/{total})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <div className="space-y-3 p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Missing Critical Keywords ({missingKeywords.length})</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Add these competencies to your Skills or Experience bullet points to bypass ATS filters:
          </p>

          {missingKeywords.length === 0 ? (
            <p className="text-xs text-emerald-600 italic">No major keyword gaps identified!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCopy(kw)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-white hover:bg-rose-100 text-rose-700 border border-rose-200 shadow-xs transition group"
                  title="Click to copy"
                >
                  <span>{kw}</span>
                  {copiedKeyword === kw ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-rose-400 opacity-60 group-hover:opacity-100" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Matched Keywords */}
        <div className="space-y-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Successfully Detected Keywords ({matchedKeywords.length})</span>
          </div>
          <p className="text-[11px] text-slate-600">
            These relevant terms were successfully extracted and parsed by the ATS engine:
          </p>

          {matchedKeywords.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No recognized keywords detected.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-medium bg-white text-emerald-700 border border-emerald-200 shadow-xs"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
