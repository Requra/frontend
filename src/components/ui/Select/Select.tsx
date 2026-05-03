import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  wrapperClassName?: string;
  placeholder?: string;
  options: { value: string | number; label: string }[];
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
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const internalRef = React.useRef<HTMLSelectElement>(null);
    const defaultId = React.useId();
    const selectId = id || defaultId;
    const isInvalid = !!error;

    // Use internal ref to sync with the passed ref
    React.useImperativeHandle(ref, () => internalRef.current!);

    // Handle internal value state for display
    const [selectedValue, setSelectedValue] = React.useState(
      value || defaultValue || ""
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const selectedOption = options.find((opt) => opt.value == selectedValue);

    const handleSelect = (val: string | number) => {
      setSelectedValue(val);
      // Manually trigger the hidden select's onChange
      if (internalRef.current) {
        internalRef.current.value = val.toString();
        const event = new Event("change", { bubbles: true });
        internalRef.current.dispatchEvent(event);
      }
      setIsOpen(false);
    };

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
            {props.required && <span className="ml-1 text-danger-500">*</span>}
          </label>
        )}

        <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              type="button"
              className={cn(
                "h-[48px] w-full flex items-center justify-between rounded-lg border border-neutral-300 bg-white/50 backdrop-blur-sm px-3 py-1 text-base transition-all outline-none hover:border-primary-500 focus-visible:border-primary-500 focus-visible:ring-3 focus-visible:ring-primary-500/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 aria-invalid:border-danger-500 md:text-sm shadow-sm",
                !selectedOption && "text-neutral-400",
                isOpen && "border-primary-500 ring-3 ring-primary-500/20",
                isInvalid && "border-danger-500 ring-3 ring-danger-500/20",
                className
              )}
              aria-invalid={isInvalid}
              disabled={props.disabled}
            >
              <span className="truncate">
                {selectedOption ? selectedOption.label : placeholder || "Select..."}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-neutral-400" />
              </motion.div>
            </button>
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              sideOffset={8}
              className="z-100 min-w-[200px] overflow-hidden rounded-xl border border-white/40 bg-white/80 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
              style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
            >
              <AnimatePresence>
                {options.map((opt) => (
                  <DropdownMenuPrimitive.Item
                    key={opt.value}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2.5 text-sm font-medium outline-none transition-all focus:bg-primary-50 focus:text-primary-600 data-disabled:pointer-events-none data-disabled:opacity-50",
                      selectedValue == opt.value && "bg-primary-50 text-primary-700"
                    )}
                    onSelect={() => handleSelect(opt.value)}
                  >
                    <span>{opt.label}</span>
                    {selectedValue == opt.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary-600"
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    )}
                  </DropdownMenuPrimitive.Item>
                ))}
              </AnimatePresence>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>

        {/* Hidden native select for react-hook-form compatibility */}
        <select
          {...props}
          id={selectId}
          ref={internalRef}
          value={selectedValue}
          onChange={(e) => {
            setSelectedValue(e.target.value);
            onChange?.(e);
          }}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-[0.8rem] font-medium text-danger-500">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
