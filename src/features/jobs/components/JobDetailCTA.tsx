import { motion } from "framer-motion"
import type { Job } from "../types"
import { Button } from "@/components/ui"

interface JobDetailCTAProps {
  job: Job
  applied: boolean
  onApply: () => void
}

export function JobDetailCTA({ job, applied, onApply }: JobDetailCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      className="mt-12 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border backdrop-blur-md"
    >
      <div>
        <h3 className="font-display font-600 text-xl text-light-text-primary dark:text-dark-text-primary mb-1">
          Interested in this role?
        </h3>
        <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
          {job.company} is actively hiring — don't miss your chance.
        </p>
      </div>
      <Button
        variant="primary"
        size="lg"
        onClick={onApply}
        disabled={applied}
        className="shrink-0"
      >
        {applied ? "✓ Applied!" : "Apply for this role →"}
      </Button>
    </motion.div>
  )
}