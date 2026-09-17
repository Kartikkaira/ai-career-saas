import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3.5 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7B61FF] to-[#2D9CDB] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform duration-200">
                AI
              </div>
              <span className="font-extrabold text-slate-900 text-base group-hover:text-[#7B61FF] transition-colors duration-200">
                CareerCraft<span className="text-[#7B61FF]">.ai</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
              AI resume building and ATS scoring, powered by Google Gemini. Payments secured by Stripe.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/builder" className="inline-block hover:text-[#7B61FF] hover:translate-x-1 transition-all duration-200">Resume builder</Link>
              </li>
              <li>
                <Link to="/analyzer" className="inline-block hover:text-[#7B61FF] hover:translate-x-1 transition-all duration-200">ATS scanner</Link>
              </li>
              <li>
                <Link to="/pricing" className="inline-block hover:text-[#7B61FF] hover:translate-x-1 transition-all duration-200">Plans & pricing</Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="inline-block hover:text-[#7B61FF] hover:translate-x-1 transition-all duration-200">FAQ</a>
              </li>
              <li>
                <Link to="/pricing" className="inline-block hover:text-[#7B61FF] hover:translate-x-1 transition-all duration-200">Privacy policy</Link>
              </li>
              <li>
                <Link to="/pricing" className="inline-block hover:text-[#7B61FF] hover:translate-x-1 transition-all duration-200">Terms of service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 CareerCraft AI. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">
            Encrypted end-to-end · JWT authentication · Webhook-verified payments
          </p>
        </div>
      </div>
    </footer>
  );
};
