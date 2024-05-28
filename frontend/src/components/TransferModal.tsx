import { DriverData, fetchDriverData } from "@/actions/driverAction";
import { postTransferData } from "@/actions/transferAction";
import React, { useEffect, useState } from "react";
import { selectVehicle } from "./Vehicle";

interface TransferModalProps {
  vehicle: selectVehicle;
  closeTransferModal: () => void;
}
const TransferModal: React.FC<TransferModalProps> = ({
  vehicle,
  closeTransferModal,
}) => {
  const [driver, setDriver] = useState<DriverData[]>();
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

  const fetchDriver = async () => {
    try {
      const data: DriverData[] = await fetchDriverData();
      setDriver(data);
    } catch (error) {
      // Handle error
    }
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postTransferData({
        driverId: selectedDriver ?? 0,
        vehicleId: vehicle.id,
      });
      closeTransferModal();
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchDriver();
  }, []);
  return (
    <div>
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
            <div className="mb-4">
              <label className="text-gray-700 ">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={vehicle.vehicleNumber}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Driver</label>
              <select
                name="driver"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                value={selectedDriver ? selectedDriver : -1}
                onChange={(e) => setSelectedDriver(Number(e.target.value))}
                required
              >
                <option value={-1} disabled selected>
                  Select a driver
                </option>
                {driver && driver.length > 0 ? (
                  driver?.map((d) => {
                    return <option value={d.id}>{d.name}</option>;
                  })
                ) : (
                  <p>No Data Available</p>
                )}
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
    </div>
  );
};

export default TransferModal;
