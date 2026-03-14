import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import type { Job } from "../types"
import { Badge } from "@/components/ui"

interface JobCardProps {
  job: Job
  index?: number
}

const formatSalary = (min: number, max: number, currency: string) => {
  const fmt = (n: number) =>
    n >= 1000 ? `${currency === "USD" ? "$" : ""}${Math.round(n / 1000)}k` : `${n}`
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

export function JobCard({ job, index = 0 }: JobCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.005 }}
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="
        group cursor-pointer rounded-2xl p-5
        bg-light-glass dark:bg-dark-glass
        border border-light-border dark:border-dark-border
        backdrop-blur-md
        hover:border-light-border-hover dark:hover:border-dark-border-hover
        hover:bg-light-glass-hover dark:hover:bg-dark-glass-hover
        transition-all duration-200
      "
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              background: `${job.companyColor}18`,
              border: `1px solid ${job.companyColor}35`,
              color: job.companyColor,
            }}
          >
            {job.companyLogo}
          </div>
          <div>
            <p className="text-xs text-light-text-muted dark:text-dark-text-muted mb-0.5">
              {job.company}
            </p>
            <h3 className="font-display font-semibold text-sm text-light-text-primary dark:text-dark-text-primary leading-tight group-hover:text-brand-primary transition-colors duration-200">
              {job.title}
            </h3>
          </div>
        </div>
        {job.featured && (
          <Badge variant="primary">Featured</Badge>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
        <span className="flex items-center gap-1.5 text-xs text-light-text-muted dark:text-dark-text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-light-text-muted dark:text-dark-text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          {job.type}
        </span>
        <span className="text-xs font-semibold text-light-text-primary dark:text-dark-text-primary">
          {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="default">{tag}</Badge>
        ))}
        {job.tags.length > 3 && (
          <Badge variant="default">+{job.tags.length - 3}</Badge>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-light-border dark:border-dark-border">
        <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
          {timeAgo(job.postedAt)}
        </span>
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-xs font-medium text-brand-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          View role
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </motion.span>
      </div>
    </motion.div>
  )
}