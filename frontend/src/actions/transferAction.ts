import axios, { AxiosResponse } from 'axios';
import { DriverData } from './driverAction';
import { VehicleData } from './vehicleAction';

const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

export interface TransferDataType {
    vehicleId: number,
    driverId: number
}

export interface TransferDataWithVehicleAndDriverType {
    id: number,
    vehicleId: number,
    driverId: number,
    createdAt: Date,
    vehicle: VehicleData,
    driver: DriverData
}
// Function to post form data
const postTransferData = async (formData: TransferDataType): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.post<void>(`${BASE_URL}/vehicle-transfer`, formData);
    console.log('Form data posted:', response);
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to fetch all data
const fetchTransferData = async (vehicleId: number): Promise<any[]> => {
  try {
    const response: AxiosResponse<any[]> = await axios.get<any[]>(`${BASE_URL}/vehicle-transfer/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { postTransferData, fetchTransferData};
