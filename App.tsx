
import React, { useState, useCallback } from 'react';
import { Screen, NavigationParams } from './types';
import HomeScreen from './screens/HomeScreen';
import DailyReadingScreen from './screens/DailyReadingScreen';
import QuickQuestionsScreen from './screens/QuickQuestionsScreen';
import AreaReadingsScreen from './screens/AreaReadingsScreen';
import SpecificAreaReadingScreen from './screens/SpecificAreaReadingScreen';
import WeeklyReadingScreen from './screens/WeeklyReadingScreen';
import SavedReadingsScreen from './screens/SavedReadingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { SavedReadingsProvider } from './hooks/useSavedReadings';
import { UserProfileProvider } from './hooks/useUserProfile';
import ArcanaLibraryScreen from './screens/ArcanaLibraryScreen';
import ArcanaDetailScreen from './screens/ArcanaDetailScreen';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginScreen from './screens/LoginScreen';
import LoadingSpinner from './components/LoadingSpinner';

const getBackgroundClass = (screen: Screen): string => {
  const readingScreens: Screen[] = [
    'dailyReading',
    'quickQuestions',
    'areaReadings',
    'specificAreaReading',
    'weeklyReading',
    'savedReadings',
    'arcanaLibrary',
    'arcanaDetail',
  ];

  if (screen === 'home') return 'bg-home';
  if (screen === 'profile') return 'bg-profile';
  if (readingScreens.includes(screen)) return 'bg-reading';

  return 'bg-home'; // Default background
};


const AppContent: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [params, setParams] = useState<NavigationParams>({});

  const navigate = useCallback((newScreen: Screen, newParams: NavigationParams = {}) => {
    setScreen(newScreen);
    setParams(newParams);
    window.scrollTo(0, 0);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen navigate={navigate} />;
      case 'dailyReading':
        return <DailyReadingScreen navigate={navigate} />;
      case 'quickQuestions':
        return <QuickQuestionsScreen navigate={navigate} />;
      case 'areaReadings':
        return <AreaReadingsScreen navigate={navigate} />;
      case 'specificAreaReading':
        return <SpecificAreaReadingScreen navigate={navigate} params={params} />;
      case 'weeklyReading':
        return <WeeklyReadingScreen navigate={navigate} />;
      case 'savedReadings':
        return <SavedReadingsScreen navigate={navigate} />;
      case 'profile':
        return <ProfileScreen navigate={navigate} />;
      case 'arcanaLibrary':
        return <ArcanaLibraryScreen navigate={navigate} />;
      case 'arcanaDetail':
        return <ArcanaDetailScreen navigate={navigate} params={params} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };
  
  const backgroundClass = getBackgroundClass(screen);

  return (
    <div className={`bg-dynamic-container min-h-screen text-brand-light font-sans ${backgroundClass}`}>
      <div className="container mx-auto p-4 max-w-4xl">
        {renderScreen()}
      </div>
    </div>
  );
};

const AuthGate: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-dynamic-container bg-home min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <AppContent />;
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SavedReadingsProvider>
        <UserProfileProvider>
          <AuthGate />
        </UserProfileProvider>
      </SavedReadingsProvider>
    </AuthProvider>
  );
};

export default App;
