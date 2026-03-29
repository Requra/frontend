import { Card } from "@/components/ui/Card/Card";

export const RecentActivityCard = () => {
  const activities = [
    {
      id: 1,
      text: "Client make a comment",
      target: "FR-5",
      time: "30 minutes ago",
      color: "bg-green-500",
    },
    {
      id: 2,
      text: "Client make a comment",
      target: "FR-5",
      time: "30 minutes ago",
      color: "bg-orange-500",
    },
    {
      id: 3,
      text: "Client make a comment",
      target: "FR-5",
      time: "30 minutes ago",
      color: "bg-primary-500",
    },
  ];

  return (
    <Card className="p-6 border-none shadow-none mt-6">
      <h3 className="font-bold text-sm text-neutral-900 mb-6">Recent Activity</h3>

      <div className="flex flex-col gap-6 relative">
        {/* Vertical line behind dots */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-neutral-100 -z-10" />
        
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="mt-1">
              <div
                className={`w-3 h-3 rounded-full border-2 border-white ring-1 ring-neutral-100 shadow-sm ${activity.color}`}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-900">
                {activity.text}{" "}
                <span className="text-neutral-500 font-medium">
                  in {activity.target}
                </span>
              </span>
              <span className="text-xs text-neutral-400 mt-1">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
