/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/api/logs.ts
// import axios from '@/lib/axios'
// import { useParams } from 'next/navigation'
import api from '../../lib/api'

// // import { LogsResponse } from '../../types/log'
import { ParamValue } from 'next/dist/server/request/params'

// interface GetLogByIdParams {
//   id: ParamValue | string,
//   page: number,
//   filters: Record<string, any>
// }

// export async function getUserById(params: GetLogByIdParams) {
//     // const ID = React.use(params.id)
//     // const {id} = useParams()
//   const { data } = await api.get(`/api/users/${params.id}/getUserById`, {
//     params,
//   })
//   return data
// }

// hooks/useGetUserById.ts

export async function getUserById({
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

  const { data } = await api.get(`/api/users/${id}/getUserById`, {
    params,
  })

  return data
}

