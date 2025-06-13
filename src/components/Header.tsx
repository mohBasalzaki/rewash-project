
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="text-center position-relative p-md-3 p-2">
      <LanguageSelector />
      <a href="#">
        <img 
          src="https://mohamedalzaki.com/rewash/image/logo.svg" 
          width="120" 
          alt={t('logo')}
        />
      </a>
    </header>
  );
};

export default Header;
