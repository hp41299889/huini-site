import { Outlet } from "react-router";
import Topbar from "~/layout/topbar"; // Import the new Topbar component
import { MobileMenu } from "~/components/layout/mobile-menu";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Topbar /> {/* Use the Topbar component here */}
      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-auto p-4 md:p-8 w-full pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileMenu />
    </div>
  );
}
