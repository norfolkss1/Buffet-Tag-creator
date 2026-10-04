import React, { useState } from 'react';
import { BuffetTagItem } from '../data/sampleDishes';
import { exportToPowerPoint } from '../utils/pptxExport';
import { DesignConfig } from '../types/design';
import { FileDown, X, Check, Loader2, Sparkles, Presentation, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PptxExportModalProps {
  items: BuffetTagItem[];
  isOpen: boolean;
  onClose: () => void;
  designConfig: DesignConfig;
}

export const PptxExportModal: React.FC<PptxExportModalProps> = ({
  items,
  isOpen,
  onClose,
  designConfig,
}) => {
  if (!isOpen) return null;

  const [layoutMode, setLayoutMode] = useState<'square' | 'sheet4'>('square');
  const [neonColor, setNeonColor] = useState<string>(
    designConfig.iconTheme === 'amber' ? '#f97316' : '#d946ef'
  );
  const [fileName, setFileName] = useState('Buffet_Tags.pptx');
  const [isExporting, setIsExporting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPowerPoint(items, {
        layoutMode,
        neonColor,
        customBackground: designConfig.backgroundUrl,
        englishFont: designConfig.englishFont,
        arabicFont: designConfig.arabicFont,
        fileName: fileName.endsWith('.pptx') ? fileName : `${fileName}.pptx`,
      });

      setIsDone(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });

      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error('Failed to export to PowerPoint:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Extract to PowerPoint (.pptx)</h2>
              <p className="text-xs text-stone-400">
                Generate high-resolution editable slides for all {items.length} buffet tags
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="py-5 space-y-4">
          {/* File Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              PowerPoint File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Layout Mode Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Slide Layout Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLayoutMode('square')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  layoutMode === 'square'
                    ? 'bg-amber-500/10 border-amber-400 text-white shadow-sm'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-stone-200">Square Cards</span>
                  {layoutMode === 'square' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-stone-400">
                  4" x 4" (1:1) per slide &bull; Exact match to PDF reference format
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode('sheet4')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  layoutMode === 'sheet4'
                    ? 'bg-amber-500/10 border-amber-400 text-white shadow-sm'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-stone-200">Print Sheet</span>
                  {layoutMode === 'sheet4' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="text-xs text-stone-400">
                  4 cards per page on A4/Letter with cut lines for physical stands
                </p>
              </button>
            </div>
          </div>

          {/* Neon Icon Style */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
              Allergen Icon Glow Style
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setNeonColor('#d946ef')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  neonColor === '#d946ef'
                    ? 'bg-fuchsia-950 border-fuchsia-400 text-fuchsia-200'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-fuchsia-500 shadow-sm shadow-fuchsia-500" />
                <span>Magenta Glow (Pages 2-56)</span>
              </button>

              <button
                type="button"
                onClick={() => setNeonColor('#f97316')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  neonColor === '#f97316'
                    ? 'bg-amber-950 border-amber-400 text-amber-200'
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
                <span>Amber Glow (Page 1)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 text-sm font-medium text-stone-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting || items.length === 0}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-stone-950 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-300 hover:to-amber-300 active:scale-95 disabled:opacity-50 shadow-lg shadow-orange-500/20 transition-all"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Building PowerPoint File...</span>
              </>
            ) : isDone ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Download .pptx ({items.length} {items.length === 1 ? 'Tag' : 'Tags'})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
