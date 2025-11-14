
import React from 'react';
import { NavigationProps } from '../types';
import { AREA_READINGS } from '../constants';
import Header from '../components/Header';

const AreaReadingsScreen: React.FC<NavigationProps> = ({ navigate }) => {
  return (
    <div>
      <Header title="Tiragens por Área" onBack={() => navigate('home')} />
      <p className="text-center text-gray-300 mb-8">Escolha uma área da sua vida para uma tiragem específica.</p>
      <div className="space-y-6">
        {Object.entries(AREA_READINGS).map(([key, area]) => (
          <div key={key} className="bg-brand-purple/50 p-4 rounded-lg">
            <h2 className="font-serif text-2xl text-brand-gold mb-4">{area.title}</h2>
            <div className="space-y-3">
              {area.spreads.map((spread) => (
                <button
                  key={spread.title}
                  onClick={() => navigate('specificAreaReading', { areaKey: key, spreadTitle: spread.title })}
                  className="w-full text-left p-3 bg-brand-purple rounded-md hover:bg-brand-purple-light transition-colors text-brand-light"
                >
                  {spread.title} ({spread.cards} {spread.cards > 1 ? 'cartas' : 'carta'})
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaReadingsScreen;
