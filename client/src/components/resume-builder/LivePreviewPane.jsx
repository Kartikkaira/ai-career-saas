import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { RESUME_TEMPLATES } from '../../utils/constants';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { exportResumeAsPdf, printResumeDirectly } from '../../utils/exportPdf';
import {
  Download,
  Printer,
  Crown,
  Check,
  ZoomIn,
  ZoomOut,
  Save,
  Sparkles,
} from 'lucide-react';

export const LivePreviewPane = () => {
  const { currentResume, activeTemplate, setActiveTemplate, saveCurrentResume, isSaving } = useResumeStore();
  const { user } = useAuthStore();
  const { openUpgradeModal, addToast } = useUiStore();
  const [scale, setScale] = useState(0.85);

  const isPremium = user?.role === 'premium' || user?.role === 'admin';

  const handleSelectTemplate = (tpl) => {
    if (tpl.isPremium && !isPremium) {
      openUpgradeModal();
      return;
    }
    setActiveTemplate(tpl.id);
    addToast(`Switched template to "${tpl.name}"`, 'info');
  };

  const handleExportPdf = async () => {
    addToast('Generating ATS-compliant PDF...', 'info');
    await exportResumeAsPdf('resume-printable-area', `${currentResume.title || 'ATS_Resume'}.pdf`);
    addToast('PDF downloaded successfully!', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      {/* Top Controls Toolbar */}
      <div className="p-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Template Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {RESUME_TEMPLATES.map((tpl) => {
            const isSelected = activeTemplate === tpl.id || (tpl.id === 'standard-ats' && activeTemplate === 'classic-ats');
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{tpl.name}</span>
                {tpl.isPremium && !isPremium ? (
                  <Crown className="w-3 h-3 text-amber-500" />
                ) : isSelected ? (
                  <Check className="w-3 h-3 text-indigo-300" />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Action buttons (Zoom, Save, Export) */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 text-slate-600">
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}
              className="p-1 hover:text-slate-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-medium px-1 text-slate-700">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(1.2, s + 0.1))}
              className="p-1 hover:text-slate-900"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={saveCurrentResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            <Save className="w-3.5 h-3.5 text-[#4f46e5]" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            type="button"
            onClick={printResumeDirectly}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
            title="Print ATS Vector Resume"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Preview Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 bg-slate-100/70 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            width: '210mm', // standard A4 width
            minHeight: '297mm',
          }}
          className="shadow-xl rounded-sm"
        >
          <TemplateRenderer data={currentResume} templateId={activeTemplate} />
        </div>
      </div>
    </div>
  );
};
