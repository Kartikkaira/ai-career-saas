import React from 'react';
import { ClassicAtsTemplate } from './ClassicAtsTemplate';
import { ModernTechTemplate } from './ModernTechTemplate';
import { ExecutiveEliteTemplate } from './ExecutiveEliteTemplate';

export const TemplateRenderer = ({ data, templateId }) => {
  const currentTemplate = templateId || data.templateId || 'standard-ats';

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'modern-tech':
        return <ModernTechTemplate data={data} />;
      case 'executive-elite':
        return <ExecutiveEliteTemplate data={data} />;
      case 'standard-ats':
      case 'classic-ats':
      default:
        return <ClassicAtsTemplate data={data} />;
    }
  };

  return (
    <div id="resume-printable-area" className="w-full bg-white shadow-2xl rounded-sm overflow-hidden text-left">
      {renderTemplate()}
    </div>
  );
};
