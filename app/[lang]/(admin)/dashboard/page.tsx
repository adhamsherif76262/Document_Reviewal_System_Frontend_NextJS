/* eslint-disable @typescript-eslint/no-explicit-any */
// /(admin)/dashboard/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { DocumentsResponse } from '../../../../types/document'
import { MetricsResponse } from '../../../../types/metrics'
import { getAllDocs } from '../../../hooks/useGetAllDocs'
import { getMetrics } from '../../../hooks/useGetAllMetrics'
import { DocsDataTable } from '../../../../components/docs/docs-data-table'
import { TableSkeleton } from '../../../../components/skeleton'
import { DocsFilters } from '../../../../components/docs/docs-filters'
import { Pagination } from '../../../../components/pagination'

export default function LogsPage() {
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

    useEffect(() => {
      let cancelled = false

      getMetrics().then(res => {
        if (!cancelled) {
          setMetricsData(res)
        }
      }).finally(()=>{
      if (!cancelled) {
        setLoading(false)
      }
    })

      return () => {
        cancelled = true
      }
    }, [])

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

        <h1 className='text-center font-black text-2xl'>Statistics</h1>
        {loading ? (
          <TableSkeleton L={1} />
        ) : metricsData ?(
          <div className="mb-12 mt-5 stats stats-vesrtical lg:stats-horizontal gap-0 shadow-[0_0px_8px_8px_rgba(0,0,0,0.25)] rounded-xl grid lg:grid-rows-1 sm:grid-rows-2 xxxs:grid-rows-4">
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submission Pendings</div>
          <div className="stat-value text-xl text-center">{metricsData?.documentStatuses?.pending}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submission Approvals</div>
          <div className="stat-value text-xl text-center">{metricsData?.documentStatuses?.approved}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submission <br /> Partial Approvals</div>
          <div className="stat-value text-xl text-center">{metricsData?.documentStatuses?.partiallyApproved}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submission Rejections</div>
          <div className="stat-value text-xl text-center">{metricsData?.documentStatuses?.rejected}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
          </div>
        ):null}


      <div className="space-y-6">
        <DocsFilters
          {...filters}
          onChange={(key, value) => {
            setFilters(prev => ({ ...prev, [key]: value }))
            setLoading(true)
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
          } } />

        {loading ? (
          <TableSkeleton L={7} />
        ) : data ? (
          <section dir={"ltr"}>
            <div className='flex xxxs:flex-col xxxs:items-center xxxs:justify-between md:flex-row md:items-center md:justify-evenly'>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Filtered Submissions :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{data.total}</strong></span>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Exsisting Submissions :</p> <strong className='text-xl'>{metricsData?.totalDocuments}</strong> </span>
            </div>
           {/* <pre className="rounded-md border p-6 text-lg max-w-full overflow-hidden">
               {JSON.stringify(data.documents, null, 2)}
           </pre>             */}
           
           <DocsDataTable data={data.documents} page={page} limit={filters.limit} />
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
