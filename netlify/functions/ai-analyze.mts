import type { Config } from '@netlify/functions';
import { Type } from '@google/genai';
import { ai, MODEL, heuristicFallback, normalizeAllergens } from '../lib/buffet-ai.ts';

const systemInstruction = `You are an elite executive chef and luxury hotel culinary translator specializing in Middle Eastern 5-star buffet displays.
Your task:
1. Translate the dish or buffet station title into elegant, high-end hospitality Arabic suitable for luxury printed buffet food tags (cards).
   - If the dish is a buffet station (e.g. "Wellness Station", "Bakery Corner", "Cold Cuts Variation"), translate as a station section (e.g. "القسم الصّحي", "قسم المخبوزات", "قسم اللحوم الباردة").
   - If it is a culinary dish, translate with authentic hotel culinary terminology (e.g. "Smoked Salmon" -> "سالمون مدخّن", "Overnight Oats" -> "الشوفان المنقوع", "Tzatziki Crudites" -> "خيار و تزازيكي").
2. Determine which of the 14 standard international food allergens are present in this food item:
   Gluten, Milk, Eggs, Fish, Crustacean, Shellfish, Nuts, Peanuts, Soya, Celery, Mustard, Sesame, Sulphites, Lupins.
   Note: If it's plain vegetables/pickles/fruit with no allergens, return an empty array [].
   Be accurate according to real 5-star hotel kitchen preparation.`;

export default async (req: Request) => {
  const body = await req.json().catch(() => ({}));
  const { dishName, category } = body ?? {};
  if (!dishName || typeof dishName !== 'string') {
    return Response.json({ error: 'dishName is required' }, { status: 400 });
  }

  const trimmed = dishName.trim();

  try {
    const prompt = `Analyze this buffet item:
Dish/Station: "${trimmed}"
${category ? `Category: "${category}"` : ''}

Output the structured JSON with uppercase English title, natural Arabic title, and the list of detected allergens from the 14 standard allergens.`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            englishTitle: { type: Type.STRING, description: 'Refined English title in ALL CAPS or neat casing' },
            arabicTitle: { type: Type.STRING, description: 'Authentic 5-star hotel Arabic translation' },
            allergens: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of detected allergen names from the 14 standards (e.g. Milk, Gluten, Fish, Nuts)',
            },
            explanation: { type: Type.STRING, description: 'Brief 1-sentence culinary allergen rationale' },
          },
          required: ['englishTitle', 'arabicTitle', 'allergens'],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from AI model');
    const parsed = JSON.parse(text);

    return Response.json({
      englishTitle: (parsed.englishTitle || trimmed).toUpperCase(),
      arabicTitle: parsed.arabicTitle || trimmed,
      allergens: normalizeAllergens(parsed.allergens),
      explanation: parsed.explanation || '',
    });
  } catch (error) {
    console.error('Error analyzing dish:', error);
    // Fallback gracefully so the UI continues working smoothly
    const fallback = heuristicFallback(trimmed);
    return Response.json({
      englishTitle: trimmed.toUpperCase(),
      arabicTitle: fallback.arabicTitle,
      allergens: fallback.allergens,
      explanation: 'Fallback culinary dictionary analysis used.',
    });
  }
};

export const config: Config = {
  path: '/api/ai/analyze',
  method: 'POST',
};
