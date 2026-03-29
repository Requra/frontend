import { useState } from "react";
import { paths } from "@/routes/paths";
import { Button } from "@/components/ui/Button/Button";
import { SearchBar } from "@/components/ui/SearchBar/SearchBar";
import { Filter, Plus, LayoutGrid, List as ListIcon, ChevronDown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/DropdownMenu";
import { ProjectCard } from "../components/ProjectCard";
import { AddProjectCard } from "../components/AddProjectCard";
import { ProjectEmptyState } from "../components/ProjectEmptyState";
import { TABS_CONFIG } from "../constants";
import type { ProjectStatus } from "../components/ProjectCard/types";
import { useQuery } from "@tanstack/react-query";
import { getProjectsApi } from "../api/getProjects";
import { ProjectCardSkeleton } from "../components/ProjectCardSkeleton";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { MOCK_PROJECTS } from "../constants";

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "az";

export const AllProjectsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("processing");
  const [page, setPage] = useState(1);
  const [inputSearch, setInputSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const currentTabConfig = TABS_CONFIG.find((t) => t.value === activeTab);
  const currentStatus = currentTabConfig?.status || "IN PROGRESS";

  const handleSearchChange = (val: string) => {
    setInputSearch(val);
    setSearchQuery(val);
    setPage(1); // Reset page on search
  };

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setPage(1); // Reset page on tab change
    setInputSearch(""); 
    setSearchQuery("");
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", currentStatus, page, searchQuery, sortBy],
    queryFn: () =>
      getProjectsApi({
        status: currentStatus,
        page,
        // Lowered limits to force pagination to appear with our small mock dataset!
        limit: viewMode === "grid" ? 2 : 3,
        searchQuery,
      }),
  });

  const handleAddProject = () => navigate(paths.app.newProject);

  const getStatusCount = (status: ProjectStatus) =>
    MOCK_PROJECTS.filter((p) => p.status === status).length;

  const getGridClassname = () =>
    viewMode === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "flex flex-col gap-4";

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
          onClick={handleAddProject}
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
        <SearchBar
          placeholder="Search by project name, client, or user..."
          className="max-w-[600px] flex-1"
          value={inputSearch}
          onChange={handleSearchChange}
          onClear={() => handleSearchChange("")}
        />
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost-neutral"}
              size="icon"
              className={`h-8 w-8 rounded-md ${viewMode === "grid" ? "bg-neutral-100/80 shadow-sm" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost-neutral"}
              size="icon"
              className={`h-8 w-8 rounded-md ${viewMode === "list" ? "bg-neutral-100/80 shadow-sm" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon size={16} />
            </Button>
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="h-10 px-4 text-sm text-neutral-600 gap-2 border-neutral-200 shadow-sm hover:bg-neutral-50"
              >
                <Filter size={16} />
                <span className="font-semibold">Sort by</span>
                <ChevronDown size={14} className="opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem onClick={() => setSortBy("newest")} className="flex items-center justify-between cursor-pointer">
                Newest First
                {sortBy === "newest" && <Check size={14} className="text-primary-600" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")} className="flex items-center justify-between cursor-pointer">
                Oldest First
                {sortBy === "oldest" && <Check size={14} className="text-primary-600" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("az")} className="flex items-center justify-between cursor-pointer">
                Alphabetical (A-Z)
                {sortBy === "az" && <Check size={14} className="text-primary-600" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs & Projects Grid Section */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-8">
          {TABS_CONFIG.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              badge={getStatusCount(tab.status)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS_CONFIG.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {isLoading ? (
              // Loading State (Skeletons)
              <div className={getGridClassname()}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              // Error State
              <div className="p-16 text-center text-danger-500 font-medium bg-danger-50 rounded-xl border border-danger-100">
                Failed to load projects. Please try again.
              </div>
            ) : data?.data.length === 0 ? (
              // Empty State (Removed AddProjectCard)
              <div>
                <ProjectEmptyState
                  message={tab.emptyMessage}
                  isFiltering={searchQuery.length > 0}
                  onAdd={handleAddProject}
                />
              </div>
            ) : (
              // Data State + Pagination
              <div className="flex flex-col gap-8">
                <div className={getGridClassname()}>
                  {data?.data.map((project) => (
                    <ProjectCard key={project.id} {...project} searchQuery={searchQuery} />
                  ))}
                  
                  {/* Always show AddProjectCard at the end if Grid view, otherwise omit it to keep list clean or append */}
                  {viewMode === "grid" && <AddProjectCard onClick={handleAddProject} />}
                </div>
                
                {data && data.totalPages > 1 && (
                  <Pagination 
                    currentPage={data.currentPage} 
                    totalPages={data.totalPages} 
                    onPageChange={setPage} 
                  />
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
