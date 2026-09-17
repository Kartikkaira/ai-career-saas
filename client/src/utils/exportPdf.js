import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Print the resume element directly via browser print engine
 * This produces 100% vector crisp ATS-parseable text.
 */
export const printResumeDirectly = () => {
  window.print();
};

/**
 * Download resume element as PDF file
 * @param {string} elementId - ID of element to capture
 * @param {string} fileName - File name to save as
 */
export const exportResumeAsPdf = async (elementId = 'resume-printable-area', fileName = 'ATS_Resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found.`);
    window.print();
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2.5, // High resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
  } catch (error) {
    console.warn('html2canvas export fallback to native print:', error);
    window.print();
  }
};
