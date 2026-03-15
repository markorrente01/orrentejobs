import { useQuery } from "@tanstack/react-query"
import { jobsActions } from "../actions"

export const useJobDetail = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsActions.fetchJobById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  })
}