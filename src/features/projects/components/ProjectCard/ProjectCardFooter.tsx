import { User } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/routes/paths";

interface ProjectCardFooterProps {
  userName: string;
  userAvatar?: string;
  id: string;
}

export function ProjectCardFooter({
  userName,
  userAvatar,
  id,
}: ProjectCardFooterProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mt-auto pt-1">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-600 overflow-hidden">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={14} />
          )}
        </div>
        <span className="text-xs font-medium text-neutral-500 truncate max-w-[100px]">
          {userName}
        </span>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="secondary"
          size="sm"
          className="h-8 px-3 text-xs bg-primary-50"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Button>
        <Button
          variant="default"
          size="sm"
          className="h-8 px-3 text-xs shadow-sm shadow-primary-500/20"
          onClick={(e) => {
            (e.stopPropagation(), navigate(paths.app.projects.details(id)));
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
