import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const LINKS = [
  { label: "Browse Jobs", path: "/" },
  { label: "Companies", path: "/" },
  { label: "Salaries", path: "/" },
  { label: "Blog", path: "/" },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="border-t border-light-border dark:border-dark-border mt-20"
    >
      <div className="global-p py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center">
                <span className="text-white font-bold text-xs">O</span>
              </div>
              <span className="font-display font-700 text-base text-light-text-primary dark:text-dark-text-primary tracking-tight">
                OmniJobs
              </span>
            </div>
            <p className="text-xs text-light-text-muted dark:text-dark-text-muted max-w-xs leading-relaxed">
              Curated roles at high-growth startups and forward-thinking companies — no noise, no spam.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-sm text-light-text-muted dark:text-dark-text-muted hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-10 pt-6 border-t border-light-border dark:border-dark-border">
          <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
            © 2025 OmniJobs. All rights reserved.
          </p>
          <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
            Built with React · TypeScript · TailwindCSS · Framer Motion
          </p>
        </div>
      </div>
    </motion.footer>
  )
}