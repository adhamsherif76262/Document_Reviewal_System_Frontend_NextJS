/* eslint-disable @typescript-eslint/no-explicit-any */
// types/log.ts

export interface LogUser {
  _id: string
  name: string
  email: string
}

export interface LogDocument {
  _id: string
  status: string
}

export interface Log {
  _id: string
  action: string
  message: string
  actor: string
  result: 'success' | 'failure'
  timestamp: string
  createdAt: string
  user?: LogUser | null
  admin?: any | null
  document?: LogDocument | null
}

export interface LogsResponse {
  total: number
  page: number
  pages: number
  logs: Log[]
}
