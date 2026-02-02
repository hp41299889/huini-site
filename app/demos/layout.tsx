import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

export default function DemosLayout() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      {/* Add any common demo layout elements here, e.g., a sub-navigation */}
      <Outlet />
    </div>
  );
}
