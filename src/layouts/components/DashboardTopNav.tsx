import { Bell, BellOff, ChevronDown, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { useAuthStore } from "@/stores/auth";
import { useLogout } from "@/features/auth/api/useLogout";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import { UserRole } from "@/features/auth/types/enums";

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
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  // Safe fallbacks for user data
  const name = user?.name || "User";
  const firstName = name.split(" ")[0];
  const initial = name.charAt(0).toUpperCase();

  // Map role enum to display name
  const roleNameMap: Record<number, string> = {
    [UserRole.Stackholder]: "Stakeholder",
    [UserRole.BussinessAnalyst]: "Analyst",
    [UserRole.ProjectManager]: "Project Manager",
  };
  const primaryRole = typeof user?.roles?.[0] === 'number' 
    ? roleNameMap[user.roles[0]] || "Member"
    : "Member";

  // Quick helper to abbreviate roles nicely, e.g., "Project Admin" -> "PA"
  const getRoleAbbreviation = (roleStr: string) => {
    if (!roleStr) return "";
    const parts = roleStr.split(/_|\s|-/); // Handle spaces, underscores, hyphens
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return roleStr.substring(0, 2).toUpperCase();
  };

  const roleAbbreviation = getRoleAbbreviation(primaryRole);

  return (
    <header
      className={`w-full h-20 pt-2 flex items-center justify-between px-8 z-10 shrink-0 ${isOnGradient ? "" : "shadow-sm bg-white"}`}
    >
      {/* Left Side: Greeting & Search */}
      <div className="flex items-center gap-8 flex-1">
        <SearchBar className="max-w-[400px] w-full" placeholder="Search projects, files, or people..." />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5 ml-4">
        {/* Notification Bell */}
        <Button
          onClick={toggleNotifications}
          variant="ghost"
          aria-label={
            isNotificationsOpen ? "Close notifications" : "Open notifications"
          }
          className={`relative size-9 flex items-center justify-center rounded-full transition-all duration-300 ${
            isNotificationsOpen
              ? isOnGradient
                ? "bg-white text-primary-600 shadow-lg scale-105"
                : "bg-primary-100 text-primary-600 shadow-lg scale-105"
              : isOnGradient
                ? "text-white hover:bg-white/10"
                : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          {isNotificationsOpen ? (
            <BellOff className="size-5" />
          ) : (
            <Bell className="size-5" />
          )}
          {/* Notification count badge */}
          {!isNotificationsOpen && notificationCount > 0 && (
            <span
              className={`absolute top-0 right-0 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 shadow-sm ring-2 ${
                isOnGradient ? "ring-[#562F8B]" : "ring-white"
              }`}
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              role="button"
              tabIndex={0}
              aria-label="User menu"
              className={`flex items-center gap-3 pr-3 pl-1.5 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isOnGradient
                  ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md focus-visible:ring-white/50"
                  : "bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 focus-visible:ring-primary-500"
              }`}
            >
              <Avatar
                src={user?.profilePicture || undefined}
                fallback={initial}
                className={`size-8 border-2 ${isOnGradient ? "border-transparent bg-white text-primary-700" : "border-white bg-primary-100 text-primary-700"}`}
              />
              <div className="text-sm font-medium hidden sm:flex items-center gap-2">
                <span className="truncate max-w-[100px] xl:max-w-[150px] font-semibold" title={name}>
                  {firstName}
                </span>
                <span
                  title={primaryRole}
                  className={`font-semibold text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded-md shrink-0 ${
                    isOnGradient ? "bg-white/20 text-white" : "bg-primary-50 text-primary-700"
                  }`}
                >
                  {roleAbbreviation}
                </span>
              </div>
              <ChevronDown className={`size-4 opacity-70 hidden sm:block ${isOnGradient ? "text-white" : "text-neutral-500"}`} />
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-[240px] mt-2 rounded-2xl p-2 border-neutral-100 shadow-2xl">
            {/* User Profile Header */}
            <div className="px-2 py-3 border-b border-neutral-100 mb-2">
              <p className="font-semibold text-neutral-900 truncate">{name}</p>
              <p className="font-medium text-xs text-neutral-500 truncate">{primaryRole}</p>
            </div>
            
            {/* Menu Items */}
            <div className="space-y-1">
              <DropdownMenuItem className="py-2.5">
                <UserIcon className="size-4 opacity-70" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Settings className="size-4 opacity-70" />
                <span>Preferences</span>
              </DropdownMenuItem>
              
              <div className="h-px bg-neutral-100 my-2 mx-1" />
              
              <DropdownMenuItem 
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="py-2.5 text-red-600 focus:text-red-700 focus:bg-red-50"
              >
                <LogOut className={`size-4 opacity-70 ${logoutMutation.isPending ? "animate-pulse" : ""}`} />
                <span className="font-semibold">{logoutMutation.isPending ? "Logging out..." : "Log out"}</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
