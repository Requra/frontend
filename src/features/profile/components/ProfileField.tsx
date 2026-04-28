import { cn } from "@/lib/utils";

interface ProfileFieldProps {
  label: string;
  children: React.ReactNode;
  showDivider?: boolean;
  className?: string;
  variant?: "horizontal" | "vertical";
}

export function ProfileField({
  label,
  children,
  showDivider = true,
  className,
  variant = "horizontal",
}: ProfileFieldProps) {
  if (variant === "vertical") {
    return (
      <div className={cn("space-y-2.5", className)}>
        <label className="text-body-md text-neutral-600 font-bold ml-1">
          {label}
        </label>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center min-h-[48px] py-1">
        <span className="text-body-md text-neutral-500 font-medium">
          {label}
        </span>
        <div className="w-2/3 flex justify-end">{children}</div>
      </div>
      {showDivider && <div className="h-px bg-neutral-100/80 w-full" />}
    </div>
  );
}
