import { Bike, Fuel, TrendingUp, Wallet } from "lucide-react";

import FuelPriceCard from "../components/FuelPriceCard";
import IncomeChart from "../components/IncomeChart";
import RecentTrips from "../components/RecentTrips";
import SummaryCard from "../components/SummaryCard";
import { useTrips } from "../hooks/useTrips";
import { buildDailyIncome, buildTripSummary, formatCurrency, formatDistance } from "../services/tripStats";

export default function Dashboard() {
  const { error, isLoading, isSampleData, trips } = useTrips();
  const summary = buildTripSummary(trips);
  const dailyIncome = buildDailyIncome(trips);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rider Dashboard</h1>
        <p className="text-gray-500">ภาพรวมรอบงานจากฐานข้อมูล Supabase</p>
      </div>
      {isLoading && <p className="rounded-2xl bg-white p-4 text-gray-500 shadow-sm">กำลังโหลดข้อมูล...</p>}
      {isSampleData && (
        <p className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-700">
          ใช้ข้อมูลตัวอย่างชั่วคราว เพราะเชื่อมต่อฐานข้อมูลไม่สำเร็จ{error ? ` (${error})` : ""}
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="รายได้รวม" value={formatCurrency(summary.totalIncome)} icon={<Wallet />} helperText="จากทุกไฟล์ข้อมูล" />
        <SummaryCard title="จำนวนรอบ" value={summary.totalTrips} icon={<Bike />} helperText={formatDistance(summary.totalDistance)} />
        <SummaryCard title="ค่าน้ำมัน" value={formatCurrency(summary.totalFuelCost)} icon={<Fuel />} helperText="รวมค่าใช้จ่าย" />
        <SummaryCard title="กำไร" value={formatCurrency(summary.profit)} icon={<TrendingUp />} helperText="รายได้ - น้ำมัน" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <IncomeChart data={dailyIncome} />
        <FuelPriceCard />
      </div>
      <RecentTrips trips={trips} />
    </div>
  );
}
