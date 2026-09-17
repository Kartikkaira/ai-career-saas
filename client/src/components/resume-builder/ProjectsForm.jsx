import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { FolderGit2, Plus, Trash2, Globe, Github } from 'lucide-react';

export const ProjectsForm = () => {
  const { currentResume, updateSection } = useResumeStore();
  const projects = currentResume.sections?.projects || [];

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      link: '',
      githubLink: '',
      startDate: '',
      endDate: '',
      techStack: [],
      bullets: [''],
    };
    updateSection('projects', [...projects, newProj]);
  };

  const handleRemoveProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    updateSection('projects', updated);
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    updateSection('projects', updated);
  };

  const handleAddBullet = (projIndex) => {
    const updated = [...projects];
    updated[projIndex].bullets.push('');
    updateSection('projects', updated);
  };

  const handleRemoveBullet = (projIndex, bulletIndex) => {
    const updated = [...projects];
    updated[projIndex].bullets = updated[projIndex].bullets.filter((_, i) => i !== bulletIndex);
    updateSection('projects', updated);
  };

  const handleUpdateBullet = (projIndex, bulletIndex, value) => {
    const updated = [...projects];
    updated[projIndex].bullets[bulletIndex] = value;
    updateSection('projects', updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-[#4f46e5]" />
            Key Projects & Portfolio
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Showcase technical initiatives, open-source work, and product builds that demonstrate mastery.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-500">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAddProject}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
          >
            Add Key Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, projIdx) => (
            <div
              key={proj.id || projIdx}
              className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 relative shadow-xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#4f46e5] bg-[#eef2ff] px-2.5 py-1 rounded-md border border-indigo-100">
                  Project #{projIdx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveProject(projIdx)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                  title="Remove project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    value={proj.title || ''}
                    onChange={(e) => handleUpdateProject(projIdx, 'title', e.target.value)}
                    placeholder="e.g. Distributed Task Queue Service"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={proj.startDate || ''}
                      onChange={(e) => handleUpdateProject(projIdx, 'startDate', e.target.value)}
                      placeholder="e.g. Jun 2023"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">End Date</label>
                    <input
                      type="text"
                      value={proj.endDate || ''}
                      onChange={(e) => handleUpdateProject(projIdx, 'endDate', e.target.value)}
                      placeholder="e.g. Aug 2023"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Live Demo / Website URL</label>
                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => handleUpdateProject(projIdx, 'link', e.target.value)}
                      placeholder="e.g. taskqueue.example.org"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">GitHub Repo URL</label>
                  <div className="relative">
                    <Github className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={proj.githubLink || ''}
                      onChange={(e) => handleUpdateProject(projIdx, 'githubLink', e.target.value)}
                      placeholder="e.g. github.com/username/project"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Technologies / Tools Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack || ''}
                    onChange={(e) =>
                      handleUpdateProject(
                        projIdx,
                        'techStack',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    placeholder="e.g. React, Node.js, Express, MongoDB, Javascript, Tailwind CSS, Browserbase, Gemini AI, Vercel"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-[11px] font-semibold text-slate-700">Project Highlights & Impact</label>
                {proj.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <span className="text-[#4f46e5] font-mono text-xs">•</span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleUpdateBullet(projIdx, bIdx, e.target.value)}
                      placeholder="e.g. Developed a full stack AI-powered SEO Rank Tracker using the MERN stack..."
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(projIdx, bIdx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddBullet(projIdx)}
                  className="inline-flex items-center gap-1 text-xs text-[#4f46e5] hover:underline font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Bullet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
