/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api/logs.ts
// import axios from '@/lib/axios'
// import { useParams } from 'next/navigation'
import api from '../../lib/api'

import { ParamValue } from 'next/dist/server/request/params'

export async function getAdminById({
  id,
  page,
  filters,
}: {
  id: ParamValue | string,
  page: number
  filters: Record<string, any>
}) {
  const params = {
    page,
    ...filters,
  }

  const { data } = await api.get(`/api/users/${id}/getAdminById`, {
    params,
  })

  return data
}

