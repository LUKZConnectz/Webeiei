import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur border-b">
      <div className="px-4 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">Dashboard</h2>
          <p className="text-sm text-gray-500">ยินดีต้อนรับกลับ</p>
        </div>
        <button className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
