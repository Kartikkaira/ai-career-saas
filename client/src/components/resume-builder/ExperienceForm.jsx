import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { useUiStore } from '../../store/uiStore';
import { Briefcase, Plus, Trash2, Sparkles, RefreshCw } from 'lucide-react';

export const ExperienceForm = () => {
  const { currentResume, updateSection, enhanceWithAi } = useResumeStore();
  const { addToast } = useUiStore();
  const experiences = currentResume.sections?.experience || [];

  const [enhancingIndex, setEnhancingIndex] = useState(null);

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      techStack: [],
      bullets: [''],
    };
    updateSection('experience', [...experiences, newExp]);
  };

  const handleRemoveExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    updateSection('experience', updated);
  };

  const handleUpdateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    updateSection('experience', updated);
  };

  const handleAddBullet = (expIndex) => {
    const updated = [...experiences];
    updated[expIndex].bullets.push('');
    updateSection('experience', updated);
  };

  const handleRemoveBullet = (expIndex, bulletIndex) => {
    const updated = [...experiences];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    updateSection('experience', updated);
  };

  const handleUpdateBullet = (expIndex, bulletIndex, value) => {
    const updated = [...experiences];
    updated[expIndex].bullets[bulletIndex] = value;
    updateSection('experience', updated);
  };

  const handleEnhanceBullet = async (expIndex, bulletIndex) => {
    const exp = experiences[expIndex];
    const bullet = exp.bullets[bulletIndex];

    if (!bullet || bullet.trim().length < 5) {
      addToast('Please type a brief draft bullet before enhancing with AI.', 'info');
      return;
    }

    setEnhancingIndex({ expIdx: expIndex, bulletIdx: bulletIndex });
    const res = await enhanceWithAi('bullet', {
      bullet,
      role: exp.role || 'Software Engineer',
      company: exp.company || 'Tech Company',
    });

    setEnhancingIndex(null);

    if (res.success && res.data?.enhancedBullet) {
      handleUpdateBullet(expIndex, bulletIndex, res.data.enhancedBullet);
      addToast('✨ Transformed bullet with Google X-Y-Z formula!', 'success');
    } else {
      addToast(res.message || 'AI Enhancement failed', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#4f46e5]" />
            Work Experience
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Highlight your achievements using quantifiable metrics, active leadership verbs, and tech stacks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-500">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
          >
            Add Your First Position
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, expIdx) => (
            <div
              key={exp.id || expIdx}
              className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 relative shadow-xs"
            >
              {/* Top row */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#4f46e5] bg-[#eef2ff] px-2.5 py-1 rounded-md border border-indigo-100">
                  Position #{expIdx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveExperience(expIdx)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                  title="Remove this role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Role fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Job Role / Title *</label>
                  <input
                    type="text"
                    value={exp.role || ''}
                    onChange={(e) => handleUpdateExperience(expIdx, 'role', e.target.value)}
                    placeholder="e.g. Senior Backend Engineer"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleUpdateExperience(expIdx, 'company', e.target.value)}
                    placeholder="e.g. Nexus Distributed Systems"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleUpdateExperience(expIdx, 'location', e.target.value)}
                    placeholder="e.g. San Francisco, CA (Remote)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) => handleUpdateExperience(expIdx, 'startDate', e.target.value)}
                      placeholder="e.g. Aug 2026"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate || ''}
                      onChange={(e) => handleUpdateExperience(expIdx, 'endDate', e.target.value)}
                      placeholder="e.g. Present / Jul 2026"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs disabled:opacity-50 focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Technologies / Skills Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(exp.techStack) ? exp.techStack.join(', ') : exp.techStack || ''}
                    onChange={(e) =>
                      handleUpdateExperience(
                        expIdx,
                        'techStack',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    placeholder="e.g. HTML5, CSS3, JavaScript, React, Node.js, MongoDB, Tailwind CSS, Express"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`current-role-${expIdx}`}
                    checked={exp.current || false}
                    onChange={(e) => handleUpdateExperience(expIdx, 'current', e.target.checked)}
                    className="w-4 h-4 rounded text-[#4f46e5] border-slate-300 focus:ring-indigo-500"
                  />
                  <label htmlFor={`current-role-${expIdx}`} className="text-xs text-slate-700 cursor-pointer font-medium">
                    I currently work in this role
                  </label>
                </div>
              </div>

              {/* Bullet points section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Key Accomplishments & Responsibilities
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Use Google X-Y-Z: "Accomplished [X] measured by [Y], by doing [Z]"
                  </span>
                </div>

                <div className="space-y-2.5">
                  {exp.bullets.map((bullet, bIdx) => {
                    const isEnhancing =
                      enhancingIndex?.expIdx === expIdx && enhancingIndex?.bulletIdx === bIdx;

                    return (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span className="text-[#4f46e5] font-mono text-xs mt-2">•</span>
                        <div className="flex-1">
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => handleUpdateBullet(expIdx, bIdx, e.target.value)}
                            placeholder="e.g. Built a full stack hyperlocal delivery platform enabling real-time order placement..."
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs leading-relaxed focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                          />
                        </div>

                        {/* AI Enhance Button */}
                        <button
                          type="button"
                          disabled={isEnhancing}
                          onClick={() => handleEnhanceBullet(expIdx, bIdx)}
                          className="shrink-0 p-2 rounded-xl bg-[#eef2ff] border border-indigo-100 text-[#4f46e5] hover:bg-[#e0e7ff] text-xs font-semibold flex items-center gap-1 transition"
                          title="Quantify & Rewrite with Gemini AI (X-Y-Z formula)"
                        >
                          {isEnhancing ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5" />
                          )}
                          <span className="hidden sm:inline">AI Quantify</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(expIdx, bIdx)}
                          className="shrink-0 p-2 text-slate-400 hover:text-rose-600 transition"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddBullet(expIdx)}
                  className="inline-flex items-center gap-1 text-xs text-[#4f46e5] hover:underline font-semibold pt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Another Bullet Point
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
