
export interface ApiResponse<T> {
  status: boolean;
  code?: number;
  message: string;
  data: T;
  errors: any[];
}

export interface OtpResponse {
  otp?: string;
}

export interface PaymentMethod {
  name: string;
  fields?: string[];
}

export interface PaymentMethods {
  methods: {
    creditcard: PaymentMethod;
    stcpay: PaymentMethod;
    applepay: PaymentMethod;
    googlepay: PaymentMethod;
  };
}

export interface AttributeValue {
  id: number;
  value: string;
}

export interface ProjectAttribute {
  id: number;
  name: string;
  values: AttributeValue[];
}

export interface ProjectData {
  id: number;
  project_name: string;
  slug: string;
  attributes: ProjectAttribute[];
}

export interface VehicleColor {
  id: number;
  branch_id: number;
  vehicle_color: string;
  vehicle_en_color: string;
  vehicle_color_code: string;
  sort: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface VehicleType {
  id: number;
  branch_id: number;
  icon: string;
  type: string;
  en_type: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceType {
  id: number;
  name: string;
  price?: number;
  promotional_price?: number;
}

export interface AdditionalService {
  id: number;
  branch_id: number;
  name: string;
  en_name: string;
  image: string;
  price: number;
  promotional_price: number;
  type: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  loyalty_points: number;
}

export interface Reservation {
  id: string;
  status: 'new' | 'going_to_customer' | 'arrived_at_customer' | 'washing_in_progress' | 'completed' | 'cancelled';
  serviceName: string;
  dateTime: string;
  price?: number;
  location?: string;
  vehicleInfo?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  status: string;
  quantity: string;
  name: string;
  description: string;
  price: string;
  promo_price: string;
  currency: string;
  thumbnail: string;
  product_link: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionDetails {
  id: string;
  date: string;
  time: string;
  totalAmount: number;
  additionalServices: number;
  serviceName: string;
  status: string;
  paymentMethod: string;
}

export interface AppointmentData {
  // Personal Data
  name: string;
  phoneNumber: string;
  address: string;
  carLocation: string;
  zone: string;
  
  // Vehicle Information
  vehicleBrand: string;
  vehicleColor: string;
  plateNumber: string;
  notes?: string;
  vehicleImage?: File;
  
  // Service Information
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  additionalServices: number[];
  
  // Payment Information
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}
