import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  Crown,
  LogOut,
  FileText,
  ScanSearch,
  CheckCircle2,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { openAuthModal, openUpgradeModal } = useUiStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const isPremium = user?.role === 'premium' || user?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleNavScroll = (elementId) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${elementId}`);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // When on landing page and not scrolled, use the transparent hero styling
  const isHeroMode = isLandingPage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeroMode
          ? 'bg-transparent text-white pt-4 pb-2'
          : 'bg-[#F7F4ED]/95 backdrop-blur-md text-[#15130F] border-b border-[#15130F]/10 py-3 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 border border-white/30 text-amber-300 text-xs backdrop-blur-sm group-hover:scale-105 transition">
            ✦
          </span>
          <span
            className={`font-serif text-2xl tracking-tight font-normal transition-colors ${
              isHeroMode ? 'text-white' : 'text-[#15130F]'
            }`}
          >
            Career<span className="italic font-light">Craft</span>
          </span>
        </Link>

        {/* Centered Pill Navigation (Matches reference mockup) */}
        <nav className="hidden md:flex items-center">
          <div
            className={`flex items-center gap-1 p-1 rounded-full text-xs font-medium backdrop-blur-md transition-colors ${
              isHeroMode
                ? 'bg-black/25 border border-white/20 text-white/90'
                : 'bg-[#EFECE3]/80 border border-[#15130F]/10 text-[#15130F]'
            }`}
          >
            <button
              onClick={() => handleNavScroll('features')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                isHeroMode
                  ? 'hover:bg-white/20 text-white'
                  : 'hover:bg-white text-[#15130F]'
              }`}
            >
              Features
            </button>

            <Link
              to="/templates"
              className={`px-4 py-1.5 rounded-full transition-all ${
                isActive('/templates')
                  ? isHeroMode
                    ? 'bg-white text-[#15130F] font-semibold'
                    : 'bg-[#15130F] text-[#F7F4ED] font-semibold'
                  : isHeroMode
                  ? 'hover:bg-white/20 text-white'
                  : 'hover:bg-white text-[#15130F]'
              }`}
            >
              Templates
            </Link>

            <Link
              to="/builder"
              className={`px-4 py-1.5 rounded-full transition-all ${
                isActive('/builder')
                  ? isHeroMode
                    ? 'bg-white text-[#15130F] font-semibold'
                    : 'bg-[#15130F] text-[#F7F4ED] font-semibold'
                  : isHeroMode
                  ? 'hover:bg-white/20 text-white'
                  : 'hover:bg-white text-[#15130F]'
              }`}
            >
              Builder
            </Link>

            <Link
              to="/analyzer"
              className={`px-4 py-1.5 rounded-full transition-all ${
                isActive('/analyzer')
                  ? isHeroMode
                    ? 'bg-white text-[#15130F] font-semibold'
                    : 'bg-[#15130F] text-[#F7F4ED] font-semibold'
                  : isHeroMode
                  ? 'hover:bg-white/20 text-white'
                  : 'hover:bg-white text-[#15130F]'
              }`}
            >
              Score & scan
            </Link>

            <Link
              to="/pricing"
              className={`px-4 py-1.5 rounded-full transition-all ${
                isActive('/pricing')
                  ? isHeroMode
                    ? 'bg-white text-[#15130F] font-semibold'
                    : 'bg-[#15130F] text-[#F7F4ED] font-semibold'
                  : isHeroMode
                  ? 'hover:bg-white/20 text-white'
                  : 'hover:bg-white text-[#15130F]'
              }`}
            >
              Pricing
            </Link>

            <button
              onClick={() => handleNavScroll('faq')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                isHeroMode
                  ? 'hover:bg-white/20 text-white'
                  : 'hover:bg-white text-[#15130F]'
              }`}
            >
              FAQ
            </button>
          </div>
        </nav>

        {/* Right CTA / Auth controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              {!isPremium ? (
                <button
                  onClick={openUpgradeModal}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                    isHeroMode
                      ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                      : 'bg-[#EFECE3] hover:bg-[#E5DFD0] text-[#15130F] border border-[#15130F]/10'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  Upgrade Pro
                </button>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#3D4A2E] text-white">
                  PRO
                </span>
              )}

              <Link
                to="/dashboard"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  isActive('/dashboard')
                    ? isHeroMode
                      ? 'bg-white text-[#15130F]'
                      : 'bg-[#15130F] text-[#F7F4ED]'
                    : isHeroMode
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-[#EFECE3] text-[#15130F]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 p-1 pl-2.5 pr-1.5 rounded-full border transition ${
                    isHeroMode
                      ? 'border-white/30 bg-black/20 text-white hover:bg-black/30'
                      : 'border-[#15130F]/15 bg-white text-[#15130F] hover:border-[#15130F]/30'
                  }`}
                >
                  <span className="text-xs font-medium max-w-[100px] truncate">
                    {user?.name || 'Account'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#15130F] text-[#F7F4ED] font-semibold text-[11px] flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#FAF8F3] border border-[#15130F]/10 rounded-2xl shadow-xl py-2 z-50 text-[#15130F]">
                    <div className="px-4 py-2 border-b border-[#15130F]/10">
                      <p className="text-[11px] text-[#5C564E]">Signed in as</p>
                      <p className="text-xs font-semibold truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#15130F] hover:bg-[#EFECE3] transition"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#5C564E]" />
                      Dashboard
                    </Link>

                    <Link
                      to="/builder"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#15130F] hover:bg-[#EFECE3] transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#5C564E]" />
                      Resume Builder
                    </Link>

                    <Link
                      to="/pricing"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#15130F] hover:bg-[#EFECE3] transition"
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-600" />
                      Subscription & plans
                    </Link>

                    <div className="border-t border-[#15130F]/10 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-700 hover:bg-rose-50 transition text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => openAuthModal('login')}
                className={`text-xs sm:text-sm font-medium px-3 py-1.5 transition ${
                  isHeroMode ? 'text-white/90 hover:text-white' : 'text-[#15130F] hover:opacity-80'
                }`}
              >
                Login
              </button>

              {/* Exact Pill Start Free Trial CTA with small circle arrow */}
              <button
                onClick={() => openAuthModal('register')}
                className={`inline-flex items-center gap-2 pl-4 pr-2 sm:pr-2.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 shadow-xs ${
                  isHeroMode
                    ? 'bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18]'
                    : 'bg-[#15130F] text-[#F7F4ED] hover:bg-[#2A1F18]'
                }`}
              >
                <span>Start free trial</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  →
                </span>
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full md:hidden transition ${
              isHeroMode ? 'text-white hover:bg-white/15' : 'text-[#15130F] hover:bg-[#EFECE3]'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-4 rounded-3xl bg-[#FAF8F3] border border-[#15130F]/10 shadow-2xl text-[#15130F] space-y-2 animate-in slide-in-from-top-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[#EFECE3]"
          >
            Home
          </Link>
          <button
            onClick={() => handleNavScroll('features')}
            className="w-full text-left block px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[#EFECE3]"
          >
            Features
          </button>
          <Link
            to="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[#EFECE3]"
          >
            Templates
          </Link>
          <Link
            to="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[#EFECE3]"
          >
            Resume builder
          </Link>
          <Link
            to="/analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[#EFECE3]"
          >
            Score & scan
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[#EFECE3]"
          >
            Pricing
          </Link>
          <button
            onClick={() => handleNavScroll('faq')}
            className="w-full text-left block px-4 py-2.5 rounded-full text-sm font-medium hover:bg-[#EFECE3]"
          >
            FAQ
          </button>

          {isAuthenticated ? (
            <div className="pt-2 border-t border-[#15130F]/10 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#15130F] text-[#F7F4ED]"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-xs text-rose-700 font-medium"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-[#15130F]/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 rounded-full border border-[#15130F]/20 text-xs font-semibold text-[#15130F]"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="w-full py-2.5 rounded-full bg-[#15130F] text-[#F7F4ED] text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Start free trial</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
