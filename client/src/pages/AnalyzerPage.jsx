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
  const [targetRole, setTargetRole] = useState('Senior Product Manager');
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
      addToast('✨ ATS analysis complete!', 'success');
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
    <div className="bg-[#F7F4ED] text-[#15130F] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10 mb-4">
            ✦ ATS Intelligence Scanner
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.08] tracking-tight text-[#15130F]">
            Know your score <br />
            <span className="italic font-light">before recruiters do.</span>
          </h1>
          <p className="mt-4 text-base text-[#5C564E] leading-relaxed max-w-2xl font-sans">
            Benchmark your résumé against modern applicant tracking systems and target job
            descriptions. Instant keyword gap detection and bullet improvements.
          </p>
        </div>

        {/* Scan Input or Results View */}
        {!currentAnalysis ? (
          /* Form Upload Wizard */
          <form
            onSubmit={handleAnalyze}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left: Document Upload Area (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#FAF8F3] border border-[#15130F]/15 rounded-3xl p-6 sm:p-8 shadow-xs">
                {/* Mode Selector Pills */}
                <div className="flex items-center justify-between pb-4 border-b border-[#15130F]/10 mb-6">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setInputMode('pdf')}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                        inputMode === 'pdf'
                          ? 'bg-[#15130F] text-[#F7F4ED]'
                          : 'bg-white text-[#5C564E] hover:text-[#15130F] border border-[#15130F]/10'
                      }`}
                    >
                      Upload PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode('text')}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                        inputMode === 'text'
                          ? 'bg-[#15130F] text-[#F7F4ED]'
                          : 'bg-white text-[#5C564E] hover:text-[#15130F] border border-[#15130F]/10'
                      }`}
                    >
                      Paste plain text
                    </button>
                  </div>

                  <span className="text-[11px] text-[#5C564E] font-mono">
                    Max 10MB · 100% private
                  </span>
                </div>

                {inputMode === 'pdf' ? (
                  /* PDF Drag Drop Zone */
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    className="border-2 border-dashed border-[#15130F]/20 hover:border-[#15130F]/50 rounded-2xl p-8 sm:p-12 text-center bg-white transition cursor-pointer flex flex-col items-center justify-center relative"
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileDrop}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-12 h-12 rounded-full bg-[#EFECE3] flex items-center justify-center text-[#15130F] mb-4">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    {selectedFile ? (
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#15130F]">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-[#5C564E]">
                          {(selectedFile.size / 1024).toFixed(1)} KB · Ready for analysis
                        </p>
                        <span className="inline-block mt-2 text-xs font-medium text-[#B8571E] underline">
                          Click to replace file
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#15130F]">
                          Drop your résumé PDF here
                        </p>
                        <p className="text-xs text-[#5C564E]">
                          or browse from your computer
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Plain Text Textarea */
                  <div>
                    <label className="block text-xs font-medium text-[#15130F] mb-2">
                      Paste résumé content
                    </label>
                    <textarea
                      rows={10}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your full resume text here (Summary, Work History, Education, Skills)..."
                      className="w-full p-4 rounded-2xl bg-white border border-[#15130F]/15 text-xs text-[#15130F] focus:outline-none focus:border-[#15130F] font-mono leading-relaxed"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Target Job & Role (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAF8F3] border border-[#15130F]/15 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                <div>
                  <label className="block text-xs font-medium text-[#15130F] mb-1.5">
                    Target job title
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Product Manager"
                    className="w-full px-4 py-2.5 rounded-full bg-white border border-[#15130F]/15 text-xs text-[#15130F] focus:outline-none focus:border-[#15130F]"
                  />
                  <p className="text-[11px] text-[#5C564E] mt-1">
                    Used to benchmark relevant seniority keywords.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#15130F] mb-1.5">
                    Target job description (optional but recommended)
                  </label>
                  <textarea
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description or requirements to run custom keyword matching and semantic alignment..."
                    className="w-full p-3.5 rounded-2xl bg-white border border-[#15130F]/15 text-xs text-[#15130F] focus:outline-none focus:border-[#15130F] leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="w-full py-3.5 px-6 rounded-full bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 active:scale-98"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Analyzing with Gemini AI...</span>
                      </>
                    ) : (
                      <>
                        <span>Scan & score résumé</span>
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Informational Callout */}
              <div className="bg-[#EFECE3] border border-[#15130F]/10 rounded-2xl p-4 text-xs text-[#5C564E] space-y-1">
                <p className="font-semibold text-[#15130F] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#3D4A2E]" />
                  What we scan for
                </p>
                <p>
                  • Format compatibility with Workday, Greenhouse & Taleo <br />
                  • Exact vs. semantic keyword matching <br />
                  • Quantifiable metric density (percentages, revenue, team scale) <br />
                  • Repetitive passive verbs vs. executive action verbs
                </p>
              </div>
            </div>
          </form>
        ) : (
          /* Results Dashboard */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#15130F]/10">
              <div>
                <span className="text-xs font-mono text-[#5C564E]">
                  Report ID: {currentAnalysis._id || 'SCAN-ACTIVE'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#15130F] font-normal">
                  Diagnostic analysis results
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetScan}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white border border-[#15130F]/15 text-[#15130F] hover:bg-[#FAF8F3] transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Scan new résumé</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/builder')}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] transition"
                >
                  <span>Open builder</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Score Display reusing the hero mini-card pattern */}
            <AtsScoreGauge
              score={currentAnalysis.overallScore || 0}
              executiveSummary={currentAnalysis.executiveSummary}
              roleName={currentAnalysis.targetRole || targetRole}
            />

            {/* Detailed Cards Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Keywords Card (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <KeywordsCard
                  foundKeywords={currentAnalysis.foundKeywords || []}
                  missingKeywords={currentAnalysis.missingKeywords || []}
                  matchRate={currentAnalysis.keywordMatchRate || 0}
                />
                <SuggestionsCard suggestions={currentAnalysis.suggestions || []} />
              </div>

              {/* Radar & Grammar Breakdown (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <ScoreRadar
                  formatting={currentAnalysis.formattingScore || 0}
                  skillsMatch={currentAnalysis.skillsMatchScore || 0}
                  impact={currentAnalysis.impactScore || 0}
                  brevity={currentAnalysis.brevityScore || 0}
                />
                <GrammarCard issues={currentAnalysis.grammarIssues || []} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
