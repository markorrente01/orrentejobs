import { motion } from "framer-motion"
import type { Job } from "../types"
import { Badge, Button } from "@/components/ui"

interface JobDetailHeroProps {
  job: Job
  applied: boolean
  saved: boolean
  onApply: () => void
  onSave: () => void
}

const formatSalary = (min: number, max: number, currency: string) => {
  const sym = currency === "USD" ? "$" : ""
  const fmt = (n: number) => `${sym}${Math.round(n / 1000)}k`
  return `${fmt(min)} – ${fmt(max)}`
}

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 36e5)
  const days = Math.floor(hours / 24)
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return `${Math.floor(days / 7)}w ago`
}

export function JobDetailHero({
  job,
  applied,
  saved,
  onApply,
  onSave,
}: JobDetailHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="border-b border-light-border dark:border-dark-border pb-10 mb-10"
    >
      {/* Company + Title */}
      <div className="flex items-start justify-between flex-wrap gap-6 mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              background: `${job.companyColor}18`,
              border: `1px solid ${job.companyColor}35`,
              color: job.companyColor,
            }}
          >
            {job.companyLogo}
          </motion.div>
          <div>
            <p className="text-sm text-light-text-muted dark:text-dark-text-muted mb-1">
              {job.company}
            </p>
            <h1 className="font-display font-700 text-3xl md:text-4xl tracking-tight text-light-text-primary dark:text-dark-text-primary">
              {job.title}
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant={saved ? "secondary" : "outline"}
            size="md"
            onClick={onSave}
          >
            {saved ? "✓ Saved" : "Save"}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onApply}
            disabled={applied}
          >
            {applied ? "✓ Applied!" : "Apply now"}
          </Button>
        </div>
      </div>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          {
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ),
            text: job.location,
          },
          {
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            ),
            text: job.type,
          },
          {
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            ),
            text: formatSalary(job.salary.min, job.salary.max, job.salary.currency),
          },
          {
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ),
            text: `Posted ${timeAgo(job.postedAt)}`,
          },
        ].map((m) => (
          <div
            key={m.text}
            className="flex items-center gap-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-full px-4 py-1.5 text-sm text-light-text-secondary dark:text-dark-text-secondary"
          >
            {m.icon}
            {m.text}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <Badge key={tag} variant="primary">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}