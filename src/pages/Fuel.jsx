import FuelPriceCard from "../components/FuelPriceCard";
import { defaultFuelPrices, getBestFuelPrice } from "../services/fuelData";

export default function Fuel() {
  const bestFuel = getBestFuelPrice(defaultFuelPrices);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ราคาน้ำมัน</h1>
        <p className="text-gray-500">ข้อมูลกลางที่ใช้ร่วมกับแดชบอร์ดและการคำนวณค่าใช้จ่าย</p>
      </div>
      <div className="rounded-3xl bg-indigo-500 p-6 text-white shadow-sm">
        <p className="text-sm text-indigo-100">ราคาถูกสุดตอนนี้</p>
        <h2 className="mt-2 text-3xl font-bold">{bestFuel.name} ฿{bestFuel.price}</h2>
      </div>
      <FuelPriceCard fuels={defaultFuelPrices} />
    </div>
  );
}
