import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 space-y-4 bg-[#F7F4ED] text-[#15130F]">
      <span className="font-serif text-8xl font-normal text-[#15130F]">404</span>
      <h2 className="font-serif text-3xl font-normal text-[#15130F]">Page not found</h2>
      <p className="text-sm text-[#5C564E] max-w-sm">
        The résumé resource or page you are looking for does not exist or has been relocated.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#15130F] hover:bg-[#2A1F18] text-[#F7F4ED] rounded-full text-xs font-semibold shadow-xs transition"
        >
          <Home className="w-4 h-4" />
          <span>Return home</span>
        </Link>
      </div>
    </div>
  );
};
