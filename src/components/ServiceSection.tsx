import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { useData } from '../contexts/DataContext';
import { apiService } from '../services/api';
import ProgressBar from './ProgressBar';

const ServiceSection = () => {
  const { t } = useLanguage();
  const { nextSection, setCurrentSection, appointmentData, updateAppointmentData } = useAppState();
  const { serviceTypes, additionalServices, loading } = useData();
  
  // State للتواريخ والأوقات المتاحة
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingDates, setLoadingDates] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);

  // جلب التواريخ المتاحة عند تحميل المكون
  useEffect(() => {
    const fetchAvailableDates = async () => {
      setLoadingDates(true);
      try {
        const response = await apiService.getAvailableDates();
        if (response.status) {
          setAvailableDates(response.data);
        }
      } catch (error) {
        console.error('Error fetching available dates:', error);
      } finally {
        setLoadingDates(false);
      }
    };

    fetchAvailableDates();
  }, []);

  // جلب الأوقات المتاحة عند تغيير التاريخ
  useEffect(() => {
    if (appointmentData.appointmentDate) {
      const fetchAvailableTimes = async () => {
        setLoadingTimes(true);
        try {
          const response = await apiService.getAvailableTimes(appointmentData.appointmentDate);
          if (response.status) {
            setAvailableTimes(response.data);
            // إعادة تعيين الوقت المحدد إذا لم يكن متاحاً في التاريخ الجديد
            if (appointmentData.appointmentTime && !response.data.includes(appointmentData.appointmentTime)) {
              updateAppointmentData({ appointmentTime: '' });
            }
          }
        } catch (error) {
          console.error('Error fetching available times:', error);
        } finally {
          setLoadingTimes(false);
        }
      };

      fetchAvailableTimes();
    } else {
      setAvailableTimes([]);
      if (appointmentData.appointmentTime) {
        updateAppointmentData({ appointmentTime: '' });
      }
    }
  }, [appointmentData.appointmentDate]); // إزالة appointmentData.appointmentTime و updateAppointmentData من dependencies

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Service Data:', {
      serviceType: appointmentData.serviceType,
      appointmentDate: appointmentData.appointmentDate,
      appointmentTime: appointmentData.appointmentTime,
      additionalServices: appointmentData.additionalServices
    });
    nextSection();
  };

  const handleAdditionalServiceChange = (serviceId: number) => {
    updateAppointmentData({
      additionalServices: appointmentData.additionalServices.includes(serviceId)
        ? appointmentData.additionalServices.filter(id => id !== serviceId)
        : [...appointmentData.additionalServices, serviceId]
    });
  };

  const calculateTotal = () => {
    let total = 0;
    
    // إضافة سعر الخدمة الأساسية
    if (appointmentData.serviceType && serviceTypes) {
      const selectedService = serviceTypes.find(service => service.id.toString() === appointmentData.serviceType);
      if (selectedService && selectedService.price) {
        total += selectedService.promotional_price || selectedService.price;
      }
    }
    
    // إضافة أسعار الخدمات الإضافية
    if (additionalServices) {
      appointmentData.additionalServices.forEach(serviceId => {
        const service = additionalServices.find(s => s.id === serviceId);
        if (service) {
          total += service.promotional_price || service.price;
        }
      });
    }
    
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

  // التأكد من وجود البيانات قبل عرض النموذج
  if (!serviceTypes || serviceTypes.length === 0) {
    return (
      <section id="service-section" className="m-0">
        <div className="card-body text-center">
          <div className="alert alert-warning">
            <i className="ti ti-alert-triangle me-2"></i>
            جاري تحميل أنواع الخدمات...
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

          <a href="#" className="btn btn-outline-primary" onClick={(e) => {
            e.preventDefault();
            setCurrentSection('my-reservations');
          }}>
            {t('myReservations')}
          </a>
        </div>

        <ProgressBar />

        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
            <label className="form-label">{t('serviceType')}</label>
                          <select 
                className="form-select"
                value={appointmentData.serviceType}
                onChange={(e) => updateAppointmentData({ serviceType: e.target.value })}
                required
              >
              <option value="">{t('selectServiceType') || 'اختر نوع الخدمة'}</option>
              {serviceTypes && serviceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                  {type.price && ` - ${type.promotional_price || type.price} ${t('riyal')}`}
                </option>
              ))}
            </select>
          </div>

          {/* عرض سعر الخدمة المحددة */}
          {/* {selectedServiceType && (
            <div className="alert alert-info mb-3">
              {(() => {
                const selectedService = serviceTypes.find(service => service.id.toString() === selectedServiceType);
                if (selectedService && selectedService.price) {
                  return (
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{selectedService.name}</span>
                      <div>
                        <span className="fw-bold">{selectedService.promotional_price || selectedService.price} {t('riyal')}</span>
                        {selectedService.promotional_price && selectedService.promotional_price < selectedService.price && (
                          <span className="text-body-tertiary text-decoration-line-through ms-2">
                            {selectedService.price} {t('riyal')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )} */}

          <div className="row g-3">
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('selectDate')}</label>
                {loadingDates ? (
                  <div className="form-control text-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    جاري التحميل...
                  </div>
                ) : (
                                <select 
                className="form-select"
                value={appointmentData.appointmentDate}
                onChange={(e) => updateAppointmentData({ appointmentDate: e.target.value })}
                required
              >
                    <option value="">{t('selectDate')}</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('ar-SA', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="col">
              <div className="text-start mb-3">
                <label className="form-label">{t('selectTime')}</label>
                {loadingTimes ? (
                  <div className="form-control text-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    جاري التحميل...
                  </div>
                ) : (
                  <select 
                    className="form-select"
                    value={appointmentData.appointmentTime}
                    onChange={(e) => updateAppointmentData({ appointmentTime: e.target.value })}
                    required
                    disabled={!appointmentData.appointmentDate}
                  >
                    <option value="">{appointmentData.appointmentDate ? t('selectTime') : t('selectDateFirst')}</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <label className="form-label fw-bold text-start w-100 mb-3">
            {t('additionalServices')}
          </label>
          
          <div className="row g-3">
            {additionalServices && additionalServices.length > 0 ? (
              additionalServices
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
                        e.currentTarget.src = "../image/services_icon.webp";
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
                      checked={appointmentData.additionalServices.includes(service.id)}
                      onChange={() => handleAdditionalServiceChange(service.id)}
                    />
                  </label>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-3">
                <p className="text-body-secondary">لا توجد خدمات إضافية متاحة</p>
              </div>
            )}
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
