import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Spinner, Button } from "@/components/ui"
import { useJobDetail } from "@/features/jobs"
import { JobDetailHero } from "@/features/jobs/components/JobDetailHero"
import { JobDetailContent } from "@/features/jobs/components/JobDetailContent"
import { JobDetailSidebar } from "@/features/jobs/components/JobDetailSidebar"
import { JobDetailCTA } from "@/features/jobs/components/JobDetailCTA"
import { PageTransition, Footer } from "@/components/layout"
import { ArrowLeft } from "lucide-react"

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: job, isLoading, isError } = useJobDetail(id ?? "")
  const [applied, setApplied] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <PageTransition>
      <div className="min-h-screen bg-light-base dark:bg-dark-base">
      <Navbar />

      {/* Back button */}
      <div className="global-p pt-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 mb-8"
          >
            <ArrowLeft size={14} />
            Back to jobs
          </Button>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Spinner size="lg" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-light-text-muted dark:text-dark-text-muted text-sm">
              Failed to load job details.
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Back to listings
            </Button>
          </div>
        )}

        {/* Not found */}
        {!isLoading && !isError && !job && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-light-text-muted dark:text-dark-text-muted text-sm">
              This role no longer exists.
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Back to listings
            </Button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !isError && job && (
          <div className="pb-16">
            <JobDetailHero
              job={job}
              applied={applied}
              saved={saved}
              onApply={() => setApplied(true)}
              onSave={() => setSaved((p) => !p)}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <JobDetailContent job={job} />
              </div>
              <div className="order-1 lg:order-2">
                <div className="lg:sticky lg:top-24">
                  <JobDetailSidebar
                    job={job}
                    applied={applied}
                    saved={saved}
                    onApply={() => setApplied(true)}
                    onSave={() => setSaved((p) => !p)}
                  />
                </div>
              </div>
            </div>
            <JobDetailCTA
              job={job}
              applied={applied}
              onApply={() => setApplied(true)}
            />
          </div>
        )}
      </div>
      <Footer/>
    </div>

    </PageTransition>
    
  )
}