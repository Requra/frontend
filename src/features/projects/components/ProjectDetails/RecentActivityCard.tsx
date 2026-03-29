import { Card } from "@/components/ui/Card/Card";
import { Clock } from "lucide-react";

export const RecentActivityCard = () => {
  const activities = [
    {
      id: 1,
      text: "Client made a comment",
      target: "FR-5",
      time: "30 mins ago",
      color: "bg-green-500",
    },
    {
      id: 2,
      text: "Assigned to backend team",
      target: "SYS-12",
      time: "2 hours ago",
      color: "bg-orange-500",
    },
    {
      id: 3,
      text: "Project requirements finalized",
      target: "Overview",
      time: "1 day ago",
      color: "bg-primary-500",
    },
  ];

  return (
    <Card className="p-6 border border-neutral-200/60 shadow-sm mt-0">
      <h3 className="font-bold text-sm mb-6 uppercase tracking-wider text-neutral-500">
        Recent Activity
      </h3>

      <div className="flex flex-col gap-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 relative group">
            {/* The connecting line segment */}
            {index !== activities.length - 1 && (
              <div className="absolute left-[5px] top-4 bottom-[-24px] w-[2px] bg-neutral-100 group-hover:bg-neutral-200 transition-colors" />
            )}
            
            <div className="mt-1 relative z-10 shrink-0">
              <div
                className={`w-3 h-3 rounded-full border-2 border-white ring-2 ring-neutral-50 shadow-sm ${activity.color} transition-transform group-hover:scale-125 duration-300`}
              />
            </div>
            
            <div className="flex flex-col -mt-0.5">
              <span className="text-sm font-semibold text-neutral-900 leading-tight">
                {activity.text}{" "}
                <span className="text-neutral-500 font-medium">
                  in {activity.target}
                </span>
              </span>
              <span className="text-xs text-neutral-400 mt-1.5 flex items-center gap-1.5 font-medium">
                <Clock className="w-3 h-3" />
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
