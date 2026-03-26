import { BarChart2, Plus, Folder, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LogoImg from "@/assets/images/Logo.png";

export const DashboardSidebar = () => {
  const { pathname } = useLocation();

  const BASE_ITEM_STYLES = "w-12 h-12 flex items-center justify-center transition-all duration-200 rounded-xl";
  const ACTIVE_STYLES = "bg-[#2A1B38] text-white shadow-lg shadow-purple-900/20 scale-105";
  const INACTIVE_STYLES = "text-neutral-400 hover:text-[#2A1B38] hover:bg-neutral-50";

  const getItemStyles = (path: string) => {
    const active = pathname === path;
    return `${BASE_ITEM_STYLES} ${active ? ACTIVE_STYLES : INACTIVE_STYLES}`;
  };

  return (
    <aside className="w-[80px] bg-white h-screen flex flex-col items-center py-6 border-r border-neutral-100 z-50 shadow-sm shrink-0 fixed">
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
      <nav className="flex-1 flex flex-col items-center gap-8 w-full">
        <Link
          to="/app/dashboard"
          className={getItemStyles("/app/dashboard")}
        >
          <BarChart2 size={24} />
        </Link>
        <button className={getItemStyles("/app/add-project")}>
          <Plus size={24} />
        </button>
        <Link
          to="/app/projects"
          className={getItemStyles("/app/projects")}
        >
          <Folder size={24} />
        </Link>
      </nav>

      {/* Bottom User Profile Icon */}
      <div className="mt-auto">
        <Link
          to="/app/profile"
          className={getItemStyles("/app/profile")}
        >
          <User size={24} />
        </Link>
      </div>
    </aside>
  );
};
