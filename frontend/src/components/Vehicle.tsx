import React from "react";

const Vehicle = () => {
  return (
    <div className="container mx-auto mt-6">
      <div className="contaner py-4">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Vehicle Details
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Vehicle Number</th>
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

export default Vehicle;
