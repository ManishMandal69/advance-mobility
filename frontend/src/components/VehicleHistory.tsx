import { TransferDataWithVehicleAndDriverType, fetchTransferData } from '@/actions/transferAction';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


const VehicleHistory = () => {
  const [vehicleHistoryData, setVehicleHistoryData] = useState<TransferDataWithVehicleAndDriverType[]>([]);
  const vehicleId = useRouter().query.vehicleid

  useEffect(() => {
    const fetchTransferAllData = async () => {
        try {
          const data: TransferDataWithVehicleAndDriverType[] = await fetchTransferData(Number(vehicleId));
          setVehicleHistoryData(data);
        } catch (error) {
          // Handle error
        }
      };
      fetchTransferAllData()
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Vehicle History</h2>
      <table className="min-w-full bg-white border border-gray-200 text-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-black">Vehicle Number</th>
            <th className="border border-gray-300 px-4 py-2 text-black">Driver Name</th>
            <th className="border border-gray-300 px-4 py-2 text-black">Transfer Date</th>
          </tr>
        </thead>
        <tbody>
          {vehicleHistoryData.map((row,index) => (
            <tr key={row.id} className={`text-black ${index === 0 ? "bg-green-400" : "bg-white"}`}>
              <td className="border border-gray-300 px-4 py-2">{row.vehicle.vehicleNumber}</td>
              <td className="border border-gray-300 px-4 py-2">{row.driver.name}</td>
              <td className="border border-gray-300 px-4 py-2">{row.createdAt.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleHistory;
