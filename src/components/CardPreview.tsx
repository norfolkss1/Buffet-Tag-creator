import React from 'react';
import { BuffetTagItem } from '../data/sampleDishes';
import { AllergenIcon } from './AllergenIcon';
import { Edit3, Trash2, Copy, FileDown, Sparkles } from 'lucide-react';
import { ALLERGENS } from '../data/allergens';

interface CardPreviewProps {
  item: BuffetTagItem;
  theme?: 'magenta' | 'amber';
  backgroundUrl?: string;
  englishFont?: string;
  arabicFont?: string;
  onEdit?: (item: BuffetTagItem) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (item: BuffetTagItem) => void;
  onDownloadSingle?: (item: BuffetTagItem) => void;
  isPrintMode?: boolean;
  scale?: number;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  item,
  theme = 'magenta',
  backgroundUrl = '/buffet_background.jpg',
  englishFont = 'Bodoni Moda',
  arabicFont = 'Amiri',
  onEdit,
  onDelete,
  onDuplicate,
  onDownloadSingle,
  isPrintMode = false,
  scale = 1,
}) => {
  const activeAllergens = (item.allergens || [])
    .map((k) => ALLERGENS[k])
    .filter(Boolean);

  const hasAllergens = activeAllergens.length > 0;
  const activeBackground = item.customBackground || backgroundUrl;
  const activeEnglishFont = item.englishFont || englishFont;
  const activeArabicFont = item.arabicFont || arabicFont;

  return (
    <div className={`relative group ${isPrintMode ? '' : 'transition-transform duration-200 hover:-translate-y-1'}`}>
      {/* Action overlay bar on hover (disabled in print mode) */}
      {!isPrintMode && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/80 backdrop-blur-md px-2 py-1.5 rounded-lg border border-stone-700/60 shadow-lg">
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              title="Edit tag"
              className="p-1.5 text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDuplicate && (
            <button
              onClick={() => onDuplicate(item)}
              title="Duplicate tag"
              className="p-1.5 text-stone-300 hover:text-cyan-400 hover:bg-stone-800 rounded transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          {onDownloadSingle && (
            <button
              onClick={() => onDownloadSingle(item)}
              title="Download PowerPoint slide (.pptx)"
              className="p-1.5 text-stone-300 hover:text-emerald-400 hover:bg-stone-800 rounded transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(item.id)}
              title="Delete tag"
              className="p-1.5 text-stone-300 hover:text-red-400 hover:bg-stone-800 rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Buffet Card Aspect Ratio 1:1 */}
      <div
        className={`w-full aspect-square relative overflow-hidden select-none bg-cover bg-center flex flex-col justify-between p-6 sm:p-7 ${
          isPrintMode
            ? 'border border-dashed border-stone-300'
            : 'rounded-xl shadow-xl shadow-stone-950/40 ring-1 ring-stone-900/10'
        }`}
        style={{
          backgroundImage: `url('${activeBackground}')`,
          backgroundColor: '#f5ebe1',
        }}
      >
        {/* Subtle vignette/sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center">
          {/* Top/Middle Text Area */}
          <div
            className={`w-full flex flex-col items-center justify-center transition-all ${
              hasAllergens ? 'pt-4 sm:pt-6' : 'my-auto py-6'
            }`}
          >
            {/* English Dish Name */}
            <h2
              className="font-black text-stone-900 leading-tight tracking-wide px-2 drop-shadow-sm"
              style={{
                fontFamily: `'${activeEnglishFont}', Georgia, serif`,
                fontSize:
                  item.englishTitle.length > 30
                    ? '1.15rem'
                    : item.englishTitle.length > 20
                    ? '1.35rem'
                    : '1.65rem',
                textTransform: 'uppercase',
              }}
            >
              {item.englishTitle}
            </h2>

            {/* Arabic Dish Name */}
            <h3
              dir="rtl"
              className="font-bold text-stone-900 mt-2.5 sm:mt-3 px-2 leading-relaxed"
              style={{
                fontFamily: `'${activeArabicFont}', Arial, sans-serif`,
                fontSize:
                  item.arabicTitle.length > 30
                    ? '1.15rem'
                    : item.arabicTitle.length > 20
                    ? '1.35rem'
                    : '1.6rem',
              }}
            >
              {item.arabicTitle}
            </h3>

            {/* Station indicator tag if applicable */}
            {item.isStationHeader && !isPrintMode && (
              <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-900/10 text-amber-900 border border-amber-900/20">
                <Sparkles className="w-2.5 h-2.5" /> Station Header
              </span>
            )}
          </div>

          {/* Bottom Area: Allergen Icons */}
          {hasAllergens ? (
            <div className="w-full pb-2 flex items-end justify-center gap-4 sm:gap-6 flex-wrap">
              {activeAllergens.map((allergen) => (
                <div key={allergen.id} className="transform transition-transform hover:scale-105">
                  <AllergenIcon
                    id={allergen.id}
                    theme={theme}
                    size={activeAllergens.length > 3 ? 'sm' : 'md'}
                    showLabel={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Spacer to keep balance if no allergens */
            <div className="h-4" />
          )}
        </div>
      </div>
    </div>
  );
};
