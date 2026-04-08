import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { UserStoriesHeader } from "./UserStoriesHeader";
import { UserStoryCard } from "./UserStoryCard/index";
import { BacklogHealthCard } from "./BacklogHealthCard";
import { useUserStories } from "../../hooks/useUserStories";
import { FileText } from "lucide-react";

export const UserStoriesTab = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: stories, isLoading, isError, error } = useUserStories(projectId);

  // Show toast on error (once per error state)
  if (isError && error) {
    toast.error(error instanceof Error ? error.message : "Failed to load user stories");
  }

  return (
    <div className="flex flex-col gap-8">
      <UserStoriesHeader totalCount={stories?.length ?? 0} isLoading={isLoading} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
          {[1, 2, 3].map((i) => (
            <UserStoryCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 rounded-2xl border border-danger-100 bg-danger-50/30">
          <div className="w-12 h-12 rounded-2xl bg-danger-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-danger-500" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">Failed to load stories</h3>
            <p className="text-sm text-neutral-500">Please check your connection and try again.</p>
          </div>
        </div>
      ) : stories && stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/50">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100/50 flex items-center justify-center">
            <FileText className="w-7 h-7 text-primary-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">No user stories yet</h3>
            <p className="text-sm text-neutral-500 max-w-md">
              User stories will appear here once the AI has processed your project sources.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
            {stories?.map((story, index) => (
              <UserStoryCard key={story.id} {...story} displayIndex={index + 1} />
            ))}
          </div>
          <BacklogHealthCard />
        </>
      )}
    </div>
  );
};

/** Compact skeleton matching the collapsed card layout */
function UserStoryCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
      {/* Top accent */}
      <div className="h-[3px] w-full bg-neutral-100 animate-pulse" />

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5">
        {/* Header: ID + priority + status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-12 animate-pulse rounded-md bg-neutral-200" />
            <div className="h-4 w-14 animate-pulse rounded-md bg-neutral-100" />
          </div>
          <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-100" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-full animate-pulse rounded-md bg-neutral-100" />
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-neutral-100" />
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 pt-1">
          <div className="h-3.5 w-20 animate-pulse rounded-full bg-neutral-50" />
          <div className="h-3.5 w-24 animate-pulse rounded-full bg-neutral-50" />
        </div>
      </div>

      {/* View details bar */}
      <div className="border-t border-neutral-50 py-2 flex justify-center">
        <div className="h-3 w-20 animate-pulse rounded-full bg-neutral-100" />
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-50 px-5 py-3 flex items-center justify-between">
        <div className="h-3 w-10 animate-pulse rounded-md bg-neutral-100" />
        <div className="flex gap-1">
          <div className="h-7 w-7 animate-pulse rounded-lg bg-neutral-50" />
          <div className="h-7 w-7 animate-pulse rounded-lg bg-neutral-50" />
          <div className="h-7 w-7 animate-pulse rounded-lg bg-neutral-50" />
        </div>
      </div>
    </div>
  );
}
