export interface BuffetTagItem {
  id: string;
  englishTitle: string;
  arabicTitle: string;
  allergens: string[]; // e.g. ['milk', 'gluten']
  category?: string;
  isStationHeader?: boolean;
  customBackground?: string; // Optional per-item custom background
  englishFont?: string;
  arabicFont?: string;
}

export const SAMPLE_BUFFET_TAGS: BuffetTagItem[] = [
  {
    id: 'sample-1',
    englishTitle: 'WELLNESS STATION',
    arabicTitle: 'القسم الصّحي',
    allergens: ['gluten', 'milk'],
    category: 'Station Header',
    isStationHeader: true,
  },
  {
    id: 'sample-2',
    englishTitle: 'PICKLE',
    arabicTitle: 'المخلل',
    allergens: [],
    category: 'Condiments',
  },
  {
    id: 'sample-3',
    englishTitle: 'BLUEBERRY OVERNIGHT OATS',
    arabicTitle: 'الشوفان المنقوع بالتوت',
    allergens: ['milk'],
    category: 'Overnight Oats',
  },
  {
    id: 'sample-4',
    englishTitle: 'MANGO SAGO',
    arabicTitle: 'مانجو',
    allergens: ['milk'],
    category: 'Pudding',
  },
  {
    id: 'sample-5',
    englishTitle: 'COLD CUTS VARIATION',
    arabicTitle: 'قسم اللحوم الباردة',
    allergens: [],
    category: 'Station Header',
    isStationHeader: true,
  },
  {
    id: 'sample-6',
    englishTitle: 'SMOKED SALMON',
    arabicTitle: 'سالمون مدخّن',
    allergens: ['fish'],
    category: 'Seafood',
  },
  {
    id: 'sample-7',
    englishTitle: 'SMOKED MACKEREL',
    arabicTitle: 'سمك الماكريل المدخّن',
    allergens: ['fish'],
    category: 'Seafood',
  },
  {
    id: 'sample-8',
    englishTitle: 'VERY BERRY CHIA PUDDING',
    arabicTitle: 'بودنغ توت و شيا',
    allergens: ['milk'],
    category: 'Pudding',
  },
  {
    id: 'sample-9',
    englishTitle: 'CHOCOLATE OVERNIGHT OATS',
    arabicTitle: 'حبوب الشوفان بالشوكولاتة',
    allergens: ['milk'],
    category: 'Overnight Oats',
  },
  {
    id: 'sample-10',
    englishTitle: 'PLAIN YOGURT',
    arabicTitle: 'لبن رائب – روب - زبادي',
    allergens: ['milk'],
    category: 'Dairy',
  },
  {
    id: 'sample-11',
    englishTitle: 'BAKERY CORNER',
    arabicTitle: 'قسم المخبوزات',
    allergens: ['eggs', 'gluten', 'nuts', 'milk'],
    category: 'Station Header',
    isStationHeader: true,
  },
  {
    id: 'sample-12',
    englishTitle: 'BUTTER',
    arabicTitle: 'زبدة',
    allergens: ['milk'],
    category: 'Dairy',
  },
  {
    id: 'sample-13',
    englishTitle: 'ASSORTED CHEESE',
    arabicTitle: 'أجبان متنوعة',
    allergens: ['milk'],
    category: 'Dairy',
  },
  {
    id: 'sample-14',
    englishTitle: 'CRACKERS',
    arabicTitle: 'مقرمشات',
    allergens: ['gluten'],
    category: 'Bakery',
  },
  {
    id: 'sample-15',
    englishTitle: 'GRANOLA',
    arabicTitle: 'جرانولا',
    allergens: ['gluten', 'nuts'],
    category: 'Cereal',
  },
  {
    id: 'sample-16',
    englishTitle: 'TZATZIKI CRUDITES',
    arabicTitle: 'خيار و تزازيكي',
    allergens: ['celery', 'milk'],
    category: 'Cold Mezze',
  },
  {
    id: 'sample-17',
    englishTitle: 'SALTED PEANUT OVERNIGHT OATS',
    arabicTitle: 'شوفان بزبده فول السوداني',
    allergens: ['nuts', 'milk'],
    category: 'Overnight Oats',
  },
  {
    id: 'sample-18',
    englishTitle: 'POTATO HARRA',
    arabicTitle: 'بطاطس حارة',
    allergens: [],
    category: 'Hot Mezze',
  },
  {
    id: 'sample-19',
    englishTitle: 'EGGPLANT SALAD',
    arabicTitle: 'سلطة باذنجان',
    allergens: [],
    category: 'Salad',
  },
  {
    id: 'sample-20',
    englishTitle: 'TABOULEH',
    arabicTitle: 'تبولة',
    allergens: ['gluten'],
    category: 'Salad',
  },
];
