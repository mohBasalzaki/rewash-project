import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { AppStateProvider, useAppState } from '../contexts/AppStateContext';
import { DataProvider } from '../contexts/DataContext';
import Header from '../components/Header';
import ProjectReservationsSection from '../components/ProjectReservationsSection';
import LoginSection from '../components/LoginSection';
import OTPSection from '../components/OTPSection';
import PersonalDataSection from '../components/PersonalDataSection';
import VehicleInformationSection from '../components/VehicleInformationSection';
import ServiceSection from '../components/ServiceSection';
import PaymentSection from '../components/PaymentSection';
import PaymentSuccessSection from '../components/PaymentSuccessSection';
import Footer from '../components/Footer';

const AppContent = () => {
  const { isRTL } = useLanguage();
  const { currentSection } = useAppState();

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isRTL ? 'ar' : 'en');
  
    const script = document.createElement("script");
    script.src = "/js/main.js";
    script.async = true;
    document.body.appendChild(script);
  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = isRTL ? '/css/main.rtl.css' : '/css/main.css';
    document.head.appendChild(link);
  
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [isRTL]);
  

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'project-reservations':
        return <ProjectReservationsSection />;
      case 'login':
        return <LoginSection />;
      case 'otp':
        return <OTPSection />;
      case 'personal-data':
        return <PersonalDataSection />;
      case 'vehicle-information':
        return <VehicleInformationSection />;
      case 'service':
        return <ServiceSection />;
      case 'payment':
        return <PaymentSection />;
      case 'payment-success':
        return <PaymentSuccessSection />;
      default:
        return <ProjectReservationsSection />;
    }
  };

  return (
    <div 
      className="d-flex flex-column bg-body-tertiary justify-content-between min-vh-100"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <link rel="stylesheet" href="../public/css/bundle.css" />
      
      <Header />

      <main className="my-3">
        <div className="container">
          <div className="card border-0 shadow-sm">
            {renderCurrentSection()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <DataProvider>
        <AppStateProvider>
          <AppContent />
        </AppStateProvider>
      </DataProvider>
    </LanguageProvider>
  );
};

export default Index;
