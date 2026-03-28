import { Button } from "@/components/ui/Button/Button";
import { paths } from "@/routes/paths";
import { CheckCircle2, Clock, FileText, Filter, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/tabs";
import { ProjectCard } from "../components/ProjectCard";
import { AddProjectCard } from "../components/AddProjectCard";

export const AllProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-display font-bold tracking-tight text-neutral-900 leading-tight">
            All Projects
          </h1>
          <p className="text-body-md text-neutral-500">
            Manage and organize your AI-generated requirement projects
          </p>
        </div>
        <Button
          onClick={() => navigate(paths.project.create)}
          variant="default"
          size="lg"
          className="shadow-lg shadow-primary-500/20"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>

      {/* Search & Filter Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-[800px]">
          <input
            type="text"
            placeholder="Search by project name, client, or tag..."
            className="w-full h-12 pl-5 pr-12 rounded-full shadow-sm focus:outline-none focus:ring-2 text-sm bg-white border border-neutral-200 focus:ring-primary-500/30 text-neutral-800 placeholder:text-neutral-400 transition-all font-medium"
          />
          <Search
            className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />
        </div>
        <Button
          variant="secondary"
          className="h-12 px-6 text-sm text-neutral-600 gap-2 border-neutral-200"
        >
          <Filter size={18} />
          <span className="font-semibold">Sort by</span>
        </Button>
      </div>

      {/* Tabs & Projects Grid */}
      <Tabs defaultValue="processing" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="processing" icon={<Clock size={16} />} badge={4}>
            Processing
          </TabsTrigger>
          <TabsTrigger value="completed" icon={<CheckCircle2 size={16} />} badge={2}>
            Completed
          </TabsTrigger>
          <TabsTrigger value="draft" icon={<FileText size={16} />} badge={1}>
            Draft
          </TabsTrigger>
        </TabsList>

        <TabsContent value="processing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              status="IN PROGRESS"
              title="CRM System Requirements"
              description="Requirements extracted from sales stakeholder meeting."
              progress={30}
              featuresCount={18}
              unsolvedComments={3}
              userName="Hassan Abdelhamed"
            />
            <ProjectCard
              status="IN PROGRESS"
              title="E-commerce Platform API"
              description="Backend infrastructure for the new shopping experience."
              progress={65}
              featuresCount={24}
              unsolvedComments={5}
              userName="Hassan Abdelhamed"
            />
            <ProjectCard
              status="IN PROGRESS"
              title="Mobile App Wireframes"
              description="User flow and high-fidelity mockups for iOS app."
              progress={15}
              featuresCount={12}
              unsolvedComments={2}
              userName="Hassan Abdelhamed"
            />
            <AddProjectCard onClick={() => navigate(paths.project.create)} />
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              status="FINISHED"
              title="Inventory Management"
              description="Finalized requirements for warehouse automation."
              featuresCount={42}
              unsolvedComments={0}
              userName="Hassan Abdelhamed"
            />
            <ProjectCard
              status="FINISHED"
              title="Payment Gateway Integration"
              description="Documentation for Stripe and PayPal integrations."
              featuresCount={15}
              unsolvedComments={0}
              userName="Hassan Abdelhamed"
            />
            <AddProjectCard onClick={() => navigate(paths.project.create)} />
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              status="DRAFT"
              title="Analytics Dashboard"
              description="Initial thoughts on data visualization requirements."
              featuresCount={8}
              unsolvedComments={1}
              userName="Hassan Abdelhamed"
            />
            <AddProjectCard onClick={() => navigate(paths.project.create)} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
