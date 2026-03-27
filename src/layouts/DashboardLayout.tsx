import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardTopNav } from "./components/DashboardTopNav";

export const DashboardLayout = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex w-full overflow-hidden font-sans ">
      {/* Left Sidebar */}
      <DashboardSidebar />

      {/* Main Content Context */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
      


        {/* Fixed TopNav overlaying the background */}
        <div className="relative z-20 shrink-0 pl-24">
          <DashboardTopNav
            isNotificationsOpen={isNotificationsOpen}
            toggleNotifications={toggleNotifications}
          />
        </div>

        {/* Scrollable area where Page content lives */}
        <main className="flex-1 flex flex-col w-full h-full overflow-y-auto relative z-10 px-24 pb-8">
          <Outlet context={{ isNotificationsOpen, toggleNotifications }} />
        </main>
      </div>
    </div>
  );
};
