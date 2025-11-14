import React from 'react';
import { NavigationProps } from '../types';
import ActionButton from '../components/ActionButton';

const HomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center py-10">
      <header className="mb-10 text-center">
        <h1 
          className="font-serif text-6xl md:text-7xl text-brand-gold tracking-widest"
          style={{ textShadow: '0 2px 5px rgba(250, 204, 21, 0.3)' }}
        >
          Tarom
        </h1>
        <p className="text-gray-300 mt-3 font-sans text-lg">
          Tiragens rápidas e intuitivas para o seu dia a dia.
        </p>
      </header>

      <div className="w-48 h-px bg-brand-gold/50 mb-10"></div>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
        <ActionButton className="w-full" onClick={() => navigate('dailyReading')}>
          Tiragem do Dia
        </ActionButton>
        <ActionButton className="w-full" onClick={() => navigate('weeklyReading')}>
          Tiragem da Semana
        </ActionButton>
        <ActionButton className="w-full" onClick={() => navigate('quickQuestions')}>
          Perguntas Rápidas
        </ActionButton>
        <ActionButton className="w-full" onClick={() => navigate('areaReadings')}>
          Tiragens por Área
        </ActionButton>
         <ActionButton className="w-full" variant="secondary" onClick={() => navigate('savedReadings')}>
          Leituras Salvas
        </ActionButton>
         <ActionButton className="w-full" variant="secondary" onClick={() => navigate('profile')}>
          Meu Perfil
        </ActionButton>
      </main>
    </div>
  );
};

export default HomeScreen;