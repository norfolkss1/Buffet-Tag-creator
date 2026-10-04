# AGENTS.md

## Overview
BuffetTag Studio is a client-side React SPA (originally exported from Google AI Studio) that generates bilingual buffet food tags and exports them to PowerPoint. The only server-side code is two Netlify Functions that call Gemini.

## Layout
- `src/` — React app. `App.tsx` holds card state; `components/` holds panels and modals; `utils/pptxExport.ts` builds the .pptx; `data/allergens.ts` defines the 14 allergens (icons, labels) and `normalizeAllergenKey`; `data/sampleDishes.ts` seeds the initial cards.
- `netlify/functions/ai-analyze.mts` — `POST /api/ai/analyze` (single dish).
- `netlify/functions/ai-batch-analyze.mts` — `POST /api/ai/batch-analyze` (list of dishes).
- `netlify/lib/buffet-ai.ts` — shared Gemini client, culinary dictionary, heuristic fallback, allergen normalisation.
- `public/` — card background images.

## Conventions / decisions
- The original Express `server.ts` was replaced by Netlify Functions; endpoint paths and response shapes are unchanged, so the frontend was not modified.
- Gemini is accessed through Netlify AI Gateway with `new GoogleGenAI({})` (env vars injected at runtime). Only use models listed in the AI Gateway skill; currently `gemini-3.8-flash`.
- AI failures never surface as errors — functions fall back to the dictionary/keyword heuristic so the UI keeps working.
- No persistence: cards live in browser state only.
