import { TabsList, TabsTrigger } from "@/components/ui/Tabs/tabs";

export const ProjectTabs = () => {
  const triggerClasses = "relative h-12 px-6 font-medium text-sm text-neutral-500 hover:text-neutral-900 transition-colors rounded-none bg-transparent flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 data-[state=active]:text-primary-600 data-[state=active]:font-semibold data-[state=active]:after:absolute data-[state=active]:after:bottom-[-1px] data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary-600 data-[state=active]:after:rounded-t-full";

  return (
    <div className="w-full">
      <TabsList className="w-full border-b border-neutral-200/80 flex gap-2 h-auto bg-transparent p-0">
        <TabsTrigger value="overview" className={triggerClasses}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="user_stories" className={triggerClasses}>
          User Stories
        </TabsTrigger>
        <TabsTrigger value="requirements" className={triggerClasses}>
          Requirements
        </TabsTrigger>
        <TabsTrigger value="export" className={triggerClasses}>
          Export
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
