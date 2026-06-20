import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { month: "ม.ค.", income: 18000 },
  { month: "ก.พ.", income: 21000 },
  { month: "มี.ค.", income: 24500 }
];

export default function Stats() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">สถิติรายได้</h1>
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Bar dataKey="income" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
