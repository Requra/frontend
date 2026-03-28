import { Plus, SearchX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import emptyImg from "@/assets/images/Empty.png";

interface ProjectEmptyStateProps {
  message: string;
  isFiltering: boolean;
  onAdd: () => void;
}

export function ProjectEmptyState({ message, isFiltering, onAdd }: ProjectEmptyStateProps) {
  if (isFiltering) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center p-16 rounded-3xl border border-neutral-200 bg-white/50 backdrop-blur-sm gap-2 text-center transition-all animate-in fade-in zoom-in-95 duration-500 shadow-sm">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 mb-2 ring-8 ring-neutral-50 transition-transform hover:scale-105 duration-300">
          <SearchX size={32} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-heading-md font-bold text-neutral-900">
            No results found
          </h3>
          <p className="text-body-md text-neutral-500 max-w-[380px]">
            We couldn't find any projects matching your search. Try checking for typos or using a different keyword.
          </p>
        </div>
        <Button onClick={onAdd} variant="outline" className="mt-4 border-neutral-300 hover:bg-neutral-50 text-neutral-700 bg-white shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </div>
    );
  }

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 rounded-3xl border border-neutral-100 bg-linear-to-b from-white to-primary-50/40 text-center transition-all animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-sm relative overflow-hidden group">
      
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-70" />

      <div className="relative z-10 transition-transform duration-700 ease-out group-hover:-translate-y-2 mb-8">
        <div className="relative">
          <img 
            src={emptyImg} 
            alt="No projects" 
            className="w-64 h-64 object-contain drop-shadow-xl select-none" 
            draggable={false}
          />
          {/* Sparkles around the image - using decorative absolute positioning */}
          <div className="absolute top-4 -right-4 text-warning-400 animate-pulse" style={{ animationDuration: '3s' }}>
            <Sparkles size={28} strokeWidth={1.5} className="drop-shadow-sm" />
          </div>
          <div className="absolute bottom-10 -left-6 text-primary-400 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <Sparkles size={20} strokeWidth={2} className="fill-primary-100 drop-shadow-sm" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 z-10 mb-8">
        <h3 className="text-heading-lg font-bold text-neutral-900 tracking-tight">
          {message}
        </h3>
        <p className="text-body-lg text-neutral-500 max-w-[420px] mx-auto leading-relaxed">
          You haven't started any projects in this category yet. Let's create your first AI-generated requirement project!
        </p>
      </div>

      <Button 
        onClick={onAdd} 
        variant="default" 
        size="lg" 
        className="shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300 z-10 px-8 h-12 text-md font-semibold"
      >
        <Plus className="mr-2 h-5 w-5" />
        Start First Project
      </Button>
    </div>
  );
}
