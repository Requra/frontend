import { Folder, MessageSquare, Clock, Download, Calendar, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";
import { StatCard } from "../components/StatCard";
import { RecentActions } from "../components/RecentActions";
import { GeneratedVsApproved } from "../components/GeneratedVsApproved";
import { ProjectsTable } from "../components/ProjectsTable";
import { useAuthStore } from "@/stores/auth";

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const name = user?.name || "User";
  const firstName = name.split(" ")[0];
  return (
    <>
      {/* SVG Gradient Background - Dashboard only */}
      <div className="fixed top-0 left-[80px] right-0 z-0 pointer-events-none w-full overflow-hidden h-[439px]">
        <svg
          width="100%"
          height="439"
          viewBox="0 0 1440 439"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[439px]"
        >
          <path
            d="M2405 -7H-154C-104.669 66.2309 -238.624 439 399.899 439C1134.84 439 2113.8 160.407 2405 -7Z"
            fill="url(#paint0_radial_133_6143)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_133_6143"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(1125.5 216) scale(1279.5 223)"
            >
              <stop stopColor="var(--color-primary-900)" />
              <stop offset="0.89" stopColor="var(--color-primary-600)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="w-full flex gap-8 h-full items-start relative z-10">
        {/* Main Content Column */}
        <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
          {/* Header Title & Date */}
          <div className="text-white mb-2">
            <h1 className="text-4xl font-bold mb-3 tracking-tight drop-shadow-sm">
              Welcome back, {firstName} 👋
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                <Calendar size={18} />
                <span>{getFormattedDate()}</span>
              </div>
              <button 
                onClick={() => navigate(paths.app.projects.root)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10 shadow-lg group active:scale-95"
              >
                <div className="relative">
                   <PhoneOff size={16} className="rotate-135 group-hover:animate-pulse" />
                   <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                </div>
                Quick Meeting
              </button>
            </div>
          </div>

          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-6 w-full mt-4">
            <StatCard
              icon={
                <Folder
                  size={28}
                  fill="currentColor"
                  className="fill-[#8c74d0] text-[#8c74d0]"
                />
              }
              value={160}
              label="Total Projects"
              subtext="+12 projects this month"
              iconBgColor="#EBE4F8"
              iconColor="#7E57C2"
            />
            <StatCard
              icon={
                <MessageSquare
                  size={28}
                  fill="currentColor"
                  strokeWidth={1}
                  className="fill-[#8CD8E9] text-[#22B3D4]"
                />
              }
              value={16}
              label="New Comments"
              subtext="4 needs reply"
              iconBgColor="#E0F7FA"
              iconColor="#00ACC1"
            />
            <StatCard
              icon={
                <Clock
                  size={28}
                  fill="currentColor"
                  strokeWidth={1.5}
                  className="fill-[#FBCF9D] text-[#E49333]"
                />
              }
              value={7}
              label="Pending Review"
              subtext="+12 new items"
              iconBgColor="#FFE0B2"
              iconColor="#F57C00"
            />
            <StatCard
              icon={
                <Download
                  size={28}
                  fill="currentColor"
                  strokeWidth={1.5}
                  className="fill-[#B1DEBC] text-[#4A9C5E]"
                />
              }
              value={5}
              label="Exports Ready"
              subtext="2 not downloaded"
              iconBgColor="#E8F5E9"
              iconColor="#43A047"
            />
          </div>

          {/* Middle Section Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-4">
            <RecentActions />
            <GeneratedVsApproved />
          </div>

          {/* Bottom Table */}
          <div className="w-full pb-8 mt-4">
            <ProjectsTable />
          </div>
        </div>
      </div>
    </>
  );
};
