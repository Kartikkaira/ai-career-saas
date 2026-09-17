import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { useUiStore } from '../../store/uiStore';
import { Wrench, Plus, Trash2, X, Sparkles, RefreshCw } from 'lucide-react';

export const SkillsForm = () => {
  const { currentResume, updateSection, enhanceWithAi, isAiEnhancing } = useResumeStore();
  const { addToast } = useUiStore();
  const skills = currentResume.sections?.skills || [];
  const jobTitle = currentResume.sections?.personalInfo?.jobTitle || 'Software Engineer';

  const [newSkillInput, setNewSkillInput] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const handleAddCategory = () => {
    const newCategory = {
      id: `skill-${Date.now()}`,
      category: 'New Skill Category',
      items: [],
    };
    updateSection('skills', [...skills, newCategory]);
  };

  const handleRemoveCategory = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    updateSection('skills', updated);
  };

  const handleUpdateCategoryName = (index, name) => {
    const updated = [...skills];
    updated[index].category = name;
    updateSection('skills', updated);
  };

  const handleAddSkillItem = (groupIndex, itemText) => {
    const text = itemText || newSkillInput[groupIndex] || '';
    if (!text.trim()) return;

    const updated = [...skills];
    const items = Array.isArray(updated[groupIndex].items) ? updated[groupIndex].items : [];
    if (!items.includes(text.trim())) {
      updated[groupIndex].items = [...items, text.trim()];
      updateSection('skills', updated);
    }
    setNewSkillInput({ ...newSkillInput, [groupIndex]: '' });
  };

  const handleRemoveSkillItem = (groupIndex, itemIndex) => {
    const updated = [...skills];
    updated[groupIndex].items = updated[groupIndex].items.filter((_, i) => i !== itemIndex);
    updateSection('skills', updated);
  };

  const handleFetchAiSkills = async () => {
    const allCurrent = skills.flatMap((s) => s.items || []).join(', ');
    const res = await enhanceWithAi('skills', {
      role: jobTitle,
      currentSkills: allCurrent,
    });

    if (res.success && res.data?.suggestedSkills) {
      setAiSuggestions(res.data.suggestedSkills);
      addToast('✨ Retrieved top in-demand skills for ' + jobTitle, 'success');
    } else {
      addToast(res.message || 'Failed to suggest skills', 'error');
    }
  };

  const handleAddSuggestedSkill = (skillName) => {
    if (skills.length === 0) {
      handleAddCategory();
    }
    const targetIdx = 0;
    handleAddSkillItem(targetIdx, skillName);
    setAiSuggestions(aiSuggestions.filter((s) => s !== skillName));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#4f46e5]" />
            Skills & Core Competencies
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize your technical tools, frameworks, and domain expertise into clear keyword categories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isAiEnhancing}
            onClick={handleFetchAiSkills}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#4f46e5] bg-[#eef2ff] hover:bg-[#e0e7ff] border border-indigo-100 disabled:opacity-50 transition"
          >
            {isAiEnhancing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>Suggest Skills with AI</span>
          </button>

          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Group
          </button>
        </div>
      </div>

      {/* AI Suggestions Pill Bar */}
      {aiSuggestions.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#eef2ff] border border-indigo-100 space-y-2.5 animate-in slide-in-from-top-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#4f46e5] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Recommended In-Demand Keywords for "{jobTitle}":
            </span>
            <button
              type="button"
              onClick={() => setAiSuggestions([])}
              className="text-xs text-slate-500 hover:text-slate-900"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {aiSuggestions.map((skill, sIdx) => (
              <button
                key={sIdx}
                type="button"
                onClick={() => handleAddSuggestedSkill(skill)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-800 border border-indigo-100 shadow-xs transition group"
              >
                <Plus className="w-3 h-3 text-[#4f46e5] group-hover:scale-125 transition-transform" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
          <Wrench className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-500">No skill categories defined.</p>
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
          >
            Create First Category (e.g. Languages & Tools)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skillGroup, groupIdx) => (
            <div
              key={skillGroup.id || groupIdx}
              className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 relative shadow-xs"
            >
              <div className="flex justify-between items-center gap-3">
                <input
                  type="text"
                  value={skillGroup.category}
                  onChange={(e) => handleUpdateCategoryName(groupIdx, e.target.value)}
                  placeholder="Category Name (e.g. Frontend / Cloud)"
                  className="font-bold text-xs text-[#4f46e5] bg-transparent border-b border-dashed border-slate-300 focus:border-indigo-600 focus:outline-none pb-0.5"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveCategory(groupIdx)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                  title="Remove group"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-slate-50 rounded-xl border border-slate-200">
                {(Array.isArray(skillGroup.items) ? skillGroup.items : []).map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-800 shadow-xs"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkillItem(groupIdx, itemIdx)}
                      className="text-slate-400 hover:text-rose-600 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Tag Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkillInput[groupIdx] || ''}
                  onChange={(e) => setNewSkillInput({ ...newSkillInput, [groupIdx]: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkillItem(groupIdx);
                    }
                  }}
                  placeholder="Type a skill and press Enter or click Add (e.g. React.js, Docker)..."
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkillItem(groupIdx)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold"
                >
                  Add Skill
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
