/**
 * Allergen definitions, labels, and vector icon definitions
 * Matching the exact 14 standard allergens from the sample buffet tags PDF
 */

export interface AllergenDef {
  id: string;
  name: string;
  label: string; // e.g., "Contain\nMilk" or "Milk"
  badgeText: string; // "Contain Milk"
  arabicLabel: string;
  color: string;
  description: string;
  svgPath: string; // SVG path data or inner elements
  viewBox: string;
}

export const ALLERGENS: Record<string, AllergenDef> = {
  milk: {
    id: 'milk',
    name: 'Milk',
    label: 'Milk',
    badgeText: 'Contain\nMilk',
    arabicLabel: 'يحتوي على الحليب',
    color: '#d946ef',
    description: 'Dairy, cheese, yogurt, cream, butter, milk solids',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Milk Carton Gable Top -->
      <path d="M 50 12 L 68 25 L 32 25 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
      <path d="M 50 12 L 32 25 L 18 36 L 50 36 L 68 25" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
      <path d="M 68 25 L 82 36 L 50 36" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Screw cap / fold detail -->
      <ellipse cx="34" cy="20" rx="4.5" ry="3" fill="none" stroke="currentColor" stroke-width="3" />
      <!-- Body of carton -->
      <path d="M 18 36 L 18 108 L 50 114 L 50 36 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
      <path d="M 50 36 L 50 114 L 82 108 L 82 36 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
      <!-- Horizontal facets -->
      <path d="M 18 64 L 50 68 L 82 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M 18 88 L 50 92 L 82 88" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- MILK Text Box on carton front -->
      <rect x="22" y="70" width="24" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2.2" />
      <text x="34" y="81" font-size="8.5" font-weight="900" font-family="Arial, sans-serif" fill="currentColor" text-anchor="middle" letter-spacing="1">MILK</text>
    `,
  },
  gluten: {
    id: 'gluten',
    name: 'Gluten',
    label: 'Gluten',
    badgeText: 'Contain\nGluten',
    arabicLabel: 'يحتوي على الغلوتين',
    color: '#d946ef',
    description: 'Wheat, oats, barley, rye, flour, cereals, pastries',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Main stem angled 45deg -->
      <line x1="20" y1="102" x2="82" y2="28" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Grain kernels arranged in pairs along stem -->
      <!-- Kernel 1 -->
      <path d="M 72 38 C 76 30 84 32 86 38 C 88 44 80 48 74 44 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kernel 2 -->
      <path d="M 64 28 C 60 22 68 16 74 18 C 80 20 78 28 70 32 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kernel 3 -->
      <path d="M 62 50 C 66 42 74 44 76 50 C 78 56 70 60 64 56 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kernel 4 -->
      <path d="M 52 40 C 48 34 56 28 62 30 C 68 32 66 40 58 44 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kernel 5 -->
      <path d="M 52 62 C 56 54 64 56 66 62 C 68 68 60 72 54 68 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kernel 6 -->
      <path d="M 42 52 C 38 46 46 40 52 42 C 58 44 56 52 48 56 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kernel 7 -->
      <path d="M 42 74 C 46 66 54 68 56 74 C 58 80 50 84 44 80 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kernel 8 -->
      <path d="M 32 64 C 28 58 36 52 42 54 C 48 56 46 64 38 68 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Awn hairs / whiskers -->
      <line x1="84" y1="34" x2="94" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <line x1="72" y1="20" x2="78" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
    `,
  },
  nuts: {
    id: 'nuts',
    name: 'Nuts',
    label: 'Nuts',
    badgeText: 'Contain\nNuts',
    arabicLabel: 'يحتوي على المكسرات',
    color: '#d946ef',
    description: 'Tree nuts: almonds, hazelnuts, walnuts, cashews, pecans, pistachios',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Right upright acorn -->
      <!-- Cap with hatch -->
      <path d="M 52 48 C 52 38 66 32 76 34 C 86 36 88 44 88 50 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <path d="M 70 32 L 70 24" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <line x1="56" y1="44" x2="82" y2="44" stroke="currentColor" stroke-width="2.5" />
      <line x1="68" y1="36" x2="68" y2="48" stroke="currentColor" stroke-width="2.5" />
      <!-- Body of right nut -->
      <path d="M 54 50 C 52 66 64 86 72 88 C 80 86 88 66 86 50 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      
      <!-- Left tilted hazelnut/acorn -->
      <g transform="rotate(-20 36 68)">
        <!-- Cap with cross-hatch -->
        <path d="M 18 52 C 18 42 32 38 42 40 C 52 42 54 48 54 54 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M 36 38 L 36 30" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
        <line x1="22" y1="48" x2="48" y2="48" stroke="currentColor" stroke-width="2.5" />
        <!-- Body -->
        <path d="M 20 54 C 18 72 32 94 40 96 C 48 94 54 72 52 54 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M 38 56 C 36 70 38 84 40 92" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      </g>
    `,
  },
  eggs: {
    id: 'eggs',
    name: 'Eggs',
    label: 'Eggs',
    badgeText: 'Contain\nEggs',
    arabicLabel: 'يحتوي على البيض',
    color: '#d946ef',
    description: 'Whole eggs, egg yolk, egg white, mayonnaise, baked goods',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Fried egg outer wavy albumen white -->
      <path d="M 48 20 C 65 18 80 28 85 45 C 90 60 84 76 76 86 C 68 96 52 98 40 96 C 26 94 14 84 15 68 C 16 52 26 44 28 34 C 30 24 38 21 48 20 Z" 
        fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Sunny center yolk -->
      <circle cx="50" cy="58" r="18" fill="none" stroke="currentColor" stroke-width="3.5" />
      <!-- Yolk shine/reflection curve -->
      <path d="M 42 50 C 46 46 54 46 58 50" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    `,
  },
  fish: {
    id: 'fish',
    name: 'Fish',
    label: 'Fish',
    badgeText: 'Contain\nFish',
    arabicLabel: 'يحتوي على الأسماك',
    color: '#d946ef',
    description: 'Salmon, tuna, cod, mackerel, anchovy, fish sauce, surimi',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Fish Body and Tail -->
      <path d="M 85 42 L 72 58 L 85 74 C 76 72 68 64 64 62 C 54 74 38 76 25 72 C 15 66 12 56 18 48 C 26 38 46 36 64 54 C 68 52 76 44 85 42 Z" 
        fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />
      <!-- Dorsal fin -->
      <path d="M 46 38 C 48 28 56 30 58 38" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Eye -->
      <circle cx="28" cy="54" r="3.5" fill="currentColor" />
      <!-- Gill arc -->
      <path d="M 38 46 C 42 54 42 62 38 68" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- Internal scale pattern / ribs -->
      <line x1="50" y1="48" x2="46" y2="66" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
      <line x1="58" y1="52" x2="55" y2="64" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
      <line x1="68" y1="54" x2="68" y2="62" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
    `,
  },
  celery: {
    id: 'celery',
    name: 'Celery',
    label: 'Celery',
    badgeText: 'Contain\nCelery',
    arabicLabel: 'يحتوي على الكرفس',
    color: '#d946ef',
    description: 'Celery stalks, leaves, seeds, celeriac, celery salt',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Angled Celery Stalk Base -->
      <path d="M 22 100 C 20 96 36 68 46 54 L 54 58 C 42 74 30 102 26 102 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <line x1="28" y1="92" x2="48" y2="60" stroke="currentColor" stroke-width="2.5" />
      <line x1="32" y1="96" x2="52" y2="64" stroke="currentColor" stroke-width="2.5" />
      <!-- Upper Branching Leaf Tufts -->
      <path d="M 46 54 C 42 44 46 36 54 36 C 58 32 66 32 70 36 C 76 34 84 38 84 46 C 84 52 78 56 72 58 C 66 64 56 62 50 56 Z" 
        fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Leaf veins -->
      <path d="M 52 56 L 68 42" stroke="currentColor" stroke-width="2.5" />
      <path d="M 60 50 L 64 56" stroke="currentColor" stroke-width="2" />
      <path d="M 64 45 L 74 44" stroke="currentColor" stroke-width="2" />
      <!-- Secondary leaf shoot -->
      <path d="M 38 66 C 34 58 38 48 46 46 C 50 48 52 54 48 60 Z" fill="none" stroke="currentColor" stroke-width="3" />
    `,
  },
  peanuts: {
    id: 'peanuts',
    name: 'Peanuts',
    label: 'Peanuts',
    badgeText: 'Contain\nPeanuts',
    arabicLabel: 'يحتوي على الفول السوداني',
    color: '#d946ef',
    description: 'Groundnuts, peanut butter, peanut oil, satay sauce',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Double-lobed peanut shell -->
      <path d="M 28 30 C 42 20 62 26 70 40 C 74 48 70 54 65 60 C 74 68 76 80 70 92 C 60 106 38 106 28 92 C 22 82 24 70 32 62 C 26 54 22 42 28 30 Z" 
        fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />
      <!-- Crosshatch shell texture -->
      <path d="M 36 34 C 40 44 56 46 62 40" fill="none" stroke="currentColor" stroke-width="2.5" />
      <path d="M 34 46 C 42 50 54 52 62 48" fill="none" stroke="currentColor" stroke-width="2.5" />
      <path d="M 36 74 C 44 70 58 72 64 78" fill="none" stroke="currentColor" stroke-width="2.5" />
      <path d="M 34 86 C 44 82 56 84 62 90" fill="none" stroke="currentColor" stroke-width="2.5" />
      <line x1="48" y1="28" x2="48" y2="98" stroke="currentColor" stroke-width="2.5" stroke-dasharray="3 3" />
    `,
  },
  crustacean: {
    id: 'crustacean',
    name: 'Crustacean',
    label: 'Crustacean',
    badgeText: 'Contain\nCrustacean',
    arabicLabel: 'يحتوي على القشريات',
    color: '#d946ef',
    description: 'Crab, lobster, prawns, shrimp, langoustine, scampi',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Crab Shell Carapace -->
      <path d="M 30 52 C 34 44 66 44 70 52 C 76 62 72 74 66 78 C 58 82 42 82 34 78 C 28 74 24 62 30 52 Z" 
        fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Eyes -->
      <circle cx="42" cy="45" r="3" fill="currentColor" />
      <circle cx="58" cy="45" r="3" fill="currentColor" />
      <line x1="42" y1="48" x2="42" y2="52" stroke="currentColor" stroke-width="2.5" />
      <line x1="58" y1="48" x2="58" y2="52" stroke="currentColor" stroke-width="2.5" />
      <!-- Left Claw -->
      <path d="M 30 56 C 22 52 14 42 16 34 C 18 28 26 28 30 36 C 34 32 38 34 36 40 L 32 54" 
        fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Right Claw -->
      <path d="M 70 56 C 78 52 86 42 84 34 C 82 28 74 28 70 36 C 66 32 62 34 64 40 L 68 54" 
        fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Walking legs Left -->
      <path d="M 28 66 C 18 70 14 78 12 84" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
      <path d="M 32 74 C 22 80 18 88 18 94" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
      <!-- Walking legs Right -->
      <path d="M 72 66 C 82 70 86 78 88 84" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
      <path d="M 68 74 C 78 80 82 88 82 94" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" />
    `,
  },
  shellfish: {
    id: 'shellfish',
    name: 'Shellfish',
    label: 'Shellfish',
    badgeText: 'Contain\nShellfish',
    arabicLabel: 'يحتوي على الرخويات',
    color: '#d946ef',
    description: 'Clams, mussels, oysters, squid, octopus, scallops, snails',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Scallop shell outline -->
      <path d="M 40 92 C 34 92 34 86 36 84 C 24 74 16 60 18 44 C 20 30 32 20 50 20 C 68 20 80 30 82 44 C 84 60 76 74 64 84 C 66 86 66 92 60 92 Z" 
        fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
      <!-- Shell radiating ribs -->
      <line x1="50" y1="88" x2="50" y2="22" stroke="currentColor" stroke-width="3" />
      <line x1="48" y1="88" x2="32" y2="28" stroke="currentColor" stroke-width="2.8" />
      <line x1="52" y1="88" x2="68" y2="28" stroke="currentColor" stroke-width="2.8" />
      <line x1="46" y1="88" x2="22" y2="42" stroke="currentColor" stroke-width="2.5" />
      <line x1="54" y1="88" x2="78" y2="42" stroke="currentColor" stroke-width="2.5" />
      <!-- Scalloped rim bumps -->
      <path d="M 22 42 C 26 32 36 24 50 22 C 64 24 74 32 78 42" fill="none" stroke="currentColor" stroke-width="3.5" />
    `,
  },
  soya: {
    id: 'soya',
    name: 'Soya',
    label: 'Soya',
    badgeText: 'Contain\nSoya',
    arabicLabel: 'يحتوي على الصويا',
    color: '#d946ef',
    description: 'Soybeans, tofu, edamame, soy sauce, miso, soy milk',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Tri-pod cluster of soybeans -->
      <circle cx="34" cy="68" r="16" fill="none" stroke="currentColor" stroke-width="4" />
      <circle cx="66" cy="68" r="16" fill="none" stroke="currentColor" stroke-width="4" />
      <circle cx="50" cy="40" r="16" fill="none" stroke="currentColor" stroke-width="4" />
      <!-- Seed hilum / eye spots -->
      <path d="M 32 64 C 36 64 36 72 32 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M 64 64 C 68 64 68 72 64 72" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M 48 36 C 52 36 52 44 48 44" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- Little sprout leaves at top -->
      <path d="M 50 24 C 44 14 54 8 58 14 C 54 18 52 22 50 24 Z" fill="none" stroke="currentColor" stroke-width="2.5" />
    `,
  },
  mustard: {
    id: 'mustard',
    name: 'Mustard',
    label: 'Mustard',
    badgeText: 'Contain\nMustard',
    arabicLabel: 'يحتوي على الخردل',
    color: '#d946ef',
    description: 'Mustard seed, dijon, wholegrain mustard, dressings',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Squeeze bottle nozzle cap -->
      <path d="M 48 12 L 52 12 L 54 26 L 46 26 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Cap ridges -->
      <rect x="42" y="26" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="3" />
      <!-- Bottle neck and shoulders -->
      <path d="M 44 34 L 32 46 C 26 52 26 62 26 70 L 26 94 C 26 102 34 106 50 106 C 66 106 74 102 74 94 L 74 70 C 74 62 74 52 68 46 L 56 34 Z" 
        fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Label on bottle -->
      <rect x="32" y="58" width="36" height="22" rx="3" fill="none" stroke="currentColor" stroke-width="2.5" />
      <text x="50" y="72" font-size="6.5" font-weight="900" font-family="Arial, sans-serif" fill="currentColor" text-anchor="middle" letter-spacing="0.5">MUSTARD</text>
    `,
  },
  sesame: {
    id: 'sesame',
    name: 'Sesame',
    label: 'Sesame',
    badgeText: 'Contain\nSesame',
    arabicLabel: 'يحتوي على السمسم',
    color: '#d946ef',
    description: 'Sesame seeds, tahini, hummus, sesame oil, halva',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Cluster of tear-drop shaped sesame seeds -->
      <!-- Seed 1 (top) -->
      <path d="M 50 16 C 54 22 56 28 50 32 C 44 28 46 22 50 16 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 2 (top left) -->
      <path d="M 36 28 C 42 32 42 40 36 44 C 30 40 30 32 36 28 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 3 (top right) -->
      <path d="M 64 28 C 70 32 70 40 64 44 C 58 40 58 32 64 28 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 4 (mid left) -->
      <path d="M 26 48 C 32 52 32 60 26 64 C 20 60 20 52 26 48 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 5 (center) -->
      <path d="M 50 44 C 56 48 56 56 50 60 C 44 56 44 48 50 44 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 6 (mid right) -->
      <path d="M 74 48 C 80 52 80 60 74 64 C 68 60 68 52 74 48 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 7 (bottom left) -->
      <path d="M 34 68 C 40 72 40 80 34 84 C 28 80 28 72 34 68 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 8 (bottom right) -->
      <path d="M 66 68 C 72 72 72 80 66 84 C 60 80 60 72 66 68 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
      <!-- Seed 9 (bottom) -->
      <path d="M 50 74 C 56 78 56 86 50 90 C 44 86 44 78 50 74 Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
    `,
  },
  sulphites: {
    id: 'sulphites',
    name: 'Sulphite',
    label: 'Sulphite',
    badgeText: 'Contain\nSulphite',
    arabicLabel: 'يحتوي على الكبريتات',
    color: '#d946ef',
    description: 'Wine, balsamic vinegar, dried fruits, preservatives',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Laboratory Erlenmeyer Conical Flask -->
      <!-- Lip / rim -->
      <rect x="42" y="18" width="16" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="3.5" />
      <!-- Neck -->
      <line x1="45" y1="24" x2="45" y2="44" stroke="currentColor" stroke-width="3.5" />
      <line x1="55" y1="24" x2="55" y2="44" stroke="currentColor" stroke-width="3.5" />
      <!-- Body expanding downwards -->
      <path d="M 45 44 L 20 88 C 16 94 20 102 28 102 L 72 102 C 80 102 84 94 80 88 L 55 44" 
        fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
      <!-- Liquid level meniscus -->
      <path d="M 30 76 Q 50 82 70 76" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- Measurement marks on side -->
      <line x1="38" y1="64" x2="44" y2="64" stroke="currentColor" stroke-width="2.5" />
      <line x1="32" y1="74" x2="40" y2="74" stroke="currentColor" stroke-width="2.5" />
      <line x1="26" y1="84" x2="34" y2="84" stroke="currentColor" stroke-width="2.5" />
    `,
  },
  lupins: {
    id: 'lupins',
    name: 'Lupins',
    label: 'Lupins',
    badgeText: 'Contain\nLupins',
    arabicLabel: 'يحتوي على الترمس',
    color: '#d946ef',
    description: 'Lupin flour, lupin seeds, pastry additives, specialty bread',
    viewBox: '0 0 100 120',
    svgPath: `
      <!-- Lupin flower blossom stalk -->
      <!-- Central stem -->
      <line x1="50" y1="102" x2="50" y2="20" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Stacked flower buds & pods -->
      <!-- Level 1 (top) -->
      <circle cx="50" cy="24" r="5" fill="none" stroke="currentColor" stroke-width="3" />
      <!-- Level 2 -->
      <path d="M 42 36 C 42 30 58 30 58 36 C 58 42 42 42 42 36 Z" fill="none" stroke="currentColor" stroke-width="3" />
      <!-- Level 3 -->
      <path d="M 36 48 C 36 42 64 42 64 48 C 64 54 36 54 36 48 Z" fill="none" stroke="currentColor" stroke-width="3" />
      <!-- Level 4 -->
      <path d="M 32 62 C 32 54 68 54 68 62 C 68 70 32 70 32 62 Z" fill="none" stroke="currentColor" stroke-width="3" />
      <!-- Level 5 -->
      <path d="M 30 76 C 30 68 70 68 70 76 C 70 84 30 84 30 76 Z" fill="none" stroke="currentColor" stroke-width="3" />
      <!-- Leaves at bottom -->
      <path d="M 50 90 C 38 88 32 94 30 102" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M 50 90 C 62 88 68 94 70 102" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    `,
  },
};

