
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  ar: {
    // Header
    logo: 'ريواش',
    
    // Project Reservations Section
    projectReservations: 'حجوزات المشاريع',
    projectReservationsDesc: 'نقدم حلول غسيل شاملة للمؤسسات والمشاريع الكبيرة',
    carWash: 'غسيل سيارة',
    carWashDesc: 'خدمة غسيل احترافية تصل إلى موقعك، تشمل تنظيف داخلي وخارجي، مع خيارات إضافية حسب احتياجك.',
    rewashStore: 'متجر ريواش',
    rewashStoreDesc: 'كل ما تحتاجه للعناية بسيارتك في مكان واحد — منتجات مميزة وأدوات احترافية للتنظيف والتلميع.',
    whatsappContact: 'تواصل واتساب',
    
    // Login Section
    login: 'تسجيل الدخول',
    loginDesc: 'أدخل معلوماتك الأساسية لإتمام الحجز بسهولة.',
    phoneNumber: 'رقم الهاتف',
    phonePlaceholder: 'ادخل رقم هاتفك هنا',
    next: 'التالي',
    required: '*',
    
    // OTP Section
    accessCode: 'كود الوصول',
    otpDesc: 'أدخل معلوماتك الأساسية لإتمام الحجز بسهولة.',
    resendCodeIn: 'يمكنك اعادة ارسال الكود خلال',
    seconds: 'ثانية',
    resendNewCode: 'اعادة ارسال كود جديد',
    
    // Personal Data Section
    personalData: 'البيانات الشخصية',
    personalDataDesc: 'أدخل معلوماتك الأساسية لإتمام الحجز بسهولة.',
    myReservations: 'حجوزاتي',
    name: 'الاسم',
    namePlaceholder: 'ادخل اسمك هنا',
    address: 'العنوان',
    addressPlaceholder: 'ادخل العنوان هنا',
    carLocation: 'الموقع السيارة',
    outsideParking: 'خارج المواقف',
    zone: 'الزون',
    
    // Vehicle Information Section
    vehicleInfo: 'معلومات السيارة',
    vehicleInfoDesc: 'زوّدنا بتفاصيل سيارتك لتقديم الخدمة المناسبة.',
    brand: 'الماركة',
    toyota: 'تويوتا - Toyota',
    color: 'اللون',
    blueColor: 'اللون الازرق',
    plateNumber: 'رقم اللوحة',
    plateNumberPlaceholder: 'ادخل رقم اللوحة هنا',
    notes: 'الملاحظات',
    notesPlaceholder: 'ادخل ملاحظات هنا',
    attachImage: 'ارفاق صورة',
    
    // Service Section
    service: 'الخدمة',
    serviceDesc: 'اختر نوع الخدمة والإضافات التي تحتاجها.',
    serviceType: 'نوع الخدمة',
    insideOutside: 'داخلي / خارجي',
    selectDate: 'حدد التاريخ',
    selectTime: 'حدد الوقت',
    additionalServices: 'الخدمات الاضافية',
    floorCovering: 'تلبيس ارضية',
    tissues: 'مناديل',
    riyal: 'ريال',
    total: 'المجموع',
    
    // Payment Section
    payment: 'الدفع',
    paymentDesc: 'أكمل عملية الدفع بأمان لتأكيد حجزك.',
    cardNumber: 'رقم البطاقة',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'تاريخ الانتهاء',
    cvv: 'رمز الأمان (CVV)',
    cvvPlaceholder: '123',
    nameOnCard: 'الاسم على البطاقة',
    nameOnCardPlaceholder: 'ادخل الالسم على البطاقة هنا',
    pay: 'إدفع',
    securePayment: 'المدفوعات آمنة ومشفرة',
    
    // Payment Success Section
    paymentSuccess: 'تم الدفع بنجاح !',
    paymentSuccessDesc: 'شكرًا لك! تم إتمام عملية الدفع بنجاح. سنبدأ في تجهيز طلبك فورًا. تابع حالة الحجز أو تسوّق الآن من متجر ريواش للحصول على أفضل المنتجات للعناية بسيارتك.',
    
    // Footer
    allRightsReserved: 'جميع الحقوق محفوظة لدى',
    rewash: 'ريواش',
    
    // Language
    language: 'اللغة',
    arabic: 'العربية',
    english: 'English'
  },
  en: {
    // Header
    logo: 'ReWash',
    
    // Project Reservations Section
    projectReservations: 'Project Reservations',
    projectReservationsDesc: 'We provide comprehensive washing solutions for institutions and large projects',
    carWash: 'Car Wash',
    carWashDesc: 'Professional washing service that comes to your location, includes interior and exterior cleaning, with additional options as needed.',
    rewashStore: 'ReWash Store',
    rewashStoreDesc: 'Everything you need to care for your car in one place — premium products and professional tools for cleaning and polishing.',
    whatsappContact: 'WhatsApp Contact',
    
    // Login Section
    login: 'Login',
    loginDesc: 'Enter your basic information to complete the booking easily.',
    phoneNumber: 'Phone Number',
    phonePlaceholder: 'Enter your phone number here',
    next: 'Next',
    required: '*',
    
    // OTP Section
    accessCode: 'Access Code',
    otpDesc: 'Enter your basic information to complete the booking easily.',
    resendCodeIn: 'You can resend the code in',
    seconds: 'seconds',
    resendNewCode: 'Resend new code',
    
    // Personal Data Section
    personalData: 'Personal Data',
    personalDataDesc: 'Enter your basic information to complete the booking easily.',
    myReservations: 'My Reservations',
    name: 'Name',
    namePlaceholder: 'Enter your name here',
    address: 'Address',
    addressPlaceholder: 'Enter address here',
    carLocation: 'Car Location',
    outsideParking: 'Outside Parking',
    zone: 'Zone',
    
    // Vehicle Information Section
    vehicleInfo: 'Vehicle Information',
    vehicleInfoDesc: 'Provide us with your car details to provide the appropriate service.',
    brand: 'Brand',
    toyota: 'Toyota - تويوتا',
    color: 'Color',
    blueColor: 'Blue Color',
    plateNumber: 'Plate Number',
    plateNumberPlaceholder: 'Enter plate number here',
    notes: 'Notes',
    notesPlaceholder: 'Enter notes here',
    attachImage: 'Attach Image',
    
    // Service Section
    service: 'Service',
    serviceDesc: 'Choose the type of service and additions you need.',
    serviceType: 'Service Type',
    insideOutside: 'Interior / Exterior',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    additionalServices: 'Additional Services',
    floorCovering: 'Floor Covering',
    tissues: 'Tissues',
    riyal: 'SAR',
    total: 'Total',
    
    // Payment Section
    payment: 'Payment',
    paymentDesc: 'Complete the payment securely to confirm your booking.',
    cardNumber: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Expiry Date',
    cvv: 'Security Code (CVV)',
    cvvPlaceholder: '123',
    nameOnCard: 'Name on Card',
    nameOnCardPlaceholder: 'Enter name on card here',
    pay: 'Pay',
    securePayment: 'Payments are secure and encrypted',
    
    // Payment Success Section
    paymentSuccess: 'Payment Successful!',
    paymentSuccessDesc: 'Thank you! Payment has been completed successfully. We will start preparing your order immediately. Track your booking status or shop now from ReWash store for the best car care products.',
    
    // Footer
    allRightsReserved: 'All rights reserved to',
    rewash: 'ReWash',
    
    // Language
    language: 'Language',
    arabic: 'العربية',
    english: 'English'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
