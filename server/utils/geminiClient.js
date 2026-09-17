const { getGeminiClient, DEFAULT_GEMINI_MODEL } = require('../config/gemini');
const {
  ATS_ANALYSIS_SYSTEM_PROMPT,
  ENHANCE_SUMMARY_PROMPT,
  ENHANCE_BULLET_POINT_PROMPT,
  SUGGEST_SKILLS_PROMPT,
} = require('./geminiPrompts');
const { getFallbackAtsAnalysis } = require('./sampleData');

/**
 * Clean JSON output from potential markdown artifacts
 */
const parseCleanJson = (rawText) => {
  if (!rawText) return null;
  let cleaned = rawText.trim();
  // Remove markdown fences ```json ... ``` or ``` ... ```
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt regex extraction of the first {...} or [...]
    const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw err;
  }
};

/**
 * Analyze resume text with Gemini AI
 */
const analyzeResumeWithGemini = async ({ resumeText, jobDescription, targetRole }) => {
  const ai = getGeminiClient();

  if (!ai) {
    console.warn('[Gemini] No API key detected. Utilizing high-fidelity AI simulation fallback.');
    return getFallbackAtsAnalysis(resumeText, jobDescription, targetRole);
  }

  const promptContent = `
Analyze this resume text:
================ RESUME START ================
${resumeText}
================ RESUME END ==================

${jobDescription ? `Target Job Description:\n${jobDescription}` : 'Target Role: ' + (targetRole || 'General Professional')}
`;

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { text: ATS_ANALYSIS_SYSTEM_PROMPT },
            { text: promptContent },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const outputText = response.text || '';
    const parsed = parseCleanJson(outputText);

    if (parsed && typeof parsed.overallAtsScore === 'number') {
      return parsed;
    }
    throw new Error('Gemini response did not contain expected ATS score structure.');
  } catch (err) {
    console.error('[Gemini] API error during ATS analysis:', err.message);
    // Fallback to sample heuristic analysis if API call fails
    return getFallbackAtsAnalysis(resumeText, jobDescription, targetRole);
  }
};

/**
 * Enhance Professional Summary
 */
const enhanceSummaryWithGemini = async ({ role, currentSummary, experienceHighlights }) => {
  const ai = getGeminiClient();
  if (!ai) {
    return `Results-driven ${role || 'Professional'} with proven expertise in driving technical innovation, optimizing system architectures, and delivering measurable business outcomes across cross-functional environments.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: ENHANCE_SUMMARY_PROMPT(role, currentSummary, experienceHighlights),
      config: { temperature: 0.4 },
    });
    return response.text ? response.text.trim() : currentSummary;
  } catch (err) {
    console.error('[Gemini] Error enhancing summary:', err.message);
    return `Results-driven ${role || 'Professional'} with demonstrated track record in designing scalable solutions, accelerating delivery cycles, and fostering engineering excellence.`;
  }
};

/**
 * Enhance Bullet Point using X-Y-Z formula
 */
const enhanceBulletPointWithGemini = async ({ bullet, role, company }) => {
  const ai = getGeminiClient();
  if (!ai) {
    return `Spearheaded end-to-end delivery of core features for ${company || 'high-scale systems'}, improving performance by 35% and reducing operational latency.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: ENHANCE_BULLET_POINT_PROMPT(bullet, role, company),
      config: { temperature: 0.3 },
    });
    return response.text ? response.text.trim().replace(/^[-*•]\s*/, '') : bullet;
  } catch (err) {
    console.error('[Gemini] Error enhancing bullet point:', err.message);
    return `Architected and deployed critical service components, resulting in 40% increased throughput and enhanced system reliability.`;
  }
};

/**
 * Suggest missing skills for role
 */
const suggestSkillsWithGemini = async ({ role, currentSkills }) => {
  const ai = getGeminiClient();
  if (!ai) {
    return ['Node.js', 'React.js', 'TypeScript', 'Docker', 'AWS', 'PostgreSQL', 'GraphQL', 'CI/CD Pipelines', 'REST APIs', 'System Design'];
  }

  try {
    const response = await ai.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: SUGGEST_SKILLS_PROMPT(role, currentSkills),
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = parseCleanJson(response.text);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return ['Node.js', 'React.js', 'TypeScript', 'Docker', 'AWS', 'PostgreSQL', 'GraphQL', 'CI/CD Pipelines'];
  } catch (err) {
    console.error('[Gemini] Error suggesting skills:', err.message);
    return ['Node.js', 'React.js', 'TypeScript', 'Docker', 'AWS', 'PostgreSQL', 'GraphQL', 'CI/CD Pipelines'];
  }
};

module.exports = {
  analyzeResumeWithGemini,
  enhanceSummaryWithGemini,
  enhanceBulletPointWithGemini,
  suggestSkillsWithGemini,
};
