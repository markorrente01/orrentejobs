import { useQuery } from "@tanstack/react-query"
import type { JobFilters } from "../types"
import { jobsActions } from "../actions"

export const useJobs = (filters: Partial<JobFilters> = {}) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => jobsActions.fetchJobs(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}