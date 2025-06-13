
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const OTPSection = () => {
  const { t } = useLanguage();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const inputs = inputRefs.current;
    
    const handleInput = (index: number) => (e: Event) => {
      const input = e.target as HTMLInputElement;
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number) => (e: KeyboardEvent) => {
      const input = e.target as HTMLInputElement;
      if (e.key === "Backspace" && input.value === '' && index > 0) {
        inputs[index - 1]?.focus();
      }
    };

    inputs.forEach((input, index) => {
      if (input) {
        const inputHandler = handleInput(index);
        const keydownHandler = handleKeyDown(index);
        
        input.addEventListener('input', inputHandler);
        input.addEventListener('keydown', keydownHandler);
        
        return () => {
          input.removeEventListener('input', inputHandler);
          input.removeEventListener('keydown', keydownHandler);
        };
      }
    });
  }, []);

  return (
    <section id="otp-section" className="m-0">
      <div className="card-body text-center">
        <div className="text-start mb-3">
          <h1 className="fs-4 fw-bold m-0">{t('accessCode')}</h1>
          <p className="text-body-secondary m-0">{t('otpDesc')}</p>
        </div>

        <form id="otp-form">
          <div className="d-flex justify-content-center mb-3">
            {[0, 1, 2, 3, 4].map((index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                className="form-control otp-input"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          <div className="d-grid text-center mb-3">
            <label htmlFor="code" className="form-label">
              {t('resendCodeIn')} <span className="text-primary fs-5 fw-bold">52</span> {t('seconds')}
            </label>
            <a href="#" className="text-body-tertiary text-decoration-none">
              {t('resendNewCode')}
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {t('next')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default OTPSection;
