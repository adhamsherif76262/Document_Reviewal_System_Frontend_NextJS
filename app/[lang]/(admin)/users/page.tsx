/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect } from 'react'
import { useGetAllUserStats } from '../../../hooks/useGetAllUserStats'

export default function Userspage() {
    const {userStatsLoading , userStatsStatus , userStatsMessage , userStats, getAllUserStats} = useGetAllUserStats()
    useEffect(() => {
        const GetAllUsers = async () => {
            await getAllUserStats()
        }
        GetAllUsers()
    } , [])
  return (
    <section>
      {userStatsLoading && <h2 className='text-blue-600 text-center'>Loading All User&lsquo;s Statistics</h2>}
      {userStatsMessage && <h1 className={`${userStatsStatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{userStatsMessage}</h1>}
      {
        userStats && (

          <section className='max-w-8xl'>
            <h2 className='text-center'>Total Users: {userStats.pagination.totalUsers}</h2>
            <h2 className='text-center'>Total Pages: {userStats.pagination.totalPages}</h2>
            <h2 className='text-center'>Current Page: {userStats.pagination.currentPage}</h2>
            <h1 className="text-2xl font-bold mb-4 text-center mt-10">Users</h1>
            <div className="p-6 mx-auto max-w-8xl flex flex-row justify-between items-center">
              {
                userStats.users.map((user: any) => (
                  <div key={user.user._id} className="bg-black text-white shadow-md rounded-lg p-4 my-4 mx-12">
                    <h2 className="text-white text-xl font-semibold mb-2">User Name:{user.user.name}</h2>
                    <p className=" mb-2 text-white">Email: {user.user.email}</p>
                    <p className=" mb-2 text-white">Phone: {user.user.phone}</p>
                    <p className=" mb-2 text-white">Role: {user.user.role}</p>
                    {/* <p className=" mb-2 text-white">Admin Level: {user.user.adminLevel}</p> */}
                    <p className=" mb-2 text-white">Expiry Status: {user.user.expiryStatus}</p>
                    <p className=" mb-2 text-white">Preferred Verification Method: {user.user.preferredVerificationMethod}</p>
                    {/* <p className=" mb-2 text-white">Verification Status: {user.user.verificationStatus}</p> */}
                    <p className=" mb-2 text-white">Is Verified: {user.user.isVerified ? 'Yes' : 'No'}</p>
                    <p className=" mb-2 text-white">Expirable: {user.user.expirable ? 'Yes' : 'No'}</p>
                    <p className=" mb-2 text-white">Expiry Date: {new Date(user.user.expiryDate).toLocaleDateString()} At {new Date(user.user.expiryDate).toLocaleTimeString()}</p>
                    <p className=" mb-2 text-white">Total Number Of Submissions: {user.totalDocuments || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Pending Submissions: {user.pendingCount || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Approved Submissions: {user.approvedCount || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Partially Approved Submissions: {user.partiallyApprovedCount || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Rejected Submissions: {user.rejectedCount || 0}</p>
                    <p className=" mb-2 text-white">Created On: {new Date(user.user.createdAt).toLocaleDateString()} At {new Date(user.user.createdAt).toLocaleTimeString()}</p>
                    <p className=" text-white">Updated On: {new Date(user.user.updatedAt).toLocaleDateString()} At {new Date(user.user.updatedAt).toLocaleTimeString()}</p>
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
