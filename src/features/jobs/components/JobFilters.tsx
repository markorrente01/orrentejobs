import type { JobFilters as JobFiltersType, JobCategory, JobType, JobLevel } from "../types"
import { Input } from "@/components/ui"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

interface JobFiltersProps {
  filters: Partial<JobFiltersType>
  onChange: (filters: Partial<JobFiltersType>) => void
  total: number
}

const CATEGORIES: Array<JobCategory | "All"> = [
  "All", "Engineering", "Design", "Product", "Marketing", "Data", "DevOps",
]
const TYPES: Array<JobType | "All"> = [
  "All", "Full-time", "Part-time", "Contract", "Freelance",
]
const LEVELS: Array<JobLevel | "All"> = [
  "All", "Junior", "Mid-level", "Senior", "Lead", "Manager",
]

interface FilterPillsProps<T extends string> {
  options: T[]
  value: T
  onChange: (val: T) => void
}

function FilterPills<T extends string>({ options, value, onChange }: FilterPillsProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <motion.button
          key={option}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(option)}
          className={`
            text-xs px-3.5 py-1.5 border font-medium
            transition-all duration-150 cursor-pointer
            ${
              value === option
                ? "bg-brand-primary border-brand-primary text-white"
                : "bg-light-glass dark:bg-dark-glass border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-light-border-hover dark:hover:border-dark-border-hover"
            }
          `}
        >
          {option}
        </motion.button>
      ))}
    </div>
  )
}

export function JobFilters({ filters, onChange, total }: JobFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5"
    >
      {/* Search */}
      <Input
        placeholder="Search by title, company or skill..."
        value={filters.search ?? ""}
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
        leftIcon={
          <Search size={15}/>
        }
      />

      {/* Category */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-light-text-muted dark:text-dark-text-muted">
          Department
        </p>
        <FilterPills
          options={CATEGORIES}
          value={(filters.category ?? "All") as JobCategory | "All"}
          onChange={(val) => onChange({ ...filters, category: val })}
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-light-text-muted dark:text-dark-text-muted">
          Job Type
        </p>
        <FilterPills
          options={TYPES}
          value={(filters.type ?? "All") as JobType | "All"}
          onChange={(val) => onChange({ ...filters, type: val })}
        />
      </div>

      {/* Level */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-light-text-muted dark:text-dark-text-muted">
          Level
        </p>
        <FilterPills
          options={LEVELS}
          value={(filters.level ?? "All") as JobLevel | "All"}
          onChange={(val) => onChange({ ...filters, level: val })}
        />
      </div>

      {/* Remote toggle */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-light-text-muted dark:text-dark-text-muted">
            Remote only
        </p>
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
            onChange({
                ...filters,
                remote: filters.remote === true ? null : true,
            })
            }
            className={`
            relative shrink-0 w-11 h-6 rounded-full border 
            transition-all duration-200 cursor-pointer
            ${
                filters.remote === true
                ? "bg-brand-primary border-brand-primary"
                : "bg-light-glass dark:bg-dark-glass border-light-border dark:border-dark-border"
            }
            `}
        >
            <motion.span
            animate={{ x: filters.remote === true ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
            />
        </motion.button>
        </div>

      {/* Results count */}
      <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
        Showing <span className="text-brand-primary font-semibold">{total}</span> roles
      </p>
    </motion.div>
  )
}