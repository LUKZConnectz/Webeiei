import { defaultFuelPrices } from "../services/fuelData";

export default function FuelPriceCard({ fuels = defaultFuelPrices }) {
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
