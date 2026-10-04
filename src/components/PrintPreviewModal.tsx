import React, { useState } from 'react';
import { BuffetTagItem } from '../data/sampleDishes';
import { CardPreview } from './CardPreview';
import { DesignConfig } from '../types/design';
import { Printer, X, LayoutGrid, Sliders, Check } from 'lucide-react';

interface PrintPreviewModalProps {
  items: BuffetTagItem[];
  isOpen: boolean;
  onClose: () => void;
  designConfig: DesignConfig;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  items,
  isOpen,
  onClose,
  designConfig,
}) => {
  if (!isOpen) return null;

  const [cardsPerPage, setCardsPerPage] = useState<4 | 6>(4);
  const [showCutLines, setShowCutLines] = useState(true);

  // Group items into pages
  const pages: BuffetTagItem[][] = [];
  for (let i = 0; i < items.length; i += cardsPerPage) {
    pages.push(items.slice(i, i + cardsPerPage));
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl h-[95vh] bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Toolbar (hidden in print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Review Before Printing</h2>
              <p className="text-xs text-stone-400">
                {items.length} buffet tags &bull; {pages.length} printed {pages.length === 1 ? 'page' : 'pages'} (A4/Letter sheet)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Grid density selector */}
            <div className="flex items-center gap-1.5 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-700/80 text-xs">
              <span className="text-stone-400 font-medium">Layout:</span>
              <button
                type="button"
                onClick={() => setCardsPerPage(4)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  cardsPerPage === 4 ? 'bg-amber-400 text-stone-950' : 'text-stone-300 hover:text-white'
                }`}
              >
                4 per page (Large)
              </button>
              <button
                type="button"
                onClick={() => setCardsPerPage(6)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  cardsPerPage === 6 ? 'bg-amber-400 text-stone-950' : 'text-stone-300 hover:text-white'
                }`}
              >
                6 per page (Compact)
              </button>
            </div>

            {/* Cut Lines toggle */}
            <button
              type="button"
              onClick={() => setShowCutLines(!showCutLines)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                showCutLines
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              {showCutLines && <Check className="w-3.5 h-3.5" />}
              <span>Cut Lines</span>
            </button>

            {/* Print Action */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print to PDF / Paper</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheets Preview Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-950/80 flex flex-col items-center gap-8">
          {pages.map((pageItems, pageIdx) => (
            <div
              key={pageIdx}
              className="print-page-break relative bg-white text-stone-900 w-full max-w-[850px] shadow-2xl rounded-sm p-8 sm:p-10 border border-stone-200"
              style={{
                minHeight: '1100px',
                aspectRatio: '1 / 1.414', // Standard ISO A4 proportion
              }}
            >
              {/* Header inside printed page */}
              <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-stone-200 text-xs text-stone-400">
                <span className="font-semibold text-stone-500 uppercase tracking-widest">
                  Sheet {pageIdx + 1} of {pages.length}
                </span>
                <span>Cut along dashed lines for standard acrylic stands</span>
              </div>

              {/* Cards Grid */}
              <div
                className={`grid gap-6 ${
                  cardsPerPage === 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
                }`}
              >
                {pageItems.map((item) => (
                  <div
                    key={item.id}
                    className={`relative ${
                      showCutLines ? 'border border-dashed border-stone-400/60 p-1' : ''
                    }`}
                  >
                    <CardPreview
                      item={item}
                      theme={designConfig.iconTheme === 'amber' ? 'amber' : 'magenta'}
                      backgroundUrl={designConfig.backgroundUrl}
                      englishFont={designConfig.englishFont}
                      arabicFont={designConfig.arabicFont}
                      isPrintMode={true}
                    />
                  </div>
                ))}
              </div>

              {/* Page Footer watermark */}
              <div className="absolute bottom-4 left-8 right-8 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                <span>BuffetTag Studio &bull; Luxury Bilingual Tag Collection</span>
                <span>Page {pageIdx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
