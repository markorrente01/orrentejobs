import { useNavigate } from "react-router-dom"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>404 — Page not found</h1>
      <button onClick={() => navigate("/")}>Back to jobs</button>
    </div>
  )
}