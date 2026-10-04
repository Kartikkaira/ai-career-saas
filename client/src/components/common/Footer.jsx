import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-[#15130F]/10 bg-[#F7F4ED] text-[#5C564E] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#15130F] text-amber-300 text-xs">
                ✦
              </span>
              <span className="font-serif text-2xl text-[#15130F] tracking-tight">
                Career<span className="italic font-light">Craft</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#5C564E] max-w-sm">
              AI-powered résumé craftsmanship and ATS scoring with Google Gemini intelligence. Built to help candidates stand out quietly, cleanly, and effectively.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D4A2E]"></span>
                Gemini 2.5 Flash model connected
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-serif text-sm text-[#15130F] mb-3 font-normal">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/builder" className="hover:text-[#15130F] transition-colors">
                  Résumé builder
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="hover:text-[#15130F] transition-colors">
                  ATS score & scanner
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-[#15130F] transition-colors">
                  Templates catalog
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#15130F] transition-colors">
                  Pricing & plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <h4 className="font-serif text-sm text-[#15130F] mb-3 font-normal">Templates</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/templates" className="hover:text-[#15130F] transition-colors">
                  Executive Elite
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-[#15130F] transition-colors">
                  Classic ATS Pro
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-[#15130F] transition-colors">
                  Modern Tech Grid
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-[#15130F] transition-colors">
                  Minimal Academic
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-sm text-[#15130F] mb-3 font-normal">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="hover:text-[#15130F] transition-colors">
                  Frequently asked questions
                </a>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#15130F] transition-colors">
                  Stripe billing security
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#15130F] transition-colors">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#15130F] transition-colors">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#15130F]/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C564E]">
          <p>© {new Date().getFullYear()} CareerCraft AI. All rights reserved.</p>
          <p className="text-[11px] text-[#8A8277]">
            Calm, minimalist design system · Powered by Gemini API & Stripe
          </p>
        </div>
      </div>
    </footer>
  );
};
