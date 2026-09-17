import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '../store/analysisStore';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { AtsScoreGauge } from '../components/analyzer/AtsScoreGauge';
import { ScoreRadar } from '../components/analyzer/ScoreRadar';
import { KeywordsCard } from '../components/analyzer/KeywordsCard';
import { SuggestionsCard } from '../components/analyzer/SuggestionsCard';
import { GrammarCard } from '../components/analyzer/GrammarCard';
import {
  UploadCloud,
  FileText,
  Briefcase,
  Sparkles,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
  FileSearch,
} from 'lucide-react';

export const AnalyzerPage = () => {
  const [searchParams] = useSearchParams();
  const analysisId = searchParams.get('id');
  const navigate = useNavigate();

  const {
    uploadAndAnalyze,
    currentAnalysis,
    loadAnalysisById,
    clearCurrentAnalysis,
    isAnalyzing,
    error,
  } = useAnalysisStore();

  const { user } = useAuthStore();
  const { openUpgradeModal, addToast } = useUiStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Developer');
  const [inputMode, setInputMode] = useState('pdf'); // 'pdf' | 'text'

  useEffect(() => {
    if (analysisId) {
      loadAnalysisById(analysisId);
    }
  }, [analysisId]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer?.files || e.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        addToast('Please upload a valid PDF document.', 'error');
      }
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (inputMode === 'pdf' && !selectedFile) {
      addToast('Please select or drop a PDF resume file.', 'info');
      return;
    }

    if (inputMode === 'text' && (!resumeText || resumeText.trim().length < 50)) {
      addToast('Please paste your resume text (at least 50 characters).', 'info');
      return;
    }

    const res = await uploadAndAnalyze({
      file: inputMode === 'pdf' ? selectedFile : null,
      resumeText: inputMode === 'text' ? resumeText : '',
      jobDescription,
      targetRole,
    });

    if (res.success) {
      addToast('✨ ATS Analysis Complete!', 'success');
      if (res.analysis?._id) {
        navigate(`/analyzer?id=${res.analysis._id}`, { replace: true });
      }
    } else if (res.isUpgradeRequired) {
      openUpgradeModal();
    } else {
      addToast(res.message || 'Analysis failed', 'error');
    }
  };

  const handleResetScan = () => {
    clearCurrentAnalysis();
    setSelectedFile(null);
    setResumeText('');
    setJobDescription('');
    navigate('/analyzer', { replace: true });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileSearch className="w-8 h-8 text-[#4f46e5]" />
            Resume Analyzer & ATS Score Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evaluate keyword match rates, formatting parseability, and bullet point metrics with Gemini AI.
          </p>
        </div>

        {currentAnalysis && (
          <button
            type="button"
            onClick={handleResetScan}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 shadow-xs transition self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another Resume</span>
          </button>
        )}
      </div>

      {/* If No Analysis Result Yet: Show Upload Form */}
      {!currentAnalysis ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Upload Zone (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Input Mode Switcher */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
              <button
                type="button"
                onClick={() => setInputMode('pdf')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  inputMode === 'pdf'
                    ? 'bg-[#7B61FF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upload PDF Resume
              </button>
              <button
                type="button"
                onClick={() => setInputMode('text')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  inputMode === 'text'
                    ? 'bg-[#7B61FF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Paste Resume Text
              </button>
            </div>

            {/* Mode 1: PDF Drop Zone */}
            {inputMode === 'pdf' ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="relative p-8 sm:p-12 rounded-3xl border-2 border-dashed border-slate-200 hover:border-[#7B61FF] bg-white hover:bg-[#F3F0FF]/30 transition-all text-center space-y-4 cursor-pointer group shadow-card hover:shadow-card-hover card-interactive"
              >
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileDrop}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="w-16 h-16 rounded-2xl bg-[#F3F0FF] text-[#7B61FF] border border-[#d7cffe] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-xs">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">
                    {selectedFile ? selectedFile.name : 'Drag & drop your PDF resume here'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Supports standard PDF exports from Word, Docs, Canva, or LaTeX (max 5MB)
                  </p>
                </div>
              </div>
            ) : (
              /* Mode 2: Textarea */
              <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-card space-y-3">
                <label className="block text-xs font-bold text-slate-700">Paste Full Resume Text</label>
                <textarea
                  rows={14}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your current resume content here..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs leading-relaxed focus:border-[#7B61FF] focus:bg-white focus:outline-none transition"
                />
              </div>
            )}

            {/* Target Role Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Role / Domain (Optional but recommended):
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer / Product Manager"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:border-indigo-600 focus:outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Optional Target Job Description & Scan Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover card-interactive space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7B61FF]" />
                  Target Job Description (Optional)
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Paste the job posting to calculate an exact keyword match percentage and uncover missing competencies.
                </p>
              </div>

              <textarea
                rows={7}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste requirements, responsibilities, or minimum qualifications from LinkedIn/Indeed posting..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs leading-relaxed focus:border-[#7B61FF] focus:bg-white focus:outline-none transition"
              />

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={handleAnalyze}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-white bg-[#7B61FF] hover:bg-[#6B4FE0] shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all duration-200 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini AI Analyzing Resume...</span>
                  </>
                ) : (
                  <>
                    <span>Run Deep ATS Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2 text-xs text-slate-600 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Extracts text safely with zero data sharing.</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Evaluates formatting, keywords, and X-Y-Z metrics.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          {/* 1. Score Gauge & Executive Summary */}
          <AtsScoreGauge
            score={currentAnalysis.overallAtsScore}
            executiveSummary={currentAnalysis.executiveSummary}
          />

          {/* 2. 6-Dimension Radar Breakdown */}
          <ScoreRadar breakdown={currentAnalysis.scoreBreakdown} />

          {/* 3. Keyword Coverage Card */}
          <KeywordsCard
            matchedKeywords={currentAnalysis.matchedKeywords}
            missingKeywords={currentAnalysis.missingKeywords}
          />

          {/* 4. Actionable Suggestions & Risks */}
          <SuggestionsCard
            suggestions={currentAnalysis.actionableSuggestions}
            strengths={currentAnalysis.strengths}
            criticalIssues={currentAnalysis.criticalIssues}
          />

          {/* 5. Grammar & Clarity Issues */}
          <GrammarCard grammarAndClarity={currentAnalysis.grammarAndClarity} />
        </div>
      )}
    </div>
  );
};
