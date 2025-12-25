// lib/api/logs.ts
// import axios from '@/lib/axios'
// import { useParams } from 'next/navigation'
import api from '../../lib/api'

// import { LogsResponse } from '../../types/log'
import { ParamValue } from 'next/dist/server/request/params'

interface GetLogByIdParams {
  id: ParamValue | string
}

export async function getUserById(params: GetLogByIdParams) {
    // const ID = React.use(params.id)
    // const {id} = useParams()
  const { data } = await api.get(`/api/users/${params.id}/getUserById`, {
    params,
  })
  return data
}
