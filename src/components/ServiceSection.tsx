
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { useData } from '../contexts/DataContext';
import ProgressBar from './ProgressBar';

const ServiceSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();
  const { serviceTypes, additionalServices, loading } = useData();
  
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Service Data:', {
      selectedServiceType,
      selectedDate,
      selectedTime,
      selectedAdditionalServices
    });
    nextSection();
  };

  const handleAdditionalServiceChange = (serviceId: number) => {
    setSelectedAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    selectedAdditionalServices.forEach(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      if (service) {
        total += service.promotional_price || service.price;
      }
    });
    return total;
  };

  if (loading) {
    return (
      <section id="service-section" className="m-0">
        <div className="card-body text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

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
            <select 
              className="form-select"
              value={selectedServiceType}
              onChange={(e) => setSelectedServiceType(e.target.value)}
              required
            >
              <option value="">{t('selectServiceType') || 'اختر نوع الخدمة'}</option>
              {serviceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row g-3">
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('selectDate')}</label>
                <input 
                  type="date" 
                  className="form-control text-start" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('selectTime')}</label>
                <input 
                  type="time" 
                  className="form-control text-start" 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required 
                />
              </div>
            </div>
          </div>

          <label className="form-label fw-bold text-start w-100 mb-3">
            {t('additionalServices')}
          </label>
          
          <div className="row g-3">
            {additionalServices
              .filter(service => service.is_active === 1)
              .slice(0, 6)
              .map((service) => (
                <div key={service.id} className="col-md-6 mb-3">
                  <label className="d-flex btn border rounded position-relative align-items-center p-3 m-0">
                    <img 
                      src={service.image} 
                      width="70"
                      alt={service.name}
                      onError={(e) => {
                        e.currentTarget.src = "https://mohamedalzaki.com/rewash/image/services_icon.webp";
                      }}
                    />

                    <div className="text-start ms-3">
                      <label className="form-check-label">{service.name}</label>
                      <div className="d-flex justify-content-between">
                        <span className="text-body">{service.promotional_price || service.price} {t('riyal')}</span>
                        {service.promotional_price && service.promotional_price < service.price && (
                          <span className="text-body-tertiary text-decoration-line-through ms-3">
                            {service.price} {t('riyal')}
                          </span>
                        )}
                      </div>
                    </div>

                    <input 
                      className="form-check-input position-absolute rounded p-3 m-3" 
                      type="checkbox" 
                      checked={selectedAdditionalServices.includes(service.id)}
                      onChange={() => handleAdditionalServiceChange(service.id)}
                    />
                  </label>
                </div>
              ))}
          </div>

          <div className="d-flex justify-content-between align-items-center bg-body-tertiary border rounded p-3 mb-3">
            <h6 className="fw-bold m-0">{t('total')}</h6>
            <h6 className="fw-bold m-0">{calculateTotal()} {t('riyal')}</h6>
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
