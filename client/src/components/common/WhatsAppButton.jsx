import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Quick WhatsApp support link - safe defaults
  const phoneNumber = '919876543210';
  const defaultMessage = encodeURIComponent('Hi CareerCraft team! I have a question about the AI resume builder and plans.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover / initial gentle indicator */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-xs font-semibold text-slate-800 transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Chat with Career Support</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with CareerCraft Support on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/60 focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        <MessageCircle className="w-7 h-7 drop-shadow-xs group-hover:rotate-6 transition-transform duration-300" />
        {/* Soft pulse ring */}
        <span className="absolute -inset-1 rounded-2xl bg-[#25D366] opacity-30 group-hover:opacity-0 animate-pulse pointer-events-none" />
      </a>
    </div>
  );
};
