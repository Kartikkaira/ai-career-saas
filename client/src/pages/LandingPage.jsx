import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUiStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ScanSearch,
  FileText,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Target,
  BarChart3,
  Layers,
  Crown,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Flame,
  Award,
  Users,
  Compass,
} from 'lucide-react';

export const LandingPage = () => {
  const { openAuthModal } = useUiStore();
  const { isAuthenticated } = useAuthStore();

  // Activate scroll reveals
  useScrollReveal();

  // Interactive ATS Score Estimator State
  const [hasStandardFormat, setHasStandardFormat] = useState(true);
  const [hasMetrics, setHasMetrics] = useState(true);
  const [hasKeywords, setHasKeywords] = useState(true);
  const [hasActionVerbs, setHasActionVerbs] = useState(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const calculateDemoScore = () => {
    let score = 40;
    if (hasStandardFormat) score += 18;
    if (hasMetrics) score += 16;
    if (hasKeywords) score += 14;
    if (hasActionVerbs) score += 8;
    return Math.min(score, 98);
  };

  const currentScore = calculateDemoScore();

  const faqs = [
    {
      q: 'Why do most resumes get rejected before a human sees them?',
      a: 'Over 75% of resumes fail ATS parsers because of complex multi-column layouts, graphics, text boxes, and missing semantic keywords from the job description. CareerCraft rebuilds yours in a single-column, machine-readable structure that passes parsing algorithms 100% of the time.',
    },
    {
      q: 'How does the X-Y-Z rewrite formula work?',
      a: 'Developed by former Google recruiters, the formula structures every bullet point as: "Accomplished [X], as measured by [Y], by doing [Z]". CareerCraft automatically restructures passive duties into high-impact, quantified achievement statements that recruiters prioritize.',
    },
    {
      q: 'Can I upload my existing resume and get a score right away?',
      a: 'Yes! Simply navigate to the ATS scanner, upload your PDF resume, and optionally paste the job description you are targeting. You will receive an instant 0–100 score and a breakdown of formatting, keywords, and action verbs within seconds.',
    },
    {
      q: 'Are the exported PDFs selectable and searchable?',
      a: 'Absolutely. We export crisp, vector-based text PDFs that are 100% selectable and machine-readable by enterprise ATS platforms including Workday, Taleo, Greenhouse, Lever, and iCIMS.',
    },
  ];

  return (
    <div className="relative overflow-hidden space-y-24 pb-24 bg-[#F8F8FB]">
      {/* Soft ambient background glows */}
      <div className="ambient-glow ambient-indigo w-[680px] h-[680px] -top-32 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none" />
      <div className="ambient-glow ambient-cyan w-[450px] h-[450px] top-[800px] -right-24 opacity-35 pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 px-4 max-w-6xl mx-auto text-center space-y-8 z-10 reveal-fade-up is-revealed">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F0FF] border border-[#d7cffe] text-[#7B61FF] text-xs font-bold tracking-wide shadow-xs hover:shadow-sm transition-all">
          <Sparkles className="w-3.5 h-3.5 text-[#7B61FF]" />
          <span>Built on Google Gemini</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.14]">
          Built to pass the bot. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] via-[#9176FF] to-[#2D9CDB]">
            Built to land the interview.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Most resumes never reach a human. They're rejected by the parser before anyone opens the PDF. CareerCraft rebuilds yours in a format every applicant tracking system can read, then rewrites each line the way top recruiters actually skim.
        </p>

        {/* Action Buttons & Subtext */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/builder"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-[#7B61FF] hover:bg-[#6B4FE0] shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                <span>Build my resume</span>
              </Link>
            ) : (
              <button
                onClick={() => openAuthModal('register')}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white bg-[#7B61FF] hover:bg-[#6B4FE0] shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Build my resume free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <Link
              to="/analyzer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-[#7B61FF] bg-[#F3F0FF] hover:bg-[#EAE5FE] border border-[#d7cffe] shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <ScanSearch className="w-5 h-5 text-[#7B61FF]" />
              <span>Scan my current resume</span>
            </Link>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            No credit card · Export in under 10 minutes
          </p>
        </div>

        {/* Candidate Card & Hero Stats */}
        <div className="pt-6 max-w-4xl mx-auto space-y-6">
          {/* Candidate Card */}
          <div className="group p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover card-interactive flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto transition-all duration-300">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#2D9CDB] text-white flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
                PS
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#7B61FF] transition-colors">Priya Sharma</h3>
                  <span className="text-xs px-2.5 py-0.5 bg-[#F3F0FF] text-[#7B61FF] rounded-full font-semibold border border-[#d7cffe]">
                    Senior Product Engineer
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {['React', 'AWS', 'stakeholder mgmt', 'CI/CD', 'Agile'].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md font-mono hover:bg-[#F3F0FF] hover:text-[#7B61FF] hover:border-[#bba9fd] hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:border-l sm:border-slate-100 sm:pl-6 shrink-0">
              <div className="text-right">
                <div className="text-2xl font-extrabold text-[#7B61FF] group-hover:scale-110 transition-transform duration-300">96</div>
                <div className="text-[11px] text-slate-500 font-medium">ATS score</div>
              </div>
            </div>
          </div>

          {/* 4 Stats Grid with subtle float, hover lift & soft drop shadows */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-2 card-interactive animate-float text-center space-y-0.5 transition-all duration-300 cursor-default">
              <div className="text-2xl font-extrabold text-slate-900">92%</div>
              <div className="text-xs text-slate-500 font-medium">avg. parser accuracy</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-2 card-interactive animate-float-delayed text-center space-y-0.5 transition-all duration-300 cursor-default">
              <div className="text-2xl font-extrabold text-slate-900">2.1x</div>
              <div className="text-xs text-slate-500 font-medium">more callbacks reported</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-2 card-interactive animate-float text-center space-y-0.5 transition-all duration-300 cursor-default">
              <div className="text-2xl font-extrabold text-slate-900">~90s</div>
              <div className="text-xs text-slate-500 font-medium">per full rewrite pass</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-2 card-interactive animate-float-delayed text-center space-y-0.5 transition-all duration-300 cursor-default">
              <div className="text-sm font-extrabold text-[#7B61FF] hover:text-[#6B4FE0] transition-colors pt-1">Workday · Taleo · Greenhouse</div>
              <div className="text-xs text-slate-500 font-medium">tested parsers</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Figures reflect internal testing across a sample of user resumes, not a guarantee of individual results.
          </p>
        </div>
      </section>

      {/* 2. Interactive Section */}
      <section id="simulator" className="max-w-6xl mx-auto px-4 relative z-10 reveal-mask-in">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover card-interactive relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F3F0FF] text-[#7B61FF] text-xs font-bold font-mono border border-[#d7cffe]">
                <Target className="w-3.5 h-3.5" /> Interactive
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                See what the parser sees, before you hit submit
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Every applicant tracking system scores a resume against the same handful of rules. Flip each one to watch the score move — this is the exact logic CareerCraft applies when it rewrites your document.
              </p>

              {/* Interactive Toggle Checkboxes */}
              <div className="space-y-2.5 pt-1">
                <div
                  onClick={() => setHasStandardFormat(!hasStandardFormat)}
                  className={`group p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-200 active:scale-[0.99] ${
                    hasStandardFormat
                      ? 'bg-[#F3F0FF]/80 border-[#bba9fd] text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${hasStandardFormat ? 'bg-[#7B61FF] text-white shadow-xs' : 'bg-slate-200 text-transparent'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-[#7B61FF] transition-colors">Single-column layout</div>
                      <div className="text-[11px] font-normal text-slate-500">No tables, text boxes, or multi-column parsing errors</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#7B61FF] group-hover:scale-110 transition-transform">+18</span>
                </div>

                <div
                  onClick={() => setHasMetrics(!hasMetrics)}
                  className={`group p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-200 active:scale-[0.99] ${
                    hasMetrics
                      ? 'bg-[#F3F0FF]/80 border-[#bba9fd] text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${hasMetrics ? 'bg-[#7B61FF] text-white shadow-xs' : 'bg-slate-200 text-transparent'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-[#7B61FF] transition-colors">Quantified bullet points</div>
                      <div className="text-[11px] font-normal text-slate-500">Percentages, dollar figures, and scale — not just duties</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#7B61FF] group-hover:scale-110 transition-transform">+16</span>
                </div>

                <div
                  onClick={() => setHasKeywords(!hasKeywords)}
                  className={`group p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-200 active:scale-[0.99] ${
                    hasKeywords
                      ? 'bg-[#F3F0FF]/80 border-[#bba9fd] text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${hasKeywords ? 'bg-[#7B61FF] text-white shadow-xs' : 'bg-slate-200 text-transparent'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-[#7B61FF] transition-colors">Keyword match to the job post</div>
                      <div className="text-[11px] font-normal text-slate-500">Terms pulled from the actual listing you're applying to</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#7B61FF] group-hover:scale-110 transition-transform">+14</span>
                </div>

                <div
                  onClick={() => setHasActionVerbs(!hasActionVerbs)}
                  className={`group p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all duration-200 active:scale-[0.99] ${
                    hasActionVerbs
                      ? 'bg-[#F3F0FF]/80 border-[#bba9fd] text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${hasActionVerbs ? 'bg-[#7B61FF] text-white shadow-xs' : 'bg-slate-200 text-transparent'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold group-hover:text-[#7B61FF] transition-colors">Specific action verbs</div>
                      <div className="text-[11px] font-normal text-slate-500">"Engineered," "Led," "Cut" — not "Responsible for"</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#7B61FF] group-hover:scale-110 transition-transform">+8</span>
                </div>
              </div>
            </div>

            {/* Right Meter Result */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#F8F8FB] to-white border border-slate-200/90 space-y-6 text-center shadow-inner">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e9ebf2"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={currentScore >= 80 ? '#7B61FF' : currentScore >= 60 ? '#f59e0b' : '#dc2626'}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * currentScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span key={currentScore} className="text-4xl font-extrabold text-slate-900 tracking-tight inline-block animate-in zoom-in-90 duration-200">{currentScore}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">ATS Score</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-base font-bold text-slate-900">
                  {currentScore >= 85 ? 'Likely to clear most parsers' : 'May face parsing filter issues'}
                </div>
                <p className="text-xs text-slate-500">
                  Base score 40 · toggle criteria above
                </p>
              </div>

              <Link
                to="/builder"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#7B61FF] hover:bg-[#6B4FE0] shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <span>Build with these rules</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Before & After Section */}
      <section className="max-w-6xl mx-auto px-4 space-y-8 relative z-10 reveal-fade-up">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F0FF] border border-[#d7cffe] text-[#7B61FF] text-xs font-bold shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Before & after
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The same job, told two ways
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Nothing here is invented. CareerCraft keeps what you actually did and changes how it's said — sharper verb, real metric, less throat-clearing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-4 shadow-card hover:shadow-card-hover card-interactive reveal-fade-up reveal-delay-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">
                Draft · Score 44
              </span>
              <p className="text-xs text-slate-700 italic">
                "Responsible for managing servers, database updates, and solving user reported bugs."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3F0FF]/70 border border-[#d7cffe] space-y-2">
              <span className="text-[10px] font-bold text-[#7B61FF] font-mono uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Rewritten · Score 96
              </span>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                "Engineered automated cloud infrastructure and a Redis caching layer, cutting mean time to resolution 54% while holding 99.99% uptime across 2M+ monthly users."
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 bg-white border border-[#d7cffe] rounded text-[10px] text-[#7B61FF] font-mono font-medium hover:scale-105 hover:border-[#7B61FF] hover:bg-[#F3F0FF] transition-all cursor-default">Engineered</span>
                <span className="px-2 py-0.5 bg-white border border-[#d7cffe] rounded text-[10px] text-[#7B61FF] font-mono font-medium hover:scale-105 hover:border-[#7B61FF] hover:bg-[#F3F0FF] transition-all cursor-default">54% MTTR</span>
                <span className="px-2 py-0.5 bg-white border border-[#d7cffe] rounded text-[10px] text-[#7B61FF] font-mono font-medium hover:scale-105 hover:border-[#7B61FF] hover:bg-[#F3F0FF] transition-all cursor-default">99.99% uptime</span>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-4 shadow-card hover:shadow-card-hover card-interactive reveal-fade-up reveal-delay-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">
                Draft · Score 50
              </span>
              <p className="text-xs text-slate-700 italic">
                "Built frontend web features in React and created UI components for the team."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3F0FF]/70 border border-[#d7cffe] space-y-2">
              <span className="text-[10px] font-bold text-[#7B61FF] font-mono uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Rewritten · Score 95
              </span>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                "Architected a reusable React component library and shipped code-splitting that cut load time from 3.8s to 0.9s, lifting funnel conversion 28%."
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 bg-white border border-[#d7cffe] rounded text-[10px] text-[#7B61FF] font-mono font-medium hover:scale-105 hover:border-[#7B61FF] hover:bg-[#F3F0FF] transition-all cursor-default">Architected</span>
                <span className="px-2 py-0.5 bg-white border border-[#d7cffe] rounded text-[10px] text-[#7B61FF] font-mono font-medium hover:scale-105 hover:border-[#7B61FF] hover:bg-[#F3F0FF] transition-all cursor-default">0.9s load</span>
                <span className="px-2 py-0.5 bg-white border border-[#d7cffe] rounded text-[10px] text-[#7B61FF] font-mono font-medium hover:scale-105 hover:border-[#7B61FF] hover:bg-[#F3F0FF] transition-all cursor-default">+28% conversion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What's included Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 space-y-12 relative z-10 reveal-scale-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F0FF] border border-[#d7cffe] text-[#7B61FF] text-xs font-bold uppercase tracking-wider shadow-xs">
            What's included
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything between a blank page and an offer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-4 hover:border-[#bba9fd] shadow-card hover:shadow-card-hover card-interactive reveal-scale-in reveal-delay-1">
            <div className="text-xs font-mono font-bold text-[#7B61FF] group-hover:translate-x-1 transition-transform inline-block">01 / builder</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#7B61FF] transition-colors">Guided 7-step builder</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fill in experience, education, and skills section by section, with a live preview that updates as you type and never locks you out of raw editing.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-4 hover:border-[#bba9fd] shadow-card hover:shadow-card-hover card-interactive reveal-scale-in reveal-delay-2">
            <div className="text-xs font-mono font-bold text-[#7B61FF] group-hover:translate-x-1 transition-transform inline-block">02 / scanner</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#7B61FF] transition-colors">6-point ATS scan</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload an existing PDF to check formatting, keyword coverage, verb strength, and metric density, with a breakdown of exactly what to fix first.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-4 hover:border-[#bba9fd] shadow-card hover:shadow-card-hover card-interactive reveal-scale-in reveal-delay-3">
            <div className="text-xs font-mono font-bold text-[#7B61FF] group-hover:translate-x-1 transition-transform inline-block">03 / templates</div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#7B61FF] transition-colors">Three parser-safe layouts</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Minimalist, Executive, and Technical templates, each built as a single column with no tables or text boxes so nothing gets scrambled on import.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Questions / Frequently asked Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 space-y-8 relative z-10 reveal-fade-up">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F0FF] border border-[#d7cffe] text-[#7B61FF] text-xs font-bold uppercase tracking-wider shadow-xs">
            Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently asked
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-[#bba9fd] transition-all card-interactive"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:text-[#7B61FF] transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#7B61FF]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Ready when you are (CTA Banner) */}
      <section id="cta" className="max-w-4xl mx-auto px-4 relative z-10 reveal-mask-in">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#F3F0FF] via-[#EAE5FE] to-[#E5F3FE] border border-[#d7cffe] text-center space-y-6 shadow-card hover:shadow-card-hover card-interactive relative overflow-hidden text-slate-900">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 text-[#7B61FF] text-xs font-bold border border-[#d7cffe] shadow-xs">
            <Award className="w-3.5 h-3.5" /> Ready when you are
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Build the resume that gets past the bot first.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Set up your first draft in under 10 minutes, scan it against a real job post, and export a clean, parser-safe PDF.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-[#7B61FF] hover:bg-[#6B4FE0] shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Start for free
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
