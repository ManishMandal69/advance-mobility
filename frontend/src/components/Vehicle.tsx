import { fetchData, postData } from "@/actions/vehicleAction";
import { fetchDriverData } from "@/actions/driverAction";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TransferModal from "./TransferModal";
import { convertFileToBase64 } from "./convertToBase64";


export interface selectVehicle {

  id: number;
  insuranceCertificate : string; 
  pucCertificate : string;
  vehicleNumber : string;
  vehicleType: string;
}
const Vehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<selectVehicle>();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    pucCertificate: "",
    insuranceCertificate: "",
  });
  const fetchAllData = async () => {
    try {
      const data: selectVehicle[] = await fetchData();
      setVehicles(data);
    } catch (error) {
      // Handle error
    }
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        alert("File size exceeds the limit of 2MB.");
        return;
      }
      const base64 = await convertFileToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: base64,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postData(formData);
      fetchAllData(); // Refresh data after successful submission
      setFormData({
        vehicleNumber: "",
        vehicleType: "",
        pucCertificate: "",
        insuranceCertificate: "",
      });
      closeModal()
    } catch (error) {
      // Handle error
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openTransferModal = (vehicle: selectVehicle) => {
    setSelectedVehicle(vehicle);
    setIsTransferModalOpen(true);
  };

  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <div className="container py-4">
        <button
          id="openModal"
          className="bg-indigo-400 text-white px-4 py-2 rounded"
          onClick={openModal}
        >
          Create Vehicle
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Popup Title</h3>
              <button onClick={closeModal} className="text-black">
                &times;
              </button>
            </div>

            <form
              className="max-w-md mx-auto bg-white p-6 rounded-lg"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold mb-6 text-black">
                Vehicle Form
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle Type</label>
                <input
                  type="text"
                  name="vehicleType"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">PUC Certificate</label>
                <input
                  type="file"
                  name="pucCertificate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Insurance Certificate
                </label>
                <input
                  type="file"
                  name="insuranceCertificate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Vehicle Number</th>
              <th className="px-4 py-2 border-b">Vehicle Type</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(vehicles) && vehicles.length > 0 ? (
              vehicles.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 border-b text-center">
                    {row.vehicleNumber}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {row.vehicleType}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <Link href={`/vehicletransfer?vehicleid=${row.id}`}>
                      <button className="bg-red-500 text-white py-1 px-1 rounded hover:bg-red-700 mr-4">
                        History
                      </button>
                    </Link>

                    <button
                      id="openTransferModal"
                      className="bg-red-500 text-white py-1 px-1 rounded hover:bg-red-700"
                      onClick={() => openTransferModal(row)}
                    >
                      Transfer
                    </button>
                    {isTransferModalOpen && selectedVehicle && (
                      <TransferModal
                        vehicle={selectedVehicle}
                        closeTransferModal={closeTransferModal}
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 border-b text-center">
                  No vehicles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicle;
