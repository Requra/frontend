import { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardTopNav } from "./components/DashboardTopNav";
import { NotificationsPanel } from "@/features/dashboard/components/NotificationsPanel";

export const DashboardLayout = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleNotifications = useCallback(
    () => setIsNotificationsOpen((prev) => !prev),
    []
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

        {/* Header gradient background - visible on all pages */}
        <div className="absolute top-0 left-0 right-0 h-[200px] z-0 pointer-events-none overflow-hidden">
          <svg
            width="100%"
            height="200"
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-[200px]"
          >
            <path
              d="M0 0H1440V140C1440 140 1200 200 720 200C240 200 0 140 0 140V0Z"
              fill="url(#paint_header_bg)"
            />
            <defs>
              <radialGradient
                id="paint_header_bg"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(720 100) scale(720 100)"
              >
                <stop stopColor="var(--color-primary-900)" />
                <stop offset="0.89" stopColor="var(--color-primary-600)" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* TopNav */}
        <div className="relative z-20 shrink-0">
          <DashboardTopNav
            isNotificationsOpen={isNotificationsOpen}
            toggleNotifications={toggleNotifications}
          />
        </div>

        {/* Scrollable page content */}
        <main
          className={`flex-1 flex flex-col w-full h-full overflow-y-auto scroll-smooth relative z-10 pb-8 px-8 transition-[padding] duration-300 ease-in-out ${
            isNotificationsOpen ? "pr-[340px]" : "pr-8"
          }`}
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
        <NotificationsPanel />
      </div>
    </div>
  );
};
