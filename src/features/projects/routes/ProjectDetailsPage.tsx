import { Tabs, TabsContent } from "@/components/ui/Tabs/tabs";
import { ProjectHeader } from "../components/ProjectDetails/ProjectHeader";
import { ProjectTabs } from "../components/ProjectDetails/ProjectTabs";
import { AnalysisOverviewCard } from "../components/ProjectDetails/AnalysisOverviewCard";
import { ExecutiveSummaryCard } from "../components/ProjectDetails/ExecutiveSummaryCard";
import { FileManagementCard } from "../components/ProjectDetails/FileManagementCard";
import { ProjectDataCard } from "../components/ProjectDetails/ProjectDataCard";
import { RecentActivityCard } from "../components/ProjectDetails/RecentActivityCard";
import { UserStoriesTab } from "../components/UserStories/UserStoriesTab";

export const ProjectDetailsPage = () => {
  return (
    <Tabs
      defaultValue="overview"
      className="flex flex-col gap-8 max-w-[1400px] w-full pb-10"
    >
      <ProjectTabs />

      <TabsContent value="overview" className="flex flex-col gap-5 pt-0">
        <ProjectHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Main Column (Left) */}
          <div className="flex flex-col gap-5 lg:col-span-3 w-full">
            <AnalysisOverviewCard />
            <ExecutiveSummaryCard />
            <FileManagementCard />
          </div>

          {/* Sidebar Column (Right) */}
          <div className="flex flex-col gap-5 lg:col-span-1 w-full">
            <ProjectDataCard />
            <RecentActivityCard />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="user_stories" className="pt-0">
        <UserStoriesTab />
      </TabsContent>
    </Tabs>
  );
};
