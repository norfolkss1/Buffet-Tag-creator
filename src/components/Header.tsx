import React from 'react';
import { Presentation, Printer, ShieldAlert, Sparkles, Palette } from 'lucide-react';

interface HeaderProps {
  tagsCount: number;
  onOpenPrint: () => void;
  onOpenPptx: () => void;
  onOpenLegend: () => void;
  onOpenDesign: () => void;
  backgroundName: string;
  theme: 'magenta' | 'amber';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  tagsCount,
  onOpenPrint,
  onOpenPptx,
  onOpenLegend,
  onOpenDesign,
  backgroundName,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="no-print w-full bg-stone-950/80 border-b border-stone-800/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <span className="font-serif-luxury font-black text-amber-400 text-lg">BT</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">BuffetTag Studio</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                PowerPoint Ready
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Luxury Bilingual Buffet Signage &bull; Arabic Translation &bull; 14 Neon Allergen Icons
            </p>
          </div>
        </div>

        {/* Right: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Design, Background & Fonts Button */}
          <button
            type="button"
            onClick={onOpenDesign}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-200 hover:text-white bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 transition-all shadow-sm"
            title="Change background image or fonts"
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Design & Background</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 font-normal hidden lg:inline max-w-[90px] truncate">
              {backgroundName}
            </span>
          </button>

          {/* 14 Allergens Guide Button */}
          <button
            type="button"
            onClick={onOpenLegend}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 transition-all"
            title="View 14 international allergen icons & Arabic translations"
          >
            <ShieldAlert className="w-4 h-4 text-fuchsia-400" />
            <span className="hidden md:inline">Allergen Guide</span>
          </button>

          {/* Theme Glow Switch */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 transition-all"
            title={`Current icon glow: ${theme === 'magenta' ? 'Magenta Neon' : 'Amber Neon'}`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                theme === 'magenta' ? 'bg-fuchsia-400 shadow-sm shadow-fuchsia-400' : 'bg-amber-400 shadow-sm shadow-amber-400'
              }`}
            />
            <span className="hidden lg:inline">{theme === 'magenta' ? 'Neon Magenta' : 'Neon Amber'}</span>
          </button>

          {/* Review & Print Button */}
          <button
            type="button"
            onClick={onOpenPrint}
            disabled={tagsCount === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-750 disabled:opacity-50 border border-stone-700 transition-all"
            title="Review tags in print sheet format before printing"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Review & Print</span>
          </button>

          {/* PowerPoint (.pptx) Export Button */}
          <button
            type="button"
            onClick={onOpenPptx}
            disabled={tagsCount === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-stone-950 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 hover:from-orange-300 hover:to-amber-300 active:scale-95 disabled:opacity-50 shadow-md shadow-amber-500/20 transition-all"
            title="Extract all cards to native Microsoft PowerPoint (.pptx) presentation"
          >
            <Presentation className="w-4 h-4 text-stone-950" />
            <span>Export PowerPoint ({tagsCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
