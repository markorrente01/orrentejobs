export type JobType = "Full-time" | "Part-time" | "Contract" | "Freelance"

export type JobLevel = "Junior" | "Mid-level" | "Senior" | "Lead" | "Manager"

export type JobCategory =
  | "Engineering"
  | "Design"
  | "Product"
  | "Marketing"
  | "Data"
  | "DevOps"

export interface Job {
  id: string
  title: string
  company: string
  companyLogo: string
  companyColor: string
  location: string
  remote: boolean
  type: JobType
  level: JobLevel
  category: JobCategory
  salary: {
    min: number
    max: number
    currency: string
  }
  tags: string[]
  description: string
  responsibilities: string[]
  requirements: string[]
  about: string
  featured: boolean
  postedAt: string
  applicants: number
  views: number
}

export interface JobFilters {
  search: string
  category: JobCategory | "All"
  type: JobType | "All"
  remote: boolean | null
  level: JobLevel | "All"
}

export interface JobsResponse {
  jobs: Job[]
  total: number
}