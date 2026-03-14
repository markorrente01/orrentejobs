import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { JobsPage } from "@/pages/JobsPage"
import { JobDetailPage } from "@/pages/JobDetailPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}