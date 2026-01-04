/* eslint-disable @typescript-eslint/no-explicit-any */
// /(admin)/dashboard/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { DocumentsResponse } from '../../../../types/document'
import { MetricsResponse } from '../../../../types/metrics'
import { getAllDocs } from '../../../hooks/useGetAllUserSubmissions'
// import { getMetrics } from '../../../hooks/useGetAllMetrics'
import { DocsDataTable } from '../../../../components/docs/docs-data-table'
import { TableSkeleton } from '../../../../components/skeleton'
import { DocsFilters } from '../../../../components/docs/docs-filters'
import { Pagination } from '../../../../components/pagination'

export default function DocsPage() {
  // const [data, setData] = useState<DocumentsResponse | null>(null)
  const [data, setData] = useState<DocumentsResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>()

  const [filters, setFilters] = useState({
    limit : "50",
    docType : "",
    docNumber : "",
    currentHolderName : "",
    currentHolderEmail : "",
    state : "",
    hasPendingResubmission : false,
    status : "",
    certificateStatus : "",
    userName : "",
    userEmail : "",
    startDate : "",
    endDate : "",
  })

    // useEffect(() => {
    //   let cancelled = false

    //   getMetrics().then(res => {
    //     if (!cancelled) {
    //       setMetricsData(res)
    //     }
    //   }).finally(()=>{
    //   if (!cancelled) {
    //     setLoading(false)
    //   }
    // })

    //   return () => {
    //     cancelled = true
    //   }
    // }, [])

  useEffect(() => {
    let cancelled = false
    
    getAllDocs({
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
    <section>
      <div className="space-y-6">
        <DocsFilters
          {...filters}
          onChange={(key, value) => {
            setFilters(prev => ({ ...prev, [key]: value }))
            setLoading(true)
            setPage(1)
          } }
          onReset={() => {
            setFilters({ 
              limit : "25",
              docType : "",
              docNumber : "",
              currentHolderName : "",
              currentHolderEmail : "",
              state : "",
              hasPendingResubmission : false,
              status : "",
              certificateStatus : "",
              userName : "",
              userEmail : "",
              startDate : "",
              endDate : "",
            })
            setLoading(true)
            setPage(1)
          } } />

        {loading ? (
          <TableSkeleton L={7} />
        ) : data ? (
          <section dir={"ltr"}>
            <div className='flex xxxs:flex-col xxxs:items-center xxxs:justify-between md:flex-row md:items-center md:justify-evenly'>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Filtered Submissions :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{data.total}</strong></span>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Exsisting Submissions :</p> <strong className='text-xl'>{data.count}</strong> </span>
            </div>
           {/* <pre className="rounded-md border p-6 text-lg max-w-full overflow-hidden">
               {JSON.stringify(data.documents, null, 2)}
           </pre>             */}
           
           <DocsDataTable data={data.documents} page={page} limit={filters.limit} Single_Page_Routing='submissions'/>
            <Pagination
              page={data.page}
              pages={data.pages}
              onPageChange={(newPage) => {
                setLoading(true)
                setPage(newPage)
              } } />
          </section>
        ) : null}
      </div>
    </section>
  )
}
