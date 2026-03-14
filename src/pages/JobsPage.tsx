import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { JobCard } from "@/features/jobs/components/JobCard"
import { JobFilters } from "@/features/jobs/components/JobFilters"
import { EmptyState } from "@/components/ui"
import { useJobs } from "@/features/jobs"
import { type JobFilters as JobFiltersType } from "@/features/jobs"
import { PageTransition, Footer, HeroGlow} from "@/components/layout"
import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton"

export function JobsPage() {
  const [filters, setFilters] = useState<Partial<typeof JobFiltersType>>({
    search: "",
    category: "All",
    type: "All",
    level: "All",
    remote: null,
  })

  const { data, isLoading, isError } = useJobs(filters)

  return (
    <PageTransition>
      <div className="min-h-screen bg-light-base dark:bg-dark-base">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden global-p pt-16 pb-12 border-b border-light-border dark:border-dark-border">
          <HeroGlow />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-glow border border-brand-primary/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs text-brand-primary font-medium">
              {data?.total ?? 0} roles available now
            </span>
          </div>
          <h1 className="font-display font-800 text-5xl md:text-7xl leading-[0.95] tracking-tighter text-light-text-primary dark:text-dark-text-primary mb-5">
            Find work that<br />
            <span className="text-brand-primary">fits you.</span>
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg max-w-xl leading-relaxed">
            Curated roles at high-growth startups and forward-thinking companies — no noise, no spam.
          </p>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="global-p py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-64 shrink-0">
            <JobFilters
              filters={filters}
              onChange={setFilters}
              total={data?.total ?? 0}
            />
          </aside>

          {/* Job grid */}
          <div className="flex-1">
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            )}

            {isError && (
              <div className="flex items-center justify-center py-24">
                <p className="text-light-text-muted dark:text-dark-text-muted text-sm">
                  Failed to load jobs. Please try again.
                </p>
              </div>
            )}

           {!isLoading && !isError && data?.jobs.length === 0 && (
              <EmptyState
                title="No roles match your filters"
                description="Try a different search term or adjust your filters."
                action={{
                  label: "Clear filters",
                  onClick: () =>
                    setFilters({
                      search: "",
                      category: "All",
                      type: "All",
                      level: "All",
                      remote: null,
                    }),
                }}
              />
            )}


            {!isLoading && !isError && data && data.jobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {data.jobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
    </PageTransition>
    
  )
}
