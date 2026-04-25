import { Link, useLocation } from "react-router-dom";
import LogoImg from "@/assets/images/Logo.png";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { sidebarRoutes } from "@/routes/config";
import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/api/useLogout";

export const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const logoutMutation = useLogout();

  const isActive = (path: string) => pathname.startsWith(path);

  const getItemStyles = (path: string) => {
    const active = isActive(path);
    return [
      "w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-xl relative group",
      active
        ? "bg-[#2A1B38] text-white shadow-lg shadow-purple-900/20"
        : "text-neutral-400 hover:text-[#2A1B38] hover:bg-neutral-50 hover:scale-110",
    ].join(" ");
  };

  const mainNavItems = sidebarRoutes.filter(
    (r) => r.sidebar?.group === "main" || !r.sidebar?.group,
  );
  const userNavItems = sidebarRoutes.filter((r) => r.sidebar?.group === "user");

  return (
    <aside className="w-[85px] bg-white h-screen flex flex-col items-center pt-6 border-r border-neutral-100 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0 fixed">
      {/* Top Logo */}
      <div className="mb-10">
        <Link to="/">
          <img
            src={LogoImg}
            alt="Requra Logo"
            className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Nav Icons */}
      <nav className="flex-1 flex flex-col items-center gap-6 w-full px-4">
        {mainNavItems.map((item) => (
          <div key={item.path} className="relative w-full flex justify-center">
            {isActive(item.path!) && (
              <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#2A1B38] rounded-r-full transition-all duration-300" />
            )}
            <Tooltip content={item.label || ""}>
              <Link to={item.path!} className={getItemStyles(item.path!)}>
                {item.sidebar?.icon}
              </Link>
            </Tooltip>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center gap-4 pb-8 w-full px-4">
        {/* Subtle Separator */}
        <div className="w-8 h-px bg-neutral-100 mb-2" />

        {/* User Items (Profile, etc.) */}
        {userNavItems.map((item) => (
          <div key={item.path} className="relative w-full flex justify-center">
            {isActive(item.path!) && (
              <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#2A1B38] rounded-r-full transition-all duration-300" />
            )}
            <Tooltip content={item.label || ""}>
              <Link to={item.path!} className={getItemStyles(item.path!)}>
                {item.sidebar?.icon}
              </Link>
            </Tooltip>
          </div>
        ))}

        {/* Dedicated Logout Action */}
        <Tooltip content="Logout">
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="w-12 h-12 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 rounded-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            <LogOut
              className={`size-6 ${logoutMutation.isPending ? "animate-pulse" : "group-hover:rotate-12"} transition-transform duration-300 cursor-pointer`}
            />
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};
