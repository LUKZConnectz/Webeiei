const fuels = [
  { name: "Gasohol 91", price: 34.68 },
  { name: "Gasohol 95", price: 36.15 },
  { name: "E20", price: 32.34 },
  { name: "Diesel", price: 32.94 }
];

export default function Fuel() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ราคาน้ำมัน</h1>
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
        {fuels.map((fuel) => (
          <div key={fuel.name} className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="font-medium">{fuel.name}</h2>
            <p className="text-2xl font-bold mt-2">฿{fuel.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
