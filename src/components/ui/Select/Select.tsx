import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.ComponentProps<"select"> {
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  wrapperClassName?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      wrapperClassName,
      placeholder,
      options,
      id,
      ...props
    },
    ref
  ) => {
    const defaultId = React.useId();
    const selectId = id || defaultId;
    const isInvalid = !!error;

    return (
      <div className={cn("grid gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={selectId}
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
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={isInvalid || undefined}
            className={cn(
              "h-[48px] w-full appearance-none rounded-lg border border-neutral-300 bg-transparent px-2.5 py-1 pr-10 text-base transition-colors outline-none focus-visible:border-primary-500 focus-visible:ring-3 focus-visible:ring-primary-500/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 aria-invalid:border-danger-500 aria-invalid:ring-3 aria-invalid:ring-danger-500/20 md:text-sm",
              !props.value && "text-neutral-400",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
        </div>
        {error && (
          <p className="text-[0.8rem] font-medium text-danger-500">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
