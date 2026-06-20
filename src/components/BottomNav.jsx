import { ChartColumn, Fuel, House, Plus, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-2 z-50">
      <div className="flex justify-around items-center">
        <Item to="/" icon={<House size={20} />} label="Home" />
        <Item to="/fuel" icon={<Fuel size={20} />} label="Fuel" />
        <NavLink to="/new-trip" className="-mt-8 w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg" aria-label="Add trip">
          <Plus />
        </NavLink>
        <Item to="/stats" icon={<ChartColumn size={20} />} label="Stats" />
        <Item to="/settings" icon={<User size={20} />} label="Profile" />
      </div>
    </nav>
  );
}

function Item({ to, icon, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex flex-col items-center text-xs ${isActive ? "text-indigo-600" : "text-gray-500"}`}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
