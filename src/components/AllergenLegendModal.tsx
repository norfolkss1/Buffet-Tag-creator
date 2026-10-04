import React from 'react';
import { ALLERGENS } from '../data/allergens';
import { AllergenIcon } from './AllergenIcon';
import { X, ShieldAlert, Info } from 'lucide-react';

interface AllergenLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'magenta' | 'amber';
}

export const AllergenLegendModal: React.FC<AllergenLegendModalProps> = ({
  isOpen,
  onClose,
  theme = 'magenta',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">14 International Food Allergens Guide</h2>
              <p className="text-xs text-stone-400">
                Official allergen vector icons & culinary indications as modeled in Page 1 of the reference slides
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.values(ALLERGENS).map((allergen) => (
            <div
              key={allergen.id}
              className="bg-stone-950/80 border border-stone-800 rounded-xl p-4 flex flex-col items-center text-center transition-all hover:border-fuchsia-500/40"
            >
              <div className="w-20 h-20 mb-2 flex items-center justify-center p-2 rounded-lg bg-stone-900/60 border border-stone-800/60">
                <AllergenIcon id={allergen.id} theme={theme} size="md" showLabel={false} />
              </div>

              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {allergen.name}
              </span>

              <span dir="rtl" className="text-xs font-semibold text-fuchsia-300 font-arabic-luxury mt-0.5">
                {allergen.arabicLabel}
              </span>

              <p className="text-[11px] text-stone-400 mt-2 leading-snug line-clamp-3">
                {allergen.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer info note */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-stone-800 bg-stone-950 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Complies with international EU & Middle Eastern food safety allergen labeling regulations.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
