import { UserStoriesHeader } from "./UserStoriesHeader";
import { UserStoryCard } from "./UserStoryCard";
import { BacklogHealthCard } from "./BacklogHealthCard";
import { MOCK_STORIES } from "./types";

export const UserStoriesTab = () => {
  return (
    <div className="flex flex-col gap-8">
      <UserStoriesHeader />

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {MOCK_STORIES.map((story) => (
          <UserStoryCard key={story.id} {...story} />
        ))}
      </div>

      <BacklogHealthCard />
    </div>
  );
};
