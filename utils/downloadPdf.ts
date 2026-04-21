import jsPDF from 'jspdf';

interface Ratings {
  photography: number;
  style: number;
  fitness: number;
  charm: number;
  social_status: number;
}

interface FreeData {
  feedback: string;
  ratings: Ratings;
}

interface PremiumData extends FreeData {
  suggested_improvements: {
    photos: string[];
    new_photo_ideas: string[];
    bio: string;
    sample_bios: string[];
  };
}

const COLORS = {
  primary: [31, 41, 55] as [number, number, number],
  accent: [59, 130, 246] as [number, number, number],
  muted: [107, 114, 128] as [number, number, number],
  barBg: [229, 231, 235] as [number, number, number],
  barFill: [31, 41, 55] as [number, number, number],
};

const MARGIN = 48;
const PAGE_WIDTH = 595;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function addHeader(pdf: jsPDF) {
  pdf.setFillColor(...COLORS.primary);
  pdf.rect(0, 0, PAGE_WIDTH, 70, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.text('DateBetter', MARGIN, 42);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.text('Profile Analysis Report', MARGIN, 58);
  return 90;
}

function addSectionTitle(pdf: jsPDF, text: string, y: number): number {
  pdf.setTextColor(...COLORS.primary);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text(text, MARGIN, y);
  return y + 22;
}

function addRatings(pdf: jsPDF, ratings: Ratings, y: number): number {
  const items: [string, number][] = [
    ['Photography', ratings.photography],
    ['Style', ratings.style],
    ['Fitness', ratings.fitness],
    ['Charm', ratings.charm],
    ['Social Status', ratings.social_status],
  ];

  pdf.setFontSize(11);
  for (const [label, score] of items) {
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...COLORS.primary);
    pdf.text(label, MARGIN, y);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${score}/10`, MARGIN + CONTENT_WIDTH, y, { align: 'right' });

    const barY = y + 4;
    const barWidth = CONTENT_WIDTH;
    const barHeight = 6;
    pdf.setFillColor(...COLORS.barBg);
    pdf.roundedRect(MARGIN, barY, barWidth, barHeight, 3, 3, 'F');
    pdf.setFillColor(...COLORS.barFill);
    pdf.roundedRect(MARGIN, barY, (barWidth * score) / 10, barHeight, 3, 3, 'F');
    y += 24;
  }
  return y + 8;
}

function addParagraph(pdf: jsPDF, text: string, y: number, pdfHeight: number): number {
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...COLORS.primary);
  const lines: string[] = pdf.splitTextToSize(text, CONTENT_WIDTH);
  for (const line of lines) {
    if (y > pdfHeight - MARGIN) {
      pdf.addPage();
      y = MARGIN;
    }
    pdf.text(line, MARGIN, y);
    y += 15;
  }
  return y + 4;
}

function addBulletList(pdf: jsPDF, items: string[], y: number, pdfHeight: number): number {
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...COLORS.primary);
  for (const item of items) {
    const lines: string[] = pdf.splitTextToSize(item, CONTENT_WIDTH - 14);
    for (let i = 0; i < lines.length; i++) {
      if (y > pdfHeight - MARGIN) {
        pdf.addPage();
        y = MARGIN;
      }
      if (i === 0) pdf.text('•', MARGIN, y);
      pdf.text(lines[i], MARGIN + 12, y);
      y += 15;
    }
    y += 4;
  }
  return y + 4;
}

function addFooterCta(pdf: jsPDF, text: string, pdfHeight: number) {
  const y = pdfHeight - 60;
  pdf.setFillColor(...COLORS.accent);
  pdf.rect(0, y, PAGE_WIDTH, 60, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  const lines: string[] = pdf.splitTextToSize(text, CONTENT_WIDTH);
  let cursor = y + 24;
  for (const line of lines) {
    pdf.text(line, PAGE_WIDTH / 2, cursor, { align: 'center' });
    cursor += 16;
  }
}

export function downloadFreePdf(data: FreeData) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pdfHeight = pdf.internal.pageSize.getHeight();

  let y = addHeader(pdf);
  y = addSectionTitle(pdf, 'Ratings', y);
  y = addRatings(pdf, data.ratings, y);
  y = addSectionTitle(pdf, 'General Feedback', y);
  y = addParagraph(pdf, data.feedback, y, pdfHeight - 80);

  addFooterCta(
    pdf,
    'Unlock Actionable Improvements at datebetter.online for your full detailed analysis.',
    pdfHeight,
  );

  pdf.save('datebetter-free-report.pdf');
}

export function downloadPremiumPdf(data: PremiumData, uploadedImages: string[]) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pdfHeight = pdf.internal.pageSize.getHeight();

  let y = addHeader(pdf);
  y = addSectionTitle(pdf, 'Ratings', y);
  y = addRatings(pdf, data.ratings, y);

  y = addSectionTitle(pdf, 'General Feedback', y);
  y = addParagraph(pdf, data.feedback, y, pdfHeight);

  y = addSectionTitle(pdf, 'Photos Analysis', y);
  const imageCount = Math.min(uploadedImages.length, data.suggested_improvements.photos.length);
  for (let i = 0; i < imageCount; i++) {
    if (y > pdfHeight - 180) {
      pdf.addPage();
      y = MARGIN;
    }
    try {
      pdf.addImage(uploadedImages[i], 'JPEG', MARGIN, y, 100, 100);
    } catch {
      // skip broken image
    }
    const textX = MARGIN + 114;
    const textWidth = CONTENT_WIDTH - 114;
    const lines: string[] = pdf.splitTextToSize(data.suggested_improvements.photos[i], textWidth);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(...COLORS.primary);
    let ty = y + 14;
    for (const line of lines) {
      pdf.text(line, textX, ty);
      ty += 14;
    }
    y = Math.max(y + 110, ty + 8);
  }

  y = addSectionTitle(pdf, 'New Photo Ideas', y);
  y = addBulletList(pdf, data.suggested_improvements.new_photo_ideas, y, pdfHeight);

  y = addSectionTitle(pdf, 'Bio Analysis', y);
  y = addParagraph(pdf, data.suggested_improvements.bio, y, pdfHeight);

  y = addSectionTitle(pdf, 'Sample Bios', y);
  y = addBulletList(pdf, data.suggested_improvements.sample_bios, y, pdfHeight);

  pdf.save('datebetter-premium-report.pdf');
}
