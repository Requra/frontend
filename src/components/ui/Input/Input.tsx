import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string | React.ReactNode
  description?: string | React.ReactNode
  error?: string | React.ReactNode
  wrapperClassName?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, description, error, wrapperClassName, startIcon, endIcon, id, ...props }, ref) => {
    const defaultId = React.useId()
    const inputId = id || defaultId
    const isInvalid = !!error || props["aria-invalid"] === true || props["aria-invalid"] === "true"
    const hasWrapper = !!(label || description || error || wrapperClassName)

    const baseInput = (
      <input
        id={hasWrapper ? inputId : id}
        ref={ref}
        type={type}
        data-slot="input"
        aria-invalid={isInvalid ? true : props["aria-invalid"]}
        aria-describedby={
          [
            description ? `${inputId}-description` : undefined,
            error ? `${inputId}-error` : undefined,
            props["aria-describedby"]
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(
          "h-[48px] w-full min-w-0 rounded-lg border border-neutral-300 bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-900 placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:ring-3 focus-visible:ring-primary-500/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50 aria-invalid:border-danger-500 aria-invalid:ring-3 aria-invalid:ring-danger-500/20 md:text-sm",
          startIcon && "pl-8",
          endIcon && "pr-8",
          className
        )}
        {...props}
      />
    )

    const inputElement = startIcon || endIcon ? (
      <div className="relative w-full">
        {startIcon && (
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
            {startIcon}
          </div>
        )}
        {baseInput}
        {endIcon && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
            {endIcon}
          </div>
        )}
      </div>
    ) : (
      baseInput
    )

    if (!hasWrapper) {
      return inputElement
    }

    return (
      <div className={cn("grid gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
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
        {inputElement}
        {description && !error && (
          <p id={`${inputId}-description`} className="text-[0.8rem] text-neutral-500">
            {description}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-[0.8rem] font-medium text-danger-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
