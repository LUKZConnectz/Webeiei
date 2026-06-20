import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { day: "จ", income: 800 },
  { day: "อ", income: 1100 },
  { day: "พ", income: 900 },
  { day: "พฤ", income: 1450 },
  { day: "ศ", income: 1300 },
  { day: "ส", income: 1700 },
  { day: "อา", income: 1500 }
];

export default function IncomeChart() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="font-semibold mb-4">รายได้ 7 วันล่าสุด</h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#6366f1" fill="#c7d2fe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
