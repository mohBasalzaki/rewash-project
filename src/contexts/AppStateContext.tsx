
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Section = 
  | 'project-reservations'
  | 'login'
  | 'otp'
  | 'personal-data'
  | 'vehicle-information'
  | 'service'
  | 'payment'
  | 'payment-success';

interface AppStateContextType {
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  nextSection: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<Section>('project-reservations');

  const sectionOrder: Section[] = [
    'project-reservations',
    'login',
    'otp',
    'personal-data',
    'vehicle-information',
    'service',
    'payment',
    'payment-success'
  ];

  const nextSection = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex < sectionOrder.length - 1) {
      setCurrentSection(sectionOrder[currentIndex + 1]);
    }
  };

  return (
    <AppStateContext.Provider value={{ currentSection, setCurrentSection, nextSection }}>
      {children}
    </AppStateContext.Provider>
  );
};
