
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { useData } from '../contexts/DataContext';
import ProgressBar from './ProgressBar';

const PersonalDataSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();
  const { projectData, loading } = useData();
  
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [carLocation, setCarLocation] = useState('');
  const [zone, setZone] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Personal Data:', {
      name,
      phoneNumber,
      address,
      carLocation,
      zone
    });
    nextSection();
  };

  // Helper functions to get attributes
  const getCarLocationOptions = () => {
    return projectData?.attributes.find(attr => attr.name === 'موقع السيارة')?.values || [];
  };

  const getZoneOptions = () => {
    return projectData?.attributes.find(attr => attr.name === 'المنطقة')?.values || [];
  };

  if (loading) {
    return (
      <section id="personal-data-section" className="m-0">
        <div className="card-body text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="personal-data-section" className="m-0">
      <div className="card-body text-center">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-start">
            <h1 className="fs-4 fw-bold m-0">{t('personalData')}</h1>
            <p className="text-body-secondary m-0">{t('personalDataDesc')}</p>
          </div>

          <a href="#" className="btn btn-outline-primary">
            {t('myReservations')}
          </a>
        </div>

        <ProgressBar />

        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
            <label className="form-label">
              {t('name')} <span className="text-danger">{t('required')}</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t('namePlaceholder')}
              name="full-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="text-start mb-3">
            <label className="form-label">
              {t('phoneNumber')} <span className="text-danger">{t('required')}</span>
            </label>
            <input
              type="tel"
              className="form-control text-start"
              placeholder={t('phonePlaceholder')}
              pattern="05[0-9]{8}"
              maxLength={10}
              title="يجب كتابة 10 أرقام وتبدأ بـ 05"
              name="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="text-start mb-3">
            <label className="form-label">
              {t('address')} <span className="text-danger">{t('required')}</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t('addressPlaceholder')}
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="row g-3">
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('carLocation')}</label>
                <select 
                  className="form-select"
                  value={carLocation}
                  onChange={(e) => setCarLocation(e.target.value)}
                  required
                >
                  <option value="">{t('selectCarLocation') || 'اختر موقع السيارة'}</option>
                  {getCarLocationOptions().map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('zone')}</label>
                <select 
                  className="form-select"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  required
                >
                  <option value="">{t('selectZone') || 'اختر المنطقة'}</option>
                  {getZoneOptions().map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            {t('next')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PersonalDataSection;
