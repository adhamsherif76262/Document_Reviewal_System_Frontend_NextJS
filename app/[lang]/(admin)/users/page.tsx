/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import { useEffect } from 'react'
// import { useGetAllUserStats } from '../../../hooks/useGetAllUserStats'

// export default function Userspage() {
//     const {userStatsLoading , userStatsStatus , userStatsMessage , userStats, getAllUserStats} = useGetAllUserStats()
//     useEffect(() => {
//         const GetAllUsers = async () => {
//             await getAllUserStats()
//         }
//         GetAllUsers()
//     } , [])
//   return (
//     <section>
//       {userStatsLoading && <h2 className='text-blue-600 text-center'>Loading All User&lsquo;s Statistics</h2>}
//       {userStatsMessage && <h1 className={`${userStatsStatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{userStatsMessage}</h1>}
//       {
//         userStats && (

//           <section className='max-w-8xl'>
//             <h2 className='text-center'>Total Users: {userStats.pagination.totalUsers}</h2>
//             <h2 className='text-center'>Total Pages: {userStats.pagination.totalPages}</h2>
//             <h2 className='text-center'>Current Page: {userStats.pagination.currentPage}</h2>
//             <h1 className="text-2xl font-bold mb-4 text-center mt-10">Users</h1>
//             <div className="p-6 mx-auto max-w-8xl flex flex-row justify-between items-center">
//               {
//                 userStats.users.map((user: any) => (
//                   <div key={user.user._id} className="bg-black text-white shadow-md rounded-lg p-4 my-4 mx-12">
//                     <h2 className="text-white text-xl font-semibold mb-2">User Name:{user.user.name}</h2>
//                     <p className=" mb-2 text-white">Email: {user.user.email}</p>
//                     <p className=" mb-2 text-white">Phone: {user.user.phone}</p>
//                     <p className=" mb-2 text-white">Role: {user.user.role}</p>
//                     {/* <p className=" mb-2 text-white">Admin Level: {user.user.adminLevel}</p> */}
//                     <p className=" mb-2 text-white">Expiry Status: {user.user.expiryStatus}</p>
//                     <p className=" mb-2 text-white">Preferred Verification Method: {user.user.preferredVerificationMethod}</p>
//                     {/* <p className=" mb-2 text-white">Verification Status: {user.user.verificationStatus}</p> */}
//                     <p className=" mb-2 text-white">Is Verified: {user.user.isVerified ? 'Yes' : 'No'}</p>
//                     <p className=" mb-2 text-white">Expirable: {user.user.expirable ? 'Yes' : 'No'}</p>
//                     <p className=" mb-2 text-white">Expiry Date: {new Date(user.user.expiryDate).toLocaleDateString()} At {new Date(user.user.expiryDate).toLocaleTimeString()}</p>
//                     <p className=" mb-2 text-white">Total Number Of Submissions: {user.totalDocuments || 0}</p>
//                     <p className=" mb-2 text-white">Total Number Of Pending Submissions: {user.pendingCount || 0}</p>
//                     <p className=" mb-2 text-white">Total Number Of Approved Submissions: {user.approvedCount || 0}</p>
//                     <p className=" mb-2 text-white">Total Number Of Partially Approved Submissions: {user.partiallyApprovedCount || 0}</p>
//                     <p className=" mb-2 text-white">Total Number Of Rejected Submissions: {user.rejectedCount || 0}</p>
//                     <p className=" mb-2 text-white">Created On: {new Date(user.user.createdAt).toLocaleDateString()} At {new Date(user.user.createdAt).toLocaleTimeString()}</p>
//                     <p className=" text-white">Updated On: {new Date(user.user.updatedAt).toLocaleDateString()} At {new Date(user.user.updatedAt).toLocaleTimeString()}</p>
//                   </div>
//                 ))
//               }
//             </div>
//           </section>
//         )
//       }
//     </section>
//   )
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
// /(admin)/dashboard/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { UsersResponse } from '../../../../types/user'
import { MetricsResponse } from '../../../../types/metrics'
import { useGetAllUserStats } from '../../../hooks/useGetAllUserStats'
import { getMetrics } from '../../../hooks/useGetAllMetrics'
import { UsersDataTable } from '../../../../components/users/users-data-table'
import { TableSkeleton } from '../../../../components/skeleton'
import { UsersFilters } from '../../../../components/users/users-filters'
import { Pagination } from '../../../../components/pagination'
import { Button } from '@/components/ui/button'
import { useParams , useRouter} from 'next/navigation'

export default function LogsPage() {
  // const [data, setData] = useState<DocumentsResponse | null>(null)
  const {userStatsLoading , userStatsStatus , userStatsMessage , userStats, getAllUserStats} = useGetAllUserStats()
  const {lang} = useParams()
  const router = useRouter()
  const [data, setData] = useState<UsersResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>()

  const [filters, setFilters] = useState({
    // page: number
    limit: "25",
    name: "",
    email: "",
    expiryStatus: "",
    expiryBefore: "",
    expiryAfter : "",
    createdBefore : "",
    createdAfter : "",
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
    
    getAllUserStats({
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
          <div className="stat-title text-black font-black text-lg text-center">Regular Users</div>
          <div className="stat-value text-xl text-center">{metricsData?.usersRoles?.regularUsers}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Regualr Admins</div>
          <div className="stat-value text-xl text-center">{metricsData?.usersRoles?.admins}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Super Admins</div>
          <div className="stat-value text-xl text-center">{metricsData?.usersRoles?.superAdmins}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Total Users</div>
          <div className="stat-value text-xl text-center">{metricsData?.totalUsers}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
          </div>
        ):null}


      <div className="space-y-6">
        <UsersFilters
          {...filters}
          onChange={(key, value) => {
            setFilters(prev => ({ ...prev, [key]: value }))
            setLoading(true)
          } }
          onReset={() => {
            setFilters({ 
              limit: "25",
              name: "",
              email: "",
              expiryStatus: "",
              expiryBefore: "",
              expiryAfter : "",
              createdBefore : "",
              createdAfter : "",
            })
            setLoading(true)
          } } />

        {loading ? (
          <TableSkeleton L={7} />
        ) : data ? (
          <section dir={"ltr"}>
            <div className='flex xxxs:flex-col xxxs:items-center xxxs:justify-between md:flex-row md:items-center md:justify-evenly'>
              <Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-8 md:my-0' onClick={()=>router.push(`/${lang}/userAccountMangement`)}>Generate User Account Invitation Code</Button>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Filtered Users :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{data.pagination.totalUsers}</strong></span>
              <Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-8 md:my-0' onClick={()=>router.push(`/${lang}/userAccountMangement`)}>Extend User Account Expiry Date</Button>

              {/* <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Exsisting Users :</p> <strong className='text-xl'>{metricsData?.totalUsers}</strong> </span> */}
            </div>
           {/* <>{JSON.stringify(data , null , 2)}</> */}
           <UsersDataTable data={data.users} page={data.pagination.currentPage} limit={filters.limit} />
            <Pagination
              page={data.pagination.currentPage}
              pages={data.pagination.totalPages}
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
