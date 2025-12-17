/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {useEffect} from 'react'
import { useGetAllAdminStats } from '../../../hooks/useGetAllAdminStats'

export default function Adminspage() {
    const {adminstatsloading , adminstatsmessage , adminstats , adminstatsstatus, getAllAdminStats} = useGetAllAdminStats()

    useEffect(()=>{
        const GetAllAdmins = async () => {
            await getAllAdminStats()
        }
        GetAllAdmins()
    },[])
  return (
    <section>
      {adminstatsloading && <h2 className='text-blue-600 text-center'>Loading All Admin&lsquo;s Statistics</h2>}
      {adminstatsmessage && <h1 className={`${adminstatsstatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{adminstatsmessage}</h1>}
      {
        adminstats && (
          <section>
            <h2 className='text-center'>Total Admins: {adminstats.pagination.total}</h2>
            <h2 className='text-center'>Total Pages: {adminstats.pagination.pages}</h2>
            <h2 className='text-center'>Current Page: {adminstats.pagination.page}</h2>
            <h2 className='text-center'>Limit: {adminstats.pagination.limit}</h2>
            <h1 className="text-2xl font-bold mb-4 text-center mt-10">Admins & Super Admins</h1>
            <div className="p-6 mx-auto max-w-8xl grid grid-cols-2">
              {
                adminstats.admins.map((admin : any)=>(
                  <div key={admin.adminId} className="bg-gray-800 rounded-lg shadow-md p-6 mb-4 mx-4"> 
                    <h2 className="text-xl font-semibold mb-2 text-white">{admin.name}</h2>
                    <p className="text-white mb-2">Email: {admin.email}</p>
                    <p className="text-white mb-2">Role: {admin.role}</p>
                    <p className="text-white mb-2">Phone: {admin.phone}</p>
                    <p className="text-white mb-2">Administration Level: {admin.adminLevel}</p>
                    <p className="text-white mb-2">Expirable: {admin.expirable ? "Yes" : "No"}</p>
                    <p className="text-white mb-2">Total Number Of Reviewed Submissions: {admin.totalReviewed || 0}</p>
                    <p className="text-white mb-2">Total Number Of Pending Submissions: {admin.pendingCount  || 0}</p>
                    <p className="text-white mb-2">Total Number Of Approved Submissions: {admin.approvedCount || 0}</p>
                    <p className="text-white mb-2">Total Number Of Partially Approved Submissions: {admin.partiallyApprovedCount || 0}</p>
                    <p className="text-white mb-2">Total Number Of Rejected Submissions: {admin.rejectedCount || 0}</p>
                    <p className=" mb-2 text-white">Created On: {new Date(admin.createdAt).toLocaleDateString()} At {new Date(admin.createdAt).toLocaleTimeString()}</p>
                    <p className=" text-white">Updated On: {new Date(admin.updatedAt).toLocaleDateString()} At {new Date(admin.updatedAt).toLocaleTimeString()}</p>
                  </div>
                ))
              }
            </div>
          </section>
        )
      }
    </section>
  )
}
