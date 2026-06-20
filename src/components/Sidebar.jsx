import { Bike, ChartColumn, Fuel, LayoutDashboard, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { icon: LayoutDashboard, name: "Dashboard", to: "/" },
  { icon: Bike, name: "Trips", to: "/history" },
  { icon: Fuel, name: "Fuel", to: "/fuel" },
  { icon: ChartColumn, name: "Stats", to: "/stats" },
  { icon: Settings, name: "Settings", to: "/settings" }
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r flex-col p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">RiderLog</h1>
        <p className="text-sm text-gray-500">Rider Management</p>
      </div>
      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                  isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <NavLink to="/new-trip" className="mt-auto rounded-2xl bg-indigo-500 px-4 py-3 text-center font-semibold text-white shadow-sm hover:bg-indigo-600">
        เพิ่มรอบงาน
      </NavLink>
    </aside>
  );
}
