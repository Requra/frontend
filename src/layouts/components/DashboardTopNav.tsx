import { Search, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

interface DashboardTopNavProps {
  isNotificationsOpen: boolean;
  toggleNotifications: () => void;
}

export const DashboardTopNav = ({ isNotificationsOpen, toggleNotifications }: DashboardTopNavProps) => {
  return (
    <header className="w-full h-24 flex items-center justify-between px-8 z-10 shrink-0">
      {/* Search Input */}
      <div className="relative w-[320px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-11 pl-11 pr-4 rounded-full bg-white/95 border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-sm placeholder:text-neutral-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <Button
          onClick={toggleNotifications}
          variant="ghost"
          size="icon"
          className={`relative p-2 rounded-full transition-all duration-200 ${isNotificationsOpen
              ? "bg-white text-primary-600 shadow-lg scale-110"
              : "text-white hover:bg-white/10"
            }`}
        >
          {isNotificationsOpen ? <BellOff size={24} /> : <Bell size={24} />}
          {/* Notification badge dot - only show when closed */}
          {!isNotificationsOpen && (
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-sky-200 rounded-full border-2 border-primary-600"></span>
          )}
        </Button>

        <div className="flex items-center gap-3 bg-white/10 pr-4 pl-1 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors text-white border border-white/10 shadow-sm backdrop-blur-sm">
          <div className="w-9 h-9 rounded-full bg-white text-[#7E57C2] flex items-center justify-center font-bold text-sm shadow-sm">
            H
          </div>
          <div className="text-sm font-medium mr-1 flex gap-1">
            <span>Hassan</span>
            <span className="text-white/70 font-normal text-xs mt-[2px]">PA</span>
          </div>
        </div>
      </div>
    </header>
  );
};
