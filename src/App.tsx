import React, { useState, useEffect } from 'react';
import { SAMPLE_BUFFET_TAGS, BuffetTagItem } from './data/sampleDishes';
import { ALLERGENS } from './data/allergens';
import { DesignConfig, DEFAULT_DESIGN_CONFIG } from './types/design';
import { Header } from './components/Header';
import { AiInputPanel } from './components/AiInputPanel';
import { CardPreview } from './components/CardPreview';
import { CardEditorModal } from './components/CardEditorModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { AllergenLegendModal } from './components/AllergenLegendModal';
import { PptxExportModal } from './components/PptxExportModal';
import { DesignSettingsModal } from './components/DesignSettingsModal';
import { exportToPowerPoint } from './utils/pptxExport';
import { preloadAllergenIcons } from './utils/iconRenderer';
import {
  Search,
  Filter,
  Trash2,
  BookOpen,
  SlidersHorizontal,
  LayoutGrid,
  FileDown,
  Sparkles,
  Palette,
  Type,
  ImageIcon,
} from 'lucide-react';

export default function App() {
  const [tags, setTags] = useState<BuffetTagItem[]>(() => {
    const saved = localStorage.getItem('buffet_tags_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return SAMPLE_BUFFET_TAGS;
  });

  const [designConfig, setDesignConfig] = useState<DesignConfig>(() => {
    const saved = localStorage.getItem('buffet_design_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_DESIGN_CONFIG;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAllergenFilter, setSelectedAllergenFilter] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<BuffetTagItem | null>(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isPptxOpen, setIsPptxOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'buffet'>('grid');

  // Persist tags to local storage
  useEffect(() => {
    localStorage.setItem('buffet_tags_items', JSON.stringify(tags));
  }, [tags]);

  // Persist design config to local storage
  useEffect(() => {
    localStorage.setItem('buffet_design_config', JSON.stringify(designConfig));
  }, [designConfig]);

  // Pre-cache allergen vectors into PNG for instant PPTX generation
  useEffect(() => {
    preloadAllergenIcons().catch(console.warn);
  }, []);

  const handleAddTag = (tag: BuffetTagItem) => {
    setTags((prev) => [tag, ...prev]);
  };

  const handleAddBatchTags = (newTags: BuffetTagItem[]) => {
    setTags((prev) => [...newTags, ...prev]);
  };

  const handleSaveTag = (updated: BuffetTagItem) => {
    setTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDeleteTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDuplicateTag = (item: BuffetTagItem) => {
    const duplicated: BuffetTagItem = {
      ...item,
      id: 'tag-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      englishTitle: item.englishTitle + ' (COPY)',
    };
    setTags((prev) => [duplicated, ...prev]);
  };

  const handleDownloadSingle = async (item: BuffetTagItem) => {
    await exportToPowerPoint([item], {
      layoutMode: 'square',
      neonColor: designConfig.iconTheme === 'amber' ? '#f97316' : '#d946ef',
      customBackground: item.customBackground || designConfig.backgroundUrl,
      englishFont: item.englishFont || designConfig.englishFont,
      arabicFont: item.arabicFont || designConfig.arabicFont,
      fileName: `${item.englishTitle.replace(/[^a-zA-Z0-9]/g, '_')}_tag.pptx`,
    });
  };

  const handleLoadSamples = () => {
    setTags(SAMPLE_BUFFET_TAGS);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all buffet tags?')) {
      setTags([]);
    }
  };

  // Filtered tags
  const filteredTags = tags.filter((item) => {
    const matchesSearch =
      item.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arabicTitle.includes(searchQuery) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedAllergenFilter === 'all') return true;
    if (selectedAllergenFilter === 'none') return !item.allergens || item.allergens.length === 0;
    return item.allergens && item.allergens.includes(selectedAllergenFilter);
  });

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        tagsCount={tags.length}
        onOpenPrint={() => setIsPrintOpen(true)}
        onOpenPptx={() => setIsPptxOpen(true)}
        onOpenLegend={() => setIsLegendOpen(true)}
        onOpenDesign={() => setIsDesignOpen(true)}
        backgroundName={designConfig.backgroundName}
        theme={designConfig.iconTheme === 'amber' ? 'amber' : 'magenta'}
        onToggleTheme={() =>
          setDesignConfig((prev) => ({
            ...prev,
            iconTheme: prev.iconTheme === 'magenta' ? 'amber' : 'magenta',
          }))
        }
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* AI Input & Creation Bar */}
        <AiInputPanel
          onAddTag={handleAddTag}
          onAddBatchTags={handleAddBatchTags}
          onLoadSamples={handleLoadSamples}
          totalTagsCount={tags.length}
        />

        {/* Quick Style Status & Customizer Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-stone-900/40 rounded-xl border border-stone-800/80 text-xs text-stone-400">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-stone-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              Active Theme:
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-950/80 rounded-lg border border-stone-800">
              <ImageIcon className="w-3 h-3 text-amber-400" />
              <span className="text-stone-300">Background:</span>
              <strong className="text-white">{designConfig.backgroundName}</strong>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-950/80 rounded-lg border border-stone-800">
              <Type className="w-3 h-3 text-amber-400" />
              <span className="text-stone-300">English Font:</span>
              <strong className="text-white">{designConfig.englishFont}</strong>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-950/80 rounded-lg border border-stone-800">
              <span className="text-stone-300">Arabic Font:</span>
              <strong className="text-white">{designConfig.arabicFont}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDesignOpen(true)}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold hover:underline"
          >
            Change Fonts or Background &rarr;
          </button>
        </div>

        {/* Filter and View Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish name, Arabic text, or category..."
              className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Allergen Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
            <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mr-1 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setSelectedAllergenFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedAllergenFilter === 'all'
                  ? 'bg-amber-400 text-stone-950'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              All ({tags.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedAllergenFilter('none')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedAllergenFilter === 'none'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              No Allergens
            </button>
            {['milk', 'gluten', 'fish', 'nuts', 'eggs', 'celery'].map((key) => {
              const allergen = ALLERGENS[key];
              const count = tags.filter((t) => t.allergens?.includes(key)).length;
              if (count === 0) return null;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedAllergenFilter(key)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedAllergenFilter === key
                      ? 'bg-fuchsia-500 text-white shadow-sm'
                      : 'bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  {allergen.name} ({count})
                </button>
              );
            })}
          </div>

          {/* View Mode & Clean */}
          <div className="flex items-center gap-2 justify-end">
            <div className="bg-stone-950 p-1 rounded-xl border border-stone-800 flex text-xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${
                  viewMode === 'grid' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-white'
                }`}
                title="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('buffet')}
                className={`p-1.5 rounded-lg ${
                  viewMode === 'buffet' ? 'bg-stone-800 text-amber-400' : 'text-stone-400 hover:text-white'
                }`}
                title="Buffet Display Stand mockup view"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {tags.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="p-2 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-xl transition-colors"
                title="Clear all tags"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tags Count & Quick Action Info */}
        <div className="flex items-center justify-between text-xs text-stone-400 px-1">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-white">{filteredTags.length}</strong> of{' '}
              <strong className="text-white">{tags.length}</strong> tags
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-amber-400 hover:underline"
              >
                (Clear search)
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Double-click or hover any card to edit, duplicate, or export.</span>
            <button
              onClick={() => setIsPrintOpen(true)}
              className="text-amber-400 hover:underline font-semibold"
            >
              Review before print &rarr;
            </button>
          </div>
        </div>

        {/* Buffet Tags Grid */}
        {filteredTags.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredTags.map((item) => (
              <div
                key={item.id}
                className={
                  viewMode === 'buffet'
                    ? 'p-4 bg-stone-900/90 rounded-2xl border border-stone-800 shadow-xl'
                    : ''
                }
              >
                {viewMode === 'buffet' && (
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs text-stone-400">
                    <span className="font-semibold text-stone-300">
                      {item.category || (item.isStationHeader ? 'Station Header' : 'Food Item')}
                    </span>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-amber-400 hover:underline"
                    >
                      Edit Tag
                    </button>
                  </div>
                )}

                <CardPreview
                  item={item}
                  theme={designConfig.iconTheme === 'amber' ? 'amber' : 'magenta'}
                  backgroundUrl={designConfig.backgroundUrl}
                  englishFont={designConfig.englishFont}
                  arabicFont={designConfig.arabicFont}
                  onEdit={(t) => setEditingItem(t)}
                  onDelete={handleDeleteTag}
                  onDuplicate={handleDuplicateTag}
                  onDownloadSingle={handleDownloadSingle}
                />

                {viewMode === 'buffet' && (
                  <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span>
                      {item.allergens?.length ? `${item.allergens.length} allergen(s)` : 'No allergens'}
                    </span>
                    <button
                      onClick={() => handleDownloadSingle(item)}
                      className="text-stone-300 hover:text-amber-400 flex items-center gap-1 font-medium"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      Single .pptx
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-stone-900/40 border border-dashed border-stone-800 rounded-3xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No Buffet Tags Found</h3>
            <p className="text-sm text-stone-400 max-w-md mb-5">
              {searchQuery
                ? 'No tags matched your search query. Try clearing your search.'
                : 'Enter a dish name above to let the AI agent translate and detect allergens, or restore the 20 sample cards from the PDF.'}
            </p>
            <div className="flex items-center gap-3">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-stone-800 text-stone-200 hover:text-white rounded-xl text-xs font-semibold"
                >
                  Clear Search Filter
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLoadSamples}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-stone-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Load PDF Sample Buffet Tags
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-stone-800 bg-stone-950 py-4 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BuffetTag Studio &bull; Luxury Hotel Buffet Food Tags & PowerPoint Extraction Tool</span>
          <div className="flex items-center gap-4 text-stone-400">
            <button onClick={() => setIsDesignOpen(true)} className="hover:text-amber-400">
              Design & Fonts
            </button>
            <button onClick={() => setIsLegendOpen(true)} className="hover:text-amber-400">
              14 Allergens Guide
            </button>
            <button onClick={() => setIsPrintOpen(true)} className="hover:text-amber-400">
              Print Review
            </button>
            <button onClick={() => setIsPptxOpen(true)} className="hover:text-amber-400">
              Export .pptx
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DesignSettingsModal
        isOpen={isDesignOpen}
        onClose={() => setIsDesignOpen(false)}
        config={designConfig}
        onChangeConfig={setDesignConfig}
        sampleItem={tags[0]}
      />

      <CardEditorModal
        item={editingItem}
        isOpen={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveTag}
        theme={designConfig.iconTheme === 'amber' ? 'amber' : 'magenta'}
        globalBackground={designConfig.backgroundUrl}
        globalEnglishFont={designConfig.englishFont}
        globalArabicFont={designConfig.arabicFont}
      />

      <PrintPreviewModal
        items={tags}
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        designConfig={designConfig}
      />

      <PptxExportModal
        items={tags}
        isOpen={isPptxOpen}
        onClose={() => setIsPptxOpen(false)}
        designConfig={designConfig}
      />

      <AllergenLegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
        theme={designConfig.iconTheme === 'amber' ? 'amber' : 'magenta'}
      />
    </div>
  );
}
