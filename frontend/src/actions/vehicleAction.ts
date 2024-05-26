import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

interface VehicleData {
  vehicleNumber: string;
  vehicleType: string;
  pucCertificate: string ;
  insuranceCertificate: string;
}

// Function to post form data
const postData = async (formData: VehicleData): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.post<void>(`${BASE_URL}/vehicle`, formData);
    console.log('Form data posted:', response);
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to fetch all data
const fetchData = async (): Promise<any[]> => {
  try {
    const response: AxiosResponse<any[]> = await axios.get<any[]>(`${BASE_URL}/vehicle`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { postData, fetchData };
