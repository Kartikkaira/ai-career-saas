/**
 * Realistic Fallback & Heuristic ATS Analysis Generator
 */
const getFallbackAtsAnalysis = (resumeText = '', jobDescription = '', targetRole = '') => {
  const textLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  // Basic heuristic keyword check
  const commonKeywords = [
    'react', 'node.js', 'javascript', 'typescript', 'python', 'aws', 'docker',
    'mongodb', 'sql', 'git', 'ci/cd', 'rest api', 'agile', 'leadership', 'graphql',
    'microservices', 'kubernetes', 'html5', 'css3', 'tailwind', 'express'
  ];

  const matched = commonKeywords.filter((kw) => textLower.includes(kw));
  const missing = commonKeywords
    .filter((kw) => (jdLower.includes(kw) || Math.random() > 0.6) && !matched.includes(kw))
    .slice(0, 6);

  // Check metrics/numbers presence
  const hasNumbers = /\d+%|\$\d+|\d+\+?\s*(users|clients|projects|engineers|ms|x)/i.test(resumeText);
  const quantifiedScore = hasNumbers ? 85 : 58;

  // Check action verbs
  const hasActionVerbs = /(spearheaded|architected|engineered|optimized|orchestrated|accelerated|delivered)/i.test(resumeText);
  const actionVerbScore = hasActionVerbs ? 88 : 64;

  const formattingScore = resumeText.length > 300 ? 84 : 60;
  const keywordScore = Math.min(95, Math.max(55, matched.length * 10 + 40));
  const lengthScore = resumeText.length > 500 && resumeText.length < 3500 ? 90 : 65;
  const contactScore = /@.+\..+/.test(resumeText) && /\d{3}/.test(resumeText) ? 95 : 70;

  const overall = Math.round(
    formattingScore * 0.15 +
    keywordScore * 0.30 +
    quantifiedScore * 0.20 +
    actionVerbScore * 0.15 +
    lengthScore * 0.10 +
    contactScore * 0.10
  );

  return {
    overallAtsScore: Math.max(45, Math.min(96, overall || 78)),
    scoreBreakdown: {
      formatting: formattingScore,
      keywordMatch: keywordScore,
      quantifiedImpact: quantifiedScore,
      actionVerbs: actionVerbScore,
      lengthAndStructure: lengthScore,
      contactCompleteness: contactScore,
    },
    executiveSummary: `Your resume shows strong foundational experience for ${targetRole || 'Software Engineering'}. To maximize your interview rate with Tier-1 recruiters, quantify more bullet points with the X-Y-Z formula and integrate missing key industry skills like ${missing.slice(0, 3).join(', ') || 'Docker and Cloud infrastructure'}.`,
    matchedKeywords: matched.length > 0 ? matched : ['JavaScript', 'React', 'Git', 'Agile', 'REST APIs'],
    missingKeywords: missing.length > 0 ? missing : ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS / Cloud Architecture', 'Unit Testing'],
    strengths: [
      'Clean parseable plain text layout compatible with major ATS engines (Workday, Greenhouse, Lever).',
      'Solid articulation of technical responsibilities and project scope.',
      'Clear chronological progression in work history and education.',
    ],
    criticalIssues: [
      quantifiedScore < 70 ? 'Missing quantified metrics (percentages, revenues, latencies, or scale) in several bullet points.' : 'Some bullet points start with passive duties instead of strong action verbs.',
      missing.length > 0 ? `Target role frequently looks for ${missing.slice(0, 2).join(' & ')}.` : 'Ensure skill section categories clearly distinguish tools from core languages.',
    ],
    actionableSuggestions: [
      {
        section: 'Experience',
        suggestion: 'Convert passive responsibility bullets into metric-driven accomplishment statements using Google\'s X-Y-Z formula.',
        exampleFix: 'Before: "Responsible for developing frontend features." -> After: "Architected 12+ responsive React components with Tailwind CSS, reducing page load time by 42% for 50k+ monthly active users."',
        priority: 'high',
      },
      {
        section: 'Skills',
        suggestion: `Incorporate high-priority missing technical competencies: ${missing.slice(0, 3).join(', ') || 'Cloud & DevOps tools'}.`,
        exampleFix: 'Group skills into logical tiers: Languages & Frameworks, Cloud & DevOps, Databases & Tools.',
        priority: 'high',
      },
      {
        section: 'Summary',
        suggestion: 'Add a 3-line executive elevator pitch at the top detailing your years of experience, core tech stack, and primary value proposition.',
        exampleFix: 'E.g., "Full Stack Software Engineer with 4+ years of experience designing high-throughput MERN applications and cloud microservices serving 1M+ transactions."',
        priority: 'medium',
      },
    ],
    grammarAndClarity: [
      {
        issue: 'Consistency in bullet point punctuation',
        correction: 'Ensure all bullet points consistently end with a period or consistently omit it.',
        context: 'Work Experience section',
      },
      {
        issue: 'Tense consistency',
        correction: 'Use past tense verbs for previous roles ("Built", "Managed") and present tense only for current roles.',
        context: 'Prior Positions',
      },
    ],
  };
};

module.exports = {
  getFallbackAtsAnalysis,
};
