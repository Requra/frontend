import { BarChart2, Plus, Folder, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoImg from "@/assets/images/Logo.png";
import { paths } from "@/routes/paths";

export const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  const navItems = [
    {
      path: paths.app.dashboard,
      icon: <BarChart2 size={24} />,
      label: "Dashboard",
    },
    { path: paths.app.projects, icon: <Folder size={24} />, label: "Projects" },
  ];

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
      <nav className="flex-1 flex flex-col items-center gap-4 w-full">
        {navItems.map((item) => (
          <div
            key={item.path}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Active indicator bar */}
            {isActive(item.path) && (
              <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#2A1B38] rounded-r-full" />
            )}
            <Link to={item.path} className={getItemStyles(item.path)}>
              {item.icon}
            </Link>
            {/* Tooltip */}
            {hoveredItem === item.path && (
              <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-[#2A1B38] text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-50 pointer-events-none">
                {item.label}
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2A1B38] rotate-45" />
              </div>
            )}
          </div>
        ))}

        {/* Create Project CTA - distinct style */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredItem("create")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {isActive(paths.project.create) && (
            <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#2A1B38] rounded-r-full" />
          )}
          <Link
            to={paths.project.create}
            className={getItemStyles(paths.project.create)}
          >
            <Plus size={24} />
          </Link>
          {hoveredItem === "create" && (
            <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-[#2A1B38] text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-50 pointer-events-none">
              New Project
              <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2A1B38] rotate-45" />
            </div>
          )}
        </div>
      </nav>

      {/* Bottom User Profile Icon */}
      <div
        className="mt-auto relative"
        onMouseEnter={() => setHoveredItem("profile")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {isActive(paths.app.profile) && (
          <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#2A1B38] rounded-r-full" />
        )}
        <Link
          to={paths.app.profile}
          className={getItemStyles(paths.app.profile)}
        >
          <User size={24} />
        </Link>
        {hoveredItem === "profile" && (
          <div className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-[#2A1B38] text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-50 pointer-events-none">
            Profile
            <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2A1B38] rotate-45" />
          </div>
        )}
      </div>
    </aside>
  );
};
