import { Card } from "@/components/ui/Card/Card";
import { Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";

export const RecentActivityCard = () => {
  const activities = [
    {
      id: 1,
      text: "Client made a comment",
      target: "FR-5",
      time: "30 mins ago",
      color: "bg-green-500",
      ringColor: "ring-green-100",
    },
    {
      id: 2,
      text: "Assigned to backend team",
      target: "SYS-12",
      time: "2 hours ago",
      color: "bg-orange-500",
      ringColor: "ring-orange-100",
    },
    {
      id: 3,
      text: "Project requirements finalized",
      target: "Overview",
      time: "1 day ago",
      color: "bg-primary-500",
      ringColor: "ring-primary-100",
    },
  ];

  return (
    <Card className="p-6 border border-neutral-200/60 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center">
          <History className="w-3.5 h-3.5 text-neutral-500" />
        </div>
        <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-500">
          Recent Activity
        </h3>
      </div>

      <div className="flex flex-col gap-0">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex gap-4 relative group py-3 first:pt-0 last:pb-0"
          >
            {/* The connecting line segment */}
            {index !== activities.length - 1 && (
              <div className="absolute left-[5px] top-[22px] bottom-[-2px] w-[2px] bg-neutral-100 group-hover:bg-neutral-200 transition-colors" />
            )}

            <div className="mt-1 relative z-10 shrink-0">
              <div
                className={cn(
                  "w-3 h-3 rounded-full border-2 border-white ring-2 shadow-sm transition-transform group-hover:scale-125 duration-300",
                  activity.color,
                  activity.ringColor
                )}
              />
            </div>

            <div className="flex flex-col -mt-0.5 flex-1">
              <span className="text-sm font-semibold text-neutral-900 leading-tight group-hover:text-neutral-700 transition-colors">
                {activity.text}{" "}
                <span className="text-primary-600/80 font-medium hover:text-primary-600 cursor-pointer transition-colors">
                  in {activity.target}
                </span>
              </span>
              <span className="text-[11px] text-neutral-400 mt-1.5 flex items-center gap-1.5 font-medium">
                <Clock className="w-3 h-3" />
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View all link */}
      <button className="mt-5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors w-full text-center py-2 rounded-lg hover:bg-primary-50/50">
        View all activity →
      </button>
    </Card>
  );
};
