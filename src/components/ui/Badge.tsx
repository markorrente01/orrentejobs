import type { ReactNode } from "react"

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-light-glass dark:bg-dark-glass text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border",
  primary:
    "bg-brand-glow text-brand-primary border border-brand-primary/20",
  success:
    "bg-success-glass text-success border border-success/20",
  warning:
    "bg-warning-glass text-warning border border-warning/20",
  error:
    "bg-error-glass text-error border border-error/20",
  info:
    "bg-info-glass text-info border border-info/20",
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1
        text-xs font-medium whitespace-nowrap
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}