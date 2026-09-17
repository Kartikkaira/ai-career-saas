import React from 'react';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  MapPin,
  ExternalLink,
} from 'lucide-react';

/**
 * Staff Engineer & Systems Lead Template (Pro Tier)
 * Features:
 * - Technical Leadership & Distributed Systems Architecture focus
 * - Deep Slate (#0f172a) typography with Emerald (#059669) accents
 * - Clean clickable links and action badges (Zero raw URLs displayed)
 * - 100% single-column ATS linear parseable standard.
 */
export const ExecutiveEliteTemplate = ({ data }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data.sections || {};

  const cleanLink = (url) => (url ? url.replace(/^https?:\/\/(www\.)?/, '') : '');

  return (
    <div className="bg-white text-slate-900 font-sans p-8 sm:p-12 leading-normal text-[13px] max-w-4xl mx-auto shadow-sm">
      {/* Header */}
      <header className="pb-4 border-b-2 border-slate-900 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {personalInfo.fullName || 'Alex Rivera'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase">
                {personalInfo.jobTitle || 'Staff Software Engineer / Distributed Systems Architect'}
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Technical Leadership
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-700 sm:text-right font-medium mt-2 sm:mt-0 space-y-0.5">
            {personalInfo.location && (
              <div className="flex items-center sm:justify-end gap-1 text-slate-600">
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center sm:justify-end gap-1 text-slate-600">
                <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center sm:justify-end gap-1">
                <Mail className="w-3 h-3 text-emerald-600 shrink-0" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-slate-900 font-medium hover:text-emerald-700 hover:underline"
                >
                  {personalInfo.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Clean Profile & Social Links (No Raw URLs) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-700 mt-3 pt-2 border-t border-slate-200">
          {personalInfo.linkedin && (
            <span className="inline-flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
              <a
                href={`https://${cleanLink(personalInfo.linkedin)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 font-semibold hover:text-emerald-700 hover:underline"
              >
                LinkedIn Profile
              </a>
            </span>
          )}
          {personalInfo.github && (
            <span className="inline-flex items-center gap-1">
              <span className="text-slate-300">•</span>
              <Github className="w-3.5 h-3.5 text-slate-900" />
              <a
                href={`https://${cleanLink(personalInfo.github)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 font-semibold hover:text-emerald-700 hover:underline"
              >
                GitHub Systems
              </a>
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="inline-flex items-center gap-1">
              <span className="text-slate-300">•</span>
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <a
                href={`https://${cleanLink(personalInfo.portfolio)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 font-semibold hover:text-emerald-700 hover:underline"
              >
                Architecture Portfolio
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Architecture & Technical Leadership Summary */}
      {summary && (
        <section className="mb-4">
          <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-1 mb-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950">
              Architecture & Technical Leadership
            </h2>
            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-mono">
              STAFF PERSPECTIVE
            </span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {/* Core Competencies & Technical Governance */}
      {skills && skills.length > 0 && (
        <section className="mb-4">
          <div className="border-b-2 border-slate-900 pb-1 mb-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950">
              Core Competencies & System Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {skills.map((skillGroup, idx) => (
              <div
                key={skillGroup.id || idx}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <strong className="block font-bold text-slate-950 mb-0.5 text-[12px] text-emerald-800">
                  {skillGroup.category}
                </strong>
                <p className="text-slate-700 text-[11.5px] leading-snug">
                  {Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Staff Engineering & Leadership Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <div className="border-b-2 border-slate-900 pb-1 mb-2.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950">
              Staff Engineering & Leadership Experience
            </h2>
          </div>
          <div className="space-y-3.5">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-[13px] font-extrabold text-slate-950">{exp.role}</strong>
                    <span className="font-bold text-emerald-700"> @ {exp.company}</span>
                    {exp.location && <span className="text-slate-600"> — {exp.location}</span>}
                  </div>
                  <span className="text-slate-700 font-mono text-[11px] whitespace-nowrap font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800 mt-1">
                    {exp.bullets
                      .filter((b) => b && b.trim())
                      .map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-snug pl-0.5">
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}

                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="text-[11px] text-slate-600 mt-1.5 flex flex-wrap items-center gap-1 font-mono">
                    <span className="font-bold text-slate-800">Architecture & Stack:</span>
                    <span className="text-emerald-800 font-medium">
                      [{Array.isArray(exp.techStack) ? exp.techStack.join(', ') : exp.techStack}]
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Systems & Architecture Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <div className="border-b-2 border-slate-900 pb-1 mb-2.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950">
              Featured Systems & Architecture Projects
            </h2>
          </div>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {proj.link ? (
                      <a
                        href={`https://${cleanLink(proj.link)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-extrabold text-slate-950 hover:text-emerald-700 text-[13px] flex items-center gap-1"
                      >
                        <span>{proj.title}</span>
                        <ExternalLink className="w-3 h-3 text-emerald-600" />
                      </a>
                    ) : (
                      <strong className="font-extrabold text-slate-950 text-[13px]">{proj.title}</strong>
                    )}

                    {proj.role && (
                      <span className="text-slate-600 text-xs font-medium">({proj.role})</span>
                    )}

                    {/* Action Badges (Never raw URLs) */}
                    {(proj.link || proj.githubLink) && (
                      <div className="inline-flex items-center gap-1.5 text-xs">
                        <span>•</span>
                        {proj.link && (
                          <a
                            href={`https://${cleanLink(proj.link)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded text-[11px] font-bold border border-emerald-200"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            Live Architecture
                          </a>
                        )}
                        {proj.githubLink && (
                          <a
                            href={`https://${cleanLink(proj.githubLink)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-bold border border-slate-300"
                          >
                            <Github className="w-2.5 h-2.5" />
                            Code Repository
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-slate-700 font-mono text-[11px] whitespace-nowrap font-medium">
                    {proj.startDate ? `${proj.startDate} – ${proj.endDate}` : proj.endDate || ''}
                  </span>
                </div>

                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-800 mt-1">
                    {proj.bullets
                      .filter((b) => b && b.trim())
                      .map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-snug pl-0.5">
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}

                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="text-[11px] text-slate-600 mt-1 font-mono">
                    <span className="font-bold text-slate-800">Technologies: </span>
                    <span className="text-slate-700">
                      [{Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack}]
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <div className="border-b-2 border-slate-900 pb-1 mb-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950">
              Education & Academic Foundation
            </h2>
          </div>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between items-start text-xs">
                <div>
                  <strong className="font-bold text-slate-950 text-[13px]">{edu.institution}</strong>
                  {edu.location && <span className="text-slate-600"> — {edu.location}</span>}
                  <div className="text-slate-700">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}{' '}
                    {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                  </div>
                </div>
                <div className="text-right text-slate-700 font-mono text-[11px] whitespace-nowrap">
                  {edu.startDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Architectural Credentials */}
      {certifications && certifications.length > 0 && (
        <section>
          <div className="border-b-2 border-slate-900 pb-1 mb-1.5">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-950">
              Professional Certifications & Credentials
            </h2>
          </div>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-800">
            {certifications.map((cert, idx) => (
              <li key={cert.id || idx} className="pl-0.5">
                <strong className="font-bold text-slate-950">{cert.name}</strong> — {cert.issuer}{' '}
                {cert.issueDate ? `(${cert.issueDate})` : ''}
                {cert.credentialUrl && (
                  <span>
                    {' '}|{' '}
                    <a
                      href={
                        cert.credentialUrl.startsWith('http')
                          ? cert.credentialUrl
                          : `https://${cert.credentialUrl}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 underline font-semibold hover:text-emerald-900"
                    >
                      Verify Credential
                    </a>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
