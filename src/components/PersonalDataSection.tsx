
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PersonalDataSection = () => {
  const { t } = useLanguage();

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

        <div className="progress mb-3" role="progressbar" aria-label="Basic example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar rounded" style={{ width: '25%' }}></div>
        </div>

        <form>
          <div className="text-start mb-3">
            <label className="form-label">
              {t('name')} <span className="text-danger">{t('required')}</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t('namePlaceholder')}
              name="full-name"
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
              required
            />
          </div>

          <div className="row g-3">
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('carLocation')}</label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>{t('outsideParking')}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>

            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('zone')}</label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>T3</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
