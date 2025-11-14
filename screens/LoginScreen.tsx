import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ActionButton from '../components/ActionButton';

const LoginScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    setError('');
    login({ name, email });
  };

  return (
    <div className="bg-dynamic-container bg-home min-h-screen flex flex-col items-center justify-center text-brand-light font-sans">
       <div className="container mx-auto p-4 max-w-sm text-center">
         <header className="mb-8">
            <h1 
            className="font-serif text-6xl text-brand-gold tracking-widest"
            style={{ textShadow: '0 2px 5px rgba(250, 204, 21, 0.3)' }}
            >
            Tarom
            </h1>
            <p className="text-gray-300 mt-2 font-sans">Bem-vindo(a) ao seu oráculo pessoal.</p>
        </header>

        <form onSubmit={handleSubmit} className="w-full bg-brand-purple/30 p-8 rounded-lg space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 text-left mb-1">Seu Nome</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                    placeholder="Como podemos te chamar?"
                />
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left mb-1">Seu E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                    placeholder="seu@email.com"
                />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <ActionButton type="submit" className="w-full">Entrar</ActionButton>
        </form>
       </div>
    </div>
  );
};

export default LoginScreen;
