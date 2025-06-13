
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const VehicleInformationSection = () => {
  const { t } = useLanguage();

  return (
    <section id="vehicle-information-section" className="m-0">
      <div className="card-body text-center">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-start">
            <h1 className="fs-4 fw-bold m-0">{t('vehicleInfo')}</h1>
            <p className="text-body-secondary m-0">{t('vehicleInfoDesc')}</p>
          </div>

          <a href="#" className="btn btn-outline-primary">
            {t('myReservations')}
          </a>
        </div>

        <div className="progress mb-3" role="progressbar" aria-label="Basic example" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar rounded" style={{ width: '50%' }}></div>
        </div>

        <form>
          <div className="text-start mb-3">
            <label className="form-label">{t('brand')}</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>{t('toyota')}</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('color')}</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>{t('blueColor')}</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('plateNumber')}</label>
            <input 
              type="number" 
              className="form-control text-start" 
              placeholder={t('plateNumberPlaceholder')}
            />
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('notes')}</label>
            <textarea 
              className="form-control" 
              placeholder={t('notesPlaceholder')} 
              rows={3}
            ></textarea>
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('attachImage')}</label>
            <input className="form-control" type="file" accept="image/*" />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {t('next')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VehicleInformationSection;
