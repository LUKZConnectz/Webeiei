import { useEffect, useState } from "react";

import { deleteTrip, getTrips } from "../services/trips";

export default function History() {
  const [trips, setTrips] = useState([]);
  const [status, setStatus] = useState("กำลังโหลดข้อมูล...");

  useEffect(() => {
    async function load() {
      try {
        const data = await getTrips();
        setTrips(data ?? []);
        setStatus("");
      } catch (error) {
        setStatus(`โหลดข้อมูลไม่สำเร็จ: ${error.message}`);
      }
    }

    load();
  }, []);

  async function handleDelete(id) {
    await deleteTrip(id);
    setTrips((currentTrips) => currentTrips.filter((trip) => trip.id !== id));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ประวัติรอบงาน</h1>
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        {status && <p className="text-gray-500">{status}</p>}
        {!status && trips.length === 0 && <p className="text-gray-500">ยังไม่มีรอบงาน</p>}
        {trips.map((trip) => (
          <div key={trip.id} className="flex justify-between items-center py-4 border-b last:border-b-0">
            <div>
              <p>{trip.platform}</p>
              <p className="text-sm text-gray-500">{trip.distance} กม.</p>
            </div>
            <div className="flex items-center gap-4">
              <span>฿{trip.income}</span>
              <button onClick={() => handleDelete(trip.id)} className="text-sm text-red-500">ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
