import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui"
import { PageTransition } from "@/components/layout/PageTransition"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="min-h-screen bg-light-base dark:bg-dark-base">
      <Navbar />
      <div className="global-p flex flex-col items-center justify-center min-h-[80vh] text-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-display font-800 text-[120px] leading-none text-light-border dark:text-dark-border select-none">
            404
          </span>
          <h1 className="font-display font-700 text-2xl text-light-text-primary dark:text-dark-text-primary">
            Page not found
          </h1>
          <p className="text-sm text-light-text-muted dark:text-dark-text-muted max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="primary" size="md" onClick={() => navigate("/")}>
            Back to jobs
          </Button>
        </motion.div>
      </div>
    </div>
    </PageTransition>
  )
}