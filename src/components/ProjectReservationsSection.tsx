
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';

const ProjectReservationsSection = () => {
  const { t } = useLanguage();
  const { setCurrentSection } = useAppState();

  const handleCarWashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentSection('login');
  };

  return (
    <section id="project-reservations-section" className="m-0">
      <div className="card-body text-center">
        <img 
          src="/image/modal_img.webp" 
          className="d-md-none w-100 mb-3" 
          alt=""
        />

        <div className="text-start mb-3">
          <h1 className="fs-4 fw-bold m-0">{t('projectReservations')}</h1>
          <p className="text-body-secondary m-0">{t('projectReservationsDesc')}</p>
        </div>

        <div className="text-start mb-3">
          <a href="#" onClick={handleCarWashClick} className="btn border rounded-5 w-100 p-3 mb-3">
            <div className="d-grid d-md-flex align-items-center">
              <img 
                src="/image/services_icon.webp" 
                width="70"
                alt=""
              />

              <div className="text-start ms-md-3 mt-3 mt-md-0 ms-0">
                <h2 className="fs-5 fw-bold mb-1 m-0">{t('carWash')}</h2>
                <span className="text-body-secondary m-0">{t('carWashDesc')}</span>
              </div>
            </div>
          </a>

          <a href="https://online.rewash.store/" className="btn border rounded-5 w-100 p-3">
            <div className="d-grid d-md-flex align-items-center">
              <img 
                src="/image/store_icon.webp" 
                width="70"
                alt=""
              />

              <div className="text-start ms-md-3 mt-3 mt-md-0 ms-0">
                <h2 className="fs-5 fw-bold mb-1 m-0">{t('rewashStore')}</h2>
                <span className="text-body-secondary m-0">{t('rewashStoreDesc')}</span>
              </div>
            </div>
          </a>
        </div>

        <a href="#" className="btn btn-outline-success w-100">
          <img 
            src="/image/whatsapp.gif" 
            width="30"
            alt=""
          />
          <span>{t('whatsappContact')}</span>
        </a>
      </div>
    </section>
  );
};

export default ProjectReservationsSection;
