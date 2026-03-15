import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { Button } from "@/components/ui"
import { Menu, Moon, Sun, X } from "lucide-react"

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full bg-light-glass dark:bg-dark-glass border-b border-light-border dark:border-dark-border backdrop-blur-xl"
      >
        <div className="global-p flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">OJ</span>
            </motion.div>
            <span className="font-display font-700 text-lg text-light-text-primary dark:text-dark-text-primary tracking-tight">
              OrrenteJobs
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
           <Link
              to='/'
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/')
                  ? "text-brand-primary"
                  : "text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary"
              }`}
            >
              Browse Jobs
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-light-elevated dark:bg-dark-elevated border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-light-border-hover dark:hover:border-dark-border-hover transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun size={15}/>
              ) : (
                <Moon size={15}/>
              )}
            </motion.button>

            {/* Desktop buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm">Sign in</Button>
              <Button variant="primary" size="sm">Post a job</Button>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-light-elevated dark:bg-dark-elevated border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                 <X size={15} />
              ) : (
                <Menu size={15} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden sticky top-16 z-40 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border backdrop-blur-xl overflow-hidden"
          >
            <div className="global-p py-4 flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors py-2"
              >
                Browse Jobs
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-light-border dark:border-dark-border">
                <Button variant="outline" size="sm" fullWidth>
                  Sign in
                </Button>
                <Button variant="primary" size="sm" fullWidth>
                  Post a job
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}