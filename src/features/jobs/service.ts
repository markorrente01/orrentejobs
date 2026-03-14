import type { Job, JobFilters, JobsResponse } from "./types"
import { MOCK_JOBS } from "./mock"

const simulateDelay = (ms: number = 800): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const jobsService = {
  async getJobs(filters: Partial<JobFilters> = {}): Promise<JobsResponse> {
    await simulateDelay()

    let results = [...MOCK_JOBS]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    if (filters.category && filters.category !== "All") {
      results = results.filter((job) => job.category === filters.category)
    }

    if (filters.type && filters.type !== "All") {
      results = results.filter((job) => job.type === filters.type)
    }

    if (filters.level && filters.level !== "All") {
      results = results.filter((job) => job.level === filters.level)
    }

    if (filters.remote !== null && filters.remote !== undefined) {
      results = results.filter((job) => job.remote === filters.remote)
    }

    return {
      jobs: results,
      total: results.length,
    }
  },

  async getJobById(id: string): Promise<Job | null> {
    await simulateDelay(600)
    return MOCK_JOBS.find((job) => job.id === id) ?? null
  },
}