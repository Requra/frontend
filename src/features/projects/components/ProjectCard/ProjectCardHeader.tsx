import { MoreVertical, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import type { ProjectStatus } from "./types";
import { STATUS_STYLES, STATUS_LABELS } from "./types";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";

interface ProjectCardHeaderProps {
  status: ProjectStatus;
}

export function ProjectCardHeader({ status }: ProjectCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={cn(
          "rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase",
          STATUS_STYLES[status],
        )}
      >
        {STATUS_LABELS[status]}
      </span>
      <div 
        className="flex items-center gap-1 opacity-40 transition-opacity group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip content="Quick Share" position="top">
          <Button
            variant="ghost-neutral"
            size="icon-sm"
            className="text-neutral-500"
          >
            <Share2 />
          </Button>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost-neutral"
              size="icon-sm"
              className="text-neutral-500 focus-visible:ring-0"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem className="text-neutral-600">
              <Share2 size={14} className="mr-1" />
              Share link
            </DropdownMenuItem>
            <DropdownMenuItem className="text-danger-600 focus:bg-danger-50 focus:text-danger-700">
              <Trash2 size={14} className="mr-1" />
              Delete project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
