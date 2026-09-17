import React from 'react';
import { useUiStore } from '../../store/uiStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUiStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 bg-white/95 ${
              isSuccess
                ? 'border-emerald-200 text-slate-800 shadow-emerald-500/5'
                : isError
                ? 'border-rose-200 text-slate-800 shadow-rose-500/5'
                : 'border-slate-200 text-slate-800 shadow-slate-900/5'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {isError && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-[#7B61FF] shrink-0" />}

            <p className="text-sm font-medium pr-2 text-slate-800">{toast.message}</p>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
