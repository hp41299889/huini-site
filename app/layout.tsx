import { Outlet } from "react-router";
import Topbar from "~/layout/topbar"; // Import the new Topbar component

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Topbar /> {/* Use the Topbar component here */}
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto p-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
