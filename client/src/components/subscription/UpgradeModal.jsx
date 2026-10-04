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
      title={isPremium ? 'Your Pro membership' : 'Upgrade to CareerCraft Pro'}
      maxWidth="max-w-2xl"
    >
      {isPremium ? (
        /* Active Pro Member View */
        <div className="space-y-6 text-center py-4 text-[#15130F]">
          <div className="w-16 h-16 rounded-full bg-[#3D4A2E] text-white flex items-center justify-center mx-auto shadow-xs text-xl">
            ✦
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D4A2E] text-white text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> PRO MEMBERSHIP ACTIVE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#15130F]">
              You're an active Pro member!
            </h2>
            <p className="text-xs sm:text-sm text-[#5C564E] max-w-md mx-auto">
              You have full, unlimited access to all AI résumé features, premium ATS templates, and deep job-matching analyses.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#EFECE3]/70 border border-[#15130F]/10 text-left space-y-3 max-w-lg mx-auto">
            <h4 className="text-xs font-semibold text-[#15130F]">Active Pro privileges:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5C564E]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E]" />
                <span>Unlimited résumés</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E]" />
                <span>Unlimited ATS scans</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E]" />
                <span>Tech & executive templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E]" />
                <span>Google X-Y-Z AI enhancer</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={closeUpgradeModal}
              className="px-7 py-3 bg-[#15130F] hover:bg-[#2A1F18] text-[#F7F4ED] rounded-full font-medium text-xs transition w-full sm:w-auto"
            >
              Continue building
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleResetToFree}
              className="px-5 py-3 bg-white hover:bg-[#FAF8F3] text-[#15130F] rounded-full font-medium text-xs border border-[#15130F]/15 transition w-full sm:w-auto flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to free (test)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Free Tier Upgrade View */
        <div className="space-y-6 text-[#15130F]">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFECE3] text-[#15130F] text-xs font-semibold">
              ✦ Unlock full ATS intelligence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#15130F]">
              Supercharge your job search & land more interviews
            </h2>
            <p className="text-xs sm:text-sm text-[#5C564E] max-w-lg mx-auto">
              Upgrade to Pro for unlimited résumés, keyword gap matchers, and priority Gemini AI bullet point generation.
            </p>
          </div>

          {/* Plan Toggle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan('pro_monthly')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedPlan === 'pro_monthly'
                  ? 'bg-white border-[#15130F] shadow-sm'
                  : 'bg-[#EFECE3]/50 border-[#15130F]/10 hover:border-[#15130F]/30'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-serif font-normal text-[#15130F]">Pro monthly</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFECE3] text-[#5C564E]">
                  Monthly
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-3xl font-normal text-[#15130F]">₹99</span>
                <span className="text-xs text-[#5C564E]">/ month ($2 USD)</span>
              </div>
              <p className="text-xs text-[#5C564E]">Cancel anytime in one click.</p>
            </div>

            {/* Annual Plan */}
            <div
              onClick={() => setSelectedPlan('pro_annual')}
              className={`relative p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedPlan === 'pro_annual'
                  ? 'bg-white border-[#15130F] shadow-sm'
                  : 'bg-[#EFECE3]/50 border-[#15130F]/10 hover:border-[#15130F]/30'
              }`}
            >
              <div className="absolute -top-2.5 right-4 bg-[#B8571E] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                Save 41%
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-serif font-normal text-[#15130F]">Pro annual</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-3xl font-normal text-[#15130F]">₹699</span>
                <span className="text-xs text-[#5C564E]">/ year (₹58/mo)</span>
              </div>
              <p className="text-xs text-[#5C564E]">Billed annually. Best value for active job seekers.</p>
            </div>
          </div>

          {/* Feature List */}
          <div className="bg-white rounded-2xl p-5 border border-[#15130F]/10 space-y-3">
            <h4 className="text-xs font-semibold text-[#15130F]">What's included in Pro:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5C564E]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E] shrink-0" />
                <span>Unlimited ATS-optimized résumés</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E] shrink-0" />
                <span>Unlimited PDF résumé ATS analyses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E] shrink-0" />
                <span>All 3 ATS-safe executive templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E] shrink-0" />
                <span>Google X-Y-Z AI bullet enhancer</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E] shrink-0" />
                <span>Target job description keyword matcher</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3D4A2E] shrink-0" />
                <span>High-resolution vector PDF export</span>
              </div>
            </div>
          </div>

          {/* Stripe Trust Badge */}
          <div className="flex items-center justify-between p-3.5 rounded-full bg-[#EFECE3]/70 border border-[#15130F]/10 text-xs text-[#5C564E]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3D4A2E] shrink-0" />
              <span className="font-medium text-[#15130F]">Payments powered by Stripe Checkout</span>
            </div>
            <span className="text-[11px] font-mono">256-Bit SSL</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleStripeCheckout(selectedPlan)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-semibold text-[#F7F4ED] bg-[#15130F] hover:bg-[#2A1F18] shadow-xs active:scale-98 disabled:opacity-50 transition-all text-xs cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₹{selectedPlan === 'pro_annual' ? '699' : '99'} with Stripe</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
