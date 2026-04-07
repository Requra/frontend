import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { Button } from "@/components/ui/Button/Button";
import { type LucideIcon, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "warning" | "info";
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  icon: Icon = AlertTriangle,
  isLoading = false,
}) => {
  const variantStyles = {
    destructive: "bg-danger-50 text-danger-600 border-danger-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    info: "bg-primary-50 text-primary-600 border-primary-100",
  };

  const buttonVariants = {
    destructive: "bg-danger-600 hover:bg-danger-700 shadow-danger-200",
    warning: "bg-amber-600 hover:bg-amber-700 shadow-amber-200",
    info: "bg-primary-600 hover:bg-primary-700 shadow-primary-200",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="flex flex-col items-center sm:items-start">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl border-2 mb-4",
              variantStyles[variant]
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center sm:text-left">{title}</DialogTitle>
          <DialogDescription className="text-center sm:text-left pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 gap-2">
          <Button
            variant="ghost-neutral"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            disabled={isLoading}
            className="rounded-xl font-bold"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            disabled={isLoading}
            isLoading={isLoading}
            className={cn(
              "rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98]",
              buttonVariants[variant]
            )}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};
