import { LayoutDashboard, FolderKanban, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { icon: LayoutDashboard, path: "/app/dashboard", label: "Dashboard" },
  { icon: FolderKanban, path: "/projects", label: "Projects" },
  { icon: Users, path: "/users", label: "Users" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[90px] bg-white border-r border-neutral-200/50 shrink-0 flex flex-col items-center py-8 z-10">
      <nav className="flex flex-col gap-6 w-full items-center">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              title={link.label}
              className={cn(
                "p-3 rounded-xl transition-all duration-200 flex items-center justify-center relative",
                isActive 
                  ? "text-primary-600 bg-primary-50" 
                  : "text-neutral-500 hover:text-primary-600 hover:bg-neutral-50"
              )}
            >
              <link.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pb-4 w-full flex justify-center">
        <Link 
          to="/settings"
          title="Settings"
          className="p-3 text-neutral-500 hover:text-neutral-900 transition-colors rounded-xl hover:bg-neutral-50"
        >
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </aside>
  );
};
