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
  Sparkles,
} from 'lucide-react';

export const BuilderPage = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  const templateParam = searchParams.get('template');
  const navigate = useNavigate();

  const {
    currentResume,
    activeStep,
    setActiveStep,
    setActiveTemplate,
    saveCurrentResume,
    loadResumeById,
    resetCurrentResume,
    updateTitle,
    isSaving,
  } = useResumeStore();

  const { user } = useAuthStore();
  const { addToast, openUpgradeModal } = useUiStore();
  const [titleEdit, setTitleEdit] = useState('');

  // Step definitions with specific flat color block tokens
  const steps = [
    {
      id: 0,
      name: 'Personal',
      icon: User,
      title: 'Personal details',
      subtitle: 'Your name, title, contact info and portfolio link.',
      panelBg: 'bg-[#3D4A2E] text-white',
      badge: 'Step 1 of 7 · Olive Panel',
    },
    {
      id: 1,
      name: 'Summary',
      icon: FileEdit,
      title: 'Professional summary',
      subtitle: 'A high-impact executive summary tailored to your target position.',
      panelBg: 'bg-[#B8571E] text-white',
      badge: 'Step 2 of 7 · Terracotta Panel',
    },
    {
      id: 2,
      name: 'Experience',
      icon: Briefcase,
      title: 'Work experience',
      subtitle: 'Action-oriented bullet points using the Google X-Y-Z formula.',
      panelBg: 'bg-[#2E3A4F] text-white',
      badge: 'Step 3 of 7 · Navy Panel',
    },
    {
      id: 3,
      name: 'Education',
      icon: GraduationCap,
      title: 'Education & degrees',
      subtitle: 'Universities, honors, majors, and academic qualifications.',
      panelBg: 'bg-[#D8C9A8] text-[#15130F]',
      badge: 'Step 4 of 7 · Sand Panel',
    },
    {
      id: 4,
      name: 'Skills',
      icon: Wrench,
      title: 'Core & technical skills',
      subtitle: 'Targeted keywords matched against applicant tracking systems.',
      panelBg: 'bg-[#3D4A2E] text-white',
      badge: 'Step 5 of 7 · Olive Panel',
    },
    {
      id: 5,
      name: 'Projects',
      icon: FolderGit2,
      title: 'Key projects & impact',
      subtitle: 'Showcase real-world apps, client work, or open-source repositories.',
      panelBg: 'bg-[#B8571E] text-white',
      badge: 'Step 6 of 7 · Terracotta Panel',
    },
    {
      id: 6,
      name: 'Certs',
      icon: Award,
      title: 'Certifications & licenses',
      subtitle: 'AWS, PMP, Scrum, CFA or industry-standard accreditations.',
      panelBg: 'bg-[#2A1F18] text-white',
      badge: 'Step 7 of 7 · Espresso Panel',
    },
  ];

  useEffect(() => {
    if (templateParam) {
      setActiveTemplate(templateParam);
    }
  }, [templateParam]);

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

  const currentStepData = steps[activeStep] || steps[0];

  return (
    <div className="bg-[#F7F4ED] text-[#15130F] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#15130F]/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="p-2.5 rounded-full bg-white border border-[#15130F]/15 text-[#15130F] hover:bg-[#FAF8F3] shadow-xs transition"
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
                placeholder="Resume title (e.g. Senior Product Manager)"
                className="text-lg sm:text-xl font-serif text-[#15130F] bg-transparent border-b border-dashed border-[#15130F]/30 hover:border-[#15130F] focus:border-[#15130F] focus:outline-none transition max-w-sm"
              />
              <p className="text-[11px] text-[#5C564E] mt-0.5 font-sans">
                Real-time ATS engine with instant typography rendering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#F7F4ED] bg-[#15130F] hover:bg-[#2A1F18] shadow-sm disabled:opacity-50 transition active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving draft...' : 'Save to cloud'}</span>
            </button>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Step Navigation & Form Wizard (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Step Pill Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 p-1 bg-[#EFECE3] border border-[#15130F]/10 rounded-full">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#15130F] text-[#F7F4ED] font-semibold shadow-xs'
                        : 'text-[#5C564E] hover:text-[#15130F] hover:bg-white/60'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{step.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Color-Block Header Panel */}
            <div
              className={`${currentStepData.panelBg} p-6 rounded-3xl transition-colors duration-300 shadow-xs`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">
                  {currentStepData.badge}
                </span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  ✦
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight">
                {currentStepData.title}
              </h2>
              <p className="text-xs opacity-85 mt-1 font-sans leading-relaxed">
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Active Section Form Box (Clean Cream Card) */}
            <div className="bg-[#FAF8F3] p-6 rounded-3xl border border-[#15130F]/10 shadow-xs">
              {renderActiveStepComponent()}

              {/* Step Wizard Footer (Prev / Next Buttons) */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#15130F]/10">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#15130F] bg-white border border-[#15130F]/15 hover:bg-[#EFECE3] disabled:opacity-30 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <span className="text-xs text-[#5C564E] font-mono">
                  {activeStep + 1} / {steps.length}
                </span>

                <button
                  type="button"
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold text-[#F7F4ED] bg-[#15130F] hover:bg-[#2A1F18] shadow-sm disabled:opacity-30 transition"
                >
                  <span>Next step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live ATS Preview Pane (7 cols on lg) */}
          <div className="lg:col-span-7 h-[calc(100vh-140px)] min-h-[620px] sticky top-24">
            <LivePreviewPane />
          </div>
        </div>
      </div>
    </div>
  );
};
