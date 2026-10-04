# BuffetTag Studio

BuffetTag Studio creates luxury bilingual (English / Arabic) buffet food tags. Type a dish or station name, or paste a whole menu, and AI translates the title into refined hospitality Arabic and detects which of the 14 standard allergens apply. Cards can be edited, styled (backgrounds, fonts, icon styles), previewed for print, and exported as a native PowerPoint (.pptx) deck.

## Tech

- React 19 + Vite 8 + Tailwind CSS 4
- `pptxgenjs` for PowerPoint export
- Netlify Functions (`netlify/functions`) for the AI endpoints
- Google Gemini via Netlify AI Gateway (no API key to manage), with a built-in culinary dictionary and keyword rules as a fallback

## Run locally

```bash
npm install
netlify dev
```

`netlify dev` serves the Vite app and the `/api/ai/*` functions together, with AI Gateway credentials injected when the site is linked.
