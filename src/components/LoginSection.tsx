
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LoginSection = () => {
  const { t } = useLanguage();

  return (
    <section id="login-section" className="m-0">
      <div className="card-body text-center">
        <div className="text-start mb-3">
          <h1 className="fs-4 fw-bold m-0">{t('login')}</h1>
          <p className="text-body-secondary m-0">{t('loginDesc')}</p>
        </div>

        <form>
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
          
          <button type="submit" className="btn btn-primary w-100">
            {t('next')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;
