import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { useUiStore } from '../../store/uiStore';
import { Sparkles, FileEdit, Check, RefreshCw, Wand2 } from 'lucide-react';

export const SummaryForm = () => {
  const { currentResume, updateSection, enhanceWithAi, isAiEnhancing } = useResumeStore();
  const { addToast } = useUiStore();
  const summary = currentResume.sections?.summary || '';
  const jobTitle = currentResume.sections?.personalInfo?.jobTitle || '';
  const [aiSuggestion, setAiSuggestion] = useState('');

  const handleAiEnhance = async () => {
    const res = await enhanceWithAi('summary', {
      role: jobTitle,
      currentSummary: summary,
      experienceHighlights: currentResume.sections?.experience?.map(e => `${e.role} at ${e.company}`).join(', '),
    });

    if (res.success && res.data?.enhancedText) {
      setAiSuggestion(res.data.enhancedText);
      addToast('✨ AI Summary drafted! Review and click Apply.', 'success');
    } else {
      addToast(res.message || 'AI Enhancement error', 'error');
    }
  };

  const handleApplyAi = () => {
    updateSection('summary', aiSuggestion);
    setAiSuggestion('');
    addToast('Applied AI Summary!', 'success');
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-[#4f46e5]" />
            Professional Summary
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            A 3-4 sentence high-impact elevator pitch summarizing your core expertise and value proposition.
          </p>
        </div>

        <button
          type="button"
          disabled={isAiEnhancing}
          onClick={handleAiEnhance}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#4f46e5] bg-[#eef2ff] hover:bg-[#e0e7ff] border border-indigo-100 disabled:opacity-50 transition self-start sm:self-auto"
        >
          {isAiEnhancing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>{isAiEnhancing ? 'Gemini AI Generating...' : '✨ Enhance with AI'}</span>
        </button>
      </div>

      {/* AI Suggestion Banner */}
      {aiSuggestion && (
        <div className="p-4 rounded-2xl bg-[#eef2ff] border border-indigo-100 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4f46e5] flex items-center gap-1.5">
              <Wand2 className="w-4 h-4" />
              Gemini AI Recommended Summary:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAiSuggestion('')}
                className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleApplyAi}
                className="flex items-center gap-1 px-3 py-1 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                Apply AI Summary
              </button>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">{aiSuggestion}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Summary Text</label>
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => updateSection('summary', e.target.value)}
          placeholder="e.g. Senior Software Engineer with 5+ years of experience building high-scale distributed systems in Node.js and React..."
          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm leading-relaxed focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>Tip: Focus on quantifiable accomplishments and tech stack keywords.</span>
          <span>{summary.length} characters</span>
        </div>
      </div>
    </div>
  );
};
