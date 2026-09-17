import React, { useState, useEffect } from 'react';
import { useUiStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { subscriptionApi } from '../services/subscriptionApi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import confetti from 'canvas-confetti';
import { Badge } from '../components/common/Badge';
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
} from 'lucide-react';

export const PricingPage = () => {
  const { openUpgradeModal, openAuthModal, addToast } = useUiStore();
  const { isAuthenticated, user, updateUserPlan } = useAuthStore();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  // Activate scroll reveals
  useScrollReveal();

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-200">
      {/* Active Member Announcement Banner */}
      {isPremium && (
        <div className="p-5 rounded-2xl bg-[#F3F0FF] border border-[#d7cffe] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#7B61FF] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>You are an Active Pro Member</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  ACTIVE
                </span>
              </h3>
              <p className="text-xs text-slate-600">
                You have full unlimited access to all AI resume features, ATS scans, and executive templates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={openUpgradeModal}
              className="px-4 py-2 bg-white text-[#7B61FF] hover:bg-[#F3F0FF] border border-[#d7cffe] rounded-xl text-xs font-bold shadow-xs transition"
            >
              View Membership Status
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleResetToFree}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold transition"
            >
              Reset to Free (Test Stripe)
            </button>
          </div>
        </div>
      )}

      {/* Title & Billing Toggle */}
      <div className="text-center space-y-4 max-w-2xl mx-auto reveal-fade-up is-revealed">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3F0FF] border border-[#d7cffe] text-[#7B61FF] text-xs font-bold uppercase tracking-wider shadow-xs">
          ACCESSIBLE CAREER INVESTMENT
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Simple, Affordable Plans for Serious Job Seekers
        </h1>

        <p className="text-sm sm:text-base text-slate-600">
          Land your next career upgrade faster. Zero hidden fees. Cancel anytime in one click.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-2 p-1.5 bg-white border border-slate-200/90 shadow-card rounded-2xl">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
              billingCycle === 'monthly'
                ? 'bg-[#7B61FF] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-[#7B61FF] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual (Save 41%)</span>
            <span className={`px-1.5 py-0.2 rounded text-[10px] font-extrabold ${
              billingCycle === 'annual' ? 'bg-white/20 text-white' : 'bg-[#F3F0FF] text-[#7B61FF]'
            }`}>
              ₹58/MO
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 space-y-6 flex flex-col justify-between shadow-card hover:shadow-card-hover card-interactive reveal-scale-in reveal-delay-1">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-slate-900">Starter Free</span>
              <Badge variant="default" size="sm">Free Forever</Badge>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">₹0</span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Perfect for exploring ATS compatibility and drafting your initial resume.
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>1 Saved Universal ATS Resume</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>2 AI ATS Resume Analyses / month</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Universal ATS Minimalist Template</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Standard Vector PDF Export</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 line-through">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Unlimited Resumes & Scans</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 line-through">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Tech Specialist & Executive Templates</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={isPremium}
            onClick={() => handleSelectPlan('free')}
            className={`w-full py-3.5 rounded-2xl text-xs font-semibold transition-all duration-200 active:scale-[0.98] ${
              isPremium
                ? 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-950 border border-slate-200 shadow-xs'
            }`}
          >
            {isPremium ? 'Included with Your Pro Access' : isAuthenticated ? 'Current Free Tier' : 'Get Started Free'}
          </button>
        </div>

        {/* Pro Plan Card */}
        <div className={`bg-white p-8 rounded-3xl border-2 space-y-6 flex flex-col justify-between relative overflow-hidden shadow-card hover:shadow-card-hover card-interactive reveal-scale-in reveal-delay-2 ${
          isPremium ? 'border-emerald-500 shadow-emerald-500/10' : 'border-[#7B61FF] shadow-[#7B61FF]/10'
        }`}>
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${
              isPremium ? 'bg-emerald-100 text-emerald-800' : 'bg-[#F3F0FF] text-[#7B61FF] border border-[#d7cffe]'
            }`}>
              {isPremium ? 'Active Plan' : 'Most Popular'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className={`w-5 h-5 ${isPremium ? 'text-emerald-600' : 'text-[#7B61FF]'}`} />
              <span className="text-lg font-bold text-slate-900">CareerCraft Pro</span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900">
                {billingCycle === 'annual' ? '₹699' : '₹99'}
              </span>
              <span className="text-xs text-slate-500">
                {billingCycle === 'annual' ? '/ year ($9 USD · ₹58/mo)' : '/ month ($2 USD)'}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Complete ATS intelligence suite for active job candidates seeking maximum interview callbacks.
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-800">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <strong className="text-slate-950">Unlimited ATS-Optimized Resumes</strong>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <strong className="text-slate-950">Unlimited PDF Resume Analyses & Scoring</strong>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Tech & Engineering Specialist & Executive Templates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Google X-Y-Z Bullet Point Quantifier</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Target Job Description Keyword Gap Matcher</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>High-Resolution Crisp Vector PDF Download</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={isPremium || isLoading}
            onClick={() => handleSelectPlan('pro')}
            className={`w-full py-3.5 rounded-2xl text-xs font-bold text-white shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isPremium
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#7B61FF] hover:bg-[#6B4FE0]'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPremium ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>✓ Your Current Active Plan (Pro)</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 text-indigo-200" />
                <span>Pay {billingCycle === 'annual' ? '₹699' : '₹99'} & Upgrade with Stripe</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-slate-200/80 reveal-fade-up is-revealed">
        <h3 className="text-xl font-bold text-slate-900 text-center">Frequently Asked Questions</h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-1.5 shadow-card hover:shadow-card-hover card-interactive">
            <h4 className="font-bold text-slate-900">Why are these resume templates ATS safe?</h4>
            <p className="text-slate-600 leading-relaxed">
              Standard ATS parsers (like Workday, Taleo, Greenhouse, and Lever) fail on multi-column tables, graphics, and custom icon fonts. Our templates use single-column semantics and high-contrast typography designed specifically to parse at 100% fidelity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-1.5 shadow-card hover:shadow-card-hover card-interactive">
            <h4 className="font-bold text-slate-900">How does the Google X-Y-Z formula work?</h4>
            <p className="text-slate-600 leading-relaxed">
              Created by former Google recruiters, the X-Y-Z formula states: "Accomplished [X] as measured by [Y], by doing [Z]". Our Gemini AI automatically restructures your draft sentences to follow this exact format with numbers and active verbs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-1.5 shadow-card hover:shadow-card-hover card-interactive">
            <h4 className="font-bold text-slate-900">Can I cancel anytime?</h4>
            <p className="text-slate-600 leading-relaxed">
              Yes, you can cancel your subscription at any time. You will continue to have full access until the end of your billing cycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
