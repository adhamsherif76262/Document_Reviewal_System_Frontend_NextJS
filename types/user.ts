/* eslint-disable @typescript-eslint/no-explicit-any */
// types/log.ts

// export interface LogUser {
//   _id: string
//   name: string
//   email: string
// }

// export interface LogDocument {
//   _id: string
//   status: string
// }

export interface user {
  _id: string
  action: string
  name: string
  email: string
  password: string
  role: string
  adminLevel?: string | null
  expiryStatus: string
  phone: string
  preferredVerificationMethod: string
  isVerified: boolean
  expirable: boolean
  lastOTPResend?: string | null
  expiryDate?: string | null
  createdAt: string
  updatedAt: string
}

// export interface LogsResponse {
//   total: number
//   page: number
//   pages: number
//   logs: Log[]
// }
