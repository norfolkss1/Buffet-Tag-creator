export type EnglishFontFamily =
  | 'Bodoni Moda'
  | 'Playfair Display'
  | 'Cinzel'
  | 'Cormorant Garamond'
  | 'Montserrat'
  | 'Plus Jakarta Sans';

export type ArabicFontFamily =
  | 'Amiri'
  | 'Cairo'
  | 'Tajawal'
  | 'Noto Sans Arabic'
  | 'Scheherazade New';

export interface FontOption<T extends string> {
  id: T;
  name: string;
  category: string;
  previewSample: string;
  cssFamily: string;
  pptxFamily: string;
}

export const ENGLISH_FONTS: FontOption<EnglishFontFamily>[] = [
  {
    id: 'Bodoni Moda',
    name: 'Bodoni Moda',
    category: 'Luxury High-Contrast Serif (Original)',
    previewSample: 'SMOKED SALMON',
    cssFamily: "'Bodoni Moda', Georgia, serif",
    pptxFamily: 'Georgia',
  },
  {
    id: 'Playfair Display',
    name: 'Playfair Display',
    category: 'Classic Editorial Serif',
    previewSample: 'BLUEBERRY OATS',
    cssFamily: "'Playfair Display', Georgia, serif",
    pptxFamily: 'Georgia',
  },
  {
    id: 'Cinzel',
    name: 'Cinzel',
    category: 'Regal Roman Inscriptional',
    previewSample: 'WELLNESS STATION',
    cssFamily: "'Cinzel', Georgia, serif",
    pptxFamily: 'Palatino Linotype',
  },
  {
    id: 'Cormorant Garamond',
    name: 'Cormorant Garamond',
    category: 'Graceful Traditional Serif',
    previewSample: 'BAKERY CORNER',
    cssFamily: "'Cormorant Garamond', Garamond, serif",
    pptxFamily: 'Garamond',
  },
  {
    id: 'Montserrat',
    name: 'Montserrat',
    category: 'Clean Geometric Bold',
    previewSample: 'MANGO SAGO PUDDING',
    cssFamily: "'Montserrat', sans-serif",
    pptxFamily: 'Arial',
  },
  {
    id: 'Plus Jakarta Sans',
    name: 'Plus Jakarta Sans',
    category: 'Modern Contemporary Sans',
    previewSample: 'ASSORTED CHEESE',
    cssFamily: "'Plus Jakarta Sans', sans-serif",
    pptxFamily: 'Calibri',
  },
];

export const ARABIC_FONTS: FontOption<ArabicFontFamily>[] = [
  {
    id: 'Amiri',
    name: 'Amiri',
    category: 'Classic Naskh Arabic (Original)',
    previewSample: 'سالمون مدخّن',
    cssFamily: "'Amiri', serif",
    pptxFamily: 'Arial',
  },
  {
    id: 'Cairo',
    name: 'Cairo',
    category: 'Modern Hospitality Arabic',
    previewSample: 'الشوفان المنقوع',
    cssFamily: "'Cairo', sans-serif",
    pptxFamily: 'Arial',
  },
  {
    id: 'Tajawal',
    name: 'Tajawal',
    category: 'Sleek Elegant Arabic',
    previewSample: 'قسم المخبوزات',
    cssFamily: "'Tajawal', sans-serif",
    pptxFamily: 'Arial',
  },
  {
    id: 'Scheherazade New',
    name: 'Scheherazade New',
    category: 'Traditional Fine Calligraphy',
    previewSample: 'القسم الصّحي',
    cssFamily: "'Scheherazade New', serif",
    pptxFamily: 'Traditional Arabic',
  },
  {
    id: 'Noto Sans Arabic',
    name: 'Noto Sans Arabic',
    category: 'Crisp Minimalist Sans',
    previewSample: 'أجبان متنوعة',
    cssFamily: "'Noto Sans Arabic', sans-serif",
    pptxFamily: 'Arial',
  },
];

export interface BackgroundPreset {
  id: string;
  name: string;
  description: string;
  url: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'golden-wheat',
    name: 'Golden Wheat (Original)',
    description: 'Warm silky wheat texture from the sample slides',
    url: '/buffet_background.jpg',
  },
  {
    id: 'white-linen',
    name: 'White Linen Paper',
    description: 'Crisp, clean textured linen for daytime & wedding banquets',
    url: '/white_linen.jpg',
  },
  {
    id: 'dark-slate',
    name: 'Charcoal Slate',
    description: 'Moody luxury dark stone texture for evening dining displays',
    url: '/dark_slate.jpg',
  },
];

export interface DesignConfig {
  englishFont: EnglishFontFamily;
  arabicFont: ArabicFontFamily;
  backgroundUrl: string; // URL or data:image/... base64
  backgroundName: string;
  iconTheme: 'magenta' | 'amber' | 'cyan' | 'gold';
  englishScale: number; // 0.8 to 1.3, default 1.0
  arabicScale: number; // 0.8 to 1.3, default 1.0
}

export const DEFAULT_DESIGN_CONFIG: DesignConfig = {
  englishFont: 'Bodoni Moda',
  arabicFont: 'Amiri',
  backgroundUrl: '/buffet_background.jpg',
  backgroundName: 'Golden Wheat (Original)',
  iconTheme: 'magenta',
  englishScale: 1.0,
  arabicScale: 1.0,
};
