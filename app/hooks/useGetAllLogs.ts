// lib/api/logs.ts
// import axios from '@/lib/axios'
import api from '../../lib/api'

import { LogsResponse } from '../../types/log'

interface GetLogsParams {
  page: number
  // limit?: number
  limit?: string
  actor?: string
  action?: string
  fromDate?: string
  toDate?: string
}

export async function getLogs(params: GetLogsParams) {
  const { data } = await api.get<LogsResponse>('api/admin/logs', {
    params,
  })
  return data
}
