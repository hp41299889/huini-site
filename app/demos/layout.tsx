import { Outlet } from "react-router";

export default function DemosLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Add any common demo layout elements here, e.g., a sub-navigation */}
      <Outlet />
    </div>
  );
}
