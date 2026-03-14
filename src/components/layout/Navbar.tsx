import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "@/components/ui"

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        sticky top-0 z-50 w-full
        bg-light-glass dark:bg-dark-glass
        border-b border-light-border dark:border-dark-border
        backdrop-blur-xl
      "
    >
      <div className="global-p flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">O</span>
          </motion.div>
          <span
            className="font-display font-700 text-lg text-light-text-primary dark:text-dark-text-primary tracking-tight"
          >
            OmniJobs
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Browse Jobs", path: "/" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                text-sm font-medium transition-colors duration-200
                ${
                  isActive(link.path)
                    ? "text-brand-primary"
                    : "text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="
              w-9 h-9 rounded-xl flex items-center justify-center
              bg-light-elevated dark:bg-dark-elevated
              border border-light-border dark:border-dark-border
              text-light-text-secondary dark:text-dark-text-secondary
              hover:border-light-border-hover dark:hover:border-dark-border-hover
              transition-all duration-200 cursor-pointer
            "
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </motion.button>

          <Button variant="outline" size="sm">
            Sign in
          </Button>
          <Button variant="primary" size="sm">
            Post a job
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}