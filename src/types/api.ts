
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
