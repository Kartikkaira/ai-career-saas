import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, authModalMode, closeAuthModal, openAuthModal, addToast } = useUiStore();
  const { login, register, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = authModalMode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    let result;
    if (isLogin) {
      result = await login(email, password);
    } else {
      result = await register(name, email, password);
    }

    if (result.success) {
      addToast(isLogin ? 'Welcome back!' : 'Account created successfully!', 'success');
      closeAuthModal();
    }
  };

  const handleFillDemo = () => {
    setEmail('demo@careercraft.ai');
    setPassword('DemoPass123!');
    setName('Demo Candidate');
  };

  return (
    <Modal
      isOpen={authModalOpen}
      onClose={closeAuthModal}
      title={isLogin ? 'Welcome Back to CareerCraft AI' : 'Create Your Free Career Account'}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Banner info */}
        <div className="p-3.5 rounded-2xl bg-[#F3F0FF] border border-[#d7cffe] text-xs text-[#7B61FF] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#7B61FF] shrink-0 mt-0.5" />
          <span>
            {isLogin
              ? 'Sign in to access your saved resumes, live ATS reports, and AI bullet enhancer.'
              : 'Join free today. Build ATS-safe resumes and get instant AI scoring in seconds.'}
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#7B61FF] shadow-xs transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#7B61FF] shadow-xs transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#7B61FF] shadow-xs transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#7B61FF] hover:bg-[#6B4FE0] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all duration-200 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isLogin ? 'Sign In' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Fill */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-[#7B61FF] hover:underline font-medium cursor-pointer"
          >
            ⚡ Quick-fill demo credentials
          </button>

          <button
            type="button"
            onClick={() => {
              clearError();
              openAuthModal(isLogin ? 'register' : 'login');
            }}
            className="text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
