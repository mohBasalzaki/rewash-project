
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
  getProgressPercentage: () => number;
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

  const getProgressPercentage = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    // لا نعرض شريط التقدم في القسم الأول والأخير
    if (currentIndex <= 1) return 0;
    if (currentIndex >= sectionOrder.length - 1) return 100;
    
    // حساب النسبة للأقسام من personal-data إلى payment
    const progressSections = sectionOrder.slice(3, 7); // personal-data, vehicle-information, service, payment
    const progressIndex = progressSections.indexOf(currentSection);
    return ((progressIndex + 1) / progressSections.length) * 100;
  };

  return (
    <AppStateContext.Provider value={{ 
      currentSection, 
      setCurrentSection, 
      nextSection, 
      getProgressPercentage 
    }}>
      {children}
    </AppStateContext.Provider>
  );
};
