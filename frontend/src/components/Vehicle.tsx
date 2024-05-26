import { fetchData, postData } from "@/actions/vehicleAction";
import React, { useEffect, useState } from "react";

const Vehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    pucCertificate: "",
    insuranceCertificate: "",
  });

  const [transferData, setTransferData] = useState({
    vehicleNumber: '',
    driver: ''
  });
  const [vehicles, setVehicles] = useState<any[]>([]);
  const fetchAllData = async () => {
    try {
      const data: any[] = await fetchData();
      setVehicles(data);
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleTransferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransferData({
      ...transferData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postData(formData);
      fetchAllData(); // Refresh data after successful submission
    } catch (error) {
      // Handle error
    }
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle transfer data submission
      // For example:
      // await transferDataApi(transferData);
      fetchAllData(); // Refresh data after successful submission
      closeTransferModal();
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

  const openTransferModal = () => {
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
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
                  type="text"
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
                  type=""
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
              {vehicles.map((row) => {
                return (
            <tr>

                
                    <td className="px-4 py-2 border-b text-center">{row.vehicleNumber}</td>
                    <td className="px-4 py-2 border-b text-center">{row.vehicleType}</td>
                    <td className="px-4 py-2 border-b text-center">
      <button className="bg-red-500 text-white  py-1 px-1 rounded hover:bg-red-700 mr-4">History</button>
      <button
                    id="openTransferModal"
                    className="bg-red-500 text-white py-1 px-1 rounded hover:bg-red-700"
                    onClick={openTransferModal}
                  >
                    Transfer
                  </button>
                  {isTransferModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                      <div className="bg-white rounded-lg shadow-lg w-1/3">
                        <div className="border-b px-4 py-2 flex justify-between items-center">
                          <h3 className="font-semibold text-lg">Transfer Vehicle</h3>
                          <button onClick={closeTransferModal} className="text-black">
                            &times;
                          </button>
                        </div>
                        <form
                          className="max-w-md mx-auto bg-white p-6 rounded-lg"
                          onSubmit={handleTransferSubmit}
                        >
                          <h2 className="text-2xl font-bold mb-6 text-black">
                            Vehicle Transfer Form
                          </h2>
                          <div className="mb-4">
                            <label className="text-gray-700">Vehicle Number</label>
                            <input
                              type="text"
                              name="vehicleNumber"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                              value={transferData.vehicleNumber}
                              onChange={handleTransferChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700">Driver</label>
                            <select
                              name="driver"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                              value={transferData.driver}
                              onChange={handleTransferChange}
                              required
                            >
                              <option value="" disabled>Select a driver</option>
                              <option value="driver1">Driver 1</option>
                              <option value="driver2">Driver 2</option>
                              <option value="driver3">Driver 3</option>
                            </select>
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
                    </td>
                  
            </tr>

                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vehicle;
