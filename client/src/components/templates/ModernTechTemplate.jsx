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
 * Tech & Engineering Specialist ATS Template (Pro Tier)
 * Features:
 * - Two-tier Role / Company & Dates hierarchy
 * - Aligned Key-Value Technical Skills Matrix
 * - Explicit "Technologies / Skills Used :" and "Technologies / Tools Used :" footers
 * - Direct GitHub & Live Demo project links
 * - Clean modern high-contrast typography with crisp border dividers
 * - 100% ATS-parseable single-column semantics.
 */
export const ModernTechTemplate = ({ data }) => {
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
    <div className="bg-white text-[#111827] font-sans p-8 sm:p-11 leading-snug text-[12.5px] max-w-4xl mx-auto shadow-sm">
      {/* Header */}
      <header className="text-center pb-2 mb-3">
        {/* Name in Bold Modern Sans */}
        <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-950 font-sans">
          {personalInfo.fullName || 'Alex Morgan'}
        </h1>

        {/* Subtitle / Job Title */}
        {personalInfo.jobTitle && (
          <p className="text-[13px] text-slate-800 font-medium mt-0.5">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact Info Row with Icons */}
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[11.5px] text-slate-800 mt-2">
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-700" />
              <span>{personalInfo.phone}</span>
            </span>
          )}

          {personalInfo.email && (
            <span className="inline-flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-700" />
              <a href={`mailto:${personalInfo.email}`} className="text-slate-900 hover:underline">
                {personalInfo.email}
              </a>
            </span>
          )}

          {personalInfo.linkedin && (
            <span className="inline-flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-[#0a66c2]" />
              <a
                href={`https://${cleanLink(personalInfo.linkedin)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 hover:underline"
              >
                LinkedIn
              </a>
            </span>
          )}

          {personalInfo.portfolio && (
            <span className="inline-flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-700" />
              <a
                href={`https://${cleanLink(personalInfo.portfolio)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 hover:underline"
              >
                Portfolio
              </a>
            </span>
          )}

          {personalInfo.github && (
            <span className="inline-flex items-center gap-1">
              <Github className="w-3 h-3 text-slate-900" />
              <a
                href={`https://${cleanLink(personalInfo.github)}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 hover:underline"
              >
                GitHub
              </a>
            </span>
          )}

          {personalInfo.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-700" />
              <span>{personalInfo.location}</span>
            </span>
          )}
        </div>
      </header>

      {/* PROFESSIONAL SUMMARY */}
      {summary && (
        <section className="mb-3.5">
          <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5 font-sans">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[12px] text-slate-900 leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* WORK EXPERIENCE */}
      {experience && experience.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2 font-sans">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                {/* Line 1: Role / Title & Dates */}
                <div className="flex justify-between items-baseline text-[12.5px]">
                  <div className="font-bold text-slate-950">
                    <span>{exp.role || 'Software Engineer'}</span>
                  </div>
                  <span className="text-[12px] text-slate-900 font-medium whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                {/* Line 2: Company Name (Italics) & Location (Italics) */}
                <div className="flex justify-between items-baseline text-[12px] italic text-slate-800 mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.location || 'Remote'}</span>
                </div>

                {/* Bullet Points */}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-[12px] text-slate-900 leading-normal">
                    {exp.bullets
                      .filter((b) => b && b.trim())
                      .map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-0.5">
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}

                {/* Technologies / Skills Used */}
                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="text-[11.5px] text-slate-900 mt-1">
                    <span className="italic font-bold">Technologies / Skills Used : </span>
                    <span className="italic">{Array.isArray(exp.techStack) ? exp.techStack.join(', ') : exp.techStack}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2 font-sans">
            PROJECTS
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                {/* Line 1: Project Title + Links & Dates */}
                <div className="flex justify-between items-baseline text-[12.5px]">
                  <div className="flex items-center gap-2">
                    <strong className="font-bold text-slate-950">{proj.title}</strong>

                    {/* Project Links (Website / GitHub) */}
                    {(proj.link || proj.githubLink) && (
                      <div className="inline-flex items-center gap-2 text-[11.5px] text-slate-800">
                        <span>|</span>
                        {proj.link && (
                          <a
                            href={`https://${cleanLink(proj.link)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-0.5 text-slate-900 underline hover:text-indigo-600"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            Website
                          </a>
                        )}
                        {proj.githubLink && (
                          <a
                            href={`https://${cleanLink(proj.githubLink)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-0.5 text-slate-900 underline hover:text-indigo-600"
                          >
                            <Github className="w-2.5 h-2.5" />
                            Github
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="text-[12px] text-slate-900 font-medium whitespace-nowrap">
                    {proj.startDate ? `${proj.startDate} – ${proj.endDate}` : proj.endDate || ''}
                  </span>
                </div>

                {/* Bullets */}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-[12px] text-slate-900 leading-normal mt-0.5">
                    {proj.bullets
                      .filter((b) => b && b.trim())
                      .map((bullet, bIdx) => (
                        <li key={bIdx} className="pl-0.5">
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}

                {/* Technologies / Tools Used */}
                {proj.techStack && proj.techStack.length > 0 && (
                  <div className="text-[11.5px] text-slate-900 mt-1">
                    <span className="italic font-bold">Technologies / Tools Used : </span>
                    <span className="italic">{Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {skills && skills.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5 font-sans">
            SKILLS
          </h2>
          <div className="space-y-1 text-[12px] text-slate-900">
            {skills.map((skillGroup, idx) => (
              <div key={skillGroup.id || idx} className="flex items-start">
                <span className="font-bold text-slate-950 w-52 shrink-0">
                  {skillGroup.category} :
                </span>
                <span className="text-slate-900">
                  {Array.isArray(skillGroup.items)
                    ? skillGroup.items.join(', ')
                    : skillGroup.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education && education.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-2 font-sans">
            EDUCATION
          </h2>
          <div className="space-y-2.5">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="text-[12px]">
                {/* Line 1: Institution | Location & Date */}
                <div className="flex justify-between items-baseline">
                  <div>
                    <strong className="font-bold text-slate-950">{edu.institution}</strong>
                    {edu.location && (
                      <span className="text-slate-800"> | <span className="italic">{edu.location}</span></span>
                    )}
                  </div>
                  <span className="text-slate-900 font-medium whitespace-nowrap">
                    {edu.startDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate}
                  </span>
                </div>

                {/* Line 2: Degree / Program & CGPA/Percentage */}
                <div className="flex justify-between items-baseline italic text-slate-800 mt-0.5">
                  <span>
                    {edu.degree} {edu.fieldOfStudy ? `– ${edu.fieldOfStudy}` : ''}
                  </span>
                  {edu.gpa && (
                    <span className="font-normal not-italic text-slate-900 whitespace-nowrap">
                      {edu.gpa.includes(':') || edu.gpa.toLowerCase().includes('cgpa') || edu.gpa.toLowerCase().includes('percentage')
                        ? edu.gpa
                        : `CGPA : ${edu.gpa}`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-900 pb-0.5 mb-1.5 font-sans">
            CERTIFICATIONS
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-1 text-[12px] text-slate-900">
            {certifications.map((cert, idx) => (
              <li key={cert.id || idx} className="pl-0.5">
                <span className="font-medium text-slate-950">{cert.name}</span>
                {cert.issuer && <span> – {cert.issuer}</span>}
                {cert.credentialUrl && (
                  <span>
                    {' '}|{' '}
                    <a
                      href={cert.credentialUrl.startsWith('http') ? cert.credentialUrl : `https://${cert.credentialUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-900 underline font-medium hover:text-indigo-600"
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
