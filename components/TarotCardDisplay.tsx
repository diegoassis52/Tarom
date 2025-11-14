
import React from 'react';

interface TarotCardDisplayProps {
  name: string;
  image: string;
  title?: string;
  isFlipped: boolean;
}

const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({ name, image, title, isFlipped }) => {
  return (
    <div className="flex flex-col items-center p-2 group">
      {title && <h3 className="font-serif text-lg text-brand-gold mb-2">{title}</h3>}
      <div className="w-48 h-80 md:w-60 md:h-[400px] perspective-1000">
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Card Back */}
          <div className="absolute w-full h-full backface-hidden bg-brand-purple-light rounded-xl border-2 border-brand-gold flex items-center justify-center p-4">
            <div className="w-20 h-20 border-2 border-brand-gold rounded-full flex items-center justify-center">
                <span className="text-brand-gold font-serif text-4xl">T</span>
            </div>
          </div>
          {/* Card Front */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-brand-dark rounded-xl border-2 border-yellow-500 overflow-hidden shadow-lg shadow-brand-purple/30">
            <img src={image} alt={name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center">
              <p className="text-white font-sans text-sm font-semibold tracking-wider">{name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCardDisplay;