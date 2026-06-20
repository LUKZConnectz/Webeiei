import { useState } from "react";

import { createTrip } from "../services/trips";

export default function NewTrip() {
  const [trip, setTrip] = useState({ platform: "", distance: "", income: "" });
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("กำลังบันทึก...");

    try {
      await createTrip({
        platform: trip.platform,
        distance: Number(trip.distance),
        income: Number(trip.income),
        fuel_cost: 0
      });
      setTrip({ platform: "", distance: "", income: "" });
      setStatus("บันทึกสำเร็จ");
    } catch (error) {
      setStatus(`บันทึกไม่สำเร็จ: ${error.message}`);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">เพิ่มรอบงาน</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <select value={trip.platform} className="w-full border rounded-xl p-3" onChange={(e) => setTrip({ ...trip, platform: e.target.value })} required>
          <option value="">เลือกแพลตฟอร์ม</option>
          <option>Grab</option>
          <option>LINE MAN</option>
          <option>ShopeeFood</option>
        </select>
        <input value={trip.distance} placeholder="ระยะทาง (กม.)" className="w-full border rounded-xl p-3" onChange={(e) => setTrip({ ...trip, distance: e.target.value })} type="number" min="0" step="0.1" required />
        <input value={trip.income} placeholder="รายได้" className="w-full border rounded-xl p-3" onChange={(e) => setTrip({ ...trip, income: e.target.value })} type="number" min="0" step="1" required />
        <button className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600">บันทึก</button>
        {status && <p className="text-sm text-gray-500">{status}</p>}
      </form>
    </div>
  );
}
