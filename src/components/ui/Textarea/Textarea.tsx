import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  wrapperClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, wrapperClassName, id, ...props }, ref) => {
    const defaultId = React.useId();
    const textareaId = id || defaultId;
    const isInvalid = !!error;

    return (
      <div className={cn("grid gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "text-sm font-medium leading-none text-neutral-900",
              props.disabled && "cursor-not-allowed opacity-70",
              isInvalid && "text-danger-500"
            )}
          >
            {label}
            {props.required && (
              <span className="ml-1 text-danger-500">*</span>
            )}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={isInvalid || undefined}
          className={cn(
            "min-h-[120px] w-full resize-y rounded-lg border border-neutral-300 bg-transparent px-2.5 py-3 text-base transition-colors outline-none placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:ring-3 focus-visible:ring-primary-500/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 aria-invalid:border-danger-500 aria-invalid:ring-3 aria-invalid:ring-danger-500/20 md:text-sm",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[0.8rem] font-medium text-danger-500">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
