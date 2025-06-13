import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';

const PaymentSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextSection();
  };

  return (
    <section id="payment-section" className="m-0">
      <div className="card-body text-center">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-start">
            <h1 className="fs-4 fw-bold m-0">{t('payment')}</h1>
            <p className="text-body-secondary m-0">{t('paymentDesc')}</p>
          </div>

          <a href="#" className="btn btn-outline-primary">
            {t('myReservations')}
          </a>
        </div>

        <div className="progress mb-3" role="progressbar" aria-label="Basic example" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar rounded" style={{ width: '95%' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
            <label htmlFor="cardNumber" className="form-label">{t('cardNumber')}</label>
            <input 
              type="number" 
              className="form-control text-start" 
              id="cardNumber" 
              placeholder={t('cardNumberPlaceholder')}
            />
          </div>
    
          <div className="row g-3">
            <div className="col text-start mb-3">
              <label htmlFor="expiryDate" className="form-label">{t('expiryDate')}</label>
              <input 
                type="date" 
                className="form-control text-start" 
                id="expiryDate"
              />
            </div>

            <div className="col text-start mb-3">
              <label htmlFor="cvv" className="form-label">{t('cvv')}</label>
              <input 
                type="number" 
                className="form-control text-start" 
                id="cvv" 
                placeholder={t('cvvPlaceholder')}
              />
            </div>
          </div>

          <div className="text-start mb-3">
            <label htmlFor="fullName" className="form-label">{t('nameOnCard')}</label>
            <input 
              type="text" 
              className="form-control" 
              id="fullName" 
              placeholder={t('nameOnCardPlaceholder')}
            />
          </div>
    
          <button type="submit" className="btn btn-primary w-100">
            {t('pay')}
          </button>

          <div className="text-body-tertiary text-center p-3">
            {t('securePayment')}
          </div>
        </form>
      </div>
    </section>
  );
};

export default PaymentSection;
