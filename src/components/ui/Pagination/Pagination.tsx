import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
  }

  return (
    <div className={cn("flex items-center justify-center gap-1.5 mt-8", className)}>
      <Button
        variant="ghost-neutral"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 w-9 text-neutral-500 disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </Button>

      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <div key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center text-neutral-400">
              <MoreHorizontal size={16} />
            </div>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <Button
            key={page}
            variant={isCurrent ? "default" : "ghost-neutral"}
            size="sm"
            onClick={() => onPageChange(page as number)}
            className={cn(
              "h-9 min-w-9 px-3 font-medium transition-all",
              isCurrent ? "bg-primary-500 text-white shadow-sm hover:bg-primary-600" : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="ghost-neutral"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 w-9 text-neutral-500 disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
