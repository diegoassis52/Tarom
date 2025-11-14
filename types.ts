
export interface TarotCard {
  name: string;
  image: string;
}

export interface SavedReading {
  id: string;
  type: string;
  title: string;
  cards: TarotCard[];
  interpretation: any;
  date: string;
}

export type Screen = 
  | 'home'
  | 'dailyReading'
  | 'quickQuestions'
  | 'areaReadings'
  | 'specificAreaReading'
  | 'weeklyReading'
  | 'savedReadings'
  | 'profile'
  // Fix: Add arcana screens to enable navigation.
  | 'arcanaLibrary'
  | 'arcanaDetail';

export interface NavigationParams {
  [key: string]: any;
}

export interface NavigationProps {
  navigate: (screen: Screen, params?: NavigationParams) => void;
  params?: NavigationParams;
}

export interface UserProfile {
    name: string;
    dob: string; // YYYY-MM-DD
    photo?: string;
}

export interface User {
  name: string;
  email: string;
}

// Fix: Added Spread interface to create a consistent type for area readings.
export interface Spread {
  title: string;
  cards: number;
  positions?: string[];
}