import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import ProgressBar from './ProgressBar';

const ServiceSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextSection();
  };

  return (
    <section id="service-section" className="m-0">
      <div className="card-body text-center">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-start">
            <h1 className="fs-4 fw-bold m-0">{t('service')}</h1>
            <p className="text-body-secondary m-0">{t('serviceDesc')}</p>
          </div>

          <a href="#" className="btn btn-outline-primary">
            {t('myReservations')}
          </a>
        </div>

        <ProgressBar />

        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
            <label className="form-label">{t('serviceType')}</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>{t('insideOutside')}</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="row g-3">
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('selectDate')}</label>
                <input type="date" className="form-control text-start" required />
              </div>
            </div>
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('selectTime')}</label>
                <input type="time" className="form-control text-start" required />
              </div>
            </div>
          </div>

          <label className="form-label fw-bold text-start w-100 mb-3">
            {t('additionalServices')}
          </label>
          
          <div className="row g-3">
            <div className="col mb-3">
              <label className="d-flex btn border rounded position-relative align-items-center p-3 m-0">
                <img 
                  src="https://mohamedalzaki.com/rewash/image/services_icon.webp" 
                  width="70"
                  alt=""
                />

                <div className="text-start ms-3">
                  <label className="form-check-label">{t('floorCovering')}</label>
                  <div className="d-flex justify-content-between">
                    <span className="text-body">8 {t('riyal')}</span>
                    <span className="text-body-tertiary text-decoration-line-through ms-3">
                      10 {t('riyal')}
                    </span>
                  </div>
                </div>

                <input 
                  className="form-check-input position-absolute rounded p-3 m-3" 
                  type="checkbox" 
                  value="" 
                  defaultChecked
                />
              </label>
            </div>

            <div className="col mb-3">
              <label className="d-flex btn border rounded position-relative align-items-center p-3 m-0">
                <img 
                  src="https://mohamedalzaki.com/rewash/image/services_icon.webp" 
                  width="70"
                  alt=""
                />

                <div className="text-start ms-3">
                  <label className="form-check-label">{t('tissues')}</label>
                  <div className="d-flex justify-content-between">
                    <span className="text-body">8 {t('riyal')}</span>
                    <span className="text-body-tertiary text-decoration-line-through ms-3">
                      10 {t('riyal')}
                    </span>
                  </div>
                </div>

                <input 
                  className="form-check-input position-absolute rounded p-3 m-3" 
                  type="checkbox" 
                  value=""
                />
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center bg-body-tertiary border rounded p-3 mb-3">
            <h6 className="fw-bold m-0">{t('total')}</h6>
            <h6 className="fw-bold m-0">100 {t('riyal')}</h6>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {t('next')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ServiceSection;
