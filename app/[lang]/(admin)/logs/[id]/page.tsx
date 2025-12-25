// app/(dashboard)/logs/[id]/page.tsx
"use client"
// import api from '../../../../../lib/api'
import { useEffect , useState } from 'react'
import { getLogById } from '../../../../hooks/useGetLogById'
import { LogsResponse } from '../../../../../types/log'
import { useParams } from 'next/navigation'
import { getUserById } from '../../../../hooks/useGetUserById'
export default function LogDetailsPage(
//   {
//   params,
// }: {
//   params: { id: string }
// }
) {
  // const { data } = await api.get(`/api/admin/logs/${params.id}/getLogById`)
    const [logData, setLogData] = useState<JSON | null>()
    const [actorData, setActorData] = useState<JSON | null>()
    const {id} = useParams()
    useEffect(() => {
      let cancelled = false

      getLogById({id: id}).then(res => {
        if (!cancelled) {
          setLogData(res)
        }
        getUserById({id: res.admin || res.user}).then(response => {
          if (!cancelled) {
            setActorData(response)
          }
        })
      })


      return () => {
        cancelled = true
      }
    }, [id])

  // useEffect(() => {
  //   let cancelled = false

  //   getUserById({id: id}).then(res => {
  //     if (!cancelled) {
  //       setActorData(res)
  //     }
  //   })

  //   return () => {
  //     cancelled = true
  //   }
  // }, [id])

  return (
    <>
      <pre className="rounded-md border p-6 text-sm">
        {JSON.stringify(logData, null, 2)}
      </pre>
      <pre className="rounded-md border p-6 text-sm">
          {JSON.stringify(actorData, null, 2)}
      </pre>
    </>
  )
}