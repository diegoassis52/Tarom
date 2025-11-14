import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProps, TarotCard } from '../types';
import { useTarotData } from '../hooks/useTarotData';
import { getDailyReading } from '../services/geminiService';
import Header from '../components/Header';
import TarotCardDisplay from '../components/TarotCardDisplay';
import ActionButton from '../components/ActionButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSavedReadings } from '../hooks/useSavedReadings';
import { SaveIcon, SavedIcon } from '../components/Icons';

interface Interpretation {
  significadoGeral: string;
  conselhoPratico: string;
}

const DailyReadingScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [readingId, setReadingId] = useState('');

  const { drawRandomCards } = useTarotData();
  const { addReading, isSaved } = useSavedReadings();

  const fetchReading = useCallback(async () => {
    setIsLoading(true);
    setIsFlipped(false);
    setInterpretation(null);
    const drawnCard = drawRandomCards(1)[0];
    setCard(drawnCard);
    setReadingId(`daily-${drawnCard.name}-${Date.now()}`);

    const result = await getDailyReading(drawnCard.name);
    setTimeout(() => {
        setIsFlipped(true);
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
    if (card && interpretation && !isSaved(readingId)) {
      // Fix: Removed `id` and `date` properties to match the type signature of `addReading`.
      addReading({
        type: 'daily',
        title: 'Tiragem do Dia',
        cards: [card],
        interpretation: interpretation,
      });
    }
  };

  return (
    <div>
      <Header title="Tiragem do Dia" onBack={() => navigate('home')} />
      <div className="flex flex-col items-center">
        {card && <TarotCardDisplay name={card.name} image={card.image} isFlipped={isFlipped} />}

        {isLoading && !interpretation && <LoadingSpinner />}
        
        {interpretation && (
          <div className="mt-8 text-center max-w-xl animate-fade-in">
            <h2 className="font-serif text-2xl text-brand-gold mb-2">Significado Geral</h2>
            <p className="text-gray-300 mb-6">{interpretation.significadoGeral}</p>
            <h2 className="font-serif text-2xl text-brand-gold mb-2">Conselho Prático</h2>
            <p className="text-gray-300">{interpretation.conselhoPratico}</p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <ActionButton onClick={fetchReading}>Nova Tiragem</ActionButton>
          {card && interpretation && (
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

export default DailyReadingScreen;