const pdfParse = require('pdf-parse');

/**
 * Extract clean, sanitized text from an uploaded PDF buffer
 * @param {Buffer} dataBuffer
 * @returns {Promise<{ text: string, numPages: number, info: object }>}
 */
const extractTextFromPdf = async (dataBuffer) => {
  if (!dataBuffer || !Buffer.isBuffer(dataBuffer)) {
    throw new Error('Invalid buffer supplied to PDF parser');
  }

  try {
    const data = await pdfParse(dataBuffer);

    // Clean whitespace and line endings
    const cleanedText = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\t/g, ' ')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return {
      text: cleanedText,
      numPages: data.numpages || 1,
      info: data.info || {},
    };
  } catch (error) {
    console.error('[PdfParser] Failed to extract text from PDF:', error.message);
    throw new Error(`Failed to parse PDF document: ${error.message}`);
  }
};

module.exports = {
  extractTextFromPdf,
};
