
import React from 'react';
import { Screen } from '../types';
import { BackIcon } from './Icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <header className="flex items-center mb-6 md:mb-8 relative">
      {onBack && (
        <button 
          onClick={onBack} 
          className="absolute left-0 p-2 -ml-2 text-brand-gold hover:text-yellow-300 transition-colors"
          aria-label="Voltar"
        >
          <BackIcon className="w-6 h-6" />
        </button>
      )}
      <h1 className="w-full text-center font-serif text-3xl md:text-4xl text-brand-gold tracking-wider">
        {title}
      </h1>
    </header>
  );
};

export default Header;
