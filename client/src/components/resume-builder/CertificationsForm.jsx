import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Award, Plus, Trash2 } from 'lucide-react';

export const CertificationsForm = () => {
  const { currentResume, updateSection } = useResumeStore();
  const certifications = currentResume.sections?.certifications || [];

  const handleAddCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
    };
    updateSection('certifications', [...certifications, newCert]);
  };

  const handleRemoveCert = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    updateSection('certifications', updated);
  };

  const handleUpdateCert = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateSection('certifications', updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4f46e5]" />
            Certifications & Licenses
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add industry certifications, cloud provider badges, or accredited programs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddCert}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0f172a] hover:bg-slate-800 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-200 bg-white space-y-3">
          <Award className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm text-slate-500">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAddCert}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl"
          >
            Add First Certification (e.g. AWS Solutions Architect)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 relative shadow-xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#4f46e5] bg-[#eef2ff] px-2.5 py-1 rounded-md border border-indigo-100">
                  Certification #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveCert(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Certification Name *</label>
                  <input
                    type="text"
                    value={cert.name || ''}
                    onChange={(e) => handleUpdateCert(idx, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect – Associate"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Issuing Organization *</label>
                  <input
                    type="text"
                    value={cert.issuer || ''}
                    onChange={(e) => handleUpdateCert(idx, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services / Google Cloud"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Issue Date / Expiry</label>
                  <input
                    type="text"
                    value={cert.issueDate || ''}
                    onChange={(e) => handleUpdateCert(idx, 'issueDate', e.target.value)}
                    placeholder="e.g. Aug 2023"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none shadow-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Verification URL / Credential ID</label>
                  <input
                    type="text"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => handleUpdateCert(idx, 'credentialUrl', e.target.value)}
                    placeholder="e.g. https://www.credly.com/badges/..."
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
