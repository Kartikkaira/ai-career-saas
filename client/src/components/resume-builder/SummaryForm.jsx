import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { useUiStore } from '../../store/uiStore';
import { Sparkles, RefreshCw } from 'lucide-react';

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
    <div className="space-y-4 text-[#15130F]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#15130F]/10 pb-3 gap-2">
        <div>
          <h3 className="font-serif text-lg font-normal text-[#15130F]">
            Professional summary
          </h3>
          <p className="text-xs text-[#5C564E] mt-0.5">
            A 3-4 sentence elevator pitch highlighting your core expertise and target value proposition.
          </p>
        </div>

        <button
          type="button"
          disabled={isAiEnhancing}
          onClick={handleAiEnhance}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#B8571E] hover:bg-[#9E4514] disabled:opacity-50 transition self-start sm:self-auto shadow-xs active:scale-95"
        >
          {isAiEnhancing ? (
            <RefreshCw className="w-3 h-3 animate-spin" />
          ) : (
            <Sparkles className="w-3 h-3 text-amber-200" />
          )}
          <span>{isAiEnhancing ? 'Gemini generating...' : 'Enhance with AI'}</span>
        </button>
      </div>

      {/* AI Suggestion Box */}
      {aiSuggestion && (
        <div className="p-4 rounded-2xl bg-[#EFECE3]/70 border border-[#B8571E]/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#B8571E] font-medium">
            <span>✨ Gemini AI suggested summary:</span>
            <button
              type="button"
              onClick={handleApplyAi}
              className="px-3 py-1 bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] rounded-full text-xs font-semibold transition"
            >
              Apply suggestion
            </button>
          </div>
          <p className="text-xs text-[#15130F] leading-relaxed italic bg-white p-3 rounded-xl border border-[#15130F]/10">
            "{aiSuggestion}"
          </p>
        </div>
      )}

      <div>
        <textarea
          rows={6}
          value={summary}
          onChange={(e) => updateSection('summary', e.target.value)}
          placeholder="e.g. Versatile Senior Product Manager with 7+ years of experience leading cross-functional squads to build enterprise B2B SaaS platforms. Track record of scaling ARR from $5M to $35M while maintaining 99.8% customer satisfaction..."
          className="w-full p-4 bg-white border border-[#15130F]/15 rounded-2xl text-xs text-[#15130F] focus:outline-none focus:border-[#15130F] leading-relaxed"
        />
        <div className="flex justify-between items-center text-[11px] text-[#8A8277] mt-1">
          <span>Aim for 50–120 words for optimal ATS parsing.</span>
          <span>{summary ? summary.split(/\s+/).filter(Boolean).length : 0} words</span>
        </div>
      </div>
    </div>
  );
};
