/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/logs/page.tsx

// 'use client'

// import { useEffect, useState } from 'react'
// import { getLogs } from '../../../hooks/useGetAllLogs'
// import { LogsDataTable } from '../../../../components/logs/logs-data-table'
// import { LogsTableSkeleton } from '../../../../components/logs/logs-table-skeleton'
// import { LogsFilters } from '../../../../components/logs/logs-filters'
// import { LogsPagination } from '../../../../components/logs/logs-pagination'

// export default function LogsPage() {
//   const [loading, setLoading] = useState(true)
//   const [data, setData] = useState<any>(null)
//   const [filters, setFilters] = useState({
//     actor: '',
//     action: '',
//     fromDate: '',
//     toDate: '',
//   })

//   const [page, setPage] = useState(1)

//   useEffect(() => {
//     setLoading(true)
//     getLogs({
//       page,
//       limit: 10,
//       ...filters,
//     })
//       .then(setData)
//       .finally(() => setLoading(false))
//   }, [page, filters])

//   return (
//     <div className="space-y-6">
//       <LogsFilters
//         {...filters}
//         onChange={(key, value) =>
//           setFilters(prev => ({ ...prev, [key]: value }))
//         }
//         onReset={() =>
//           setFilters({ actor: '', action: '', fromDate: '', toDate: '' })
//         }
//       />

//       {loading ? (
//         <LogsTableSkeleton />
//       ) : (
//         <>
//           <LogsDataTable data={data.logs} />
//           <LogsPagination
//             page={data.page}
//             pages={data.pages}
//             onPageChange={setPage}
//           />
//         </>
//       )}
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { LogsResponse } from '../../../../types/log'
import { getLogs } from '../../../hooks/useGetAllLogs'
import { LogsDataTable } from '../../../../components/logs/logs-data-table'
import { LogsTableSkeleton } from '../../../../components/logs/logs-table-skeleton'
import { LogsFilters } from '../../../../components/logs/logs-filters'
import { LogsPagination } from '../../../../components/logs/logs-pagination'

export default function LogsPage() {
  const [data, setData] = useState<LogsResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  const [filters, setFilters] = useState({
    limit: 25,
    actor: '',
    action: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    let cancelled = false

    getLogs({
      page,
      ...filters,
    }).then(res => {
      if (!cancelled) {
        setData(res)
        // setLoading(false)
      }
    }).finally(()=>{
      if (!cancelled) {
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [page, filters])

  return (
    <div className="space-y-6">
      <LogsFilters
        {...filters}
        onChange={(key, value) =>{
          setFilters(prev => ({ ...prev, [key]: value }))
          setLoading(true)
          }
        }
        onReset={() =>
          {
            setFilters({ actor: '', action: '', startDate: '', endDate: ''  , limit:25})
            setLoading(true)
          }
        }
      />

      {/* {!data ? ( */}
      {loading ? (
        <LogsTableSkeleton />
      ) : data ? (
        <>
          <LogsDataTable data={data.logs} page={page} limit={Number(filters.limit)}/>
          <LogsPagination
            page={data.page}
            pages={data.pages}
            onPageChange={(newPage)=>{
              setLoading(true)
              setPage(newPage);
            }}
          />
        </>
      // ):<LogsTableSkeleton />}
      ):null}
    </div>
  )
}
