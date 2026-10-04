import React, { useState } from 'react';
import { Sparkles, Plus, ListPlus, Loader2, BookOpen } from 'lucide-react';
import { BuffetTagItem, SAMPLE_BUFFET_TAGS } from '../data/sampleDishes';

interface AiInputPanelProps {
  onAddTag: (tag: BuffetTagItem) => void;
  onAddBatchTags: (tags: BuffetTagItem[]) => void;
  onLoadSamples: () => void;
  totalTagsCount: number;
}

export const AiInputPanel: React.FC<AiInputPanelProps> = ({
  onAddTag,
  onAddBatchTags,
  onLoadSamples,
  totalTagsCount,
}) => {
  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSingleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!dishName.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishName: dishName.trim(), category: category.trim() }),
      });

      if (!res.ok) {
        throw new Error('Failed to analyze dish');
      }

      const data = await res.json();
      const newTag: BuffetTagItem = {
        id: 'tag-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        englishTitle: data.englishTitle || dishName.trim().toUpperCase(),
        arabicTitle: data.arabicTitle || dishName.trim(),
        allergens: data.allergens || [],
        category: category.trim() || undefined,
        isStationHeader: /station|corner|variation|buffet/i.test(dishName),
      };

      onAddTag(newTag);
      setDishName('');
      setCategory('');
    } catch (err: any) {
      console.error('Error generating tag:', err);
      setErrorMsg('Could not analyze dish. Fallback applied.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkSubmit = async () => {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/batch-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines }),
      });

      if (!res.ok) {
        throw new Error('Batch analysis failed');
      }

      const data = await res.json();
      if (Array.isArray(data.results)) {
        onAddBatchTags(data.results);
        setBulkText('');
      }
    } catch (err: any) {
      console.error('Batch error:', err);
      setErrorMsg('Failed batch analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-stone-900/90 border border-stone-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      {/* Header and Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              AI Buffet Tag Creator
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Arabic & Allergen Agent
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              Input any food or station title — AI translates to culinary Arabic & detects all allergens
            </p>
          </div>
        </div>

        {/* Action Controls & Tabs */}
        <div className="flex items-center gap-2">
          <div className="bg-stone-950 p-1 rounded-xl border border-stone-800 flex text-xs">
            <button
              type="button"
              onClick={() => setTab('single')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                tab === 'single'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Single Item
            </button>
            <button
              type="button"
              onClick={() => setTab('bulk')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                tab === 'bulk'
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Bulk Menu Paste
            </button>
          </div>

          <button
            type="button"
            onClick={onLoadSamples}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-750 hover:text-amber-300 border border-stone-700 transition-colors"
            title="Load 20 exact sample tags from reference PDF"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Load PDF Samples</span>
            <span className="sm:hidden">Samples</span>
          </button>
        </div>
      </div>

      {/* Input Area */}
      {tab === 'single' ? (
        <form onSubmit={handleSingleSubmit} className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Dish Name */}
            <div className="md:col-span-7">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                Dish Name / Station Title
              </label>
              <input
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="e.g. Smoked Salmon, Blueberry Overnight Oats, Bakery Corner"
                className="w-full px-4 py-2.5 bg-stone-950 border border-stone-700/80 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                disabled={isLoading}
              />
            </div>

            {/* Category */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                Category (Optional)
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Breakfast, Seafood"
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700/80 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={isLoading || !dishName.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-amber-500/20 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create Tag</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick suggestions pills */}
          <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-stone-400">
            <span className="text-stone-500">Quick Try:</span>
            {['Avocado Overnight Oats', 'Plain Greek Yogurt', 'Tzatziki Crudites', 'Potato Harra', 'Assorted Cheese'].map((dish) => (
              <button
                key={dish}
                type="button"
                onClick={() => setDishName(dish)}
                className="px-2.5 py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-amber-300 rounded-lg border border-stone-700/60 transition-colors"
              >
                + {dish}
              </button>
            ))}
          </div>
        </form>
      ) : (
        /* Bulk Input */
        <div className="pt-4 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Paste Dish Names (One per line)
              </label>
              <span className="text-xs text-stone-500">AI will batch translate and tag all</span>
            </div>
            <textarea
              rows={4}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="WELLNESS STATION&#10;Blueberry Overnight Oats&#10;Smoked Salmon&#10;Plain Greek Yogurt&#10;Bakery Corner&#10;Potato Harra"
              className="w-full p-3 bg-stone-950 border border-stone-700/80 rounded-xl text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-all font-mono"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleBulkSubmit}
              disabled={isLoading || !bulkText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 shadow-md shadow-amber-500/20 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Menu with AI...</span>
                </>
              ) : (
                <>
                  <ListPlus className="w-4 h-4" />
                  <span>Batch Generate Tags</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mt-3 px-3 py-2 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300">
          {errorMsg}
        </div>
      )}
    </div>
  );
};
