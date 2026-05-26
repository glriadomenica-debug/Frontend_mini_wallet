import HeaderDashboard from "./headerDashboard";
import { Outlet } from "react-router-dom";

export default function LayoutDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <HeaderDashboard />

      <main className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
