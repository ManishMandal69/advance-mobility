import {
  DriverData,
  fetchDriverData,
  postDriverData,
} from "@/actions/driverAction";
import React, { useEffect, useState } from "react";
import { convertFileToBase64 } from "./convertToBase64";

const Driver = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    profilePhoto: "",
  });
  const [driver, setDriver] = useState<DriverData[]>([]);

  const fetchAllData = async () => {
    try {
      const data: DriverData[] = await fetchDriverData();
      setDriver(data);
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
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
      await postDriverData(formData);
      fetchAllData();
      setFormData({
        name: "",
        phoneNumber: "",
        profilePhoto: "",
      });
      closeModal();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          Create Driver
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
                Driver Form
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mobile No</label>
                <input
                  type="text"
                  name="phoneNumber"
                  pattern="[0-9]{10}"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Photo</label>
                <input
                  type="file"
                  name="profilePhoto"
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
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(driver) && driver.length > 0 ? (
              driver.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 border-b text-center">{row.name}</td>
                  <td className="px-4 py-2 border-b text-center">
                    {row.phoneNumber}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 border-b text-center">
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Driver;
