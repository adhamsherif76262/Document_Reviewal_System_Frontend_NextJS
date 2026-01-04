// lib/api/logs.ts
// import axios from '@/lib/axios'
import api from '../../lib/api'

import { ReviewsResponse } from '../../types/reviews'

interface GetAllReviewsParams {
  page: number
  limit?: string
  docType?: string
  state?: string
  status?: string
  docNumber?: string
  fieldReviewedStatus?: string
  fieldReviewedKey?: string
  adminName?: string
  adminEmail?: string
  fromDate?: string
  toDate?: string
}

export async function getAllReviews(params: GetAllReviewsParams) {
  const { data } = await api.get<ReviewsResponse>('/api/reviews/admin', {
    params,
  })
  return data
}
