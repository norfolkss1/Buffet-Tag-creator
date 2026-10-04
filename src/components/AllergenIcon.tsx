import React from 'react';
import { ALLERGENS, AllergenDef } from '../data/allergens';

interface AllergenIconProps {
  id: string;
  theme?: 'magenta' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const AllergenIcon: React.FC<AllergenIconProps> = ({
  id,
  theme = 'magenta',
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const allergen: AllergenDef | undefined = ALLERGENS[id];
  if (!allergen) return null;

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }[size];

  const glowClass = theme === 'amber' ? 'allergen-neon-amber' : 'allergen-neon-magenta';

  return (
    <div className={`flex flex-col items-center justify-start text-center ${className}`}>
      {/* Neon glowing vector icon */}
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        <svg
          viewBox={allergen.viewBox}
          className={`w-full h-full text-white ${glowClass} transition-transform duration-200`}
          style={{
            stroke: '#ffffff',
            fill: 'none',
          }}
          dangerouslySetInnerHTML={{ __html: allergen.svgPath }}
        />
      </div>

      {/* Label: "Contain Milk" */}
      {showLabel && (
        <div className="mt-1 leading-tight text-center font-bold text-stone-900 select-none">
          <div className="text-[10px] sm:text-[11px] tracking-tight text-stone-800">Contain</div>
          <div className="text-[10px] sm:text-[11px] font-extrabold text-stone-900">{allergen.label}</div>
        </div>
      )}
    </div>
  );
};
