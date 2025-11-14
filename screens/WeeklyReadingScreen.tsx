import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProps, TarotCard } from '../types';
import { useTarotData } from '../hooks/useTarotData';
import { getWeeklyReading } from '../services/geminiService';
import Header from '../components/Header';
import TarotCardDisplay from '../components/TarotCardDisplay';
import ActionButton from '../components/ActionButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSavedReadings } from '../hooks/useSavedReadings';
import { SaveIcon, SavedIcon } from '../components/Icons';

interface Interpretation {
  resumoSemana: string;
  conselhoSemana: string;
}

const WeeklyReadingScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [areFlipped, setAreFlipped] = useState(false);
  const [readingId, setReadingId] = useState('');

  const { drawRandomCards } = useTarotData();
  const { addReading, isSaved } = useSavedReadings();

  const fetchReading = useCallback(async () => {
    setIsLoading(true);
    setAreFlipped(false);
    setInterpretation(null);
    const drawnCards = drawRandomCards(3);
    setCards(drawnCards);
    setReadingId(`weekly-${drawnCards.map(c => c.name).join('-')}-${Date.now()}`);

    const result = await getWeeklyReading(drawnCards.map(c => c.name));
    setTimeout(() => {
        setAreFlipped(true);
        if (result) {
            setInterpretation(result);
        }
        setIsLoading(false);
    }, 500); // Delay for flip animation
  }, [drawRandomCards]);

  useEffect(() => {
    fetchReading();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    if (cards.length > 0 && interpretation && !isSaved(readingId)) {
      addReading({
        type: 'weekly',
        title: 'Tiragem da Semana',
        cards: cards,
        interpretation: interpretation,
      });
    }
  };

  return (
    <div>
      <Header title="Tiragem da Semana" onBack={() => navigate('home')} />
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            {cards.map((card) => (
                <TarotCardDisplay 
                key={card.name} 
                name={card.name} 
                image={card.image}
                isFlipped={areFlipped}
                />
            ))}
        </div>

        {isLoading && !interpretation && <LoadingSpinner />}
        
        {interpretation && (
          <div className="mt-8 text-center max-w-2xl animate-fade-in space-y-6">
            <div>
                <h2 className="font-serif text-2xl text-brand-gold mb-2">Resumo da Semana</h2>
                <p className="text-gray-300">{interpretation.resumoSemana}</p>
            </div>
            <div>
                <h2 className="font-serif text-2xl text-brand-gold mb-2">Conselho</h2>
                <p className="text-gray-300">{interpretation.conselhoSemana}</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <ActionButton onClick={fetchReading}>Nova Tiragem</ActionButton>
          {cards.length > 0 && interpretation && (
            <ActionButton onClick={handleSave} disabled={isSaved(readingId)} variant="secondary" className="flex items-center gap-2">
              {isSaved(readingId) ? <SavedIcon /> : <SaveIcon />}
              {isSaved(readingId) ? 'Salva' : 'Salvar'}
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyReadingScreen;
