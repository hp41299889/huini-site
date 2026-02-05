import { Outlet } from "react-router";
import Topbar from "~/layout/topbar"; // Import the new Topbar component
import { MobileMenu } from "~/layout/mobile-menu";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      <Topbar /> {/* Use the Topbar component here */}
      <main className="flex-1 p-4 md:p-8 w-full pb-20 md:pb-8">
        <Outlet />
      </main>
      <MobileMenu />
    </div>
  );
}
