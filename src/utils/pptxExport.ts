import pptxgen from 'pptxgenjs';
import { BuffetTagItem } from '../data/sampleDishes';
import { ALLERGENS } from '../data/allergens';
import { renderAllergenToPng } from './iconRenderer';

/**
 * Cache for resolved base64 images
 */
const bgCache: Record<string, string> = {};

export async function resolveBackgroundBase64(urlOrData?: string): Promise<string> {
  const target = urlOrData || '/buffet_background.jpg';
  if (bgCache[target]) return bgCache[target];

  if (target.startsWith('data:image/')) {
    bgCache[target] = target;
    return target;
  }

  try {
    const res = await fetch(target);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        bgCache[target] = result;
        resolve(result);
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Could not load background image as base64', e);
    return '';
  }
}

function getPptxEnglishFont(fontName?: string): string {
  switch (fontName) {
    case 'Cinzel':
      return 'Palatino Linotype';
    case 'Cormorant Garamond':
      return 'Garamond';
    case 'Montserrat':
      return 'Arial';
    case 'Plus Jakarta Sans':
      return 'Calibri';
    case 'Playfair Display':
    case 'Bodoni Moda':
    default:
      return 'Georgia';
  }
}

function getPptxArabicFont(fontName?: string): string {
  switch (fontName) {
    case 'Scheherazade New':
      return 'Traditional Arabic';
    case 'Cairo':
    case 'Tajawal':
    case 'Noto Sans Arabic':
    case 'Amiri':
    default:
      return 'Arial';
  }
}

export interface PptxExportOptions {
  layoutMode?: 'square' | 'sheet4'; // 'square' = 1 card per slide (4x4"), 'sheet4' = 4 cards per A4/Letter slide
  neonColor?: string;
  customBackground?: string;
  englishFont?: string;
  arabicFont?: string;
  fileName?: string;
}

/**
 * Export buffet tags to Microsoft PowerPoint (.pptx)
 */
