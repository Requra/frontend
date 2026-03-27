import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

export const RecentActions = () => {
  const actions = [
    { title: "Story #5 - acceptance criteria - Project X", date: "2/3/2026", subtext: "2 New Comments" },
    { title: "Story #5 - acceptance criteria - Project X", date: "2/3/2026", subtext: "2 New Comments" },
    { title: "Story #5 - acceptance criteria - Project X", date: "2/3/2026", subtext: "2 New Comments" },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-neutral-800">Recent Actions</h3>
        <Button
          variant="link"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 h-auto p-0"
        >
          View all <ChevronRight size={16} />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {actions.map((action, i) => (
          <div key={i} className="bg-neutral-100/70 p-5 rounded-2xl flex items-center justify-between group hover:bg-neutral-100 transition-colors cursor-pointer">
            <div>
              <p className="text-sm font-bold text-neutral-800 mb-2">{action.title}</p>
              <p className="text-xs text-neutral-500">{action.subtext}</p>
            </div>
            <div className="text-xs font-medium text-neutral-500">
              {action.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
