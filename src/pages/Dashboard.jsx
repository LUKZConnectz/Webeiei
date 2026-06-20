import { Bike, Fuel, TrendingUp, Wallet } from "lucide-react";

import FuelPriceCard from "../components/FuelPriceCard";
import IncomeChart from "../components/IncomeChart";
import RecentTrips from "../components/RecentTrips";
import SummaryCard from "../components/SummaryCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rider Dashboard</h1>
        <p className="text-gray-500">ภาพรวมการทำงานวันนี้</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="รายได้วันนี้" value="฿1,250" icon={<Wallet />} />
        <SummaryCard title="จำนวนรอบ" value="12" icon={<Bike />} />
        <SummaryCard title="ค่าน้ำมัน" value="฿320" icon={<Fuel />} />
        <SummaryCard title="กำไร" value="฿930" icon={<TrendingUp />} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <IncomeChart />
        <FuelPriceCard />
      </div>
      <RecentTrips />
    </div>
  );
}
