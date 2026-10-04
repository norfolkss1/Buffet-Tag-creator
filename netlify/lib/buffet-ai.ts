import { GoogleGenAI } from '@google/genai';
import { normalizeAllergenKey } from '../../src/data/allergens.ts';

// Gemini client routed through Netlify AI Gateway (credentials injected at runtime)
export const ai = new GoogleGenAI({});

export const MODEL = 'gemini-3.8-flash';

// Built-in culinary dictionary for instant response and reliable fallback
const CULINARY_DICTIONARY: Record<string, { ar: string; allergens: string[] }> = {
  'wellness station': { ar: 'القسم الصّحي', allergens: ['gluten', 'milk'] },
  'pickle': { ar: 'المخلل', allergens: [] },
  'blueberry overnight oats': { ar: 'الشوفان المنقوع بالتوت', allergens: ['milk'] },
  'mango sago': { ar: 'مانجو', allergens: ['milk'] },
  'cold cuts variation': { ar: 'قسم اللحوم الباردة', allergens: [] },
  'smoked salmon': { ar: 'سالمون مدخّن', allergens: ['fish'] },
  'smoked mackerel': { ar: 'سمك الماكريل المدخّن', allergens: ['fish'] },
  'very berry chia pudding': { ar: 'بودنغ توت و شيا', allergens: ['milk'] },
  'chocolate overnight oats': { ar: 'حبوب الشوفان بالشوكولاتة', allergens: ['milk'] },
  'plain yogurt': { ar: 'لبن رائب – روب - زبادي', allergens: ['milk'] },
  'mango and yuzu flavored yogurt': { ar: 'زبادي المانجو', allergens: ['milk'] },
  'bakery corner': { ar: 'قسم المخبوزات', allergens: ['eggs', 'gluten', 'nuts', 'milk'] },
  'butter': { ar: 'زبدة', allergens: ['milk'] },
  'assorted cheese': { ar: 'أجبان متنوعة', allergens: ['milk'] },
  'crackers': { ar: 'مقرمشات', allergens: ['gluten'] },
  'whole milk': { ar: 'قسم الحليب الطازج', allergens: ['milk'] },
  'granola': { ar: 'جرانولا', allergens: ['gluten', 'nuts'] },
  'tzatziki crudites': { ar: 'خيار و تزازيكي', allergens: ['celery', 'milk'] },
  'forest berries overnight oat': { ar: 'شوفان بالتوت البري', allergens: ['milk'] },
  'onion in balsamic': { ar: 'بصل بنكهة البلسميك', allergens: [] },
  'chia pudding with blueberry and peanut': { ar: 'بلو بيري ب زبدة فول السوداني مع بذور الشيا', allergens: ['nuts', 'milk'] },
  'blueberry yogurt': { ar: 'زبادي توت', allergens: ['milk'] },
  'mix fruit yogurt': { ar: 'زبادي فواكه متنوعة', allergens: ['milk'] },
  'apple cinnamon yogurt': { ar: 'زبادي تفاح بالقرفة', allergens: ['milk'] },
  'plain greek yogurt': { ar: 'زبادي يوناني', allergens: ['milk'] },
  'strawberry yogurt': { ar: 'زبادي فراولة', allergens: ['milk'] },
  'acai yogurt': { ar: 'زبادي بالاساي', allergens: ['milk'] },
  'raspberry yogurt': { ar: 'زبادي بالتوت الاحمر', allergens: ['milk'] },
  'passion fruit yogurt': { ar: 'زبادي باشون فروت', allergens: ['milk'] },
  'salted peanut overnight oats': { ar: 'شوفان بزبده فول السوداني', allergens: ['nuts', 'milk'] },
  'coffee overnight oats': { ar: 'الشوفان المنقوع بالقهوة', allergens: ['milk'] },
  'mix berry overnight oats': { ar: 'الشوفان المنقوع بخليط التوت', allergens: ['milk'] },
  'chai overnight oats': { ar: 'الشوفان المنقوع', allergens: ['milk'] },
  'avocado overnight oats': { ar: 'الشوفان المنقوع مع الكيوي', allergens: ['milk'] },
  'banana overnight oats': { ar: 'الشوفان المنقوع بالموز', allergens: ['milk'] },
  'hazelnut praline overnight oats': { ar: 'الشوفان المنقوع بالبندق', allergens: ['nuts', 'milk'] },
  'strawberry overnight oats': { ar: 'الشوفان المنقوع بالفراولة', allergens: ['milk'] },
  'overnight oats': { ar: 'الشوفان المنقوع', allergens: ['milk'] },
  'blueberry chia pudding': { ar: 'بودنغ توت و شيا', allergens: ['milk'] },
  'mix berry chia pudding': { ar: 'بودنغ توت و شيا', allergens: ['milk'] },
  'mango coconut sago pudding': { ar: 'بودنغ مانجو وجوز هند', allergens: ['milk'] },
  'pineapple chia pudding': { ar: 'بودنغ الاناناس', allergens: ['milk'] },
  'mango passion sago pudding': { ar: 'بودنغ مانجو', allergens: ['milk'] },
  'litchi chia pudding': { ar: 'بودنغ ليتشي', allergens: ['milk'] },
  'kiwi chia pudding': { ar: 'بودنغ كيوي مع بذور الشيا', allergens: ['milk'] },
  'strawberry chia pudding': { ar: 'بودنغ الفراولة مع بذور الشيا', allergens: ['milk'] },
  'passion fruit chia pudding': { ar: 'بودنغ باشون فروت', allergens: ['milk'] },
  'coconut sago pudding': { ar: 'بودنغ جوز الهند', allergens: ['milk'] },
  'strawberry sago pudding': { ar: 'بودنغ الفراولة', allergens: ['milk'] },
  'mango chia pudding': { ar: 'بودنغ مانجو مع بذور الشيا', allergens: ['milk'] },
  'chia pudding': { ar: 'بودنغ بذور الشيا', allergens: ['milk'] },
  'potato harra': { ar: 'بطاطس حارة', allergens: [] },
  'eggplant salad': { ar: 'سلطة باذنجان', allergens: [] },
  'tabouleh': { ar: 'تبولة', allergens: ['gluten'] },
  'hummus': { ar: 'حمص بطحينة', allergens: ['sesame'] },
  'falafel': { ar: 'فلافل', allergens: ['sesame'] },
  'croissant': { ar: 'كرواسون', allergens: ['gluten', 'milk', 'eggs'] },
  'danish pastry': { ar: 'معجنات دانماركية', allergens: ['gluten', 'milk', 'eggs'] },
  'scrambled eggs': { ar: 'بيض مخفوق', allergens: ['eggs', 'milk'] },
  'boiled eggs': { ar: 'بيض مسلوق', allergens: ['eggs'] },
  'pancakes': { ar: 'بان كيك', allergens: ['gluten', 'milk', 'eggs'] },
  'waffles': { ar: 'وافل', allergens: ['gluten', 'milk', 'eggs'] },
  'french toast': { ar: 'فرنش توست', allergens: ['gluten', 'milk', 'eggs'] },
};

