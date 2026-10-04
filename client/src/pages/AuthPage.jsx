import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const redirect = searchParams.get('redirect') || '/dashboard';
  const navigate = useNavigate();

  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  const { addToast } = useUiStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect, { replace: true });
    }
  }, [isAuthenticated, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    let result;
    if (mode === 'login') {
      result = await login(email, password);
    } else {
      result = await register(name, email, password);
    }

    if (result.success) {
      addToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully!', 'success');
      navigate(redirect);
    }
  };

  const handleDemoFill = () => {
    setEmail('demo@careercraft.ai');
    setPassword('DemoPass123!');
    setName('Demo Candidate');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-[#F7F4ED] text-[#15130F]">
      <div className="w-full max-w-md bg-[#FAF8F3] p-8 sm:p-10 rounded-3xl border border-[#15130F]/15 shadow-xs space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15130F] text-amber-300 text-sm mx-auto shadow-xs">
            ✦
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#15130F] tracking-tight">
            {mode === 'login' ? 'Sign in to CareerCraft' : 'Create your free account'}
          </h2>
          <p className="text-xs text-[#5C564E]">
            {mode === 'login'
              ? 'Access your saved résumés and real-time ATS reports.'
              : 'Join today and get full access to the AI résumé builder.'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-xs text-[#15130F] focus:outline-none focus:border-[#15130F] transition"
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
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-xs text-[#15130F] focus:outline-none focus:border-[#15130F] transition"
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
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-xs text-[#15130F] focus:outline-none focus:border-[#15130F] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-semibold text-[#F7F4ED] bg-[#15130F] hover:bg-[#2A1F18] shadow-xs active:scale-98 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign in' : 'Create free account'}</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fill & Toggle */}
        <div className="pt-3 border-t border-[#15130F]/10 space-y-2">
          <button
            type="button"
            onClick={handleDemoFill}
            className="w-full text-center text-xs text-[#B8571E] hover:underline font-medium cursor-pointer"
          >
            ✦ Quick-fill demo credentials
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                clearError();
                setMode(mode === 'login' ? 'register' : 'login');
              }}
              className="text-xs text-[#5C564E] hover:text-[#15130F] font-medium transition cursor-pointer"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
