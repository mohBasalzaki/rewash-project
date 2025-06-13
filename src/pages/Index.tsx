
import React from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { AppStateProvider, useAppState } from '../contexts/AppStateContext';
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
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <Header />

      <main className="my-3">
        <div className="container">
          <div className="card border-0 shadow-sm">
            {renderCurrentSection()}
          </div>
        </div>
      </main>
      
      <Footer />

      <style>{`
        .otp-input {
          width: 100px;
          height: 100px;
          margin: 5px;
          text-align: center;
        }

        .form-check-input {
          right: auto;
          left: 0;
        }

        @media (max-width: 576px) {
          .otp-input {
            width: 50px;
            height: 50px;
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </LanguageProvider>
  );
};

export default Index;
