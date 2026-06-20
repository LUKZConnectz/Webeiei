import BottomNav from "./BottomNav";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:ml-72">
        <Header />
        <main className="p-4 lg:p-8 pb-24">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
