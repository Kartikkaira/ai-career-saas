import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase } from 'lucide-react';

export const PersonalInfoForm = () => {
  const { currentResume, updateSection } = useResumeStore();
  const personalInfo = currentResume.sections?.personalInfo || {};

  const handleChange = (field, value) => {
    updateSection('personalInfo', {
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4 text-[#15130F]">
      <div className="border-b border-[#15130F]/10 pb-3">
        <h3 className="font-serif text-lg font-normal text-[#15130F]">
          Contact & personal details
        </h3>
        <p className="text-xs text-[#5C564E] mt-0.5">
          Enter your contact details. ATS algorithms look for clean phone, email, and location headers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">Full name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">Target job title *</label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.jobTitle || ''}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">Email address *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={personalInfo.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="alex@example.com"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">Phone number</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={personalInfo.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">Location (City, State/Country)</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">LinkedIn profile link</label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={personalInfo.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">GitHub / portfolio link</label>
          <div className="relative">
            <Github className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={personalInfo.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/username"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#15130F] mb-1">Personal website</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-[#8A8277] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={personalInfo.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="alexmorgan.dev"
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#15130F]/15 rounded-full text-[#15130F] text-xs focus:outline-none focus:border-[#15130F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
