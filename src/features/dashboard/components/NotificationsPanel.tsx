import { Button } from "@/components/ui/Button/Button";
import { Bug, UserPlus, Radio, X } from "lucide-react";

export const NotificationsPanel = () => {
  return (
    <div className="bg-white rounded-l-4xl p-8 h-full shadow-sm sticky top-0 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-neutral-800">Notifications</h3>
          <X
            size={24}
            className="text-neutral-400 hover:text-neutral-600 cursor-pointer transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col gap-6">
          <NotificationItem
            icon={<Bug size={16} />}
            title="You have a bug that."
            time="Just now"
            color="bg-sky-50 text-sky-500"
          />
          <NotificationItem
            icon={<UserPlus size={16} />}
            title="New user registered"
            time="59 minutes ago"
            color="bg-neutral-100 text-neutral-500"
          />
          <NotificationItem
            icon={<Bug size={16} />}
            title="You have a."
            time="12 hours ago"
            color="bg-sky-50 text-sky-500"
          />
          <NotificationItem
            icon={<Radio size={16} />}
            title="Andi Lane subscribed"
            time="Today, 11:59 AM"
            color="bg-neutral-100 text-neutral-500"
          />
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full mt-8"
        onClick={() => {}}
      >
        Mark all as read
      </Button>
    </div>
  );
};

interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  color: string;
}

const NotificationItem = ({
  icon,
  title,
  time,
  color,
}: NotificationItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-neutral-700 font-medium">{title}</p>
        <p className="text-xs text-neutral-400 mt-1">{time}</p>
      </div>
    </div>
  );
};
