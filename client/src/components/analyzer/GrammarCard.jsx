import React from 'react';
import { SpellCheck } from 'lucide-react';

export const GrammarCard = ({ grammarAndClarity = [], issues = [] }) => {
  const allIssues = grammarAndClarity.length > 0 ? grammarAndClarity : issues;

  if (!allIssues || allIssues.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#15130F]/10 shadow-xs space-y-4 text-[#15130F]">
      <div className="flex items-center justify-between border-b border-[#15130F]/10 pb-3">
        <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#15130F] flex items-center gap-2">
          <span>Grammar, tone & clarity ({allIssues.length})</span>
        </h4>
        <span className="text-xs text-[#5C564E]">Readability checks</span>
      </div>

      <div className="space-y-3">
        {allIssues.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white border border-[#15130F]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <span className="font-medium text-[#15130F] block">
                {typeof item === 'string' ? item : item.issue || item.message}
              </span>
              {item.context && (
                <span className="text-[11px] text-[#5C564E]">Context: {item.context}</span>
              )}
            </div>

            {item.correction && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFECE3] border border-[#15130F]/10 text-[#15130F] text-xs font-medium shrink-0">
                <span className="text-[#5C564E]">Fix:</span>
                <span className="font-semibold">{item.correction}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
