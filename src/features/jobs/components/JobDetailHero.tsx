import { motion } from "framer-motion"
import type { Job } from "../types"
import { Badge, Button } from "@/components/ui"
import { Briefcase, Clock, DollarSign, MapPin } from "lucide-react"

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
  const meta = [
          {
            icon: (
              <MapPin size={16} />
             ),
            text: job.location,
          },
          {
            icon: (
              <Briefcase size={16}/>
            ),
            text: job.type,
          },
          {
            icon: (
              <DollarSign size={16}/>
            ),
            text: formatSalary(job.salary.min, job.salary.max, job.salary.currency),
          },
          {
            icon: (
              <Clock size={16}/>            
            ),
            text: `Posted ${timeAgo(job.postedAt)}`,
          },
  ]
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
            className="w-16 rounded-md h-16 flex items-center justify-center text-sm font-bold shrink-0"
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
        {
          meta.map((m) => (
            <div
              key={m.text}
              className="flex rounded-md items-center gap-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border px-4 py-1.5 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              {m.icon}
              {m.text}
            </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <Badge key={tag} variant="primary" className="rounded-md">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}