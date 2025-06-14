
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { apiService } from '../services/api';
import { useToast } from '../hooks/use-toast';

const LoginSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.sendOtp(phoneNumber);
      
      if (response.status) {
        toast({
          title: "تم إرسال الرمز",
          description: "تم إرسال رمز التحقق إلى رقم هاتفك",
        });
        nextSection();
      } else {
        toast({
          title: "خطأ",
          description: response.message || "فشل في إرسال رمز التحقق",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إرسال رمز التحقق",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login-section" className="m-0">
      <div className="card-body text-center">
        <div className="text-start mb-3">
          <h1 className="fs-4 fw-bold m-0">{t('login')}</h1>
          <p className="text-body-secondary m-0">{t('loginDesc')}</p>
        </div>

        <form onSubmit={handleSubmit}>
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {t('next')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;
