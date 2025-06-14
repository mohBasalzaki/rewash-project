import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppState } from '../contexts/AppStateContext';
import { apiService } from '../services/api';
import { useToast } from '../hooks/use-toast';

const OTPSection = () => {
  const { t } = useLanguage();
  const { nextSection } = useAppState();
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [countdown, setCountdown] = useState(52);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showMockOtp, setShowMockOtp] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const otpCode = otp.join('');
    
    try {
      const response = await apiService.validateOtp(otpCode, '05xxxxxxxx');
      
      if (response.status) {
        toast({
          title: "تم التحقق بنجاح",
          description: "تم التحقق من رمز OTP بنجاح",
        });
        nextSection();
      } else {
        toast({
          title: "خطأ",
          description: response.message || "رمز التحقق غير صحيح",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في التحقق من الرمز",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    
    try {
      const response = await apiService.resendOtp('05xxxxxxxx');
      
      if (response.status) {
        toast({
          title: "تم إعادة الإرسال",
          description: "تم إرسال رمز جديد إلى رقم هاتفك",
        });
        setCountdown(52);
      } else {
        toast({
          title: "خطأ",
          description: response.message || "فشل في إعادة إرسال الرمز",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في إعادة إرسال الرمز",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const fillMockOtp = () => {
    const mockOtp = apiService.getCurrentMockOtp().split('');
    setOtp(mockOtp);
    toast({
      title: "تم ملء الرمز",
      description: `تم ملء رمز OTP التجريبي: ${mockOtp.join('')}`,
    });
  };

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    const inputs = inputRefs.current;
    
    const handleKeyDown = (index: number) => (e: KeyboardEvent) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    inputs.forEach((input, index) => {
      if (input) {
        const keydownHandler = handleKeyDown(index);
        input.addEventListener('keydown', keydownHandler);
        
        return () => {
          input.removeEventListener('keydown', keydownHandler);
        };
      }
    });
  }, [otp]);

  return (
    <section id="otp-section" className="m-0">
      <div className="card-body text-center">
        <div className="text-start mb-3">
          <h1 className="fs-4 fw-bold m-0">{t('accessCode')}</h1>
          <p className="text-body-secondary m-0">{t('otpDesc')}</p>
        </div>

        {/* Test OTP Helper */}
        <div className="alert alert-info mb-3">
          <small>
            وضع الاختبار مفعل - 
            <button 
              type="button" 
              className="btn btn-link btn-sm p-0 ms-1"
              onClick={() => setShowMockOtp(!showMockOtp)}
            >
              {showMockOtp ? 'إخفاء' : 'عرض'} رمز OTP التجريبي
            </button>
          </small>
          {showMockOtp && (
            <div className="mt-2">
              <small className="d-block mb-2">
                الرمز التجريبي: <strong>{apiService.getCurrentMockOtp()}</strong>
              </small>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm"
                onClick={fillMockOtp}
              >
                ملء الرمز تلقائياً
              </button>
            </div>
          )}
        </div>

        <form id="otp-form" onSubmit={handleSubmit}>
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
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
              />
            ))}
          </div>

          <div className="d-grid text-center mb-3">
            <label htmlFor="code" className="form-label">
              {t('resendCodeIn')} <span className="text-primary fs-5 fw-bold">{countdown}</span> {t('seconds')}
            </label>
            {countdown === 0 ? (
              <button 
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={handleResendOtp}
                disabled={resendLoading}
              >
                {resendLoading ? 'جاري الإرسال...' : t('resendNewCode')}
              </button>
            ) : (
              <span className="text-body-tertiary">
                {t('resendNewCode')}
              </span>
            )}
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

export default OTPSection;
