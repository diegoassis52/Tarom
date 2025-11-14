
import React from 'react';
import { NavigationProps } from '../types';
import { useTarotData } from '../hooks/useTarotData';
import Header from '../components/Header';

const ArcanaLibraryScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const { allCards } = useTarotData();

  return (
    <div>
      <Header title="Biblioteca dos Arcanos" onBack={() => navigate('home')} />
      <p className="text-center text-gray-300 mb-8">Explore os significados dos 22 Arcanos Maiores.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {allCards.map(card => (
          <button 
            key={card.name} 
            onClick={() => navigate('arcanaDetail', { cardName: card.name })}
            className="group relative rounded-lg overflow-hidden border-2 border-brand-gold/50 hover:border-brand-gold transition-all duration-300 transform hover:scale-105"
          >
            <img src={card.image} alt={card.name} className="w-full h-auto object-cover aspect-[3/5]" />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs sm:text-sm font-semibold p-1 bg-black/50">
              {card.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArcanaLibraryScreen;