import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { useTrips } from "../hooks/useTrips";
import { buildMonthlyIncome, buildTripSummary, formatCurrency } from "../services/tripStats";

export default function Stats() {
  const { trips } = useTrips();
  const data = buildMonthlyIncome(trips);
  const summary = buildTripSummary(trips);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">สถิติรายได้</h1>
        <p className="text-gray-500">สรุปจากรอบงานทั้งหมด: {formatCurrency(summary.totalIncome)}</p>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        {data.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีข้อมูลสำหรับแสดงกราฟ</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <Tooltip formatter={(value) => [`฿${value}`, "รายได้"]} />
              <Bar dataKey="income" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
