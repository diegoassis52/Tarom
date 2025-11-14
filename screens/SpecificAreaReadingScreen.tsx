
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProps, TarotCard } from '../types';
import { AREA_READINGS } from '../constants';
import { useTarotData } from '../hooks/useTarotData';
import { getAreaReadingInterpretation } from '../services/geminiService';
import Header from '../components/Header';
import TarotCardDisplay from '../components/TarotCardDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import ActionButton from '../components/ActionButton';

const SpecificAreaReadingScreen: React.FC<NavigationProps> = ({ navigate, params }) => {
  const { areaKey, spreadTitle } = params || {};
  const area = AREA_READINGS[areaKey as keyof typeof AREA_READINGS];
  const spread = area?.spreads.find(s => s.title === spreadTitle);

  const [cards, setCards] = useState<TarotCard[]>([]);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [areFlipped, setAreFlipped] = useState(false);

  const { drawRandomCards } = useTarotData();

  const fetchReading = useCallback(async () => {
    if (!spread) return;
    setIsLoading(true);
    setInterpretation(null);
    setAreFlipped(false);

    const drawnCards = drawRandomCards(spread.cards);
    setCards(drawnCards);
    
    const cardDetails = drawnCards.map((card, index) => ({
      name: card.name,
      position: spread.positions?.[index],
    }));

    const result = await getAreaReadingInterpretation(area.title, spread.title, cardDetails);
    
    setTimeout(() => {
        setAreFlipped(true);
        setInterpretation(result);
        setIsLoading(false);
    }, 500);

  }, [spread, drawRandomCards, area.title]);

  useEffect(() => {
    fetchReading();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaKey, spreadTitle]);

  if (!spread) {
    return (
      <div>
        <Header title="Erro" onBack={() => navigate('areaReadings')} />
        <p>Tiragem não encontrada. Por favor, volte e tente novamente.</p>
      </div>
    );
  }

  return (
    <div>
      <Header title={spread.title} onBack={() => navigate('areaReadings')} />
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {cards.map((card, index) => (
            <TarotCardDisplay 
              key={card.name} 
              name={card.name} 
              image={card.image}
              title={spread.positions?.[index]}
              isFlipped={areFlipped}
            />
          ))}
        </div>

        {isLoading && <LoadingSpinner />}
        
        {interpretation && (
          <div className="mt-4 text-center max-w-2xl bg-brand-purple/30 p-6 rounded-lg">
             <h2 className="font-serif text-2xl text-brand-gold mb-4">Interpretação</h2>
            <p className="text-gray-200 whitespace-pre-line">{interpretation}</p>
          </div>
        )}

        <div className="mt-8">
            <ActionButton onClick={fetchReading}>Nova Tiragem</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default SpecificAreaReadingScreen;