export function heuristicFallback(dishName: string) {
  const lower = dishName.toLowerCase().trim();
  const directMatch = CULINARY_DICTIONARY[lower];
  if (directMatch) {
    return {
      arabicTitle: directMatch.ar,
      allergens: directMatch.allergens,
    };
  }

  // Check partial matches
  for (const [key, value] of Object.entries(CULINARY_DICTIONARY)) {
    if (lower.includes(key)) {
      return {
        arabicTitle: value.ar,
        allergens: value.allergens,
      };
    }
  }

  // Basic heuristic keyword allergen checks
  const detectedAllergens: string[] = [];
  if (/milk|cheese|yogurt|butter|cream|dairy|curd|pudding|sago|latte/i.test(dishName)) {
    detectedAllergens.push('milk');
  }
  if (/oat|wheat|bread|cracker|flour|pastry|croissant|granola|cereal|tabouleh|cake|muffin|pasta/i.test(dishName)) {
    detectedAllergens.push('gluten');
  }
  if (/nut|almond|walnut|hazelnut|pistachio|cashew|pecan|praline/i.test(dishName)) {
    detectedAllergens.push('nuts');
  }
  if (/peanut|peanut butter/i.test(dishName)) {
    detectedAllergens.push('peanuts');
  }
  if (/egg|mayo|omelet|scramble|frittata|custard|souffle/i.test(dishName)) {
    detectedAllergens.push('eggs');
  }
  if (/salmon|mackerel|tuna|cod|fish|anchovy|sea bass|trout/i.test(dishName)) {
    detectedAllergens.push('fish');
  }
  if (/shrimp|prawn|crab|lobster|crustacean/i.test(dishName)) {
    detectedAllergens.push('crustacean');
  }
  if (/clam|mussel|oyster|squid|calamari|octopus|scallop/i.test(dishName)) {
    detectedAllergens.push('shellfish');
  }
  if (/celery|crudite/i.test(dishName)) {
    detectedAllergens.push('celery');
  }
  if (/mustard|dijon/i.test(dishName)) {
    detectedAllergens.push('mustard');
  }
  if (/sesame|tahini|hummus/i.test(dishName)) {
    detectedAllergens.push('sesame');
  }
  if (/soy|tofu|edamame/i.test(dishName)) {
    detectedAllergens.push('soya');
  }
  if (/balsamic|wine/i.test(dishName)) {
    detectedAllergens.push('sulphites');
  }

  return {
    arabicTitle: dishName,
    allergens: Array.from(new Set(detectedAllergens)),
  };
}

export function normalizeAllergens(list: unknown): string[] {
  const normalized: string[] = [];
  if (Array.isArray(list)) {
    for (const a of list) {
      const key = normalizeAllergenKey(String(a));
      if (key && !normalized.includes(key)) {
        normalized.push(key);
      }
    }
  }
  return normalized;
}

export function newDishId() {
  return 'dish-' + Math.random().toString(36).substring(2, 9);
}
