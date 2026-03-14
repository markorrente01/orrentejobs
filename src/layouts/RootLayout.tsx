import { Outlet } from "react-router-dom"

export function RootLayout() {
  return (
    <div className="min-h-screen bg-light-base dark:bg-dark-base transition-colors duration-300">
      <Outlet />
    </div>
  )
}