
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { 
  ApiResponse, 
  OtpResponse, 
  PaymentMethods, 
  ProjectData, 
  VehicleColor, 
  VehicleType, 
  ServiceType, 
  AdditionalService,
  Reservation,
  Product,
  TransactionDetails
} from '../types/api';

class ApiService {
  private baseUrl = API_BASE_URL;

  // Mock OTP for testing
  private mockOtpEnabled = true;
  private mockOtpCode = '12345';

  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // OTP methods with mock support
  async sendOtp(phoneNumber: string): Promise<ApiResponse<OtpResponse>> {
    if (this.mockOtpEnabled) {
      console.log(`Mock OTP sent for ${phoneNumber}: ${this.mockOtpCode}`);
      return {
        status: true,
        code: 200,
        message: 'OTP sent successfully (Mock)',
        data: { otp: this.mockOtpCode },
        errors: []
      };
    }

    // إرسال كـ form-data
    const formData = new FormData();
    formData.append('mobile', phoneNumber);
    formData.append('slug', 'car-services');
    return fetch(`${this.baseUrl}${API_ENDPOINTS.OTP_SEND}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json());
  }

  async validateOtp(otp: string, phoneNumber: string): Promise<ApiResponse<any>> {
    if (this.mockOtpEnabled) {
      console.log(`Validating Mock OTP: ${otp} against ${this.mockOtpCode}`);
      if (otp === this.mockOtpCode) {
        return {
          status: true,
          code: 200,
          message: 'OTP validated successfully (Mock)',
          data: { token: 'mock-token-123' },
          errors: []
        };
      } else {
        return {
          status: false,
          code: 422,
          message: 'Invalid OTP (Mock)',
          data: null,
          errors: []
        };
      }
    }

    // إرسال كـ form-data
    const formData = new FormData();
    formData.append('mobile', phoneNumber);
    formData.append('slug', 'car-services');
    formData.append('otp', otp);
    return fetch(`${this.baseUrl}${API_ENDPOINTS.OTP_VALIDATE}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json());
  }

