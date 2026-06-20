import { formatCurrency, formatDistance } from "../services/tripStats";

export default function RecentTrips({ trips = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4">รอบล่าสุด</h2>
      <div className="space-y-4">
        {trips.length === 0 && <p className="text-gray-500">ยังไม่มีรอบงาน</p>}
        {trips.slice(0, 5).map((trip) => (
          <div key={trip.id} className="flex justify-between border-b pb-3 last:border-b-0 last:pb-0">
            <div>
              <p className="font-medium">{trip.platform}</p>
              <p className="text-sm text-gray-500">{formatDistance(trip.distance)}</p>
            </div>
            <span className="font-bold">{formatCurrency(trip.income)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
