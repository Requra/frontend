import * as React from "react";
import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

export interface TagInputProps {
  label?: string | React.ReactNode;
  error?: string | React.ReactNode;
  wrapperClassName?: string;
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
  required?: boolean;
  validate?: (value: string) => boolean;
}

export function TagInput({
  label,
  error,
  wrapperClassName,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  validate,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [localError, setLocalError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const defaultId = React.useId();
  const isInvalid = !!error || !!localError;

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    
    setLocalError(null);
    
    if (value.includes(trimmed)) {
      setLocalError("This value has already been added.");
      return;
    }
    
    if (validate && !validate(trimmed)) {
      setLocalError("Please enter a valid value.");
      return;
    }
    
    onChange([...value, trimmed]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className={cn("grid gap-1.5", wrapperClassName)}>
      {label && (
        <label
          htmlFor={defaultId}
          className={cn(
            "text-sm font-medium leading-none text-neutral-900",
            disabled && "cursor-not-allowed opacity-70",
            isInvalid && "text-danger-500"
          )}
        >
          {label}
          {required && <span className="ml-1 text-danger-500">*</span>}
        </label>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 min-h-[48px] w-full rounded-lg border border-neutral-300 bg-transparent px-2.5 py-2 transition-colors focus-within:border-primary-500 focus-within:ring-3 focus-within:ring-primary-500/50",
          isInvalid &&
            "border-danger-500 ring-3 ring-danger-500/20",
          disabled && "pointer-events-none opacity-50 bg-neutral-100"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          id={defaultId}
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setLocalError(null);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled}
          className="flex-1 min-w-[120px] bg-transparent text-base outline-none placeholder:text-neutral-400 md:text-sm border-none p-0 focus:ring-0"
        />
        {inputValue && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => addTag(inputValue)}
            className="h-8 w-auto px-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        )}
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 border border-neutral-200 group"
            >
              <span className="w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-primary-500" />
              </span>
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-0.5 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      {(localError || error) && (
        <p className="text-[0.8rem] font-medium text-danger-500">
          {localError || error}
        </p>
      )}
    </div>
  );
}
