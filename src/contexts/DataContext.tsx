
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';
import { VehicleColor, VehicleType, ServiceType, AdditionalService, ProjectData, PaymentMethods } from '../types/api';

interface DataContextType {
  vehicleColors: VehicleColor[];
  vehicleTypes: VehicleType[];
  serviceTypes: ServiceType[];
  additionalServices: AdditionalService[];
  projectData: ProjectData | null;
  paymentMethods: PaymentMethods | null;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [vehicleColors, setVehicleColors] = useState<VehicleColor[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([]);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        colorsResponse,
        typesResponse,
        serviceTypesResponse,
        additionalServicesResponse,
        projectResponse,
        paymentMethodsResponse
      ] = await Promise.all([
        apiService.getVehicleColors(),
        apiService.getVehicleTypes(),
        apiService.getServiceTypes(),
        apiService.getAdditionalServices(),
        apiService.getProjectCarServices(),
        apiService.getPaymentMethods()
      ]);

      // استخدام البيانات حتى لو كانت من fallback
      if (colorsResponse.status) {
        setVehicleColors(colorsResponse.data.vehicle_colors);
      }

      if (typesResponse.status) {
        setVehicleTypes(typesResponse.data.vehicle_types);
      }

      if (serviceTypesResponse.status) {
        setServiceTypes(serviceTypesResponse.data.service_types);
      }

      if (additionalServicesResponse.status) {
        setAdditionalServices(additionalServicesResponse.data);
      }

      if (projectResponse.status) {
        setProjectData(projectResponse.data);
      }

      if (paymentMethodsResponse.status) {
        setPaymentMethods(paymentMethodsResponse.data);
      }
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return (
    <DataContext.Provider value={{
      vehicleColors,
      vehicleTypes,
      serviceTypes,
      additionalServices,
      projectData,
      paymentMethods,
      loading,
      error,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};
