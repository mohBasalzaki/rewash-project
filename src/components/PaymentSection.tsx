
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { useData } from '../contexts/DataContext';
import ProgressBar from './ProgressBar';

const PaymentSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();
  const { paymentMethods, loading } = useData();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditcard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Payment Data:', {
      selectedPaymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      fullName,
      mobile
    });
    nextSection();
  };

  const renderPaymentFields = () => {
    if (!paymentMethods) return null;

    const method = paymentMethods.methods[selectedPaymentMethod as keyof typeof paymentMethods.methods];
    
    if (selectedPaymentMethod === 'creditcard') {
      return (
        <>
          <div className="text-start mb-3">
            <label htmlFor="cardNumber" className="form-label">{t('cardNumber')}</label>
            <input 
              type="text" 
              className="form-control text-start" 
              id="cardNumber" 
              placeholder={t('cardNumberPlaceholder')}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
    
          <div className="row g-3">
            <div className="col text-start mb-3">
              <label htmlFor="expiryDate" className="form-label">{t('expiryDate')}</label>
              <input 
                type="month" 
                className="form-control text-start" 
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            <div className="col text-start mb-3">
              <label htmlFor="cvv" className="form-label">{t('cvv')}</label>
              <input 
                type="text" 
                className="form-control text-start" 
                id="cvv" 
                placeholder={t('cvvPlaceholder')}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={4}
                required
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </>
      );
    }

    if (selectedPaymentMethod === 'stcpay') {
      return (
        <div className="text-start mb-3">
          <label htmlFor="mobile" className="form-label">رقم الجوال</label>
          <input 
            type="tel" 
            className="form-control text-start" 
            id="mobile" 
            placeholder="05xxxxxxxx"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <section id="payment-section" className="m-0">
        <div className="card-body text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

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

        <ProgressBar />

        <form onSubmit={handleSubmit}>
          {paymentMethods && (
            <div className="text-start mb-3">
              <label className="form-label">طريقة الدفع</label>
              <select 
                className="form-select"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                required
              >
                {Object.entries(paymentMethods.methods).map(([key, method]) => (
                  <option key={key} value={key}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {renderPaymentFields()}
    
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
