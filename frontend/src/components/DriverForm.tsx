import React, { useState } from 'react';

const DriverForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, phoneNumber, profilePhoto });
  };

  return (
    <div className="container py-6">
<form className="max-w-md mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-black">Driver Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Profile Photo</label>
        <input
          type="file"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          onChange={(e) => setProfilePhoto(e.target.files ? e.target.files[0] : null)}
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

export default DriverForm;
