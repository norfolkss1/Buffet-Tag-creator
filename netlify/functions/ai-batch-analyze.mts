import type { Config } from '@netlify/functions';
import { Type } from '@google/genai';
import { ai, MODEL, heuristicFallback, newDishId, normalizeAllergens } from '../lib/buffet-ai.ts';

function fallbackResults(items: string[]) {
  return items.map((dish) => {
    const fb = heuristicFallback(dish);
    return {
      id: newDishId(),
      englishTitle: dish.toUpperCase(),
      arabicTitle: fb.arabicTitle,
      allergens: fb.allergens,
    };
  });
}

export default async (req: Request) => {
  const body = await req.json().catch(() => ({}));
  const items = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ error: 'items array is required' }, { status: 400 });
  }

  const cleanItems: string[] = items.map((i: unknown) => String(i).trim()).filter(Boolean);

  try {
    const prompt = `You are a culinary translator and hotel food allergen specialist.
Analyze this list of buffet items:
${JSON.stringify(cleanItems)}

For each item, output:
- englishTitle (UPPERCASE)
- arabicTitle (Proper luxury Arabic hospitality translation)
- allergens (array of standard allergen names: Gluten, Milk, Eggs, Fish, Crustacean, Shellfish, Nuts, Peanuts, Soya, Celery, Mustard, Sesame, Sulphites, Lupins). If none, empty array [].`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              englishTitle: { type: Type.STRING },
              arabicTitle: { type: Type.STRING },
              allergens: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['englishTitle', 'arabicTitle', 'allergens'],
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    const results = (parsed || []).map((p: any, idx: number) => {
      const orig = cleanItems[idx] || '';
      return {
        id: newDishId(),
        englishTitle: (p.englishTitle || orig).toUpperCase(),
        arabicTitle: p.arabicTitle || orig,
        allergens: normalizeAllergens(p.allergens),
      };
    });

    return Response.json({ results });
  } catch (err) {
    console.error('Batch error:', err);
    return Response.json({ results: fallbackResults(cleanItems) });
  }
};

export const config: Config = {
  path: '/api/ai/batch-analyze',
  method: 'POST',
};
