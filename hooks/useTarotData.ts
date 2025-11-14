
import { useCallback } from 'react';
import { MAJOR_ARCANA } from '../constants';
import { TarotCard } from '../types';

export const useTarotData = () => {
  const drawRandomCards = useCallback((count: number): TarotCard[] => {
    const shuffled = [...MAJOR_ARCANA].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, []);

  return { drawRandomCards, allCards: MAJOR_ARCANA };
};
