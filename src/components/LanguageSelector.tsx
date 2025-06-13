
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="position-absolute top-0 end-0 m-3">
      <select 
        className="form-select form-select-sm"
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'ar' | 'en')}
      >
        <option value="ar">{t('arabic')}</option>
        <option value="en">{t('english')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
