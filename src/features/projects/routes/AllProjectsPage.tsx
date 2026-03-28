import { paths } from "@/routes/paths";
import { Button } from "@/components/ui/Button/Button";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { CheckCircle2, Clock, FileText, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/tabs";
import { ProjectCard } from "../components/ProjectCard";
import { AddProjectCard } from "../components/AddProjectCard";
import { MOCK_PROJECTS } from "../constants";
import type { ProjectStatus } from "../components/ProjectCard/types";
import type { Project } from "../types";

export const AllProjectsPage = () => {
  const navigate = useNavigate();

  const filterByStatus = (status: ProjectStatus) =>
    MOCK_PROJECTS.filter((p) => p.status === status);

  const handleAddProject = () => navigate(paths.project.create);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
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
          onClick={handleAddProject}
          variant="default"
          size="lg"
          className="shadow-lg shadow-primary-500/20"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          placeholder="Search by project name, client, or tag..."
          className="max-w-[800px]"
        />
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
          <TabsTrigger value="processing" icon={<Clock size={16} />} badge={filterByStatus("IN PROGRESS").length}>
            Processing
          </TabsTrigger>
          <TabsTrigger value="completed" icon={<CheckCircle2 size={16} />} badge={filterByStatus("FINISHED").length}>
            Completed
          </TabsTrigger>
          <TabsTrigger value="draft" icon={<FileText size={16} />} badge={filterByStatus("DRAFT").length}>
            Draft
          </TabsTrigger>
        </TabsList>

        <ProjectGrid value="processing" projects={filterByStatus("IN PROGRESS")} onAdd={handleAddProject} />
        <ProjectGrid value="completed" projects={filterByStatus("FINISHED")} onAdd={handleAddProject} />
        <ProjectGrid value="draft" projects={filterByStatus("DRAFT")} onAdd={handleAddProject} />
      </Tabs>
    </div>
  );
};

function ProjectGrid({ value, projects, onAdd }: { value: string; projects: Project[]; onAdd: () => void }) {
  return (
    <TabsContent value={value}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
        <AddProjectCard onClick={onAdd} />
      </div>
    </TabsContent>
  );
}