export async function exportToPowerPoint(
  items: BuffetTagItem[],
  options: PptxExportOptions = {}
): Promise<void> {
  const {
    layoutMode = 'square',
    neonColor = '#d946ef',
    customBackground = '/buffet_background.jpg',
    englishFont = 'Bodoni Moda',
    arabicFont = 'Amiri',
    fileName = 'Buffet_Tags.pptx',
  } = options;

  const pptx = new pptxgen();
  pptx.author = 'BuffetTag Studio';
  pptx.company = 'Culinary Display';
  pptx.title = 'Buffet Food Tags';

  const defaultBgData = await resolveBackgroundBase64(customBackground);

  if (layoutMode === 'square') {
    // 4" x 4" Square Card per slide (Exact match to sample PDF slides)
    pptx.defineLayout({ name: 'SQUARE_BUFFET', width: 4.0, height: 4.0 });
    pptx.layout = 'SQUARE_BUFFET';

    for (const item of items) {
      const slide = pptx.addSlide();

      // Resolve background (per-item or global)
      let slideBg = defaultBgData;
      if (item.customBackground) {
        slideBg = await resolveBackgroundBase64(item.customBackground);
      }

      if (slideBg) {
        slide.background = { data: slideBg };
      } else {
        slide.background = { color: 'F5EBE1' };
      }

      const activeAllergens = (item.allergens || [])
        .map((id) => ALLERGENS[id])
        .filter(Boolean);

      const hasAllergens = activeAllergens.length > 0;

      // Adjust vertical position depending on whether allergens exist
      const englishY = hasAllergens ? 0.7 : 1.25;
      const arabicY = hasAllergens ? 1.65 : 2.15;

      const itemEnglishFont = getPptxEnglishFont(item.englishFont || englishFont);
      const itemArabicFont = getPptxArabicFont(item.arabicFont || arabicFont);

      // English Title
      slide.addText(item.englishTitle.toUpperCase(), {
        x: 0.25,
        y: englishY,
        w: 3.5,
        h: 0.9,
        align: 'center',
        fontFace: itemEnglishFont,
        fontSize: item.englishTitle.length > 25 ? 18 : 22,
        bold: true,
        color: '1A1612',
        charSpacing: 1,
        margin: 0,
      });

      // Arabic Title
      slide.addText(item.arabicTitle, {
        x: 0.25,
        y: arabicY,
        w: 3.5,
        h: 0.7,
        align: 'center',
        fontFace: itemArabicFont,
        fontSize: item.arabicTitle.length > 25 ? 17 : 21,
        bold: true,
        color: '1A1612',
        margin: 0,
      });

      // Allergen Icons & Labels
      if (hasAllergens) {
        const count = activeAllergens.length;
        const iconW = count > 3 ? 0.55 : 0.65;
        const iconH = iconW;
        const totalSpacing = 3.6;
        const itemSlot = totalSpacing / count;

        for (let i = 0; i < count; i++) {
          const allergen = activeAllergens[i];
          const pngData = await renderAllergenToPng(allergen.id, neonColor);
          const iconX = 0.2 + i * itemSlot + (itemSlot - iconW) / 2;

          if (pngData) {
            slide.addImage({
              data: pngData,
              x: iconX,
              y: 2.45,
              w: iconW,
              h: iconH,
            });
          }

          // Text under icon
          slide.addText(allergen.badgeText, {
            x: iconX - 0.2,
            y: 2.45 + iconH + 0.05,
            w: iconW + 0.4,
            h: 0.55,
            align: 'center',
            fontSize: count > 3 ? 7.5 : 8.5,
            fontFace: 'Arial',
            bold: true,
            color: '1A1612',
            margin: 0,
          });
        }
      }
    }
  } else {
    // 4 Cards per Slide on A4/Letter
    pptx.defineLayout({ name: 'SHEET_PRINT', width: 8.5, height: 11.0 });
    pptx.layout = 'SHEET_PRINT';

    const cardsPerPage = 4;
    const cardW = 3.75;
    const cardH = 3.75;
    const marginX = 0.5;
    const marginY = 0.8;
    const gapX = 0.5;
    const gapY = 0.7;

    for (let p = 0; p < items.length; p += cardsPerPage) {
      const slide = pptx.addSlide();
      slide.background = { color: 'FFFFFF' };

      const pageItems = items.slice(p, p + cardsPerPage);

      for (let idx = 0; idx < pageItems.length; idx++) {
        const item = pageItems[idx];
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const cardX = marginX + col * (cardW + gapX);
        const cardY = marginY + row * (cardH + gapY);

        let cardBg = defaultBgData;
        if (item.customBackground) {
          cardBg = await resolveBackgroundBase64(item.customBackground);
        }

        // Add Card Background image
        if (cardBg) {
          slide.addImage({
            data: cardBg,
            x: cardX,
            y: cardY,
            w: cardW,
            h: cardH,
          });
        } else {
          slide.addShape(pptx.ShapeType.rect, {
            x: cardX,
            y: cardY,
            w: cardW,
            h: cardH,
            fill: { color: 'F5EBE1' },
            line: { color: 'E2D4C3', width: 1 },
          });
        }

        // Add subtle cutting border
        slide.addShape(pptx.ShapeType.rect, {
          x: cardX,
          y: cardY,
          w: cardW,
          h: cardH,
          fill: { type: 'none' },
          line: { color: 'CCCCCC', width: 0.5, dashType: 'dash' },
        });

        const activeAllergens = (item.allergens || [])
          .map((id) => ALLERGENS[id])
          .filter(Boolean);
        const hasAllergens = activeAllergens.length > 0;

        const englishY = cardY + (hasAllergens ? 0.6 : 1.15);
        const arabicY = cardY + (hasAllergens ? 1.55 : 2.05);

        const itemEnglishFont = getPptxEnglishFont(item.englishFont || englishFont);
        const itemArabicFont = getPptxArabicFont(item.arabicFont || arabicFont);

        // English Title
        slide.addText(item.englishTitle.toUpperCase(), {
          x: cardX + 0.2,
          y: englishY,
          w: cardW - 0.4,
          h: 0.8,
          align: 'center',
          fontFace: itemEnglishFont,
          fontSize: item.englishTitle.length > 25 ? 16 : 20,
          bold: true,
          color: '1A1612',
          margin: 0,
        });

        // Arabic Title
        slide.addText(item.arabicTitle, {
          x: cardX + 0.2,
          y: arabicY,
          w: cardW - 0.4,
          h: 0.65,
          align: 'center',
          fontFace: itemArabicFont,
          fontSize: item.arabicTitle.length > 25 ? 15 : 19,
          bold: true,
          color: '1A1612',
          margin: 0,
        });

        // Allergens
        if (hasAllergens) {
          const count = activeAllergens.length;
          const iconW = count > 3 ? 0.5 : 0.6;
          const iconH = iconW;
          const totalSpacing = cardW - 0.4;
          const slot = totalSpacing / count;

          for (let i = 0; i < count; i++) {
            const allergen = activeAllergens[i];
            const pngData = await renderAllergenToPng(allergen.id, neonColor);
            const iconX = cardX + 0.2 + i * slot + (slot - iconW) / 2;

            if (pngData) {
              slide.addImage({
                data: pngData,
                x: iconX,
                y: cardY + 2.3,
                w: iconW,
                h: iconH,
              });
            }

            slide.addText(allergen.badgeText, {
              x: iconX - 0.15,
              y: cardY + 2.3 + iconH + 0.05,
              w: iconW + 0.3,
              h: 0.5,
              align: 'center',
              fontSize: count > 3 ? 7 : 8,
              fontFace: 'Arial',
              bold: true,
              color: '1A1612',
              margin: 0,
            });
          }
        }
      }
    }
  }

  await pptx.writeFile({ fileName });
}
