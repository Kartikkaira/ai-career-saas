import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export const EducationForm = () => {
  const { currentResume, updateSection } = useResumeStore();
  const educations = currentResume.sections?.education || [];

  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    updateSection('education', [...educations, newEdu]);
  };

  const handleRemoveEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    updateSection('education', updated);
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    updateSection('education', updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#4f46e5]" />
            Education & Academics
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            List your degrees, universities, graduation years, and notable academic achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Degree
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-500">No education added yet.</p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
          >
            Add Degree or Certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 relative shadow-xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#4f46e5] bg-[#eef2ff] px-2.5 py-1 rounded-md border border-indigo-100">
                  Degree #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveEducation(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                  title="Remove education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">University / Institution *</label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleUpdateEducation(idx, 'institution', e.target.value)}
                    placeholder="e.g. University of California, Berkeley"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Degree *</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Field of Study *</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ''}
                    onChange={(e) => handleUpdateEducation(idx, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Dates Attended / Graduation</label>
                  <input
                    type="text"
                    value={edu.endDate ? `${edu.startDate || ''} – ${edu.endDate}` : edu.startDate || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.includes('–')) {
                        const [s, end] = val.split('–');
                        handleUpdateEducation(idx, 'startDate', s.trim());
                        handleUpdateEducation(idx, 'endDate', end.trim());
                      } else {
                        handleUpdateEducation(idx, 'endDate', val);
                      }
                    }}
                    placeholder="e.g. 2018 – 2022"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">GPA / Honors (Optional)</label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => handleUpdateEducation(idx, 'gpa', e.target.value)}
                    placeholder="e.g. 3.85 / 4.0 (Magna Cum Laude)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
