
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PaymentSuccessSection = () => {
  const { t } = useLanguage();

  return (
    <section id="payment-success-section" className="m-0">
      <div className="card-body text-center">
        <img 
          src="https://mohamedalzaki.com/rewash/image/modal_img.webp" 
          className="d-md-none w-100 mb-3" 
          alt=""
        />
        <h1 className="fs-4 fw-bold">{t('paymentSuccess')}</h1>
        <p className="text-body-secondary">{t('paymentSuccessDesc')}</p>
      </div>
    </section>
  );
};

export default PaymentSuccessSection;
