import { Outlet } from "react-router";
import Sidebar from "~/layout/sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      <div className="w-64 border-r border-gray-200">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
