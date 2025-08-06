
export const API_BASE_URL = 'https://dev.rewash.store';

export const API_ENDPOINTS = {
  // OTP endpoints
  OTP_SEND: '/api/otp/send',
  OTP_VALIDATE: '/api/otp/validate',
  OTP_RESEND: '/api/otp/resend',
  
  // Payment endpoints
  PAYMENT_PROCESS: '/api/payment/process',
  PAYMENT_METHODS: '/api/payment/methods',
  
  // Projects endpoints
  PROJECTS_CAR_SERVICES: '/api/projects/car-services',
  
  // Meta endpoints
  VEHICLE_COLORS: '/api/meta/vehicle-colors',
  VEHICLE_TYPES: '/api/meta/vehicle-types',
  SERVICE_TYPES: '/api/meta/service-types',
  ADDITIONAL_SERVICES: '/api/meta/additional-services',
  
  // Appointments
  APPOINTMENTS: '/api/appointments',
  
  // User Reservations
  USER_RESERVATIONS: '/api/user/reservations',
  CANCEL_RESERVATION: '/api/user/reservations/{id}/cancel',
  UPDATE_RESERVATION_STATUS: '/api/user/reservations/{id}/status',
  
  // Products
  POPULAR_PRODUCTS: '/api/products/popular',
  PRODUCTS: '/api/products',
  
  // Transaction Details
  TRANSACTION_DETAILS: '/api/transactions/{id}/details'
};
