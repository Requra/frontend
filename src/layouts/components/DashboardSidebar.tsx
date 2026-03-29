import { Link, useLocation } from "react-router-dom";
import LogoImg from "@/assets/images/Logo.png";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { sidebarRoutes } from "@/routes/config";

export const DashboardSidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname.startsWith(path);

  const getItemStyles = (path: string) => {
    const active = isActive(path);
    return [
      "w-12 h-12 flex items-center justify-center transition-all duration-200 rounded-xl relative",
      active
        ? "bg-[#2A1B38] text-white shadow-lg shadow-purple-900/20 scale-105"
        : "text-neutral-400 hover:text-[#2A1B38] hover:bg-neutral-50",
    ].join(" ");
  };

  const mainNavItems = sidebarRoutes.filter(
    (r) => r.sidebar?.group === "main" || !r.sidebar?.group,
  );
  const userNavItems = sidebarRoutes.filter((r) => r.sidebar?.group === "user");

  return (
    <aside className="w-[80px] bg-white h-screen flex flex-col items-center pt-4 border-r border-neutral-100 z-50 shadow-sm shrink-0 fixed">
      {/* Top Logo */}
      <div className="mb-12">
        <Link to="/">
          <img
            src={LogoImg}
            alt="Requra Logo"
            className="w-12 h-12 object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Nav Icons */}
      <nav className="flex-1 flex flex-col items-center gap-4 w-full">
        {mainNavItems.map((item) => (
          <div key={item.path} className="relative">
            {isActive(item.path!) && (
              <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#2A1B38] rounded-r-full" />
            )}
            <Tooltip content={item.label || ""}>
              <Link to={item.path!} className={getItemStyles(item.path!)}>
                {item.sidebar?.icon}
              </Link>
            </Tooltip>
          </div>
        ))}
      </nav>

      {/* Bottom User Profile Icon */}
      <div className="mt-auto flex flex-col items-stretch gap-4 mb-4">
        {userNavItems.map((item) => (
          <div key={item.path} className="relative">
            {isActive(item.path!) && (
              <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#2A1B38] rounded-r-full" />
            )}
            <Tooltip content={item.label || ""}>
              <Link to={item.path!} className={getItemStyles(item.path!)}>
                {item.sidebar?.icon}
              </Link>
            </Tooltip>
          </div>
        ))}
      </div>
    </aside>
  );
};
