import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";

interface DashboardTopNavProps {
  isNotificationsOpen: boolean;
  toggleNotifications: () => void;
  notificationCount?: number;
  variant?: "light" | "onGradient";
}

export const DashboardTopNav = ({
  isNotificationsOpen,
  toggleNotifications,
  notificationCount = 3,
  variant = "light",
}: DashboardTopNavProps) => {
  const isOnGradient = variant === "onGradient";

  return (
    <header
      className={`w-full h-20 pt-2 flex items-center justify-between px-8 z-10 shrink-0 ${isOnGradient ? "" : "shadow-sm bg-white"}`}
    >
      {/* Search Input */}
      <SearchBar className="max-w-[400px]" placeholder="Search..." />

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <Button
          onClick={toggleNotifications}
          variant="ghost"
          aria-label={
            isNotificationsOpen ? "Close notifications" : "Open notifications"
          }
          className={`relative size-8 flex items-center justify-center rounded-full transition-all duration-200 ${
            isNotificationsOpen
              ? isOnGradient
                ? "bg-white text-primary-600 shadow-lg scale-110"
                : "bg-primary-100 text-primary-600 shadow-lg scale-110"
              : isOnGradient
                ? "text-white hover:bg-white/10"
                : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          {isNotificationsOpen ? (
            <BellOff className="size-6" />
          ) : (
            <Bell className="size-6" />
          )}
          {/* Notification count badge - only show when closed and count > 0 */}
          {!isNotificationsOpen && notificationCount > 0 && (
            <span
              className={`absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 border-2 shadow-sm ${
                isOnGradient ? "border-primary-700" : "border-white"
              }`}
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Button>

        {/* User Profile Pill */}
        <div
          role="button"
          tabIndex={0}
          aria-label="User menu"
          className={`flex items-center gap-3 pr-4 pl-2 py-1 rounded-full cursor-pointer transition-colors shadow-sm ${
            isOnGradient
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm"
              : "bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
              isOnGradient
                ? "bg-white text-[#7E57C2]"
                : "bg-primary-600 text-white"
            }`}
          >
            H
          </div>
          <div className="text-sm font-medium mr-1 flex gap-1">
            <span>Hassan</span>
            <span
              className={`font-normal text-xs mt-[2px] ${
                isOnGradient ? "text-white/70" : "text-neutral-400"
              }`}
            >
              PA
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
