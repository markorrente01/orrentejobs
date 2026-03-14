import { motion } from "framer-motion"
import type { Job } from "../types"

interface JobDetailContentProps {
  job: Job
}

interface SectionProps {
  title: string
  children: React.ReactNode
  delay?: number
}

function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      <h2 className="font-display font-600 text-lg text-light-text-primary dark:text-dark-text-primary">
        {title}
      </h2>
      {children}
      <div className="h-px bg-light-border dark:bg-dark-border mt-2" />
    </motion.section>
  )
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  return (
    <div className="flex flex-col gap-8">
      <Section title="About the role" delay={0.1}>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          {job.description}
        </p>
      </Section>

      <Section title="What you'll do" delay={0.15}>
        <ul className="flex flex-col gap-3">
          {job.responsibilities.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              <span className="text-brand-primary mt-1 shrink-0 text-xs">◆</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What we're looking for" delay={0.2}>
        <ul className="flex flex-col gap-3">
          {job.requirements.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary"
            >
              <span className="text-brand-primary mt-1 shrink-0 text-xs">◆</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}