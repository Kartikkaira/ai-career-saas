import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import { PersonalInfoForm } from '../components/resume-builder/PersonalInfoForm';
import { SummaryForm } from '../components/resume-builder/SummaryForm';
import { ExperienceForm } from '../components/resume-builder/ExperienceForm';
import { EducationForm } from '../components/resume-builder/EducationForm';
import { SkillsForm } from '../components/resume-builder/SkillsForm';
import { ProjectsForm } from '../components/resume-builder/ProjectsForm';
import { CertificationsForm } from '../components/resume-builder/CertificationsForm';
import { LivePreviewPane } from '../components/resume-builder/LivePreviewPane';
import {
  User,
  FileEdit,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  ChevronLeft,
  ChevronRight,
  Save,
  ArrowLeft,
} from 'lucide-react';

export const BuilderPage = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  const navigate = useNavigate();

  const {
    currentResume,
    activeStep,
    setActiveStep,
    saveCurrentResume,
    loadResumeById,
    resetCurrentResume,
    updateTitle,
    isSaving,
  } = useResumeStore();

  const { user } = useAuthStore();
  const { addToast, openUpgradeModal } = useUiStore();
  const [titleEdit, setTitleEdit] = useState('');

  const steps = [
    { id: 0, name: 'Personal', icon: User },
    { id: 1, name: 'Summary', icon: FileEdit },
    { id: 2, name: 'Experience', icon: Briefcase },
    { id: 3, name: 'Education', icon: GraduationCap },
    { id: 4, name: 'Skills', icon: Wrench },
    { id: 5, name: 'Projects', icon: FolderGit2 },
    { id: 6, name: 'Certs', icon: Award },
  ];

  useEffect(() => {
    if (resumeId) {
      loadResumeById(resumeId);
    } else {
      resetCurrentResume(user);
    }
  }, [resumeId]);

  useEffect(() => {
    if (currentResume?.title) {
      setTitleEdit(currentResume.title);
    }
  }, [currentResume?.title]);

  const handleSave = async () => {
    const res = await saveCurrentResume();
    if (res.success) {
      addToast('Draft saved successfully to your cloud account!', 'success');
      if (!resumeId && res.resume?._id) {
        navigate(`/builder?id=${res.resume._id}`, { replace: true });
      }
    } else if (res.isUpgradeRequired) {
      openUpgradeModal();
    } else {
      addToast(res.message || 'Error saving resume draft', 'error');
    }
  };

  const renderActiveStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <SummaryForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <EducationForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <ProjectsForm />;
      case 6:
        return <CertificationsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <input
              type="text"
              value={titleEdit}
              onChange={(e) => {
                setTitleEdit(e.target.value);
                updateTitle(e.target.value);
              }}
              placeholder="Resume Title (e.g. Senior Backend Engineer)"
              className="text-lg sm:text-xl font-extrabold text-slate-900 bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:border-indigo-600 focus:outline-none transition max-w-sm"
            />
            <p className="text-[11px] text-slate-400 mt-0.5">
              Multi-step ATS builder with real-time live preview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-sm disabled:opacity-50 transition"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Draft...' : 'Save Draft to Cloud'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Step Navigation & Form Wizard (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Step Pill Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-[#4f46e5] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{step.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Section Form Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            {renderActiveStepComponent()}

            {/* Step Wizard Footer (Prev / Next Buttons) */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>

              <span className="text-xs text-slate-400 font-mono font-medium">
                Step {activeStep + 1} of {steps.length}
              </span>

              <button
                type="button"
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep(activeStep + 1)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-sm disabled:opacity-30 transition"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live ATS Preview Pane (7 cols on lg) */}
        <div className="lg:col-span-7 h-[calc(100vh-140px)] min-h-[600px] sticky top-20">
          <LivePreviewPane />
        </div>
      </div>
    </div>
  );
};
