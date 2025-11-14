
import React, { useState, useEffect, useMemo } from 'react';
import { NavigationProps } from '../types';
import { getArcanaDetails } from '../services/geminiService';
import { useTarotData } from '../hooks/useTarotData';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import TarotCardDisplay from '../components/TarotCardDisplay';

interface ArcanaDetails {
  significadoGeral: string;
  amor: string;
  trabalho: string;
  saude: string;
  dinheiro: string;
  conselho: string;
}

const ArcanaDetailScreen: React.FC<NavigationProps> = ({ navigate, params }) => {
  const { cardName } = params || {};
  const [details, setDetails] = useState<ArcanaDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { allCards } = useTarotData();
  const card = useMemo(() => allCards.find(c => c.name === cardName), [allCards, cardName]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (cardName) {
        setIsLoading(true);
        const result = await getArcanaDetails(cardName);
        setDetails(result);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [cardName]);

  if (!card) {
    return (
      <div>
        <Header title="Erro" onBack={() => navigate('arcanaLibrary')} />
        <p>Carta não encontrada.</p>
      </div>
    );
  }

  return (
    <div>
      <Header title={card.name} onBack={() => navigate('arcanaLibrary')} />
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 flex justify-center">
            <TarotCardDisplay name={card.name} image={card.image} isFlipped={true}/>
        </div>
        <div className="w-full md:w-2/3">
          {isLoading ? (
            <LoadingSpinner />
          ) : details ? (
            <div className="space-y-6">
              <DetailSection title="Significado Geral" content={details.significadoGeral} />
              <DetailSection title="Amor" content={details.amor} />
              <DetailSection title="Trabalho" content={details.trabalho} />
              <DetailSection title="Saúde" content={details.saude} />
              <DetailSection title="Dinheiro" content={details.dinheiro} />
              <DetailSection title="Conselho" content={details.conselho} />
            </div>
          ) : (
            <p>Não foi possível carregar os detalhes da carta.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailSection: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div>
    <h2 className="font-serif text-xl text-brand-gold border-b-2 border-brand-gold/30 pb-1 mb-2">{title}</h2>
    <p className="text-gray-300 font-sans">{content}</p>
  </div>
);

export default ArcanaDetailScreen;
