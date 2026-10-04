import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Eye,
  Check,
} from 'lucide-react';

export const TemplatesPage = () => {
  const navigate = useNavigate();
  const { setTemplate } = useResumeStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 'classic-ats',
      title: 'Classic ATS Pro',
      subtitle: 'Single column, maximum machine readability',
      colorTheme: 'bg-[#3D4A2E] text-white',
      accentBadge: 'bg-white/20 text-white',
      atsScore: '99% ATS Parse',
      category: 'ats',
      span: 'md:col-span-7',
      bestFor: 'Engineering, Finance, Healthcare, Government',
      description:
        'Engineered strictly for parsing algorithms (Workday, Taleo, Greenhouse). Single-column flow with traditional serif and clean tabular alignment.',
      previewSample: {
        name: 'Alexander Wright',
        title: 'Senior DevOps & Infrastructure Engineer',
        contact: 'Seattle, WA · alex.wright@cloud.io · github.com/awright',
        summary:
          'Cloud infrastructure specialist with 8+ years deploying high-throughput microservices across AWS and GCP with 99.99% SLA.',
        bullets: [
          'Architected Kubernetes multi-region cluster reducing failover latency by 45%.',
          'Automated CI/CD pipelines across 40+ engineering squads with zero downtime.',
        ],
      },
    },
    {
      id: 'executive-elite',
      title: 'Executive Elite',
      subtitle: 'Authoritative typography for leaders & directors',
      colorTheme: 'bg-[#B8571E] text-white',
      accentBadge: 'bg-white/20 text-white',
      atsScore: '96% ATS Parse',
      category: 'executive',
      span: 'md:col-span-5',
      bestFor: 'VP, Directors, C-Suite, Strategy, Management',
      description:
        'A sophisticated editorial layout featuring an executive summary callout block and high-contrast Fraunces headlines.',
      previewSample: {
        name: 'Victoria Davenport',
        title: 'VP of Product Strategy',
        contact: 'New York, NY · victoria@davenport.com',
        summary:
          'Executive leader scaling B2B SaaS organizations from $10M to $120M ARR through product-led growth and enterprise alliances.',
        bullets: [
          'Spearheaded enterprise portfolio expansion generating $42M net-new revenue.',
          'Built cross-functional team of 65 product managers, designers, and researchers.',
        ],
      },
    },
    {
      id: 'modern-tech',
      title: 'Modern Tech Grid',
      subtitle: 'Designed for developers, designers & founders',
      colorTheme: 'bg-[#2E3A4F] text-white',
      accentBadge: 'bg-white/20 text-white',
      atsScore: '97% ATS Parse',
      category: 'tech',
      span: 'md:col-span-5',
      bestFor: 'Software Engineers, Data Scientists, Product Designers',
      description:
        'Clean technical hierarchy with dedicated monospace technical skill pills, repository links, and quantified contribution markers.',
      previewSample: {
        name: 'Julian Chen',
        title: 'Staff Full-Stack Engineer',
        contact: 'San Francisco, CA · jchen.dev · github.com/jchen',
        summary:
          'Full-stack builder passionate about reactive UI, distributed databases, and real-time streaming architectures.',
        bullets: [
          'Rewrote core GraphQL data pipeline, cutting P95 query latency by 60%.',
          'Authored open-source React state management utility with 4,000+ GitHub stars.',
        ],
      },
    },
    {
      id: 'minimal-academic',
      title: 'Minimal Sand Crisp',
      subtitle: 'Understated elegance for researchers & analysts',
      colorTheme: 'bg-[#D8C9A8] text-[#15130F]',
      accentBadge: 'bg-[#15130F]/15 text-[#15130F]',
      atsScore: '98% ATS Parse',
      category: 'minimal',
      span: 'md:col-span-7',
      bestFor: 'Researchers, Consultants, Attorneys, Product Analysts',
      description:
        'Warm, unhurried typography on clean cream styling. High information density without visual clutter.',
      previewSample: {
        name: 'Dr. Sarah Al-Mansoor',
        title: 'Principal Economic Consultant',
        contact: 'Boston, MA · s.almansoor@post.harvard.edu',
        summary:
          'Ph.D. Quantitative Economist specializing in antitrust modeling, market simulation, and federal regulatory filings.',
        bullets: [
          'Prepared macroeconomic impact evaluations cited in 6 federal antitrust hearings.',
          'Published 12 peer-reviewed empirical papers on platform network effects.',
        ],
      },
    },
  ];

  const handleSelectTemplate = (templateId) => {
    setTemplate(templateId === 'minimal-academic' ? 'classic-ats' : templateId);
    navigate(`/builder?template=${templateId}`);
  };

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="bg-[#F7F4ED] text-[#15130F] min-h-screen pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFECE3] text-[#15130F] border border-[#15130F]/10 mb-4">
            ✦ Template Catalog
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.08] tracking-tight text-[#15130F]">
            Designed for <span className="italic font-light">real hiring.</span>
          </h1>
          <p className="mt-4 text-base text-[#5C564E] leading-relaxed max-w-2xl font-sans">
            Every template is meticulously tuned to pass automated ATS parsers while
            delivering a memorable, high-contrast reading experience to hiring executives.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-[#15130F]/10">
          {[
            { id: 'all', label: 'All templates' },
            { id: 'ats', label: '100% ATS focus' },
            { id: 'executive', label: 'Executive & leadership' },
            { id: 'tech', label: 'Technology & engineering' },
            { id: 'minimal', label: 'Minimal & academic' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#15130F] text-[#F7F4ED]'
                  : 'bg-[#FAF8F3] text-[#5C564E] hover:text-[#15130F] border border-[#15130F]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Template Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`${template.span} ${template.colorTheme} p-7 sm:p-9 rounded-3xl flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${template.accentBadge}`}
                  >
                    {template.atsScore}
                  </span>
                  <span className="text-xs opacity-75 font-mono">{template.bestFor}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mb-2">
                  {template.title}
                </h2>
                <p className="text-xs sm:text-sm opacity-85 leading-relaxed max-w-xl font-sans mb-6">
                  {template.description}
                </p>

                {/* Mockup Preview Card */}
                <div className="bg-white text-[#15130F] rounded-2xl p-5 sm:p-6 shadow-sm border border-black/10 select-none">
                  <div className="border-b border-[#15130F]/15 pb-3 mb-3">
                    <h3 className="font-serif text-lg font-bold text-[#15130F]">
                      {template.previewSample.name}
                    </h3>
                    <p className="text-xs font-medium text-[#5C564E]">
                      {template.previewSample.title}
                    </p>
                    <p className="text-[10px] text-[#8A8277] mt-0.5 font-mono">
                      {template.previewSample.contact}
                    </p>
                  </div>

                  <p className="text-xs text-[#5C564E] leading-relaxed mb-3 italic">
                    "{template.previewSample.summary}"
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#15130F]/10">
                    <p className="text-[10px] uppercase font-bold text-[#8A8277] tracking-wider">
                      Selected Achievements
                    </p>
                    {template.previewSample.bullets.map((bullet, idx) => (
                      <p key={idx} className="text-xs text-[#15130F] flex items-start gap-1.5">
                        <span className="text-[#B8571E] font-bold">•</span>
                        <span>{bullet}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 flex items-center justify-between border-t border-current/20">
                <span className="text-xs font-medium opacity-80">
                  {template.subtitle}
                </span>

                <button
                  type="button"
                  onClick={() => handleSelectTemplate(template.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#15130F] hover:bg-[#FAF8F3] font-medium text-xs shadow-sm transition active:scale-95"
                >
                  <span>Use this template</span>
                  <span className="w-4 h-4 rounded-full bg-[#15130F] text-white flex items-center justify-center text-[10px]">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
