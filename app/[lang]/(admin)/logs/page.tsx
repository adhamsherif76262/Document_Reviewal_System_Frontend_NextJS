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
import { TableSkeleton } from '../../../../components/skeleton'
import { LogsFilters } from '../../../../components/logs/logs-filters'
import { Pagination } from '../../../../components/pagination'

export default function LogsPage() {
  const [data, setData] = useState<LogsResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>()

  const [filters, setFilters] = useState({
    limit: '50',
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
    <section>
        <h1 className='text-center font-black text-2xl'>Statistics</h1>
        {loading ? (
          <TableSkeleton L={5} />
        ) : metricsData ?(
          <div className="mb-12 mt-5 stats stats-vesrtical lg:stats-horizontal gap-0 shadow-[0_0px_8px_8px_rgba(0,0,0,0.25)] rounded-xl grid 2xl:grid-rows-5 xxs:grid-rows-3 xxxs:grid-rows-4">
        {/* <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Exsisting Logs</div>
          <div className="stat-value text-xl text-center">{metricsData?.totalLogs}</div>
          <div className="stat-desc text-black">↘︎ 90 (14%)</div>
        </div> */}
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Logins</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.login}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Logouts</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.logout}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Registers</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.register}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Forgot Password</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.forgotPassword}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Reset Password</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.resetPassword}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Full Document <br /> Submissions</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.fileSubmission}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Full Document <br /> Re-Submissions</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.fileReSubmission}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submission Approvals</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.approved}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submission <br /> Partial Approvals</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.partiallyApproved}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submission Rejections</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.rejected}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Email Vertifications</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.verifyEmail}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Final Certificate <br /> Approvals</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.ApproveFinalCertificate}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Final Certificate <br /> Rejections</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.RejectFinalCertificate}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Final Certificate <br /> Re-Submissions</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.ResubmitFinalCertificate}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Final Certificate <br /> Submissions</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.SubmitFinalCertificate}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submissions Type <br /> Assignments Retrievals</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.GetDocTypeAssignments}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Submissions Type <br /> Assignments Synchronizations</div>
          {/* <div className="stat-title text-black font-black text-lg text-center">Submissions Type <br /> Assignments Sync</div> */}
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.SyncDocTypeAssignments}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Registration Code <br /> Generations</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.GenerateRegistrationCode}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">User Expiry <br /> Date Extension</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.ExtendUserAccountExpiryDate}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Viewing All <br /> Personal Submissions</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.GetAllPersonalDocs}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Viewing All <br /> Existing Submissions</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.ListAllDocs}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Viewing All <br /> Existing Reviews</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.GetAllReviews}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        {/* <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Review Returning</div>
          <div className="stat-value text-xl text-center">asdasda</div>
          <div className="stat-desc text-black">↘︎ 90 (14%)</div>
        </div> */}
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Viewing Admins <br /> Statistics</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.GetAllAdminsStats}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Viewing Users <br /> Statistics</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.GetAllUsersStats}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Re-Assigning Submissions <br /> Types To Admins</div>
          <div className="stat-value text-xl text-center">{metricsData?.logsActionsCount?.assign}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
          </div>
        ):null}

      <div className="space-y-6">
        <LogsFilters
          {...filters}
          onChange={(key, value) => {
            setFilters(prev => ({ ...prev, [key]: value }))
            setLoading(true)
            setPage(1)
          } }
          onReset={() => {
            setFilters({ actor: '', action: '', startDate: '', endDate: '', limit: "25" })
            setLoading(true)
            setPage(1)
          } } />

        {loading ? (
          <TableSkeleton L={7} />
        ) : data ? (
          <section dir={"ltr"}>
            <div className='flex xxxs:flex-col xxxs:items-center xxxs:justify-between md:flex-row md:items-center md:justify-evenly'>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Filtered Logs :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{data.total}</strong></span>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Exsisting Logs :</p> <strong className='text-xl'>{metricsData?.totalLogs}</strong> </span>
            </div>
            <LogsDataTable data={data.logs} page={page} limit={filters.limit} />
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