/** Normalize allergen name to standard key */
export function normalizeAllergenKey(name: string): string | null {
  const clean = name.trim().toLowerCase();
  if (clean.includes('milk') || clean.includes('dairy') || clean.includes('lactose')) return 'milk';
  if (clean.includes('gluten') || clean.includes('wheat') || clean.includes('oat') || clean.includes('barley') || clean.includes('flour')) return 'gluten';
  if (clean.includes('peanut')) return 'peanuts';
  if (clean.includes('nut') || clean.includes('almond') || clean.includes('walnut') || clean.includes('hazelnut') || clean.includes('cashew') || clean.includes('pistachio')) return 'nuts';
  if (clean.includes('egg')) return 'eggs';
  if (clean.includes('fish')) return 'fish';
  if (clean.includes('celery') || clean.includes('celeriac')) return 'celery';
  if (clean.includes('crustacean') || clean.includes('crab') || clean.includes('lobster') || clean.includes('prawn') || clean.includes('shrimp')) return 'crustacean';
  if (clean.includes('shellfish') || clean.includes('mollusc') || clean.includes('clam') || clean.includes('mussel') || clean.includes('oyster') || clean.includes('squid')) return 'shellfish';
  if (clean.includes('soya') || clean.includes('soy') || clean.includes('tofu')) return 'soya';
  if (clean.includes('mustard')) return 'mustard';
  if (clean.includes('sesame') || clean.includes('tahini')) return 'sesame';
  if (clean.includes('sulphite') || clean.includes('sulfite') || clean.includes('sulfur') || clean.includes('balsamic')) return 'sulphites';
  if (clean.includes('lupin')) return 'lupins';
  return null;
}
