import type { JobFilters } from "./types"
import { jobsService } from "./service"

export const jobsActions = {
  fetchJobs: async (filters: Partial<JobFilters> = {}) => {
    try {
      const data = await jobsService.getJobs(filters)
      return data
    } catch (error) {
      throw new Error("Failed to fetch jobs. Please try again.")
    }
  },

  fetchJobById: async (id: string) => {
    try {
      const job = await jobsService.getJobById(id)
      if (!job) throw new Error(`Job with id "${id}" not found.`)
      return job
    } catch (error) {
      throw new Error("Failed to fetch job details. Please try again.")
    }
  },
}