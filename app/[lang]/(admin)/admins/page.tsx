// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import {useEffect} from 'react'
// import { useGetAllAdminStats } from '../../../hooks/useGetAllAdminStats'

// export default function Adminspage() {
//     const {adminstatsloading , adminstatsmessage , adminstats , adminstatsstatus, getAllAdminStats} = useGetAllAdminStats()

//     useEffect(()=>{
//         const GetAllAdmins = async () => {
//             await getAllAdminStats()
//         }
//         GetAllAdmins()
//     },[])
//   return (
//     <section>
//       {adminstatsloading && <h2 className='text-blue-600 text-center'>Loading All Admin&lsquo;s Statistics</h2>}
//       {adminstatsmessage && <h1 className={`${adminstatsstatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{adminstatsmessage}</h1>}
//       {
//         adminstats && (
//           <section>
//             <h2 className='text-center'>Total Admins: {adminstats.pagination.total}</h2>
//             <h2 className='text-center'>Total Pages: {adminstats.pagination.pages}</h2>
//             <h2 className='text-center'>Current Page: {adminstats.pagination.page}</h2>
//             <h2 className='text-center'>Limit: {adminstats.pagination.limit}</h2>
//             <h1 className="text-2xl font-bold mb-4 text-center mt-10">Admins & Super Admins</h1>
//             <div className="p-6 mx-auto max-w-8xl grid grid-cols-2">
//               {
//                 adminstats.admins.map((admin : any)=>(
//                   <div key={admin.adminId} className="bg-gray-800 rounded-lg shadow-md p-6 mb-4 mx-4"> 
//                     <h2 className="text-xl font-semibold mb-2 text-white">{admin.name}</h2>
//                     <p className="text-white mb-2">Email: {admin.email}</p>
//                     <p className="text-white mb-2">Role: {admin.role}</p>
//                     <p className="text-white mb-2">Phone: {admin.phone}</p>
//                     <p className="text-white mb-2">Administration Level: {admin.adminLevel}</p>
//                     <p className="text-white mb-2">Expirable: {admin.expirable ? "Yes" : "No"}</p>
//                     <p className="text-white mb-2">Total Number Of Reviewed Submissions: {admin.totalReviewed || 0}</p>
//                     <p className="text-white mb-2">Total Number Of Pending Submissions: {admin.pendingCount  || 0}</p>
//                     <p className="text-white mb-2">Total Number Of Approved Submissions: {admin.approvedCount || 0}</p>
//                     <p className="text-white mb-2">Total Number Of Partially Approved Submissions: {admin.partiallyApprovedCount || 0}</p>
//                     <p className="text-white mb-2">Total Number Of Rejected Submissions: {admin.rejectedCount || 0}</p>
//                     <p className=" mb-2 text-white">Created On: {new Date(admin.createdAt).toLocaleDateString()} At {new Date(admin.createdAt).toLocaleTimeString()}</p>
//                     <p className=" text-white">Updated On: {new Date(admin.updatedAt).toLocaleDateString()} At {new Date(admin.updatedAt).toLocaleTimeString()}</p>
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



'use client'

import { useEffect, useState } from 'react'
import { UsersResponse } from '../../../../types/user'
import { MetricsResponse } from '../../../../types/metrics'
import { useGetAllAdminStats } from '../../../hooks/useGetAllAdminStats'
import { getMetrics } from '../../../hooks/useGetAllMetrics'
import { AdminsDataTable } from '../../../../components/admins/admins-data-table'
import { TableSkeleton } from '../../../../components/skeleton'
import { AdminsFilters } from '../../../../components/admins/admins-filters'
import { Pagination } from '../../../../components/pagination'
import { Button } from '@/components/ui/button'
import { useParams , useRouter} from 'next/navigation'

export default function LogsPage() {
  // const [data, setData] = useState<DocumentsResponse | null>(null)
  const {adminstatsloading , adminstatsmessage , adminstats , adminstatsstatus, getAllAdminStats} = useGetAllAdminStats()
  const {lang} = useParams()
  const router = useRouter()
  const [data, setData] = useState<UsersResponse | null>(null)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>()

  const [filters, setFilters] = useState({
    limit: "25",
    admin: "",
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
    
    getAllAdminStats({
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
          <div className="stat-title text-black font-black text-lg text-center">Regualr Admins</div>
          <div className="stat-value text-xl text-center">{metricsData?.usersRoles?.admins}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Super Admins</div>
          <div className="stat-value text-xl text-center">{metricsData?.usersRoles?.superAdmins}</div>
        </div>
          </div>
        ):null}


      <div className="space-y-6">
        <AdminsFilters
          {...filters}
          onChange={(key, value) => {
            setFilters(prev => ({ ...prev, [key]: value }))
            setLoading(true)
            setPage(1)
          } }
          onReset={() => {
            setFilters({ 
              limit: "25",
              admin: "",
              createdBefore : "",
              createdAfter : "",
            })
            setPage(1)
            setLoading(true)
          } } />

        {loading ? (
          <TableSkeleton L={7} />
        ) : data ? (
          <section dir={"ltr"}>
            {/* <div className='flex xxxs:flex-col xxxs:items-center xxxs:justify-between md:flex-row md:items-center md:justify-evenly'>
              <Button className='hover:text-black font-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-8 md:my-0' onClick={()=>router.push(`/${lang}/userAccountMangement?activeForm=register`)}>Generate User Account Invitation Code</Button>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Filtered Users :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{data.pagination.totalUsers}</strong></span>
              <Button className='hover:text-black font-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-8 md:my-0' onClick={()=>router.push(`/${lang}/userAccountMangement?activeForm=login`)}>Extend User Account Expiry Date</Button>
            </div> */}
           <AdminsDataTable data={data.admins} page={data.pagination.page} limit={filters.limit} />
            <Pagination
              page={data.pagination.page}
              pages={data.pagination.pages}
              // pages={0}
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
