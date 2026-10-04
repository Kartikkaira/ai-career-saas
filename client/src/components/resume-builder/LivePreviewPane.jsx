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
} from 'lucide-react';

export const LivePreviewPane = () => {
  const { currentResume, activeTemplate, setActiveTemplate, saveCurrentResume, isSaving } =
    useResumeStore();
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
    addToast('Generating ATS-compliant vector PDF...', 'info');
    await exportResumeAsPdf('resume-printable-area', `${currentResume.title || 'ATS_Resume'}.pdf`);
    addToast('PDF downloaded successfully!', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F3] border border-[#15130F]/15 rounded-3xl overflow-hidden shadow-xs">
      {/* Top Controls Toolbar */}
      <div className="p-3 bg-[#FAF8F3] border-b border-[#15130F]/10 flex flex-wrap items-center justify-between gap-3">
        {/* Template Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {RESUME_TEMPLATES.map((tpl) => {
            const isSelected =
              activeTemplate === tpl.id ||
              (tpl.id === 'standard-ats' && activeTemplate === 'classic-ats');
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#15130F] text-[#F7F4ED] font-semibold'
                    : 'bg-white hover:bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10'
                }`}
              >
                <span>{tpl.name}</span>
                {tpl.isPremium && !isPremium ? (
                  <Crown className="w-3 h-3 text-amber-600" />
                ) : isSelected ? (
                  <Check className="w-3 h-3 text-amber-300" />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Action buttons (Zoom, Save, Export) */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-[#15130F]/10 rounded-full px-2 py-1 text-[#15130F]">
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}
              className="p-0.5 hover:text-black"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(1.2, s + 0.1))}
              className="p-0.5 hover:text-black"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            disabled={isSaving}
            onClick={saveCurrentResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#15130F] bg-white border border-[#15130F]/15 hover:bg-[#EFECE3] transition"
          >
            <Save className="w-3 h-3 text-[#3D4A2E]" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            type="button"
            onClick={printResumeDirectly}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#15130F] bg-white border border-[#15130F]/15 hover:bg-[#EFECE3] transition"
            title="Print ATS Vector Resume"
          >
            <Printer className="w-3 h-3" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-[#F7F4ED] bg-[#15130F] hover:bg-[#2A1F18] shadow-xs transition active:scale-95"
          >
            <Download className="w-3 h-3" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Preview Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 bg-[#EFECE3]/50 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            width: '210mm', // standard A4 width
            minHeight: '297mm',
          }}
          className="shadow-md rounded-sm bg-white"
        >
          <TemplateRenderer data={currentResume} templateId={activeTemplate} />
        </div>
      </div>
    </div>
  );
};
