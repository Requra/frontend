import { ProjectHeader } from "../components/ProjectDetails/ProjectHeader";
import { ProjectTabs } from "../components/ProjectDetails/ProjectTabs";
import { AnalysisOverviewCard } from "../components/ProjectDetails/AnalysisOverviewCard";
import { ExecutiveSummaryCard } from "../components/ProjectDetails/ExecutiveSummaryCard";
import { FileManagementCard } from "../components/ProjectDetails/FileManagementCard";
import { ProjectDataCard } from "../components/ProjectDetails/ProjectDataCard";
import { RecentActivityCard } from "../components/ProjectDetails/RecentActivityCard";

export const ProjectDetailsPage = () => {
  return (
    <div className="flex flex-col gap-8 max-w-[1400px] w-full pb-10">
      <ProjectTabs />
      
      <div className="mt-4">
        <ProjectHeader />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        {/* Main Column (Left) */}
        <div className="flex flex-col gap-4 lg:col-span-3 w-full">
          <AnalysisOverviewCard />
          <ExecutiveSummaryCard />
          <FileManagementCard />
        </div>

        {/* Sidebar Column (Right) */}
        <div className="flex flex-col gap-4 lg:col-span-1 w-full">
          <ProjectDataCard />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
};
