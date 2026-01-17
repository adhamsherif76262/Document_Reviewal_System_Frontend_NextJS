// lib/api/logs.ts
// import axios from '@/lib/axios'
import api from '../../lib/api'

import { DocumentsResponse } from '../../types/document'

interface GetAllDocsParams {
  page: number
  // limit?: number
  limit?: string
  docType?: string
  hasPendingResubmission?: boolean | null
  state?: string
  status?: string
  docNumber?: string
  certificateStatus?: string
  userName?: string
  userEmail?: string
  currentHolderName?: string
  currentHolderEmail?: string
  fromDate?: string
  toDate?: string
}

export async function getAllDocs(params: GetAllDocsParams) {
  const { data } = await api.get<DocumentsResponse>('/api/users/my-submissions', {
    params,
  })
  return data
}
