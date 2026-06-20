export default function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="text-indigo-500">{icon}</div>
        <span className="text-xs text-green-500">+12%</span>
      </div>
      <p className="text-gray-500 mt-4">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
