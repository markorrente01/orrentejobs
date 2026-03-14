import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar, Footer, PageTransition, HeroGlow } from "@/components/layout"
import { JobCard } from "@/features/jobs/components/JobCard"
import { JobFilters } from "@/features/jobs/components/JobFilters"
import { JobFiltersDrawer } from "@/features/jobs/components/JobFiltersDrawer"
import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton"
import { EmptyState } from "@/components/ui"
import { useJobs } from "@/features/jobs"
import { type JobFilters as JobFiltersType } from "@/features/jobs"

const DEFAULT_FILTERS: Partial<typeof JobFiltersType> = {
  search: "",
  category: "All",
  type: "All",
  level: "All",
  remote: null,
}

export function JobsPage() {
  const [filters, setFilters] = useState<Partial<typeof JobFiltersType>>(DEFAULT_FILTERS)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { data, isLoading, isError } = useJobs(filters)

  return (
    <PageTransition>
      <div className="min-h-screen bg-light-base dark:bg-dark-base">
        <Navbar />

        {/* Hero */}
        <section className="global-p pt-16 pb-12 border-b border-light-border dark:border-dark-border relative overflow-hidden">
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

        {/* Main */}
        <section className="global-p py-10">
          {/* Mobile filter button */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
              <span className="text-brand-primary font-semibold">{data?.total ?? 0}</span> roles
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Filters
            </motion.button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <JobFilters
                  filters={filters}
                  onChange={setFilters}
                  total={data?.total ?? 0}
                />
              </div>
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
                    onClick: () => setFilters(DEFAULT_FILTERS),
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

        {/* Mobile filters drawer */}
        <JobFiltersDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filters}
          onChange={setFilters}
          total={data?.total ?? 0}
        />

        <Footer />
      </div>
    </PageTransition>
  )
}