import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { apiService } from '../services/api';

interface Reservation {
  id: string;
  status: 'new' | 'going_to_customer' | 'arrived_at_customer' | 'washing_in_progress' | 'completed' | 'cancelled';
  serviceName: string;
  dateTime: string;
}

const MyReservationsSection = () => {
  const { t } = useLanguage();
  const { setCurrentSection } = useAppState();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await apiService.getUserReservations();
      if (response.status) {
        setReservations(response.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const getStatusText = (status: Reservation['status']) => {
    const statusMap = {
      new: t('newStatus'),
      going_to_customer: t('goingToCustomerStatus'),
      arrived_at_customer: t('arrivedAtCustomerStatus'),
      washing_in_progress: t('washingInProgressStatus'),
      completed: t('completedStatus'),
      cancelled: t('cancelledStatus')
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Reservation['status']) => {
    const colorMap = {
      new: 'btn-outline-success text-success',
      going_to_customer: 'bg-warning',
      arrived_at_customer: 'btn-outline-primary text-primary',
      washing_in_progress: 'btn-outline-primary text-primary',
      completed: 'btn-outline-success text-success',
      cancelled: 'btn-outline-danger text-danger'
    };
    return colorMap[status];
  };

  const handleTabChange = (tab: 'upcoming' | 'previous') => {
    setActiveTab(tab);
    // يمكن إضافة منطق إضافي هنا مثل إعادة تحميل البيانات حسب نوع التبويب
  };

  const handleNewBooking = () => {
    setCurrentSection('project-reservations');
  };

  const handleBackToHome = () => {
    setCurrentSection('project-reservations');
  };

  const filteredReservations = activeTab === 'upcoming' 
    ? reservations.filter(r => !['completed', 'cancelled'].includes(r.status))
    : reservations.filter(r => ['completed', 'cancelled'].includes(r.status));

  return (
    <section id="my-reservations-section" className="m-0">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-start">
            <h1 className="fs-4 fw-bold text-dark-purple mb-2">{t('myReservations')}</h1>
            <p className="text-body-secondary m-0">{t('personalDataDesc')}</p>
          </div>
          
          <button 
            className="btn btn-outline-primary"
            onClick={fetchReservations}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                تحديث...
              </>
            ) : (
              <>
                <i className="ti ti-refresh me-2"></i>
                تحديث
              </>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="d-flex mb-4">
          <button
            className={`btn flex-fill me-2 ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleTabChange('upcoming')}
          >
            {t('upcomingReservations')}
          </button>
          <button
            className={`btn flex-fill ms-2 ${activeTab === 'previous' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleTabChange('previous')}
          >
            {t('previousReservations')}
          </button>
        </div>

        {/* Reservations Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-body-secondary">{t('loadingReservations')}</p>
          </div>
        ) : (
          <div className="row g-3">
            {filteredReservations.length === 0 ? (
              <div className="col-12 text-center py-5">
                <div className="text-body-secondary">
                  <i className="ti ti-calendar-off fs-1 mb-3 d-block"></i>
                  <p className="mb-3">
                    {activeTab === 'upcoming' 
                      ? t('noUpcomingReservations')
                      : t('noPreviousReservations')
                    }
                  </p>
                  {activeTab === 'upcoming' && (
                    <button 
                      className="btn btn-primary"
                      onClick={handleNewBooking}
                    >
                      {t('newBooking')}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <div key={reservation.id} className="col-md-6">
                  <div className="card border position-relative h-100">
                    <div className="card-body d-flex align-items-center p-3">
                      {/* Calendar Icon */}
                      <div className="calendar-icon d-flex align-items-center justify-content-center rounded-pill me-3">
                        <i className="ti ti-calendar-week-filled fs-2"></i>
                      </div>
                      
                      {/* Status Tag */}
                      <div className="badge-item position-absolute">
                        <span className={`badge rounded-pill fw-normal ${getStatusColor(reservation.status)} px-3 py-2`}>
                          {getStatusText(reservation.status)}
                        </span>
                      </div>

                      {/* Reservation Details */}
                      <div className="flex-grow-1">
                        <div className="text-body-secondary small mb-1">{reservation.id}</div>
                        
                        <div className="fw-bold mb-1">{reservation.serviceName}</div>

                        <div className="text-body-secondary small">
                          <i className="ti ti-calendar-week me-1"></i>
                          {reservation.dateTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-5">
          <div className="d-grid gap-3">
            <button 
              className="btn btn-primary w-100"
              onClick={handleNewBooking}
            >
              {t('newBooking')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyReservationsSection; 