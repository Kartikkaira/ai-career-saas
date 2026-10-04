import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Copy, Check, Tag } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

export const KeywordsCard = ({ matchedKeywords = [], missingKeywords = [], matchRate = 0 }) => {
  const { addToast } = useUiStore();
  const [copiedKeyword, setCopiedKeyword] = useState(null);

  const handleCopy = (kw) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    addToast(`Copied "${kw}" to clipboard`, 'info', 2000);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const total = matchedKeywords.length + missingKeywords.length;
  const calculatedRate = total > 0 ? Math.round((matchedKeywords.length / total) * 100) : matchRate;

  return (
    <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-6 text-[#15130F]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#15130F]/10 pb-4 gap-2">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#15130F] flex items-center gap-2">
            <span>Keyword coverage & gap analysis</span>
          </h3>
          <p className="text-xs text-[#5C564E] mt-0.5">
            Recruiter tracking systems match your résumé against mandatory role tokens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5C564E]">Keyword match:</span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#15130F] text-[#F7F4ED]">
            {calculatedRate}% ({matchedKeywords.length}/{total || 10})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Keywords (Terracotta Panel) */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F3] border border-[#B8571E]/30">
          <div className="flex items-center justify-between text-[#B8571E] font-medium text-xs">
            <span className="font-serif text-sm">Missing critical keywords ({missingKeywords.length})</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B8571E]/10">Gap alert</span>
          </div>
          <p className="text-[11px] text-[#5C564E] leading-relaxed">
            Add these competencies to your Skills or Experience bullet points to pass algorithms:
          </p>

          {missingKeywords.length === 0 ? (
            <p className="text-xs text-[#3D4A2E] italic">No major keyword gaps identified!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCopy(kw)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-[#EFECE3] text-[#15130F] border border-[#15130F]/15 transition group"
                  title="Click to copy keyword"
                >
                  <span>{kw}</span>
                  {copiedKeyword === kw ? (
                    <Check className="w-3 h-3 text-[#3D4A2E]" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#8A8277] group-hover:text-[#15130F]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Matched Keywords (Olive Panel) */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#FAF8F3] border border-[#3D4A2E]/30">
          <div className="flex items-center justify-between text-[#3D4A2E] font-medium text-xs">
            <span className="font-serif text-sm">Verified matched keywords ({matchedKeywords.length})</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3D4A2E]/10">Detected</span>
          </div>
          <p className="text-[11px] text-[#5C564E] leading-relaxed">
            These strong keywords are correctly positioned and parsed in your résumé:
          </p>

          {matchedKeywords.length === 0 ? (
            <p className="text-xs text-[#5C564E] italic">No matched keywords detected yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white text-[#3D4A2E] border border-[#3D4A2E]/25"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#3D4A2E]" />
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
