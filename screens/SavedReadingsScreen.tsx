
import React from 'react';
import { NavigationProps, TarotCard } from '../types';
import { useSavedReadings } from '../hooks/useSavedReadings';
import Header from '../components/Header';
import { TrashIcon } from '../components/Icons';

const SavedReadingsScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const { savedReadings, removeReading } = useSavedReadings();

  const renderInterpretation = (interpretation: any) => {
    if (typeof interpretation === 'string') {
      return <p className="text-sm text-gray-400 mt-2">{interpretation}</p>;
    }
    if (interpretation.significadoGeral || interpretation.conselhoPratico) {
      return (
        <>
          <p className="text-sm text-gray-300 mt-2"><strong>Significado:</strong> {interpretation.significadoGeral}</p>
          <p className="text-sm text-gray-300 mt-1"><strong>Conselho:</strong> {interpretation.conselhoPratico}</p>
        </>
      );
    }
    return <p className="text-sm text-gray-400 mt-2">Interpretação detalhada.</p>;
  };

  return (
    <div>
      <Header title="Leituras Salvas" onBack={() => navigate('home')} />
      {savedReadings.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">Você ainda não tem leituras salvas.</p>
      ) : (
        <div className="space-y-4">
          {savedReadings.map(reading => (
            <div key={reading.id} className="bg-brand-purple/50 p-4 rounded-lg flex justify-between items-start">
              <div className="flex-1">
                <h2 className="font-serif text-lg text-brand-gold">{reading.title}</h2>
                <p className="text-xs text-gray-400 mb-2">{new Date(reading.date).toLocaleDateString('pt-BR')}</p>
                <div className="flex flex-wrap gap-2">
                  {reading.cards.map((card, index) => (
                    <div key={index} className="flex items-center gap-2 bg-brand-dark px-2 py-1 rounded-md">
                      <img src={card.image} alt={card.name} className="w-8 h-12 object-cover rounded-sm" />
                      <span className="text-sm font-semibold">{card.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t border-brand-purple pt-2">
                  {renderInterpretation(reading.interpretation)}
                </div>
              </div>
              <button onClick={() => removeReading(reading.id)} className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedReadingsScreen;
