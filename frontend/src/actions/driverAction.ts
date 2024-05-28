import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

export interface DriverData {
    id: number;
  name: string;
  phoneNumber: string;
  profilePhoto: string ;
}

export interface Driver {
  name: string;
  phoneNumber: string;
  profilePhoto: string ;
}

// Function to post form data
const postDriverData = async (formData: Driver): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.post<void>(`${BASE_URL}/drivers`, formData);
    console.log('Form data posted:', response);
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to fetch all data
const fetchDriverData = async (): Promise<any[]> => {
  try {
    const response: AxiosResponse<any[]> = await axios.get<any[]>(`${BASE_URL}/drivers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export { postDriverData, fetchDriverData };
