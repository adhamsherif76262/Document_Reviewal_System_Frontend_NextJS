/* eslint-disable @typescript-eslint/no-explicit-any */
// types/log.ts

// export interface LogUser {
//   _id: string
//   name: string
//   email: string
// }

export interface DocumentStatuses {
  pending: number
  approved: number
  partiallyApproved: number
  rejected: number
  status: string
}

export interface MetricsResponse {
  totalDocuments: number
  totalUsers: number
  totalReviews: number
  totalLogs: number
  documentStatuses: DocumentStatuses | null
}

// export interface LogsResponse {
//   total: number
//   page: number
//   pages: number
//   logs: Log[]
// }
