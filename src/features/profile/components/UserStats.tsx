import type { UserStats as UserStatsType } from "../types";

interface UserStatsProps {
  stats: UserStatsType;
}

export function UserStats({ stats }: UserStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
      <div className="text-center">
        <p className="text-heading-md font-bold text-primary-600 leading-tight">
          {stats.projects}
        </p>
        <p className="text-caption text-neutral-400 font-medium">Projects</p>
      </div>
      <div className="text-center border-x border-neutral-200">
        <p className="text-heading-md font-bold text-accent-600 leading-tight">
          {stats.tasks}
        </p>
        <p className="text-caption text-neutral-400 font-medium">Tasks</p>
      </div>
      <div className="text-center">
        <p className="text-heading-md font-bold text-success-600 leading-tight">
          {stats.completed}
        </p>
        <p className="text-caption text-neutral-400 font-medium">Done</p>
      </div>
    </div>
  );
};
