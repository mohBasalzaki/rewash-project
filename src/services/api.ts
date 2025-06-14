
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { 
  ApiResponse, 
  OtpResponse, 
  PaymentMethods, 
  ProjectData, 
  VehicleColor, 
  VehicleType, 
  ServiceType, 
  AdditionalService 
} from '../types/api';

class ApiService {
  private baseUrl = API_BASE_URL;

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

  // OTP methods
  async sendOtp(phoneNumber: string): Promise<ApiResponse<OtpResponse>> {
    return this.request(API_ENDPOINTS.OTP_SEND, {
      method: 'POST',
      body: JSON.stringify({ phone: phoneNumber }),
    });
  }

  async validateOtp(otp: string, phoneNumber: string): Promise<ApiResponse<any>> {
    return this.request(API_ENDPOINTS.OTP_VALIDATE, {
      method: 'POST',
      body: JSON.stringify({ otp, phone: phoneNumber }),
    });
  }

  async resendOtp(phoneNumber: string): Promise<ApiResponse<OtpResponse>> {
    return this.request(API_ENDPOINTS.OTP_RESEND, {
      method: 'POST',
      body: JSON.stringify({ phone: phoneNumber }),
    });
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

  // Projects
  async getProjectCarServices(): Promise<ApiResponse<ProjectData>> {
    return this.request(API_ENDPOINTS.PROJECTS_CAR_SERVICES);
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
    return this.request(API_ENDPOINTS.APPOINTMENTS, {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }
}

export const apiService = new ApiService();
