
/* eslint-disable @typescript-eslint/no-explicit-any */
// /(admin)/dashboard/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { ReviewsResponse } from '../../../../types/reviews'
import { MetricsResponse } from '../../../../types/metrics'
import { getAllReviews } from '../../../hooks/useGetAllReviews'
import { getMetrics } from '../../../hooks/useGetAllMetrics'
import { ReviewsDataTable } from '../../../../components/reviews/reviews-data-table'
import { TableSkeleton } from '../../../../components/skeleton'
import { ReviewsFilters } from '../../../../components/reviews/reviews-filters'
import { Pagination } from '../../../../components/pagination'
import { Button } from '@/components/ui/button'
import { useParams , useRouter} from 'next/navigation'

export default function LogsPage() {
  // const [data, setData] = useState<DocumentsResponse | null>(null)
//   const {userStatsLoading , userStatsStatus , userStatsMessage , userStats, getAllUserStats} = useGetAllUserStats()
  const {lang} = useParams()
  const router = useRouter()
  const [data, setData] = useState<ReviewsResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>()

  const [filters, setFilters] = useState({
    // page: number
    limit: "25",
    docType: "",
    state: "",
    status: "",
    docNumber: "",
    fieldReviewedKey : "",
    fieldReviewedStatus : "",
    adminName : "",
    adminEmail : "",
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
    
    getAllReviews({
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
          <div className="stat-title text-black font-black text-lg text-center">Rejection Reviews</div>
          <div className="stat-value text-xl text-center">{metricsData?.reviewsCount?.rejected}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Partial Approval Reviews</div>
          <div className="stat-value text-xl text-center">{metricsData?.reviewsCount?.partiallyApproved}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Approval Reviews</div>
          <div className="stat-value text-xl text-center">{metricsData?.reviewsCount?.approved}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Total Reviews</div>
          <div className="stat-value text-xl text-center">{metricsData?.totalReviews}</div>
        </div>
          </div>
        ):null}


      <div className="space-y-6">
        <ReviewsFilters
          {...filters}
          onChange={(key, value) => {
            setFilters(prev => ({ ...prev, [key]: value }))
            setLoading(true)
            setPage(1)
          } }
          onReset={() => {
            setFilters({ 
                limit: "25",
                docType: "",
                state: "",
                status: "",
                docNumber: "",
                fieldReviewedKey : "",
                fieldReviewedStatus : "",
                adminName : "",
                adminEmail : "",
                startDate : "",
                endDate : "",
            })
            setPage(1)
            setLoading(true)
          } } />

        {loading ? (
          <TableSkeleton L={7} />
        ) : data ? (
          <section dir={"ltr"}>
            <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Filtered Reviews :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{data.count}</strong></span>

           <ReviewsDataTable data={data.reviews} page={data.page} limit={filters.limit} />
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
