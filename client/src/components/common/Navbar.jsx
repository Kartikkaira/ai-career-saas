import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Badge } from './Badge';
import {
  FileText,
  ScanSearch,
  LayoutDashboard,
  Crown,
  LogOut,
  User,
  Menu,
  X,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { openAuthModal, openUpgradeModal } = useUiStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isPremium = user?.role === 'premium' || user?.role === 'admin';

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('features');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname === path) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F8FB]/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7B61FF] to-[#2D9CDB] text-white flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-200">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Career<span className="text-[#7B61FF]">Craft</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          <Link
            to="/"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/')
                ? 'text-[#7B61FF] bg-[#F3F0FF] font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 nav-link-interactive'
            }`}
          >
            Home
          </Link>

          <a
            href="#features"
            onClick={handleFeaturesClick}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 nav-link-interactive transition cursor-pointer"
          >
            Features
          </a>

          <Link
            to="/builder"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/builder')
                ? 'text-[#7B61FF] bg-[#F3F0FF] font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 nav-link-interactive'
            }`}
          >
            Resume Builder
          </Link>

          <Link
            to="/analyzer"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/analyzer')
                ? 'text-[#7B61FF] bg-[#F3F0FF] font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 nav-link-interactive'
            }`}
          >
            Resume Analyzer
          </Link>

          <Link
            to="/pricing"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/pricing')
                ? 'text-[#7B61FF] bg-[#F3F0FF] font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 nav-link-interactive'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Right Action Section */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {!isPremium ? (
                <button
                  onClick={openUpgradeModal}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F3F0FF] hover:bg-[#EAE5FE] text-[#7B61FF] border border-[#d7cffe] shadow-xs hover:shadow transition-all duration-200"
                >
                  <Crown className="w-3.5 h-3.5" />
                  Upgrade Pro
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold shadow-xs">
                  <Crown className="w-3.5 h-3.5 text-emerald-600" />
                  PRO MEMBER
                </span>
              )}

              <Link
                to="/dashboard"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                  isActive('/dashboard')
                    ? 'text-[#7B61FF] bg-[#F3F0FF] font-semibold'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                Dashboard
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7B61FF] to-[#2D9CDB] text-white font-bold text-xs flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-800 max-w-[120px] truncate">
                    {user?.name || 'Account'}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border border-slate-100 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[11px] text-slate-500 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-[#7B61FF] hover:bg-[#F3F0FF] transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      Dashboard
                    </Link>

                    <Link
                      to="/pricing"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-[#7B61FF] hover:bg-[#F3F0FF] transition"
                    >
                      <Crown className="w-4 h-4 text-amber-500" />
                      Subscription Plans
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 rounded-xl transition"
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#7B61FF] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-[#F8F8FB] px-4 py-4 space-y-2 animate-in slide-in-from-top-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>
          <a
            href="#features"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleFeaturesClick(e);
            }}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Features
          </a>
          <Link
            to="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Resume Builder
          </Link>
          <Link
            to="/analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Resume Analyzer
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Pricing
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-[#7B61FF] hover:bg-[#F3F0FF]"
              >
                <LayoutDashboard className="w-5 h-5" />
                My Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50 text-left"
              >
                <LogOut className="w-5 h-5" />
                Sign Out ({user?.name})
              </button>
            </>
          ) : (
            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 text-center font-semibold text-slate-700 rounded-xl border border-slate-200 bg-white shadow-xs"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="w-full py-2.5 text-center font-semibold text-white rounded-xl bg-[#0F172A] hover:bg-[#7B61FF] shadow-sm transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
