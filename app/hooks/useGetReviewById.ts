// lib/api/logs.ts
// import axios from '@/lib/axios'
// import { useParams } from 'next/navigation'
import api from '../../lib/api'

// import { LogsResponse } from '../../types/log'
import { ParamValue } from 'next/dist/server/request/params'

interface GetReviewByIdParams {
  id: ParamValue
}

export async function getReviewById(params: GetReviewByIdParams) {
  const { data } = await api.get(`/api/reviews/${params.id}/getReviewById`, {
    params,
  })
  return data
}
