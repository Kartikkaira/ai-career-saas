import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUiStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Target,
  FileText,
  ScanSearch,
  Check,
  Zap,
  TrendingUp,
  Award,
  ShieldCheck,
  Briefcase,
  Layers,
} from 'lucide-react';

export const LandingPage = () => {
  const { openAuthModal } = useUiStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Interactive Live Rewrite Bullet State
  const [isRewritten, setIsRewritten] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleStartCTA = () => {
    if (isAuthenticated) {
      navigate('/builder');
    } else {
      openAuthModal('register');
    }
  };

  const faqs = [
    {
      q: 'Why do most résumés get rejected before a human sees them?',
      a: 'Over 75% of candidates fail automated Applicant Tracking Systems (ATS) due to non-standard multi-column tables, unparseable graphics, complex icons, or missing semantic job keywords. CareerCraft ensures single-stream, machine-parseable structures while remaining visually stunning for human eyes.',
    },
    {
      q: 'How does the Gemini AI bullet rewrite formula work?',
      a: 'Our intelligence engine follows the proven Google executive formula: "Accomplished [X], as measured by [Y], by doing [Z]". We take your raw responsibilities and transform them into quantified, action-oriented leadership statements that pass screening algorithms with top percentile scores.',
    },
    {
      q: 'Can I upload my existing PDF résumé and get an instant score?',
      a: 'Yes. Simply navigate to our ATS Scanner, drop your PDF or paste your plain text, and optionally paste your target job description. You receive an instant 0–100 score, missing keyword gaps, recruiter skim alerts, and syntax suggestions.',
    },
    {
      q: 'Are the exported PDF files ATS-compliant and vector-searchable?',
      a: 'Every export from CareerCraft produces clean, vector-based, 100% selectable text PDFs. They are benchmarked against Workday, Greenhouse, Lever, Taleo, and iCIMS parsers without losing typography hierarchy or styling.',
    },
    {
      q: 'What is included in the Pro trial?',
      a: 'You get full access to all three executive templates, unlimited Gemini AI bullet rewrites, unlimited ATS scans against custom job descriptions, and high-resolution PDF exports with no watermarks.',
    },
  ];

  return (
    <div className="bg-[#F7F4ED] text-[#15130F] font-sans overflow-hidden">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. FULL-BLEED HERO SECTION                                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-24">
        {/* Full-bleed Editorial Background Photo */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/hero-landscape.jpg"
            alt="Rolling golden-hour landscape"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          />
          {/* Subtle gradient overlays to ensure text & card contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60 pointer-events-none" />
        </div>

        {/* Hero Content (Centered) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-12 sm:mt-16 lg:mt-20">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[76px] font-normal leading-[1.08] tracking-tight text-white max-w-4xl mx-auto drop-shadow-sm">
            Craft your résumé <br />
            <span className="italic font-light">effortlessly, beautifully.</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto font-sans font-normal leading-relaxed drop-shadow-xs">
            CareerCraft helps you write, tailor and score résumés with intelligent AI —
            all in one calm, minimal workspace.
          </p>

          {/* Hero Pill Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handleStartCTA}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-white text-[#15130F] hover:bg-[#FAF8F3] font-medium text-sm transition-all duration-200 shadow-md active:scale-[0.98]"
            >
              <span>Start free trial</span>
              <span className="w-5 h-5 rounded-full bg-[#15130F] text-white flex items-center justify-center text-xs">
                →
              </span>
            </button>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-black/25 hover:bg-black/35 text-white border border-white/30 backdrop-blur-md font-medium text-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>See pricing</span>
              <span className="text-white/80">›</span>
            </Link>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* 2. FLOATING PREVIEW CARDS (Overlapping bottom edge of hero)    */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 1: Résumé Score */}
            <div className="bg-[#FAF8F3]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#15130F]/10 text-[#15130F] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[#5C564E]">Résumé score</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-semibold text-[#15130F]">
                  Senior PM draft
                </span>
                <span className="font-serif text-lg font-normal text-[#B8571E]">92%</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-[#E8E3D7] rounded-full h-1.5 overflow-hidden mb-3">
                <div
                  className="bg-[#B8571E] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: '92%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#5C564E] pt-2 border-t border-[#15130F]/10">
                <span>ATS · 96/100</span>
                <span>Tone · A+</span>
              </div>
            </div>

            {/* Card 2: AI Coach */}
            <div className="bg-[#FAF8F3]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#15130F]/10 text-[#15130F] shadow-sm">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-medium text-[#5C564E]">AI coach</span>
                <span className="text-[10px] text-amber-700 font-semibold px-2 py-0.5 rounded-full bg-amber-100">
                  Active
                </span>
              </div>
              <div className="flex items-start gap-2.5 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#B8571E] text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✦
                </div>
                <p className="text-xs text-[#25211C] leading-relaxed">
                  Try opening this bullet with a measurable result — recruiters skim the first four words.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#15130F]/10">
                <button
                  type="button"
                  className="px-3 py-1 rounded-full text-[11px] font-medium text-[#5C564E] hover:text-[#15130F]"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={() => setIsRewritten(!isRewritten)}
                  className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#B8571E] text-white hover:bg-[#A04815] transition"
                >
                  Apply suggestion
                </button>
              </div>
            </div>

            {/* Card 3: Job Match */}
            <div className="bg-[#FAF8F3]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#15130F]/10 text-[#15130F] shadow-sm">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-medium text-[#5C564E]">Job match</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  94% match
                </span>
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#2E3A4F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  N
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#15130F] leading-tight">Senior PM</p>
                  <p className="text-[11px] text-[#5C564E]">Northwave Labs · Remote</p>
                </div>
              </div>
              {/* URL bar with verification */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-[#EFECE3] border border-[#15130F]/10 text-[11px] text-[#5C564E]">
                <span className="truncate max-w-[190px]">linkedin.com/jobs/4881920</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. THE OUTCOME / INTERACTIVE REWRITE WORKSPACE               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#15130F]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Mockup Panel (7 cols on lg) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-[#FAF8F3] border border-[#15130F]/15 rounded-3xl p-5 sm:p-7 shadow-xs">
              {/* Browser window chrome dots */}
              <div className="flex items-center justify-between pb-4 border-b border-[#15130F]/10 mb-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="ml-3 text-xs font-medium text-[#5C564E]">
                    Aria Bennett — Senior PM
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>AI coach active</span>
                </div>
              </div>

              {/* Coach Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#B8571E] text-white flex items-center justify-center text-xs">
                    ✦
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#15130F]">CareerCraft Coach</h4>
                    <p className="text-[11px] text-[#5C564E]">Suggesting a stronger rewrite</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D8C9A8] text-[#15130F] text-[10px] font-semibold tracking-wide">
                  REWRITING
                </span>
              </div>

              {/* Original Bullet (Before) */}
              <div className="p-3.5 rounded-xl bg-white border border-[#15130F]/10 mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#8A8277] uppercase tracking-wider">
                    Original bullet (before)
                  </span>
                  <span className="text-[10px] text-rose-600 font-medium">Passive tone</span>
                </div>
                <p className="text-xs text-[#5C564E] font-sans line-through decoration-rose-400/70">
                  Managed projects across the team and helped ship features on time.
                </p>
              </div>

              {/* Trigger Button */}
              <div className="flex justify-center my-3">
                <button
                  type="button"
                  onClick={() => setIsRewritten(!isRewritten)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] text-xs font-medium transition active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isRewritten ? 'Reset sample' : '+ AI rewrite with metrics'}</span>
                </button>
              </div>

              {/* Recruiter Ready Bullet (After) */}
              <div className="p-4 rounded-xl bg-[#FAF8F3] border-2 border-[#3D4A2E] mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#3D4A2E] uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#3D4A2E]" />
                    Recruiter-ready bullet
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    97% ATS score
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#15130F] leading-relaxed font-medium">
                  Led a <span className="bg-[#D8C9A8]/60 px-1 py-0.5 rounded">6-person cross-functional team</span> to ship{' '}
                  <span className="bg-[#D8C9A8]/60 px-1 py-0.5 rounded">3 major product launches</span> ahead of schedule, lifting user activation{' '}
                  <span className="bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded font-semibold">
                    14% quarter over quarter
                  </span>.
                </p>
              </div>

              {/* Metrics bar */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#15130F]/10">
                <div className="p-2.5 rounded-xl bg-white border border-[#15130F]/10">
                  <p className="text-[10px] text-[#5C564E]">Match score lift</p>
                  <p className="font-serif text-lg text-[#15130F] font-normal">+42%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#15130F]/10">
                  <p className="text-[10px] text-[#5C564E]">Average build time</p>
                  <p className="font-serif text-lg text-[#15130F] font-normal">Under 5m</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative Copy (5 cols on lg) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#B8571E] border border-[#15130F]/10">
              ● The outcome
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.12] tracking-tight text-[#15130F]">
              AI-powered, <br />
              <span className="italic font-light">interview-ready</span> résumés.
            </h2>

            <p className="text-sm sm:text-base text-[#5C564E] leading-relaxed max-w-prose">
              CareerCraft rewrites every bullet for clarity and impact, then benchmarks
              the result against thousands of recent hires across your role, industry and
              seniority band.
            </p>

            <div className="pt-2">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] font-medium text-sm transition-all duration-200"
              >
                <span>See how it works</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  →
                </span>
              </Link>
            </div>

            {/* 3 Bottom Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#15130F]/10 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#15130F] font-normal">
                  40%
                </p>
                <p className="text-[11px] text-[#5C564E] mt-1 uppercase tracking-wider font-medium">
                  Higher ATS match rate
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#15130F] font-normal">
                  32%
                </p>
                <p className="text-[11px] text-[#5C564E] mt-1 uppercase tracking-wider font-medium">
                  More recruiter callbacks
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#15130F] font-normal">
                  3×
                </p>
                <p className="text-[11px] text-[#5C564E] mt-1 uppercase tracking-wider font-medium">
                  Faster creation time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. ASYMMETRIC SOLID-COLOR FEATURE GRID                      */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#15130F]/10">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#3D4A2E] border border-[#15130F]/10 mb-4">
            ● Features
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.12] tracking-tight text-[#15130F]">
            Quietly powerful, <span className="italic font-light">start to finish.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5C564E] leading-relaxed max-w-2xl">
            From AI-powered writing to ATS optimization — everything you need to land
            your next interview in one calm workspace.
          </p>
        </div>

        {/* Asymmetric 2x2 Grid of Solid Flat Color Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Block 1: Olive / Forest Green (#3D4A2E) */}
          <div className="bg-[#3D4A2E] text-white p-7 sm:p-9 rounded-3xl flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
            <div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm mb-6">
                ✦
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white mb-3">
                AI writes it for you
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md font-sans">
                Smart prompts turn rough notes into crisp bullets — tone, verbs and impact
                tuned to the role you actually want.
              </p>
            </div>

            {/* Mockup snippet inside Olive block */}
            <div className="mt-8 bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                <span className="font-mono text-[11px]">Professional summary</span>
                <span className="text-amber-300 text-[11px]">Auto-enhanced</span>
              </div>
              <p className="text-xs text-white leading-relaxed">
                "Experienced Business Development Manager bringing significant value and a
                genuine passion for team development. Proven record of growing accounts,
                fostering strong client relationships and executing innovative strategies..."
              </p>
            </div>
          </div>

          {/* Block 2: Burnt Terracotta / Rust (#B8571E) */}
          <div className="bg-[#B8571E] text-white p-7 sm:p-9 rounded-3xl flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
            <div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm mb-6">
                ✓
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white mb-3">
                Guided résumé flow
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md font-sans">
                Build your résumé step-by-step with clear prompts. No blank page
                paralysis — just follow the calm sequence.
              </p>
            </div>

            {/* Mockup checklist inside Terracotta block */}
            <div className="mt-8 bg-white/10 rounded-2xl p-4 border border-white/20 space-y-2.5">
              <div className="flex items-center justify-between bg-white/15 px-3 py-2 rounded-xl text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Personal details
                </span>
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex items-center justify-between bg-white/15 px-3 py-2 rounded-xl text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Professional summary
                </span>
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex items-center justify-between bg-white/25 px-3 py-2 rounded-xl text-xs font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-white text-[#B8571E] flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  Core skills & metrics
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Current</span>
              </div>
            </div>
          </div>

          {/* Block 3: Warm Tan / Sand (#D8C9A8) */}
          <div className="bg-[#D8C9A8] text-[#15130F] p-7 sm:p-9 rounded-3xl flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
            <div>
              <div className="w-8 h-8 rounded-full bg-[#15130F]/10 flex items-center justify-center text-sm mb-6">
                %
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#15130F] mb-3">
                Résumé quality score
              </h3>
              <p className="text-xs sm:text-sm text-[#25211C] leading-relaxed max-w-md font-sans">
                See exactly how strong your résumé is — with clear, actionable feedback at
                every step before you submit.
              </p>
            </div>

            {/* Circular score gauge snippet */}
            <div className="mt-8 bg-white/60 rounded-2xl p-5 border border-[#15130F]/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#5C564E]">CareerCraft score</p>
                <p className="text-sm font-semibold text-[#15130F] mt-0.5">Almost there</p>
                <p className="text-[11px] text-[#5C564E] mt-1">2 quick fixes to hit 90%+</p>
              </div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#15130F]/15 border-t-[#B8571E] flex items-center justify-center font-serif text-lg font-normal text-[#15130F]">
                  88%
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Muted Navy-Slate (#2E3A4F) */}
          <div className="bg-[#2E3A4F] text-white p-7 sm:p-9 rounded-3xl flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
            <div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm mb-6">
                ⚡
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white mb-3">
                Match any job instantly
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md font-sans">
                Drop a job description link — CareerCraft learns what the recruiter wants
                and fine-tunes your résumé keywords.
              </p>
            </div>

            {/* Search/URL Mockup */}
            <div className="mt-8 bg-white/10 rounded-2xl p-4 border border-white/20">
              <label className="text-[11px] text-white/70 block mb-2">
                Paste a link to the job you want
              </label>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-xl text-xs text-white">
                <span className="truncate">https://recruiter.com/jobs/senior-lead</span>
                <span className="ml-auto text-[11px] bg-white text-[#2E3A4F] px-2 py-0.5 rounded-full font-semibold">
                  Match
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. FULL-WIDTH DARK STATS & TRUST SECTION                    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#15130F] text-[#F7F4ED] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 sm:mb-20 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-300 border border-white/15 mb-4">
              ● Why CareerCraft
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#F7F4ED]">
              Trusted to <span className="italic font-light">quietly</span> get you hired.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#F7F4ED]/75 leading-relaxed max-w-2xl font-sans">
              Smart AI, considered templates and ATS-friendly outputs — everything you
              need to get an interview, faster.
            </p>

            <div className="mt-8">
              <button
                onClick={handleStartCTA}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#F7F4ED] text-[#15130F] hover:bg-white font-medium text-sm transition-all duration-200"
              >
                <span>Build my résumé now</span>
                <span className="w-5 h-5 rounded-full bg-[#15130F] text-white flex items-center justify-center text-xs">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* 3 Large Stat Numbers in Serif Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pt-12 border-t border-[#F7F4ED]/15">
            <div>
              <p className="font-serif text-4xl sm:text-6xl text-[#F7F4ED] font-normal tracking-tight">
                Since 2022
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#F7F4ED]/70 leading-relaxed max-w-sm">
                Built with a mission to simplify résumé creation using intelligent
                automation and human-tested templates.
              </p>
            </div>

            <div>
              <p className="font-serif text-4xl sm:text-6xl text-[#F7F4ED] font-normal tracking-tight">
                100,000+
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#F7F4ED]/70 leading-relaxed max-w-sm">
                Hundreds of thousands of personalized résumés crafted across roles,
                industries and career levels.
              </p>
            </div>

            <div>
              <p className="font-serif text-4xl sm:text-6xl text-[#F7F4ED] font-normal tracking-tight">
                95%
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#F7F4ED]/70 leading-relaxed max-w-sm">
                Most users see improved ATS results and higher interview callbacks within
                their first month of applying.
              </p>
            </div>
          </div>

          {/* 3 Template Previews Side-by-Side Under Stats */}
          <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#25211C] p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs text-[#F7F4ED]/80 mb-3">
                <span className="font-semibold">Classic ATS</span>
                <span className="text-[10px] text-emerald-400">100% Pass rate</span>
              </div>
              <div className="bg-white text-slate-900 p-4 rounded-xl text-[10px] space-y-1.5 font-serif select-none pointer-events-none opacity-90">
                <p className="font-bold text-xs uppercase tracking-wider">Aria Bennett</p>
                <p className="text-[9px] text-slate-600">San Francisco, CA · aria@bennett.dev</p>
                <div className="border-b border-slate-300 my-1"></div>
                <p className="font-bold text-[9px] uppercase">Experience</p>
                <p className="font-semibold text-[9px]">Senior Product Manager — Apex</p>
                <p className="text-[8px] text-slate-700 leading-tight">
                  • Led strategic roadmaps for 4 core platforms, delivering 28% ARR uplift.
                </p>
              </div>
            </div>

            <div className="bg-[#25211C] p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs text-[#F7F4ED]/80 mb-3">
                <span className="font-semibold">Executive Elite</span>
                <span className="text-[10px] text-amber-300">Leadership format</span>
              </div>
              <div className="bg-white text-slate-900 p-4 rounded-xl text-[10px] space-y-1.5 select-none pointer-events-none opacity-90">
                <div className="border-l-2 border-[#15130F] pl-2">
                  <p className="font-bold text-xs font-serif">Marcus Vance</p>
                  <p className="text-[9px] text-slate-600">VP of Engineering</p>
                </div>
                <div className="bg-slate-50 p-1.5 rounded text-[8px] text-slate-700">
                  Proven technology executive with 14+ years scaling teams from 20 to 180+.
                </div>
              </div>
            </div>

            <div className="bg-[#25211C] p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs text-[#F7F4ED]/80 mb-3">
                <span className="font-semibold">Modern Tech</span>
                <span className="text-[10px] text-cyan-400">Developer optimized</span>
              </div>
              <div className="bg-white text-slate-900 p-4 rounded-xl text-[10px] space-y-1.5 select-none pointer-events-none opacity-90">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xs">Elena Rostova</p>
                  <span className="font-mono text-[8px] bg-slate-100 px-1 py-0.5 rounded">github.com</span>
                </div>
                <p className="text-[8px] text-slate-600">Full Stack & AI Systems</p>
                <div className="flex flex-wrap gap-1 mt-1 text-[7px] font-mono">
                  <span className="bg-slate-100 px-1 rounded">React</span>
                  <span className="bg-slate-100 px-1 rounded">TypeScript</span>
                  <span className="bg-slate-100 px-1 rounded">Node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. TEMPLATES & PERSONA / TESTIMONIAL SECTION                 */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10">
              ● Templates
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.12] tracking-tight text-[#15130F]">
              Designed for <span className="italic font-light">real hiring.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5C564E] leading-relaxed max-w-prose">
              Professionally crafted templates that impress recruiters and pass ATS —
              optimized for clarity, readability and modern hiring standards.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#3D4A2E] text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#15130F]">
                    Modern & clean layouts
                  </h4>
                  <p className="text-xs text-[#5C564E] mt-0.5">
                    Minimal, well-structured designs that highlight your skills and experience clearly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#3D4A2E] text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#15130F]">
                    100% ATS-compatible formats
                  </h4>
                  <p className="text-xs text-[#5C564E] mt-0.5">
                    All templates are tested to work seamlessly with Applicant Tracking Systems without missing tokens.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] font-medium text-sm transition-all duration-200"
              >
                <span>View all templates</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Portrait & Quote */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#15130F]/15 shadow-sm max-w-md mx-auto">
              <img
                src="/testimonial-portrait.jpg"
                alt="Professional hiring testimonial"
                className="w-full h-[440px] sm:h-[480px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <p className="font-serif italic text-base sm:text-lg leading-relaxed text-white/95 mb-3">
                  "CareerCraft helped me rewrite my bullet points with hard metrics. I received 4 interview callbacks within 10 days of applying."
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/20">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">Maya Lin</p>
                    <p className="text-[11px] text-white/80">Senior Product Manager at FinTech</p>
                  </div>
                  <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-full text-white backdrop-blur-sm">
                    Verified hire
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 7. FAQ ACCORDION SECTION (Hairline dividers, no cards)       */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#15130F]/10">
        <div className="text-left mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10 mb-4">
            ● FAQ
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.12] tracking-tight text-[#15130F]">
            Frequently asked <span className="italic font-light">questions.</span>
          </h2>
        </div>

        {/* Minimal Accordion with Hairline Dividers */}
        <div className="border-t border-[#15130F]/15">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border-b border-[#15130F]/15">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 sm:py-6 flex items-center justify-between text-left gap-4 hover:opacity-85 transition"
                >
                  <span className="font-serif text-lg sm:text-xl font-normal text-[#15130F]">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#EFECE3] text-[#15130F] flex items-center justify-center text-xs shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-6 text-xs sm:text-sm text-[#5C564E] leading-relaxed max-w-2xl font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 8. BOTTOM HERO CTA BANNER                                    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF8F3] border-t border-[#15130F]/10 py-20 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D8C9A8] text-[#15130F] mb-6">
            ✦ Start crafting today
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#15130F]">
            Ready to stand out <br />
            <span className="italic font-light">with confidence?</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5C564E] max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals creating interview-winning résumés in minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleStartCTA}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18] font-medium text-sm transition-all duration-200"
            >
              <span>Start free trial</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                →
              </span>
            </button>
            <Link
              to="/templates"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-[#15130F]/20 text-[#15130F] hover:bg-[#15130F]/5 font-medium text-sm transition"
            >
              <span>Explore templates</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
