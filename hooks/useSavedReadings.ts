import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SavedReading } from '../types';

interface SavedReadingsContextType {
  savedReadings: SavedReading[];
  addReading: (reading: Omit<SavedReading, 'id' | 'date'>) => void;
  removeReading: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedReadingsContext = createContext<SavedReadingsContextType | undefined>(undefined);

export const SavedReadingsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [savedReadings, setSavedReadings] = useState<SavedReading[]>([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('savedTarotReadings');
      if (item) {
        setSavedReadings(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load saved readings from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('savedTarotReadings', JSON.stringify(savedReadings));
    } catch (error) {
      console.error("Failed to save readings to localStorage", error);
    }
  }, [savedReadings]);

  const addReading = useCallback((reading: Omit<SavedReading, 'id' | 'date'>) => {
    const newReading: SavedReading = {
      ...reading,
      id: `${reading.type}-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setSavedReadings(prev => [newReading, ...prev]);
  }, []);

  const removeReading = useCallback((id: string) => {
    setSavedReadings(prev => prev.filter(r => r.id !== id));
  }, []);

  const isSaved = useCallback((id: string) => {
    return savedReadings.some(r => r.id === id);
  }, [savedReadings]);

  // Fix: Replaced JSX with React.createElement to avoid parsing errors in a .ts file.
  return React.createElement(
    SavedReadingsContext.Provider,
    { value: { savedReadings, addReading, removeReading, isSaved } },
    children
  );
};

export const useSavedReadings = (): SavedReadingsContextType => {
  const context = useContext(SavedReadingsContext);
  if (context === undefined) {
    throw new Error('useSavedReadings must be used within a SavedReadingsProvider');
  }
  return context;
};
