
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { useData } from '../contexts/DataContext';
import ProgressBar from './ProgressBar';

const VehicleInformationSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();
  const { vehicleColors, vehicleTypes, loading } = useData();
  
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Vehicle Information:', {
      selectedBrand,
      selectedColor,
      plateNumber,
      notes,
      image
    });
    nextSection();
  };

  if (loading) {
    return (
      <section id="vehicle-information-section" className="m-0">
        <div className="card-body text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

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

        <ProgressBar />

        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
            <label className="form-label">{t('brand')}</label>
            <select 
              className="form-select" 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              required
            >
              <option value="">{t('selectBrand') || 'اختر الماركة'}</option>
              {vehicleTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  <img src={type.icon} alt={type.type} />
                  <span>{type.type}</span>
                </option>
              ))}
            </select>
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('color')}</label>
            <select 
              className="form-select" 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              required
            >
              <option value="">{t('selectColor') || 'اختر اللون'}</option>
              {vehicleColors.map((color) => (
                <option key={color.id} value={color.id}>
                  {/* <span className="p-3" style={`background-color: ${color.vehicle_color_code}`}></span> */}
                  <span>{color.vehicle_color}</span>
                </option>
              ))}
            </select>
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('plateNumber')}</label>
            <input 
              type="text" 
              className="form-control text-start" 
              placeholder={t('plateNumberPlaceholder')}
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              required
            />
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('notes')}</label>
            <textarea 
              className="form-control" 
              placeholder={t('notesPlaceholder')} 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="text-start mb-3">
            <label className="form-label">{t('attachImage')}</label>
            <input 
              className="form-control" 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
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
