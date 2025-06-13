
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="p-md-3 p-2">
      <div className="text-center">
        <small>
          {t('allRightsReserved')} <span>{t('rewash')}</span> © 2025
        </small>
      </div>
    </footer>
  );
};

export default Footer;
