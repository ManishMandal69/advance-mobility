import React, { useState } from "react";

const Driver = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    driverName: '',
    driverNumber: '',
    photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="container py-4">
        <button
          id="openModal"
          className="bg-blue-500 text-white px-4 py-2 rounded"
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
              <h2 className="text-2xl font-bold mb-6 text-black">Driver Form</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="driverName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  value={formData.driverName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mobile No</label>
                <input
                  type="text"
                  name="driverNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  value={formData.driverNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Photo</label>
                <input
                  type="file"
                  name="photo"
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
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b">Row 1, Cell 1</td>
              <td className="px-4 py-2 border-b">Row 1, Cell 2</td>
              <td className="px-4 py-2 border-b">Row 1, Cell 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Driver;
