
import React, { useState, useEffect } from 'react';
import { NavigationProps } from '../types';
import { useUserProfile } from '../hooks/useUserProfile';
import { getPersonalArcanaInterpretation } from '../services/geminiService';
import Header from '../components/Header';
import ActionButton from '../components/ActionButton';
import LoadingSpinner from '../components/LoadingSpinner';
import TarotCardDisplay from '../components/TarotCardDisplay';
import { EditIcon, UserIcon } from '../components/Icons';
import { useAuth } from '../hooks/useAuth';

interface Interpretation {
  forcas: string;
  desafios: string;
  conselho: string;
}

const ProfileScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const { user } = useAuth();
  const { profile, saveProfile, birthArcana } = useUserProfile();
  const [isEditing, setIsEditing] = useState(!profile);
  const [formData, setFormData] = useState({
    name: profile?.name || user?.name || '',
    dob: profile?.dob || '',
  });
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
        setFormData({ name: profile.name, dob: profile.dob });
        setIsEditing(false);
    } else {
        setIsEditing(true);
        if (user) {
            setFormData(prev => ({ ...prev, name: user.name }));
        }
    }
  }, [profile, user]);

  useEffect(() => {
    const fetchInterpretation = async () => {
      if (birthArcana && profile) {
        setIsLoading(true);
        const result = await getPersonalArcanaInterpretation(birthArcana.name, profile.name);
        setInterpretation(result);
        setIsLoading(false);
      }
    };
    if(!isEditing) {
        fetchInterpretation();
    }
  }, [birthArcana, profile, isEditing]);

  const handleSave = () => {
    saveProfile(formData);
    setIsEditing(false);
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <Header title="Meu Perfil" onBack={() => navigate('home')} />
      
      {isEditing ? (
        <div className="bg-brand-purple/30 p-6 rounded-lg max-w-md mx-auto">
            <h2 className="font-serif text-2xl text-brand-gold mb-4 text-center">Seus Dados</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome</label>
                    <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-1 block w-full bg-brand-dark border border-brand-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                    />
                </div>
                 <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-300">Data de Nascimento</label>
                    <input 
                        type="date" 
                        id="dob"
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className="mt-1 block w-full bg-brand-dark border border-brand-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
                    />
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                 <ActionButton onClick={handleSave} disabled={!formData.name || !formData.dob}>Salvar Perfil</ActionButton>
            </div>
        </div>
      ) : profile ? (
        <div className="flex flex-col items-center">
            <div className="relative bg-brand-purple/30 p-6 rounded-lg w-full max-w-md mb-8">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center">
                        <UserIcon className="w-10 h-10 text-brand-gold" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif text-white">{profile.name}</h2>
                        <p className="text-brand-gold">{formatDate(profile.dob)}</p>
                    </div>
                </div>
                <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <EditIcon />
                </button>
            </div>

            {birthArcana ? (
                <div className="w-full flex flex-col items-center">
                    <h2 className="font-serif text-3xl text-brand-gold mb-4">Seu Arcano de Nascimento</h2>
                    <TarotCardDisplay name={birthArcana.name} image={birthArcana.image} isFlipped={true} />
                    
                    {isLoading ? <LoadingSpinner /> : interpretation && (
                        <div className="mt-8 p-6 bg-brand-purple/30 rounded-lg max-w-2xl w-full text-center space-y-6">
                           <DetailSection title="Suas Forças" content={interpretation.forcas} />
                           <DetailSection title="Seus Desafios" content={interpretation.desafios} />
                           <DetailSection title="Conselho para Equilíbrio" content={interpretation.conselho} />
                        </div>
                    )}
                </div>
            ) : <p className="text-gray-400">Insira uma data de nascimento válida para ver seu arcano.</p>}

        </div>
      ) : null}

    </div>
  );
};

const DetailSection: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div>
    <h3 className="font-serif text-xl text-brand-gold border-b-2 border-brand-gold/30 pb-1 mb-2">{title}</h3>
    <p className="text-gray-300 font-sans">{content}</p>
  </div>
);

export default ProfileScreen;
