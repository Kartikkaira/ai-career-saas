import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useUiStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { subscriptionApi } from '../../services/subscriptionApi';
import confetti from 'canvas-confetti';
import {
  Crown,
  Check,
  CreditCard,
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const UpgradeModal = () => {
  const { upgradeModalOpen, upgradeModalPlan, closeUpgradeModal, addToast } = useUiStore();
  const { user, updateUserPlan } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState('pro_monthly');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (upgradeModalPlan) {
      setSelectedPlan(upgradeModalPlan);
    }
  }, [upgradeModalPlan, upgradeModalOpen]);

  const isPremium = user?.role === 'premium' || user?.role === 'admin';

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

  const handleStripeCheckout = async (planId) => {
    setIsLoading(true);
    try {
      const res = await subscriptionApi.createCheckoutSession(planId);
      if (res?.url && (res.url.startsWith('https://checkout.stripe.com') || res.url.includes('stripe.com'))) {
        window.location.href = res.url;
        return;
      }
      throw new Error(res?.message || 'Server did not return a valid Stripe checkout URL.');
    } catch (err) {
      console.error('Stripe checkout error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to start Stripe checkout.';
      addToast(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={upgradeModalOpen}
      onClose={closeUpgradeModal}
      title={isPremium ? 'Your Pro Membership' : 'Upgrade to CareerCraft Pro'}
      maxWidth="max-w-2xl"
    >
      {isPremium ? (
        /* When user is already a PRO member */
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 rounded-3xl bg-[#F3F0FF] border border-[#d7cffe] text-[#7B61FF] flex items-center justify-center mx-auto shadow-sm">
            <Crown className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> PRO MEMBERSHIP ACTIVE
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              You're an Active Pro Member!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              You have full, unlimited access to all AI resume features, premium ATS templates, and deep job-matching analyses.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 max-w-lg mx-auto shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Active Pro Privileges:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF]" />
                <span>Unlimited Resumes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF]" />
                <span>Unlimited ATS Scans</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF]" />
                <span>Tech & Executive Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF]" />
                <span>Google X-Y-Z AI Enhancer</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={closeUpgradeModal}
              className="px-8 py-3.5 bg-[#7B61FF] hover:bg-[#6B4FE0] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition w-full sm:w-auto"
            >
              Continue Building
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleResetToFree}
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold text-xs border border-slate-300 transition w-full sm:w-auto flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Free (Test Stripe)</span>
            </button>
          </div>
        </div>
      ) : (
        /* When user is on FREE tier */
        <div className="space-y-6">
          {/* Header Hero */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F0FF] border border-[#d7cffe] text-[#7B61FF] text-xs font-bold shadow-xs">
              <Crown className="w-3.5 h-3.5" />
              AFFORDABLE PRO ATS ACCESS & AI INTELLIGENCE
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Supercharge Your Job Search & Land 3x More Interviews
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Upgrade to Pro for unlimited resumes, keyword gap matchers, and priority Gemini AI bullet point generation.
            </p>
          </div>

          {/* Plan Toggle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan('pro_monthly')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                selectedPlan === 'pro_monthly'
                  ? 'bg-[#F3F0FF]/80 border-[#7B61FF] shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-900">Pro Monthly</span>
                <span className="text-xs px-2 py-0.5 rounded bg-white text-[#7B61FF] border border-[#d7cffe] font-mono font-semibold">
                  Monthly Billing
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-extrabold text-slate-900">₹99</span>
                <span className="text-xs text-slate-500">/ month ($2 USD)</span>
              </div>
              <p className="text-xs text-slate-500">Cancel anytime. Instant access.</p>
            </div>

            {/* Annual Plan */}
            <div
              onClick={() => setSelectedPlan('pro_annual')}
              className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                selectedPlan === 'pro_annual'
                  ? 'bg-[#F3F0FF]/80 border-[#7B61FF] shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="absolute -top-2.5 right-4 bg-[#7B61FF] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                Save 41% (Best Value)
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-900">Pro Annual</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-extrabold text-[#7B61FF]">₹699</span>
                <span className="text-xs text-slate-500">/ year ($9 USD · ₹58/mo)</span>
              </div>
              <p className="text-xs text-slate-500">Billed annually. Best value for active job seekers.</p>
            </div>
          </div>

          {/* Feature List */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">What's Included in Pro:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Unlimited ATS-Optimized Resumes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Unlimited PDF Resume ATS Analyses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>All 3 ATS-Safe Executive & Tech Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Google X-Y-Z AI Bullet Enhancer</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>Target Job Description Keyword Matcher</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#7B61FF] shrink-0" />
                <span>High-Resolution ATS PDF Export</span>
              </div>
            </div>
          </div>

          {/* Stripe Trust Badge */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F3F0FF]/70 border border-[#d7cffe] text-xs text-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7B61FF] shrink-0" />
              <span className="font-semibold">Payments powered by Stripe Checkout</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Global Cards & 256-Bit SSL</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-1">
            {/* Primary Action Button - Opens Stripe */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleStripeCheckout(selectedPlan)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-extrabold text-white bg-[#7B61FF] hover:bg-[#6B4FE0] shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all text-sm cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4 text-indigo-200" />
                  <span>Pay ₹{selectedPlan === 'pro_annual' ? '699' : '99'} with Stripe</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
