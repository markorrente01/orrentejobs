import { AnimatePresence, motion } from "framer-motion"
import { type JobFilters as JobFiltersType } from "../types"
import { JobFilters } from "./JobFilters"
import { Button } from "@/components/ui"
import { X } from "lucide-react"

interface JobFiltersDrawerProps {
  open: boolean
  onClose: () => void
  filters: Partial<JobFiltersType>
  onChange: (filters: Partial<JobFiltersType>) => void
  total: number
}

export function JobFiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
  total,
}: JobFiltersDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-80 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border overflow-y-auto md:hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-light-border dark:border-dark-border">
              <span className="font-display font-600 text-base text-light-text-primary dark:text-dark-text-primary">
                Filters
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-light-elevated dark:bg-dark-elevated text-light-text-secondary dark:text-dark-text-secondary cursor-pointer"
              >
                <X width={14}/>
              </motion.button>
            </div>
            <div className="p-5">
              <JobFilters
                filters={filters}
                onChange={onChange}
                total={total}
              />
            </div>
            <div className="p-5 border-t border-light-border dark:border-dark-border">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={onClose}
              >
                Show {total} results
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}