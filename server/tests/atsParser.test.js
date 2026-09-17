const { getFallbackAtsAnalysis } = require('../utils/sampleData');
const { extractTextFromPdf } = require('../utils/pdfParser');

describe('ATS Analysis and Parser Unit Tests', () => {
  test('getFallbackAtsAnalysis generates valid structured JSON schema', () => {
    const resumeText = `
      John Doe
      Software Engineer | john@example.com | (555) 123-4567
      Summary: Experienced React and Node.js developer with 4 years building web apps.
      Experience:
      - Architected microservices with Node.js and MongoDB serving 500k+ requests daily.
      - Engineered React frontend components reducing load time by 35%.
      Skills: React, Node.js, MongoDB, JavaScript, TypeScript, Git, AWS
    `;

    const jobDescription = 'Looking for a Senior React and Node.js Developer with AWS and Docker experience.';
    const analysis = getFallbackAtsAnalysis(resumeText, jobDescription, 'Senior Full Stack Developer');

    expect(analysis).toBeDefined();
    expect(typeof analysis.overallAtsScore).toBe('number');
    expect(analysis.overallAtsScore).toBeGreaterThanOrEqual(0);
    expect(analysis.overallAtsScore).toBeLessThanOrEqual(100);

    expect(analysis.scoreBreakdown).toBeDefined();
    expect(typeof analysis.scoreBreakdown.formatting).toBe('number');
    expect(typeof analysis.scoreBreakdown.keywordMatch).toBe('number');
    expect(typeof analysis.scoreBreakdown.quantifiedImpact).toBe('number');
    expect(typeof analysis.scoreBreakdown.actionVerbs).toBe('number');
    expect(typeof analysis.scoreBreakdown.lengthAndStructure).toBe('number');
    expect(typeof analysis.scoreBreakdown.contactCompleteness).toBe('number');

    expect(Array.isArray(analysis.matchedKeywords)).toBe(true);
    expect(Array.isArray(analysis.missingKeywords)).toBe(true);
    expect(Array.isArray(analysis.strengths)).toBe(true);
    expect(Array.isArray(analysis.criticalIssues)).toBe(true);
    expect(Array.isArray(analysis.actionableSuggestions)).toBe(true);

    if (analysis.actionableSuggestions.length > 0) {
      const firstSuggestion = analysis.actionableSuggestions[0];
      expect(firstSuggestion.section).toBeDefined();
      expect(firstSuggestion.suggestion).toBeDefined();
      expect(firstSuggestion.exampleFix).toBeDefined();
    }
  });

  test('extractTextFromPdf rejects invalid input buffer gracefully', async () => {
    await expect(extractTextFromPdf(null)).rejects.toThrow('Invalid buffer supplied');
  });
});
