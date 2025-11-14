
import React, { useState, useCallback } from 'react';
import { NavigationProps, TarotCard } from '../types';
import { QUICK_QUESTIONS } from '../constants';
import { useTarotData } from '../hooks/useTarotData';
import { getQuickAnswer } from '../services/geminiService';
import Header from '../components/Header';
import TarotCardDisplay from '../components/TarotCardDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import ActionButton from '../components/ActionButton';

const QuickQuestionsScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [card, setCard] = useState<TarotCard | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const { drawRandomCards } = useTarotData();

  const handleQuestionSelect = useCallback(async (question: string) => {
    setSelectedQuestion(question);
    setIsLoading(true);
    setCard(null);
    setAnswer(null);
    setIsFlipped(false);

    const drawnCard = drawRandomCards(1)[0];
    setCard(drawnCard);

    const result = await getQuickAnswer(question, drawnCard.name);
    setTimeout(() => {
        setIsFlipped(true);
        setAnswer(result);
        setIsLoading(false);
    }, 500);
  }, [drawRandomCards]);

  const reset = () => {
    setSelectedQuestion(null);
    setCard(null);
    setAnswer(null);
    setIsFlipped(false);
  }

  return (
    <div>
      <Header title="Perguntas Rápidas" onBack={() => navigate('home')} />
      {!selectedQuestion && (
        <div className="space-y-4">
          <p className="text-center text-gray-300 mb-6">Selecione uma pergunta para receber uma resposta rápida do tarô.</p>
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleQuestionSelect(q)}
              className="w-full text-left p-4 bg-brand-purple rounded-lg hover:bg-brand-purple-light transition-colors text-brand-light font-semibold"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {selectedQuestion && (
        <div className="flex flex-col items-center">
          <p className="text-center text-brand-gold font-serif text-xl mb-6">"{selectedQuestion}"</p>
          
          {card && <TarotCardDisplay name={card.name} image={card.image} isFlipped={isFlipped} />}
          
          {isLoading && <LoadingSpinner />}

          {answer && (
            <div className="mt-8 text-center max-w-xl bg-brand-purple/30 p-4 rounded-lg">
              <p className="text-gray-200">{answer}</p>
            </div>
          )}

          <ActionButton onClick={reset} className="mt-8">
            Fazer Outra Pergunta
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default QuickQuestionsScreen;
