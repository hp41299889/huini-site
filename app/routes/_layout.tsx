import { Outlet } from 'react-router';
import { Navbar } from '../../components/layout/navbar';
import { Footer } from '../../components/layout/footer';
import { Sidebar } from '../../components/layout/sidebar'; // Assuming Sidebar will be implemented
import { MobileMenu } from '../../components/layout/mobile-menu'; // Assuming MobileMenu will be implemented

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        {/* Placeholder for Sidebar on larger screens */}
        <aside className="hidden md:block w-64 border-r border-border p-4">
          <Sidebar />
        </aside>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <MobileMenu /> {/* Placeholder for MobileMenu on smaller screens */}
      <Footer />
    </div>
  );
}