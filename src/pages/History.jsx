import { deleteTrip } from "../services/trips";
import { useTrips } from "../hooks/useTrips";
import { formatCurrency, formatDistance } from "../services/tripStats";

export default function History() {
  const { error, isLoading, isSampleData, setTrips, trips } = useTrips();

  async function handleDelete(id) {
    if (isSampleData) {
      setTrips((currentTrips) => currentTrips.filter((trip) => trip.id !== id));
      return;
    }

    await deleteTrip(id);
    setTrips((currentTrips) => currentTrips.filter((trip) => trip.id !== id));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ประวัติรอบงาน</h1>
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        {isLoading && <p className="text-gray-500">กำลังโหลดข้อมูล...</p>}
        {isSampleData && (
          <p className="mb-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-700">
            แสดงข้อมูลตัวอย่าง เพราะเชื่อมต่อฐานข้อมูลไม่สำเร็จ{error ? ` (${error})` : ""}
          </p>
        )}
        {!isLoading && trips.length === 0 && <p className="text-gray-500">ยังไม่มีรอบงาน</p>}
        {trips.map((trip) => (
          <div key={trip.id} className="flex justify-between items-center py-4 border-b last:border-b-0">
            <div>
              <p>{trip.platform}</p>
              <p className="text-sm text-gray-500">{formatDistance(trip.distance)}</p>
            </div>
            <div className="flex items-center gap-4">
              <span>{formatCurrency(trip.income)}</span>
              <button onClick={() => handleDelete(trip.id)} className="text-sm text-red-500">ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
