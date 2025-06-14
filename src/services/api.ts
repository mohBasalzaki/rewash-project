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

    return this.request(API_ENDPOINTS.OTP_SEND, {
      method: 'POST',
      body: JSON.stringify({ phone: phoneNumber }),
    });
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
          errors: { otp: ['OTP does not match'] }
        };
      }
    }

    return this.request(API_ENDPOINTS.OTP_VALIDATE, {
      method: 'POST',
      body: JSON.stringify({ otp, phone: phoneNumber }),
    });
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

    return this.request(API_ENDPOINTS.OTP_RESEND, {
      method: 'POST',
      body: JSON.stringify({ phone: phoneNumber }),
    });
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
