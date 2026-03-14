import { useParams } from "react-router-dom"

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>Job Detail — {id}</h1>
    </div>
  )
}