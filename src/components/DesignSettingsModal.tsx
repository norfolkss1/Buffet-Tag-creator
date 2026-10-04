import React, { useRef, useState } from 'react';
import {
  DesignConfig,
  ENGLISH_FONTS,
  ARABIC_FONTS,
  BACKGROUND_PRESETS,
  DEFAULT_DESIGN_CONFIG,
} from '../types/design';
import { CardPreview } from './CardPreview';
import { BuffetTagItem } from '../data/sampleDishes';
import {
  X,
  Upload,
  Image as ImageIcon,
  Type,
  RotateCcw,
  Sparkles,
  Check,
  Palette,
} from 'lucide-react';

interface DesignSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DesignConfig;
  onChangeConfig: (newConfig: DesignConfig) => void;
  sampleItem?: BuffetTagItem;
}

const SAMPLE_PREVIEW_ITEM: BuffetTagItem = {
  id: 'preview-sample',
  englishTitle: 'SMOKED SALMON',
  arabicTitle: 'سالمون مدخّن',
  allergens: ['fish'],
  category: 'Seafood',
};

export const DesignSettingsModal: React.FC<DesignSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  sampleItem = SAMPLE_PREVIEW_ITEM,
}) => {
  if (!isOpen) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'background' | 'fonts' | 'glow'>('background');
  const [uploadError, setUploadError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChangeConfig({
          ...config,
          backgroundUrl: dataUrl,
          backgroundName: file.name.replace(/\.[^/.]+$/, ''),
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onChangeConfig(DEFAULT_DESIGN_CONFIG);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Design & Background Settings</h2>
              <p className="text-xs text-stone-400">
                Customize typography, upload custom background, or choose preset textures
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Reset to original reference style"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-950 px-6 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('background')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'background'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Background Image & Textures</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fonts')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'fonts'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Fonts & Typography</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('glow')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'glow'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Allergen Icon Glow</span>
          </button>
        </div>

        {/* Content Body: Left Controls, Right Preview */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {activeTab === 'background' && (
              <div className="space-y-5">
                {/* Upload Section */}
                <div className="bg-stone-950/70 border-2 border-dashed border-stone-700/80 hover:border-amber-500/80 rounded-2xl p-5 text-center transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Upload Your Own Background Image
                  </h4>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto mb-3">
                    Supports high-resolution JPG, PNG, or WebP. Automatically applies to all tags and exports in PowerPoint (.pptx).
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-xl text-xs font-semibold border border-stone-600 transition-all shadow-sm"
                  >
                    Select Image File
                  </button>
                  {uploadError && <p className="text-xs text-red-400 mt-2">{uploadError}</p>}
                </div>

                {/* Preset Textures */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2.5">
                    Curated Luxury Background Presets
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BACKGROUND_PRESETS.map((preset) => {
                      const isSelected = config.backgroundUrl === preset.url;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() =>
                            onChangeConfig({
                              ...config,
                              backgroundUrl: preset.url,
                              backgroundName: preset.name,
                            })
                          }
                          className={`group relative rounded-xl overflow-hidden border text-left p-3 flex flex-col justify-end transition-all h-28 ${
                            isSelected
                              ? 'border-amber-400 ring-2 ring-amber-400/30'
                              : 'border-stone-800 hover:border-stone-600'
                          }`}
                          style={{
                            backgroundImage: `url('${preset.url}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">
                                {preset.name}
                              </span>
                              {isSelected && (
                                <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-stone-950">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-300 line-clamp-1">
                              {preset.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Background Info */}
                <div className="flex items-center justify-between p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg bg-cover bg-center border border-stone-700"
                      style={{ backgroundImage: `url('${config.backgroundUrl}')` }}
                    />
                    <div>
                      <span className="text-stone-400 block text-[10px]">Active Background:</span>
                      <span className="text-white font-semibold">{config.backgroundName}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-stone-400 hover:text-amber-400 text-xs underline"
                  >
                    Reset to Golden Wheat
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'fonts' && (
              <div className="space-y-6">
                {/* English Font Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                      English Dish Title Font
                    </label>
                    <span className="text-[11px] text-stone-400">
                      Selected: <strong className="text-amber-300">{config.englishFont}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ENGLISH_FONTS.map((font) => {
                      const isSelected = config.englishFont === font.id;
                      return (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => onChangeConfig({ ...config, englishFont: font.id })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/50'
                              : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-stone-200">{font.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <div
                            className="text-sm font-bold text-white tracking-wide truncate"
                            style={{ fontFamily: font.cssFamily }}
                          >
                            {font.previewSample}
                          </div>
                          <span className="text-[10px] text-stone-500 mt-1 block">
                            {font.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Arabic Font Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                      Arabic Dish Title Font
                    </label>
                    <span className="text-[11px] text-stone-400">
                      Selected: <strong className="text-amber-300">{config.arabicFont}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ARABIC_FONTS.map((font) => {
                      const isSelected = config.arabicFont === font.id;
                      return (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => onChangeConfig({ ...config, arabicFont: font.id })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/50'
                              : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-stone-200">{font.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                          <div
                            dir="rtl"
                            className="text-base font-bold text-white truncate"
                            style={{ fontFamily: font.cssFamily }}
                          >
                            {font.previewSample}
                          </div>
                          <span className="text-[10px] text-stone-500 mt-1 block">
                            {font.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'glow' && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Select Neon Icon Glow Color
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'magenta', name: 'Neon Magenta / Pink', color: '#d946ef', desc: 'Reference PDF pages 2-56 default' },
                    { id: 'amber', name: 'Neon Amber / Gold', color: '#f97316', desc: 'Page 1 reference style' },
                    { id: 'cyan', name: 'Electric Cyan Blue', color: '#06b6d4', desc: 'Modern vibrant seafood & cold stations' },
                    { id: 'gold', name: 'Luxury Champagne Gold', color: '#eab308', desc: 'Subtle warm luxury metallic' },
                  ].map((themeOpt) => {
                    const isSelected = config.iconTheme === themeOpt.id;
                    return (
                      <button
                        key={themeOpt.id}
                        type="button"
                        onClick={() =>
                          onChangeConfig({
                            ...config,
                            iconTheme: themeOpt.id as any,
                          })
                        }
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-stone-900 border-amber-400 ring-1 ring-amber-400/50'
                            : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: themeOpt.color, boxShadow: `0 0 8px ${themeOpt.color}` }}
                          />
                          <span className="text-xs font-bold text-stone-200">{themeOpt.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto" />}
                        </div>
                        <span className="text-[11px] text-stone-400 block">{themeOpt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-stone-950/50 p-5 rounded-2xl border border-stone-800">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-400/90 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Live Style Preview
            </span>
            <div className="w-full max-w-[320px]">
              <CardPreview
                item={sampleItem}
                theme={config.iconTheme === 'amber' ? 'amber' : 'magenta'}
                backgroundUrl={config.backgroundUrl}
                englishFont={config.englishFont}
                arabicFont={config.arabicFont}
                isPrintMode={false}
              />
            </div>
            <div className="mt-3 text-center text-[11px] text-stone-400">
              Changes apply instantly to all buffet tags & PowerPoint exports.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-800 bg-stone-950/80">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