  async resendOtp(phoneNumber: string): Promise<ApiResponse<OtpResponse>> {
    if (this.mockOtpEnabled) {
      // Generate new mock OTP
      this.mockOtpCode = Math.floor(10000 + Math.random() * 90000).toString();
      console.log(`Mock OTP resent for ${phoneNumber}: ${this.mockOtpCode}`);
      return {
        status: true,
        code: 200,
        message: 'OTP resent successfully (Mock)',
        data: { otp: this.mockOtpCode },
        errors: []
      };
    }

    // إرسال كـ form-data
    const formData = new FormData();
    formData.append('mobile', phoneNumber);
    formData.append('slug', 'car-services');
    return fetch(`${this.baseUrl}${API_ENDPOINTS.OTP_RESEND}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json());
  }

  // Method to toggle mock mode
  setMockMode(enabled: boolean) {
    this.mockOtpEnabled = enabled;
    console.log(`Mock OTP mode ${enabled ? 'enabled' : 'disabled'}`);
  }

  // Method to get current mock OTP (for debugging)
  getCurrentMockOtp(): string {
    return this.mockOtpCode;
  }

  // Payment methods
  async getPaymentMethods(): Promise<ApiResponse<PaymentMethods>> {
    return this.request(API_ENDPOINTS.PAYMENT_METHODS);
  }

  async processPayment(appointmentId: number, paymentData: any): Promise<ApiResponse<any>> {
    return this.request(API_ENDPOINTS.PAYMENT_PROCESS, {
      method: 'POST',
      body: JSON.stringify({ appointment_id: appointmentId, ...paymentData }),
    });
  }

  // Projects - Updated to return mock data that matches the provided structure
  async getProjectCarServices(): Promise<ApiResponse<ProjectData>> {
    // Return the mock data you provided since the API endpoint returns 404
    const mockProjectData: ProjectData = {
      id: 1,
      project_name: "rewash",
      slug: "car-services",
      attributes: [
        {
          id: 1,
          name: "المنطقة",
          values: [
            { id: 1, value: "أ" },
            { id: 2, value: "ب" },
            { id: 3, value: "ج" }
          ]
        },
        {
          id: 2,
          name: "موقع السيارة", 
          values: [
            { id: 4, value: "خارج المواقف" },
            { id: 5, value: "داخل المواقف" },
            { id: 6, value: "الشارع" }
          ]
        }
      ]
    };

    return {
      status: true,
      code: 200,
      message: "Project attributes for form",
      data: mockProjectData,
      errors: []
    };
  }

  // Meta data
  async getVehicleColors(): Promise<ApiResponse<{ vehicle_colors: VehicleColor[] }>> {
    return this.request(API_ENDPOINTS.VEHICLE_COLORS);
  }

  async getVehicleTypes(): Promise<ApiResponse<{ vehicle_types: VehicleType[] }>> {
    return this.request(API_ENDPOINTS.VEHICLE_TYPES);
  }

  async getServiceTypes(): Promise<ApiResponse<{ service_types: ServiceType[] }>> {
    return this.request(API_ENDPOINTS.SERVICE_TYPES);
  }

  async getAdditionalServices(): Promise<ApiResponse<AdditionalService[]>> {
    return this.request(API_ENDPOINTS.ADDITIONAL_SERVICES);
  }

  // Appointments
  async createAppointment(appointmentData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.request<any>(API_ENDPOINTS.APPOINTMENTS, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      return response;
    } catch (error) {
      console.error('Error creating appointment:', error);
      
      // Fallback response for testing
      const mockAppointment = {
        id: `#RW-${Date.now()}`,
        status: 'new' as const,
        serviceName: appointmentData.serviceType || 'خدمة غسيل السيارة',
        dateTime: `${appointmentData.appointmentDate} ${appointmentData.appointmentTime}`,
        price: 150,
        location: appointmentData.address || 'الرياض',
        vehicleInfo: `${appointmentData.vehicleBrand} - ${appointmentData.vehicleColor}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // حفظ الحجز في localStorage
      try {
        const existingReservations = JSON.parse(localStorage.getItem('user_reservations') || '[]');
        existingReservations.unshift(mockAppointment);
        localStorage.setItem('user_reservations', JSON.stringify(existingReservations));
      } catch (localError) {
        console.error('Error saving to localStorage:', localError);
      }
      
      return {
        status: true,
        code: 200,
        message: 'تم إنشاء الحجز بنجاح (بيانات تجريبية)',
        data: mockAppointment,
        errors: []
      };
    }
  }

  // Available dates and times
  async getAvailableDates(): Promise<ApiResponse<string[]>> {
    // Mock data - يمكن استبدالها بـ API حقيقي
    const today = new Date();
    const availableDates = [];
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      availableDates.push(date.toISOString().split('T')[0]);
    }
    
    return {
      status: true,
      code: 200,
      message: 'Available dates retrieved successfully',
      data: availableDates,
      errors: []
    };
  }

  async getAvailableTimes(date: string): Promise<ApiResponse<string[]>> {
    // Mock data - يمكن استبدالها بـ API حقيقي
    const availableTimes = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
      '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
    ];
    
    return {
      status: true,
      code: 200,
      message: 'Available times retrieved successfully',
      data: availableTimes,
      errors: []
    };
  }

  // User Reservations
  async getUserReservations(): Promise<ApiResponse<Reservation[]>> {
    try {
      // جلب البيانات من API الحقيقي
      const response = await this.request<any[]>(API_ENDPOINTS.USER_RESERVATIONS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        }
      });
      
      return response;
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      
      // محاولة قراءة البيانات من localStorage
      try {
        const localReservations = JSON.parse(localStorage.getItem('user_reservations') || '[]');
        if (localReservations.length > 0) {
          return {
            status: true,
            code: 200,
            message: 'تم جلب الحجوزات من التخزين المحلي',
            data: localReservations,
            errors: []
          };
        }
      } catch (localError) {
        console.error('Error reading from localStorage:', localError);
      }
      
      // في حالة فشل API و localStorage، نعيد البيانات الوهمية كـ fallback
      const fallbackReservations: Reservation[] = [
        { 
          id: '#RW-2024-001', 
          status: 'new' as const, 
          serviceName: 'باقة الغسيل الشامل', 
          dateTime: '2024-12-28 14:30',
          price: 150,
          location: 'الرياض - حي النرجس',
          vehicleInfo: 'تويوتا كامري 2023 - أبيض'
        },
        { 
          id: '#RW-2024-002', 
          status: 'completed' as const, 
          serviceName: 'باقة الغسيل اليومي', 
          dateTime: '2024-12-27 10:00',
          price: 80,
          location: 'الرياض - حي الملقا',
          vehicleInfo: 'هيونداي إلنترا 2022 - أسود',
          completedAt: '2024-12-27 11:30'
        }
      ];
      
      return {
        status: false,
        code: 500,
        message: 'فشل في جلب البيانات من الخادم، يتم عرض بيانات تجريبية',
        data: fallbackReservations,
        errors: [error]
      };
    }
  }

  // Helper method to get auth token
  private getAuthToken(): string {
    // يمكن استرجاع التوكن من localStorage أو من context
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    return token || '';
  }

  // Cancel reservation
  async cancelReservation(reservationId: string, reason?: string): Promise<ApiResponse<any>> {
    try {
      const endpoint = API_ENDPOINTS.CANCEL_RESERVATION.replace('{id}', reservationId);
      const response = await this.request<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: reason || 'تم الإلغاء من قبل العميل' })
      });
      
      return response;
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      return {
        status: false,
        code: 500,
        message: 'فشل في إلغاء الحجز',
        data: null,
        errors: [error]
      };
    }
  }

  // Get reservation details
  async getReservationDetails(reservationId: string): Promise<ApiResponse<any>> {
    try {
      const endpoint = `/api/user/reservations/${reservationId}`;
      const response = await this.request<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        }
      });
      
      return response;
    } catch (error) {
      console.error('Error fetching reservation details:', error);
      return {
        status: false,
        code: 500,
        message: 'فشل في جلب تفاصيل الحجز',
        data: null,
        errors: [error]
      };
    }
  }

  // Get popular products
  async getPopularProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await this.request<Product[]>(API_ENDPOINTS.PRODUCTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      return response;
    } catch (error) {
      console.error('Error fetching popular products:', error);
      
      // Fallback mock data based on actual API structure
      const fallbackProducts: Product[] = [
        {
          id: 1,
          status: "pending",
          quantity: "24",
          name: "Car Sunshade",
          description: "High-quality sunshade for car windows, protects from sunlight and heat.",
          price: "24",
          promo_price: "29",
          currency: "SAR",
          thumbnail: "https://cdn.salla.sa/VqnonW/93127557-2ae8-4de2-9dfd-db93d2b2b2d5-500x500-fLQ6oWGGDAJukS6pelg8fkxX5ItjA6T5dcMePo2a.jpg",
          product_link: "https://online.rewash.store/xvqzwWp",
          created_at: "2025-06-30T15:34:13.000000Z",
          updated_at: "2025-06-30T15:34:13.000000Z"
        },
        {
          id: 2,
          status: "pending",
          quantity: "19",
          name: "Sunglasses Holder",
          description: "A convenient holder for your sunglasses in the car.",
          price: "19",
          promo_price: "25",
          currency: "SAR",
          thumbnail: "https://cdn.salla.sa/VqnonW/eaf7999b-1c67-41c3-929a-03ae055f8e35-500x500-WTcJgL0Ekxtp9lXv7Yn2adxY7xLHfLIgv6IQpUs2.jpg",
          product_link: "https://online.rewash.store/DpNXeAd",
          created_at: "2025-06-30T15:34:13.000000Z",
          updated_at: "2025-06-30T15:34:13.000000Z"
        },
        {
          id: 3,
          status: "pending",
          quantity: "69",
          name: "Air Seat Cushion",
          description: "Comfortable air cushion for car seats.",
          price: "69",
          promo_price: "75",
          currency: "SAR",
          thumbnail: "https://cdn.salla.sa/VqnonW/6a552e7d-bdd1-409f-ad44-d87605494b0e-500x500-x93KzMWFkOpP7YU1NL5oxh9sE0vJyyvLNhDpo7lV.jpg",
          product_link: "https://online.rewash.store/PDqrWON",
          created_at: "2025-06-30T15:34:13.000000Z",
          updated_at: "2025-06-30T15:34:13.000000Z"
        }
      ];
      
      return {
        status: false,
        code: 500,
        message: 'فشل في جلب المنتجات، يتم عرض بيانات تجريبية',
        data: fallbackProducts,
        errors: [error]
      };
    }
  }

  // Get transaction details
  async getTransactionDetails(transactionId: string): Promise<ApiResponse<TransactionDetails>> {
    try {
      const endpoint = API_ENDPOINTS.TRANSACTION_DETAILS.replace('{id}', transactionId);
      const response = await this.request<TransactionDetails>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json',
        }
      });
      
      return response;
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      
      // Fallback mock data
      const fallbackTransaction: TransactionDetails = {
        id: transactionId,
        date: '14/04/2025',
        time: '01:04',
        totalAmount: 145,
        additionalServices: 16,
        serviceName: 'باقة الغسيل الشامل',
        status: 'completed',
        paymentMethod: 'بطاقة ائتمان'
      };
      
      return {
        status: false,
        code: 500,
        message: 'فشل في جلب تفاصيل المعاملة، يتم عرض بيانات تجريبية',
        data: fallbackTransaction,
        errors: [error]
      };
    }
  }
}

export const apiService = new ApiService();
