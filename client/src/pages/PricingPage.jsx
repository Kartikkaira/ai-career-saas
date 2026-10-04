import React, { useState, useEffect } from 'react';
import { useUiStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { subscriptionApi } from '../services/subscriptionApi';
import confetti from 'canvas-confetti';
import {
  Check,
  X,
  Crown,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const PricingPage = () => {
  const { openUpgradeModal, openAuthModal, addToast } = useUiStore();
  const { isAuthenticated, user, updateUserPlan } = useAuthStore();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Handle return from Stripe Checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const isSuccess = params.get('success');
    const isCanceled = params.get('canceled');
    const planId = params.get('planId');

    if (sessionId && isSuccess) {
      window.history.replaceState({}, document.title, window.location.pathname);
      const verifyCheckout = async () => {
        setIsLoading(true);
        try {
          const res = await subscriptionApi.verifySession(sessionId, planId);
          if (res?.success) {
            updateUserPlan('premium', res.subscription);
            addToast('🎉 Payment verified! Upgraded to Pro. Enjoy unlimited ATS resumes & AI analyses.', 'success');
            confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
          }
        } catch (err) {
          addToast('Could not verify Stripe payment: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
          setIsLoading(false);
        }
      };
      verifyCheckout();
    } else if (isCanceled) {
      window.history.replaceState({}, document.title, window.location.pathname);
      addToast('Stripe checkout was canceled. No charges were made.', 'info');
    }
  }, []);

  const isPremium = user?.role === 'premium' || user?.role === 'admin';

  const handleSelectPlan = (planKey) => {
    if (planKey === 'free') {
      if (isPremium) {
        addToast('You already have active Pro privileges!', 'info');
      } else {
        addToast('You are currently on the Starter Free tier.', 'info');
      }
      return;
    }

    if (!isAuthenticated) {
      openAuthModal('register');
      return;
    }

    if (isPremium) {
      addToast('You are already an active Pro member!', 'success');
      return;
    }

    openUpgradeModal(billingCycle === 'annual' ? 'pro_annual' : 'pro_monthly');
  };

  const handleResetToFree = async () => {
    setIsLoading(true);
    try {
      const res = await subscriptionApi.resetTier();
      if (res.success) {
        updateUserPlan('user', null);
        addToast('Switched to Free tier! You can now test Stripe checkout from scratch.', 'info');
      }
    } catch (err) {
      updateUserPlan('user', null);
      addToast('Switched to Free tier.', 'info');
    } finally {
      setIsLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Why are these résumé templates guaranteed to be ATS compatible?',
      a: 'Automated tracking platforms (Workday, Taleo, Greenhouse, Lever, iCIMS) fail when confronted with multi-column tables, floating text boxes, and complex graphical icon fonts. Our templates use single-stream semantic structure and high-contrast typography designed specifically to parse at 100% fidelity without dropped fields.',
    },
    {
      q: 'How does the Gemini AI bullet rewrite formula work?',
      a: 'Developed by former Google and top tech recruiters, the formula follows: "Accomplished [X], as measured by [Y], by doing [Z]". CareerCraft automatically reformulates passive, responsibility-focused duties into quantified, high-impact statements that grab human attention within 6 seconds.',
    },
    {
      q: 'Can I cancel my subscription at any time?',
      a: 'Yes, you can cancel whenever you wish directly from your account settings. You retain uninterrupted access to all Pro features until the end of your billing cycle, and no unexpected charges will ever be made.',
    },
    {
      q: 'Are payments secure?',
      a: 'All transactions are processed through Stripe with 256-bit encryption. We never store or see your full credit card details.',
    },
  ];

  return (
    <div className="bg-[#F7F4ED] text-[#15130F] min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Active Member Announcement Banner */}
        {isPremium && (
          <div className="p-6 rounded-3xl bg-[#3D4A2E] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-white/20 text-amber-300 flex items-center justify-center font-bold shrink-0">
                ✦
              </div>
              <div>
                <h3 className="font-serif text-lg font-normal flex items-center gap-2">
                  <span>You are an active Pro member</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                    ACTIVE
                  </span>
                </h3>
                <p className="text-xs text-white/80 mt-0.5 font-sans">
                  Unlimited ATS scans, Google Gemini bullet rewrites, and executive templates unlocked.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={openUpgradeModal}
                className="px-4 py-2 bg-white text-[#15130F] hover:bg-[#FAF8F3] rounded-full text-xs font-semibold shadow-xs transition"
              >
                View status
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleResetToFree}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-medium border border-white/20 transition"
              >
                Reset to free (test)
              </button>
            </div>
          </div>
        )}

        {/* Title & Billing Toggle */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10">
            ✦ Honest, transparent pricing
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.08] tracking-tight text-[#15130F]">
            Invest in your career, <br />
            <span className="italic font-light">confidently.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#5C564E] font-sans leading-relaxed">
            Land your next career upgrade faster. Zero hidden fees. Cancel anytime in one click.
          </p>

          {/* Billing Toggle (Pill container) */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-1 p-1 bg-[#EFECE3] border border-[#15130F]/10 rounded-full">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#15130F] text-[#F7F4ED] font-semibold'
                    : 'text-[#5C564E] hover:text-[#15130F]'
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-[#15130F] text-[#F7F4ED] font-semibold'
                    : 'text-[#5C564E] hover:text-[#15130F]'
                }`}
              >
                <span>Annual billing</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#B8571E] text-white">
                  Save 41%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Free Plan Card */}
          <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#15130F]/15 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl font-normal text-[#15130F]">Starter Free</h3>
                <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#EFECE3] text-[#5C564E]">
                  Free forever
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-serif text-5xl font-normal text-[#15130F]">₹0</span>
                <span className="text-xs text-[#5C564E]">/ month</span>
              </div>

              <p className="text-xs text-[#5C564E] leading-relaxed">
                Perfect for exploring ATS compatibility and drafting your initial résumé.
              </p>

              <div className="space-y-3 pt-5 border-t border-[#15130F]/10 text-xs text-[#15130F]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#3D4A2E] shrink-0" />
                  <span>1 Saved universal ATS résumé</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#3D4A2E] shrink-0" />
                  <span>2 AI ATS résumé analyses per month</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#3D4A2E] shrink-0" />
                  <span>Universal ATS Minimalist Template</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#3D4A2E] shrink-0" />
                  <span>Standard vector PDF export</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#8A8277] line-through">
                  <X className="w-4 h-4 text-[#8A8277]/60 shrink-0" />
                  <span>Unlimited résumés & scans</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#8A8277] line-through">
                  <X className="w-4 h-4 text-[#8A8277]/60 shrink-0" />
                  <span>Executive Elite & Modern Tech templates</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="button"
                disabled={isPremium}
                onClick={() => handleSelectPlan('free')}
                className={`w-full py-3.5 rounded-full text-xs font-medium transition active:scale-98 ${
                  isPremium
                    ? 'bg-[#EFECE3] text-[#8A8277] cursor-not-allowed'
                    : 'text-[#15130F] bg-white hover:bg-[#EFECE3] border border-[#15130F]/20'
                }`}
              >
                {isPremium ? 'Included with Pro' : isAuthenticated ? 'Current free plan' : 'Get started free'}
              </button>
            </div>
          </div>

          {/* Pro Plan Card (Terracotta / Olive Accent) */}
          <div className="bg-[#15130F] text-[#F7F4ED] p-8 rounded-3xl border border-[#15130F] flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl font-normal text-[#F7F4ED]">CareerCraft Pro</h3>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#B8571E] text-white">
                  {isPremium ? 'Active Plan' : 'Most Popular'}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-serif text-5xl font-normal text-[#F7F4ED]">
                  {billingCycle === 'annual' ? '₹699' : '₹99'}
                </span>
                <span className="text-xs text-[#F7F4ED]/70">
                  {billingCycle === 'annual' ? '/ year (₹58/mo)' : '/ month ($2 USD)'}
                </span>
              </div>

              <p className="text-xs text-[#F7F4ED]/80 leading-relaxed font-sans">
                Complete ATS intelligence suite for active job seekers seeking maximum callback rates.
              </p>

              <div className="space-y-3 pt-5 border-t border-[#F7F4ED]/15 text-xs text-[#F7F4ED]/90">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <strong className="text-white">Unlimited ATS-optimized résumés</strong>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <strong className="text-white">Unlimited PDF scans & instant scoring</strong>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Executive Elite & Modern Tech templates unlocked</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Google X-Y-Z bullet point metric rewrite generator</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Target job description keyword gap matcher</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>High-resolution vector PDF downloads (no watermark)</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="button"
                disabled={isPremium || isLoading}
                onClick={() => handleSelectPlan('pro')}
                className={`w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-98 shadow-sm ${
                  isPremium
                    ? 'bg-[#3D4A2E] text-white cursor-default'
                    : 'bg-[#F7F4ED] text-[#15130F] hover:bg-white'
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#15130F] border-t-transparent rounded-full animate-spin" />
                ) : isPremium ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ Current active Pro subscription</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay {billingCycle === 'annual' ? '₹699' : '₹99'} & upgrade</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* FAQ ACCORDION SECTION (Hairline dividers, NO cards)          */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto pt-12 border-t border-[#15130F]/15">
          <div className="text-left mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10 mb-3">
              ● FAQ
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#15130F]">
              Frequently asked <span className="italic font-light">questions.</span>
            </h3>
          </div>

          {/* Simple Accordion with Hairline Dividers */}
          <div className="border-t border-[#15130F]/15">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-[#15130F]/15">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full py-5 flex items-center justify-between text-left gap-4 hover:opacity-85 transition"
                  >
                    <span className="font-serif text-lg font-normal text-[#15130F]">
                      {faq.q}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#EFECE3] text-[#15130F] flex items-center justify-center text-xs shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-5 text-xs sm:text-sm text-[#5C564E] leading-relaxed font-sans max-w-2xl">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
