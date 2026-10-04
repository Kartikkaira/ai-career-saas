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
      title={isLogin ? 'Sign in to CareerCraft' : 'Create your free account'}
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-[#15130F]">
        {/* Banner info */}
        <div className="p-3.5 rounded-2xl bg-[#EFECE3] border border-[#15130F]/10 text-xs text-[#5C564E] flex items-start gap-2.5">
          <span className="w-4 h-4 rounded-full bg-[#15130F] text-amber-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
            ✦
          </span>
          <span>
            {isLogin
              ? 'Access your saved résumés, real-time ATS reports, and Gemini AI bullet generator.'
              : 'Join today. Build ATS-safe résumés and get instant diagnostic scoring in seconds.'}
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-[#15130F] mb-1.5">Full name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F] transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#15130F] mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#15130F] mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-semibold text-[#F7F4ED] bg-[#15130F] hover:bg-[#2A1F18] shadow-xs active:scale-98 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isLogin ? 'Sign in' : 'Create free account'}</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Fill */}
        <div className="pt-3 border-t border-[#15130F]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-[#B8571E] hover:underline font-medium text-left cursor-pointer"
          >
            ✦ Quick-fill demo account
          </button>

          <button
            type="button"
            onClick={() => {
              clearError();
              openAuthModal(isLogin ? 'register' : 'login');
            }}
            className="text-xs text-[#5C564E] hover:text-[#15130F] font-medium text-left cursor-pointer"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
