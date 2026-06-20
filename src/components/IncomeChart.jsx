import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function IncomeChart({ data = [] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4">รายได้ 7 วันล่าสุด</h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip formatter={(value) => [`฿${value}`, "รายได้"]} />
          <Area type="monotone" dataKey="income" stroke="#6366f1" fill="#c7d2fe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
