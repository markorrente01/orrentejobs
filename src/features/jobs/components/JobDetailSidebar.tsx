import { motion } from "framer-motion"
import type { Job } from "../types"
import { Button } from "@/components/ui"

interface JobDetailSidebarProps {
  job: Job
  applied: boolean
  saved: boolean
  onApply: () => void
  onSave: () => void
}

const STATS = (job: Job) => [
  { label: "Applicants", value: job.applicants },
  { label: "Views", value: `${(job.views / 1000).toFixed(1)}k` },
  { label: "Resp. time", value: "< 48h" },
  { label: "Match", value: "92%" },
]

export function JobDetailSidebar({
  job,
  applied,
  saved,
  onApply,
  onSave,
}: JobDetailSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      {/* About company */}
      <div className="p-5 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border backdrop-blur-md">
        <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
          About {job.company}
        </h3>
        <p className="text-xs text-light-text-muted dark:text-dark-text-muted leading-relaxed">
          {job.about}
        </p>
      </div>

      {/* Quick apply */}
      <div className="p-5 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border backdrop-blur-md">
        <h3 className="font-display font-600 text-base text-light-text-primary dark:text-dark-text-primary mb-1">
          Ready to apply?
        </h3>
        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mb-5">
          Takes less than 5 minutes
        </p>
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={onApply}
          disabled={applied}
          className="mb-2"
        >
          {applied ? "✓ Application sent!" : "Apply now →"}
        </Button>
        <Button
          variant={saved ? "secondary" : "ghost"}
          size="md"
          fullWidth
          onClick={onSave}
        >
          {saved ? "✓ Saved" : "Save for later"}
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {STATS(job).map((s) => (
          <div
            key={s.label}
            className="p-3 text-center bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border backdrop-blur-md"
          >
            <p className="font-display font-600 text-xl text-light-text-primary dark:text-dark-text-primary">
              {s.value}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-light-text-muted dark:text-dark-text-muted mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}