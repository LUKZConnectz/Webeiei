const trips = [
  { app: "Grab", income: 120, distance: 5.2 },
  { app: "LINE MAN", income: 90, distance: 3.1 },
  { app: "ShopeeFood", income: 115, distance: 4.5 }
];

export default function RecentTrips() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4">รอบล่าสุด</h2>
      <div className="space-y-4">
        {trips.map((trip, index) => (
          <div key={index} className="flex justify-between border-b pb-3 last:border-b-0 last:pb-0">
            <div>
              <p className="font-medium">{trip.app}</p>
              <p className="text-sm text-gray-500">{trip.distance} กม.</p>
            </div>
            <span className="font-bold">฿{trip.income}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
