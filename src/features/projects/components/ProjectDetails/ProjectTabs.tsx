import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs/tabs";

export const ProjectTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full border-b border-neutral-200">
          <TabsTrigger
            value="overview"
            className="text-primary-600 font-semibold border-b-2 border-primary-600 rounded-none bg-transparent hover:bg-neutral-50 px-4 py-2"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="user_stories"
            className="text-neutral-500 font-medium hover:text-neutral-700 bg-transparent px-4 py-2 border-b-2 border-transparent"
          >
            User Stories
          </TabsTrigger>
          <TabsTrigger
            value="requirements"
            className="text-neutral-500 font-medium hover:text-neutral-700 bg-transparent px-4 py-2 border-b-2 border-transparent"
          >
            Requirements
          </TabsTrigger>
          <TabsTrigger
            value="export"
            className="text-neutral-500 font-medium hover:text-neutral-700 bg-transparent px-4 py-2 border-b-2 border-transparent"
          >
            Export
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
