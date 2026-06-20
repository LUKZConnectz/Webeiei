const fuels = [
  { name: "Gasohol 91", price: 34.68 },
  { name: "Gasohol 95", price: 36.15 },
  { name: "E20", price: 32.34 },
  { name: "Diesel", price: 32.94 }
];

export default function FuelPriceCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="font-semibold mb-5">ราคาน้ำมันวันนี้</h2>
      <div className="space-y-4">
        {fuels.map((fuel) => (
          <div key={fuel.name} className="flex justify-between">
            <span>{fuel.name}</span>
            <span>฿{fuel.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
