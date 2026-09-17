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
 * Modern Full-Stack ATS Template (Template 2)
 * Features:
 * - High-density modern software engineering layout
 * - Left-accent border Indigo (#4f46e5) section headers
 * - Clean clickable links with zero raw URLs visible
 * - Inline technology tags and bullet points with metric quantification
 * - 100% single-column ATS parsing fidelity.
 */
export const ClassicAtsTemplate = ({ data }) => {
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
    <div className="bg-white text-slate-900 font-sans p-8 sm:p-11 leading-snug text-[12.5px] max-w-4xl mx-auto shadow-sm">
      {/* Header */}
      <header className="pb-3 mb-3 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <div>
            <h1 className="text-2xl sm:text-[27px] font-extrabold tracking-tight text-slate-950">
              {personalInfo.fullName || 'Alex Rivera'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm font-bold text-indigo-600 tracking-tight mt-0.5">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {personalInfo.location && (
            <div className="text-xs text-slate-600 font-medium flex items-center gap-1 sm:text-right">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Clean Contact & Profile Links (No Raw URLs) */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-700 mt-2.5 pt-2 border-t border-slate-100">
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{personalInfo.phone}</span>
            </span>
          )}

          {personalInfo.email && (
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <a href={`mailto:${personalInfo.email}`} className="text-slate-900 hover:text-indigo-600 hover:underline">
                {personalInfo.email}
              </a>
            </span>
          )}

          {personalInfo.linkedin && (
            <span className="inline-flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
              <a
                href={`https://${cleanLink(personalInfo.linkedin)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 hover:text-indigo-600 font-medium hover:underline"
              >
                LinkedIn Profile
              </a>
            </span>
          )}

          {personalInfo.github && (
            <span className="inline-flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-slate-900" />
              <a
                href={`https://${cleanLink(personalInfo.github)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 hover:text-indigo-600 font-medium hover:underline"
              >
                GitHub Profile
              </a>
            </span>
          )}

          {personalInfo.portfolio && (
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <a
                href={`https://${cleanLink(personalInfo.portfolio)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 hover:text-indigo-600 font-medium hover:underline"
              >
                Portfolio Website
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-l-4 border-indigo-600 pl-2 pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-l-4 border-indigo-600 pl-2 pb-0.5 mb-2">
            Technical Skills & Arsenal
          </h2>
          <div className="space-y-1 text-xs text-slate-900">
            {skills.map((skillGroup, idx) => (
              <div key={skillGroup.id || idx} className="flex items-start">
                <span className="font-bold text-slate-950 w-48 shrink-0">
                  {skillGroup.category}:
                </span>
                <span className="text-slate-800">
                  {Array.isArray(skillGroup.items) ? skillGroup.items.join(', ') : skillGroup.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-l-4 border-indigo-600 pl-2 pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                {/* Title & Dates */}
                <div className="flex justify-between items-baseline text-[12.5px]">
                  <div>
                    <strong className="font-bold text-slate-950">{exp.role || 'Software Engineer'}</strong>
                    <span className="text-indigo-700 font-semibold"> @ {exp.company}</span>
                    {exp.location && <span className="text-slate-600 text-xs"> ({exp.location})</span>}
                  </div>
                  <span className="text-xs text-slate-700 font-medium whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {/* Bullets */}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800 leading-normal mt-1">
                    {exp.bullets.filter((b) => b && b.trim()).map((bullet, bIdx) => (
                      <li key={bIdx} className="pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack Footer */}
                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="text-[11.5px] text-slate-700 mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-slate-900">Tech Stack:</span>
                    <span>{Array.isArray(exp.techStack) ? exp.techStack.join(', ') : exp.techStack}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects (No Raw URLs) */}
      {projects && projects.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-l-4 border-indigo-600 pl-2 pb-0.5 mb-2">
            Featured Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline text-[12.5px]">
                  <div className="flex flex-wrap items-center gap-2">
                    {proj.link ? (
                      <a
                        href={`https://${cleanLink(proj.link)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-slate-950 hover:text-indigo-600 flex items-center gap-1"
                      >
                        <span>{proj.title}</span>
                        <ExternalLink className="w-3 h-3 text-indigo-500" />
                      </a>
                    ) : (
                      <strong className="font-bold text-slate-950">{proj.title}</strong>
                    )}

                    {proj.role && <span className="text-slate-600 text-xs font-medium">({proj.role})</span>}

                    {/* Action Links (Clean badges, never raw URLs) */}
                    {(proj.link || proj.githubLink) && (
                      <div className="inline-flex items-center gap-1.5 text-xs">
                        <span>•</span>
                        {proj.link && (
                          <a
                            href={`https://${cleanLink(proj.link)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[11px] font-semibold border border-indigo-200"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            Live Demo
                          </a>
                        )}
                        {proj.githubLink && (
                          <a
                            href={`https://${cleanLink(proj.githubLink)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-semibold border border-slate-300"
                          >
                            <Github className="w-2.5 h-2.5" />
                            Code Repository
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-xs text-slate-700 font-medium whitespace-nowrap">
                    {proj.startDate ? `${proj.startDate} – ${proj.endDate}` : proj.endDate || ''}
                  </span>
                </div>

                {/* Bullets */}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800 leading-normal mt-1">
                    {proj.bullets.filter((b) => b && b.trim()).map((bullet, bIdx) => (
                      <li key={bIdx} className="pl-0.5">{bullet}</li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack */}
                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="text-[11.5px] text-slate-700 mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-slate-900">Technologies:</span>
                    <span>{Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-l-4 border-indigo-600 pl-2 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between items-start text-xs">
                <div>
                  <strong className="font-bold text-slate-950 text-[12.5px]">{edu.institution}</strong>
                  {edu.location && <span className="text-slate-600"> — {edu.location}</span>}
                  <div className="text-slate-800">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                    {edu.gpa && <span className="font-medium text-slate-900"> | GPA: {edu.gpa}</span>}
                  </div>
                </div>
                <span className="text-slate-700 font-medium whitespace-nowrap">
                  {edu.startDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-l-4 border-indigo-600 pl-2 pb-0.5 mb-1.5">
            Certifications
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800">
            {certifications.map((cert, idx) => (
              <li key={cert.id || idx} className="pl-0.5">
                <strong className="font-bold text-slate-950">{cert.name}</strong>
                {cert.issuer && <span> — {cert.issuer}</span>}
                {cert.issueDate && <span className="text-slate-600"> ({cert.issueDate})</span>}
                {cert.credentialUrl && (
                  <span>
                    {' '}|{' '}
                    <a
                      href={cert.credentialUrl.startsWith('http') ? cert.credentialUrl : `https://${cert.credentialUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 underline font-medium hover:text-indigo-800"
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
