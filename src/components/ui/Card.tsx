import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -3, scale: 1.005 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-light-glass dark:bg-dark-glass
        border border-light-border dark:border-dark-border
        backdrop-blur-md
        transition-all duration-200
        ${hover ? "cursor-pointer hover:border-light-border-hover dark:hover:border-dark-border-hover hover:bg-light-glass-hover dark:hover:bg-dark-glass-hover" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}