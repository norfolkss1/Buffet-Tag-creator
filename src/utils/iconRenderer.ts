import { ALLERGENS, AllergenDef } from '../data/allergens';

// Cache rendered PNG data URLs for fast re-use
const iconPngCache: Record<string, string> = {};

/**
 * Render an allergen SVG into a high-res PNG dataUrl with neon glow
 * for native PowerPoint slide embedding
 */
export async function renderAllergenToPng(
  allergenId: string,
  neonColor = '#d946ef',
  glowWidth = 14
): Promise<string> {
  const cacheKey = `${allergenId}-${neonColor}-${glowWidth}`;
  if (iconPngCache[cacheKey]) {
    return iconPngCache[cacheKey];
  }

  const def: AllergenDef | undefined = ALLERGENS[allergenId];
  if (!def) return '';

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    // Build standalone SVG string with neon glow filters
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${def.viewBox}" width="300" height="300">
        <defs>
          <filter id="neon-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="${neonColor}" flood-opacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="${neonColor}" flood-opacity="0.7" />
            <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#ffffff" flood-opacity="0.9" />
          </filter>
        </defs>
        <g filter="url(#neon-glow)" color="#ffffff" stroke="#ffffff">
          ${def.svgPath}
        </g>
      </svg>
    `.trim();

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const dataUrl = canvas.toDataURL('image/png');
      iconPngCache[cacheKey] = dataUrl;
      resolve(dataUrl);
    };
    img.onerror = () => {
      resolve('');
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  });
}

/**
 * Pre-cache all allergen icons
 */
export async function preloadAllergenIcons() {
  const keys = Object.keys(ALLERGENS);
  await Promise.all(keys.map((k) => renderAllergenToPng(k)));
}
