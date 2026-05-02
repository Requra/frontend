import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardTopNav } from "./components/DashboardTopNav";
import { NotificationsPanel } from "@/features/dashboard/components/NotificationsPanel";
import { paths } from "@/routes/paths";

export const DashboardLayout = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === paths.app.dashboard;
  const isProfile = location.pathname === paths.app.profile;

  const toggleNotifications = useCallback(
    () => setIsNotificationsOpen((prev) => !prev),
    [],
  );

  // Close notifications on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isNotificationsOpen) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isNotificationsOpen]);

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex w-full overflow-hidden">
      {/* Left Sidebar - fixed 80px */}
      <DashboardSidebar />

      {/* Main Content Area - offset by sidebar width */}
      <div className="flex-1 flex flex-col relative ml-[80px] overflow-hidden">

        {/* TopNav */}
        <div className="relative z-20 shrink-0">
          <DashboardTopNav
            isNotificationsOpen={isNotificationsOpen}
            toggleNotifications={toggleNotifications}
            variant={isDashboard || isProfile ? "onGradient" : "light"}
          />
        </div>

        {/* Scrollable page content */}
        <main
          className={`flex-1 flex flex-col w-full h-full pt-8 overflow-y-auto scroll-smooth relative z-10 pb-8 px-8 transition-[padding] duration-300 ease-in-out`}
        >
          <Outlet context={{ isNotificationsOpen, toggleNotifications }} />
        </main>
      </div>

      {/* Notifications Backdrop */}
      <div
        className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 ${
          isNotificationsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleNotifications}
      />

      {/* Notifications Panel - fixed to viewport right edge */}
      <div
        className={`fixed top-0 right-0 h-screen w-[320px] z-50 transition-transform duration-300 ease-in-out ${
          isNotificationsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <NotificationsPanel onClose={toggleNotifications} />
      </div>
    </div>
  );
};
