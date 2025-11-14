
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { UserProfile, TarotCard } from '../types';
import { calculateBirthArcana } from '../utils/arcanaCalculator';

interface UserProfileContextType {
  profile: UserProfile | null;
  saveProfile: (profile: UserProfile) => void;
  birthArcana: TarotCard | null;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('userProfile');
      if (item) {
        setProfile(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to load user profile from localStorage", error);
    }
  }, []);

  const saveProfile = (newProfile: UserProfile) => {
    try {
      window.localStorage.setItem('userProfile', JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error("Failed to save profile to localStorage", error);
    }
  };
  
  const birthArcana = useMemo(() => {
    if (profile?.dob) {
      return calculateBirthArcana(profile.dob);
    }
    return null;
  }, [profile?.dob]);

  // Fix: Replaced JSX with React.createElement to avoid parsing errors in a .ts file.
  return React.createElement(
    UserProfileContext.Provider,
    { value: { profile, saveProfile, birthArcana } },
    children
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
