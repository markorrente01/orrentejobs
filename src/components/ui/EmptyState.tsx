import { motion } from "framer-motion"
import { Button } from "./Button"

interface EmptyStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search query.",
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-24 gap-4 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border flex items-center justify-center text-2xl">
        ∅
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display font-600 text-base text-light-text-primary dark:text-dark-text-primary">
          {title}
        </h3>
        <p className="text-sm text-light-text-muted dark:text-dark-text-muted max-w-xs">
          {description}
        </p>
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}