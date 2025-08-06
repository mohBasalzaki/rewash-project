
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { useData } from '../contexts/DataContext';
import { apiService } from '../services/api';
import ProgressBar from './ProgressBar';

const PaymentSection = () => {
  const { t } = useLanguage();
  const { nextSection, setCurrentSection, appointmentData, updateAppointmentData } = useAppState();
  const { paymentMethods, loading } = useData();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    // التحقق من البيانات المطلوبة
    const requiredFields = [
      'name', 'phoneNumber', 'address', 'carLocation', 'zone',
      'vehicleBrand', 'vehicleColor', 'plateNumber',
      'serviceType', 'appointmentDate', 'appointmentTime'
    ];
    
    const missingFields = requiredFields.filter(field => !appointmentData[field as keyof typeof appointmentData]);
    
    if (missingFields.length > 0) {
      alert(`البيانات التالية مطلوبة: ${missingFields.join(', ')}`);
      setSubmitting(false);
      return;
    }
    
    console.log('Submitting appointment data:', appointmentData);
    
    try {
      // إنشاء الحجز في السيرفر
      const response = await apiService.createAppointment(appointmentData);
      
      console.log('API Response:', response);
      
      if (response.status) {
        console.log('Appointment created successfully:', response.data);
        alert('تم إنشاء الحجز بنجاح!');
        // الانتقال إلى صفحة نجاح الدفع
        nextSection();
      } else {
        console.error('Failed to create appointment:', response.message);
        alert(`فشل في إنشاء الحجز: ${response.message}`);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('حدث خطأ أثناء إنشاء الحجز. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderPaymentFields = () => {
    if (!paymentMethods) return null;

          const method = paymentMethods.methods[appointmentData.paymentMethod as keyof typeof paymentMethods.methods];
    
    if (appointmentData.paymentMethod === 'creditcard') {
      return (
        <>
          <div className="text-start mb-3">
            <label htmlFor="cardNumber" className="form-label">{t('cardNumber')}</label>
            <input 
              type="text" 
              className="form-control text-start" 
              id="cardNumber" 
              placeholder={t('cardNumberPlaceholder')}
              value={appointmentData.cardNumber || ''}
              onChange={(e) => updateAppointmentData({ cardNumber: e.target.value })}
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
                value={appointmentData.expiryDate || ''}
                onChange={(e) => updateAppointmentData({ expiryDate: e.target.value })}
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
                value={appointmentData.cvv || ''}
                onChange={(e) => updateAppointmentData({ cvv: e.target.value })}
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
              value={appointmentData.cardholderName || ''}
              onChange={(e) => updateAppointmentData({ cardholderName: e.target.value })}
              required
            />
          </div>
        </>
      );
    }

    if (appointmentData.paymentMethod === 'stcpay') {
      return (
        <div className="text-start mb-3">
          <label htmlFor="mobile" className="form-label">رقم الجوال</label>
          <input 
            type="tel" 
            className="form-control text-start" 
            id="mobile" 
            placeholder="05xxxxxxxx"
            value={appointmentData.phoneNumber || ''}
            onChange={(e) => updateAppointmentData({ phoneNumber: e.target.value })}
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

          <a href="#" className="btn btn-outline-primary" onClick={(e) => {
            e.preventDefault();
            setCurrentSection('my-reservations');
          }}>
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
                value={appointmentData.paymentMethod}
                onChange={(e) => updateAppointmentData({ paymentMethod: e.target.value })}
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
    
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                جاري إنشاء الحجز...
              </>
            ) : (
              t('pay')
            )}
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
