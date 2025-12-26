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
import { MetricsResponse } from '../../../../types/metrics'
import { getLogs } from '../../../hooks/useGetAllLogs'
import { getMetrics } from '../../../hooks/useGetAllMetrics'
import { LogsDataTable } from '../../../../components/logs/logs-data-table'
import { LogsTableSkeleton } from '../../../../components/logs/logs-table-skeleton'
import { LogsFilters } from '../../../../components/logs/logs-filters'
import { LogsPagination } from '../../../../components/logs/logs-pagination'

export default function LogsPage() {
  const [data, setData] = useState<LogsResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>()

  const [filters, setFilters] = useState({
    limit: '100',
    actor: '',
    action: '',
    startDate: '',
    endDate: '',
  })

    useEffect(() => {
      let cancelled = false

      getMetrics().then(res => {
        if (!cancelled) {
          setMetricsData(res)
        }
      })

      return () => {
        cancelled = true
      }
    }, [])

  useEffect(() => {
    let cancelled = false
    
    getLogs({
      page,
      ...filters,
    }).then(res => {
      if (!cancelled) {
        setData(res)
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
            setFilters({ actor: '', action: '', startDate: '', endDate: ''  , limit:"25"})
            setLoading(true)
          }
        }
      />

      {/* {!data ? ( */}
      {loading ? (
        <LogsTableSkeleton L={7}/>
      ) : data ? (
        <section dir={"ltr"}>
          <div className='flex xxxs:flex-col xxxs:items-center xxxs:justify-between md:flex-row md:items-center md:justify-evenly'>
            <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Current Logs :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{data.total}</strong></span>
            <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Exsisting Logs :</p> <strong className='text-xl'>{metricsData?.totalLogs}</strong> </span>
          </div>
          <LogsDataTable data={data.logs} page={page} limit={filters.limit}/>
          <LogsPagination
            page={data.page}
            pages={data.pages}
            onPageChange={(newPage)=>{
              setLoading(true)
              setPage(newPage);
            }}
          />
        </section>
      // ):<LogsTableSkeleton />}
      ):null}
    </div>
  )
}
