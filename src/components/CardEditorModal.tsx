import React, { useState, useRef } from 'react';
import { BuffetTagItem } from '../data/sampleDishes';
import { ALLERGENS } from '../data/allergens';
import { ENGLISH_FONTS, ARABIC_FONTS, BACKGROUND_PRESETS } from '../types/design';
import { X, Sparkles, Check, RefreshCw, Upload, Image as ImageIcon, Type } from 'lucide-react';
import { CardPreview } from './CardPreview';

interface CardEditorModalProps {
  item: BuffetTagItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: BuffetTagItem) => void;
  theme?: 'magenta' | 'amber';
  globalBackground?: string;
  globalEnglishFont?: string;
  globalArabicFont?: string;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
  theme = 'magenta',
  globalBackground = '/buffet_background.jpg',
  globalEnglishFont = 'Bodoni Moda',
  globalArabicFont = 'Amiri',
}) => {
  if (!isOpen || !item) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [englishTitle, setEnglishTitle] = useState(item.englishTitle);
  const [arabicTitle, setArabicTitle] = useState(item.arabicTitle);
  const [allergens, setAllergens] = useState<string[]>(item.allergens || []);
  const [category, setCategory] = useState(item.category || '');
  const [isStationHeader, setIsStationHeader] = useState(Boolean(item.isStationHeader));
  const [customBackground, setCustomBackground] = useState<string | undefined>(item.customBackground);
  const [englishFont, setEnglishFont] = useState<string | undefined>(item.englishFont);
  const [arabicFont, setArabicFont] = useState<string | undefined>(item.arabicFont);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const toggleAllergen = (key: string) => {
    setAllergens((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCustomBackground(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAiReAnalyze = async () => {
    if (!englishTitle.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishName: englishTitle, category }),
      });
      const data = await res.json();
      if (data.arabicTitle) {
        setArabicTitle(data.arabicTitle);
      }
      if (Array.isArray(data.allergens)) {
        setAllergens(data.allergens);
      }
    } catch (e) {
      console.error('AI Re-analyze failed', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    onSave({
      ...item,
      englishTitle: englishTitle.trim(),
      arabicTitle: arabicTitle.trim(),
      allergens,
      category: category.trim(),
      isStationHeader,
      customBackground: customBackground || undefined,
      englishFont: englishFont || undefined,
      arabicFont: arabicFont || undefined,
    });
    onClose();
  };

  const previewItem: BuffetTagItem = {
    ...item,
    englishTitle: englishTitle.trim() || 'DISH NAME',
    arabicTitle: arabicTitle.trim() || 'اسم الطبق',
    allergens,
    isStationHeader,
    customBackground,
    englishFont,
    arabicFont,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Edit Buffet Tag</h2>
              <p className="text-xs text-stone-400">Customize text, Arabic translation, typography, and card background</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split View (Controls Left, Live Preview Right) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* English Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  English Dish / Station Name
                </label>
                <button
                  type="button"
                  onClick={() => setEnglishTitle(englishTitle.toUpperCase())}
                  className="text-stone-400 hover:text-amber-400 text-xs underline"
                >
                  Make ALL CAPS
                </button>
              </div>
              <input
                type="text"
                value={englishTitle}
                onChange={(e) => setEnglishTitle(e.target.value)}
                placeholder="e.g. SMOKED SALMON"
                className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white font-bold tracking-wide focus:outline-none focus:border-amber-500 transition-colors"
                style={{ fontFamily: `'${englishFont || globalEnglishFont}', Georgia, serif` }}
              />
            </div>

            {/* Arabic Title with AI button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Arabic Hospitality Translation
                </label>
                <button
                  type="button"
                  onClick={handleAiReAnalyze}
                  disabled={isAiLoading}
                  className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isAiLoading ? 'animate-spin' : ''}`} />
                  Re-translate with AI
                </button>
              </div>
              <input
                type="text"
                dir="rtl"
                value={arabicTitle}
                onChange={(e) => setArabicTitle(e.target.value)}
                placeholder="مثال: سالمون مدخّن"
                className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white font-bold text-lg focus:outline-none focus:border-amber-500 transition-colors"
                style={{ fontFamily: `'${arabicFont || globalArabicFont}', Arial, sans-serif` }}
              />
            </div>

            {/* Typography Customization for this tag */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-950/60 rounded-xl border border-stone-800">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">
                  English Font
                </label>
                <select
                  value={englishFont || ''}
                  onChange={(e) => setEnglishFont(e.target.value || undefined)}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">Default ({globalEnglishFont})</option>
                  {ENGLISH_FONTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">
                  Arabic Font
                </label>
                <select
                  value={arabicFont || ''}
                  onChange={(e) => setArabicFont(e.target.value || undefined)}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">Default ({globalArabicFont})</option>
                  {ARABIC_FONTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Background Image override for this tag */}
            <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase text-stone-400 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  Background Image for This Tag
                </label>
                {customBackground && (
                  <button
                    type="button"
                    onClick={() => setCustomBackground(undefined)}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Reset to Global Background
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium border border-stone-700 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Card Background
                </button>

                <div className="flex items-center gap-1.5 ml-auto">
                  {BACKGROUND_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setCustomBackground(p.url)}
                      className={`w-6 h-6 rounded-md border bg-cover bg-center transition-all ${
                        (customBackground || globalBackground) === p.url
                          ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105'
                          : 'border-stone-700 hover:border-stone-500'
                      }`}
                      style={{ backgroundImage: `url('${p.url}')` }}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Station Header & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                  Category / Station
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Seafood / Breakfast"
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-sm text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-stone-300">
                  <input
                    type="checkbox"
                    checked={isStationHeader}
                    onChange={(e) => setIsStationHeader(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-stone-700 bg-stone-800"
                  />
                  <span>Station Header (e.g. Wellness Station)</span>
                </label>
              </div>
            </div>

            {/* Allergen Icons Selector (14 standards) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Selected Food Allergens ({allergens.length})
                </label>
                {allergens.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setAllergens([])}
                    className="text-[11px] text-red-400 hover:text-red-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 bg-stone-950/50 rounded-xl border border-stone-800">
                {Object.values(ALLERGENS).map((allergen) => {
                  const isSelected = allergens.includes(allergen.id);
                  return (
                    <button
                      key={allergen.id}
                      type="button"
                      onClick={() => toggleAllergen(allergen.id)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-fuchsia-950/80 border border-fuchsia-500/80 text-fuchsia-200 shadow-sm shadow-fuchsia-500/20'
                          : 'bg-stone-900/60 border border-stone-800/80 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                        {isSelected ? (
                          <Check className="w-4 h-4 text-fuchsia-400" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-stone-700" />
                        )}
                      </div>
                      <span className="truncate">{allergen.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-stone-950/40 p-4 rounded-xl border border-stone-800">
            <span className="text-xs font-semibold tracking-wider uppercase text-stone-400 mb-3">
              Live Card Preview
            </span>
            <div className="w-full max-w-[320px]">
              <CardPreview
                item={previewItem}
                theme={theme}
                backgroundUrl={customBackground || globalBackground}
                englishFont={englishFont || globalEnglishFont}
                arabicFont={arabicFont || globalArabicFont}
                isPrintMode={false}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-800 bg-stone-900/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl shadow-lg shadow-amber-400/20 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
