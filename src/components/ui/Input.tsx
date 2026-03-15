import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="z-10 absolute left-3.5 text-light-text-muted dark:text-dark-text-muted ">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 text-sm
              bg-light-glass dark:bg-dark-glass
              border border-light-border dark:border-dark-border
              text-light-text-primary dark:text-dark-text-primary
              placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted
              focus:outline-none focus:border-brand-primary
              backdrop-blur-md transition-all duration-200
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              ${error ? "border-error focus:border-error" : ""}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="z-10 absolute right-3.5 text-light-text-muted dark:text-dark-text-muted">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"