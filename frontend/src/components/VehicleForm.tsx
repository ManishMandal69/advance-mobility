import React, { useState } from 'react';

const VehicleForm: React.FC = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pucCertificate, setPucCertificate] = useState<File | null>(null);
  const [insuranceCertificate, setInsuranceCertificate] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ vehicleNumber, vehicleType, pucCertificate, insuranceCertificate });
  };

  return (
    <div className="container py-6">
        <form className="max-w-md mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-black">Vehicle Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Vehicle Number</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Vehicle Type</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">PUC Certificate</label>
        <input
          type="file"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          onChange={(e) => setPucCertificate(e.target.files ? e.target.files[0] : null)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Insurance Certificate</label>
        <input
          type="file"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          onChange={(e) => setInsuranceCertificate(e.target.files ? e.target.files[0] : null)}
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
    </div>
  );
};

export default VehicleForm;
