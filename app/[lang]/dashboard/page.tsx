/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { useAuth } from '../../context/AuthContext'; // adjust path if needed
import { useGetAllUserStats } from '../../hooks/useGetAllUserStats';
import { useGetAllAdminStats } from '../../hooks/useGetAllAdminStats';
// import { useState } from 'react';

export default function DashboardPage() {
  // const { user, loading , logout , error} = useAuth();
  const { user, loading , logout} = useAuth();
  const router = useRouter();
  const email = user?.email || '';
  // const [error , setError] = useState<string>("")
  const {userStatsLoading , userStatsStatus , userStatsMessage , userStats, getAllUserStats} = useGetAllUserStats()
  const {adminstatsloading , adminstatsmessage , adminstats , adminstatsstatus, getAllAdminStats} = useGetAllAdminStats()

  if (loading) return <h2 className='text-blue-600 text-center'>Loading user info...</h2>;

  if (!user) return <h2 className='text-red-600 text-center'>No User Logged In !!</h2>;

  const handleLogout = async () => {
    await logout(email);
    router.push(`/${localStorage.getItem("lang") || "en"}/login`);
    // throw new Error('Function not implemented.');
  }


  return (
    <>
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow rounded p-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Expiry Status:</strong> {user.expiryStatus}
        </p>
        {user.phone && (<p><strong>Phone:</strong> {user.phone}</p>)}
        {user.lastOTPResend && (
          <p>
            <strong>Last OTP Resend:</strong> {new Date(user.lastOTPResend).toLocaleDateString()} At {new Date(user.lastOTPResend).toLocaleTimeString()}
          </p>
        )}
        {user.expiryDate && (
          <p>
            <strong>Expiry Date:</strong> {new Date(user.expiryDate).toLocaleDateString()} At {new Date(user.expiryDate).toLocaleTimeString()}
          </p>
        )}
        {user.adminLevel && (
          <p>
            <strong>Administration Level:</strong> {user.adminLevel}
          </p>
        )}
        {user.preferredVerificationMethod && (
          <p>
            <strong>Preferred Verification:</strong> {user.preferredVerificationMethod}
          </p>
        )}
        <p>
          <strong>Verified:</strong> {user.isVerified ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Expirable:</strong> {user.expirable ? 'Yes' : 'No'}
        </p>
        {user.createdAt && (<p><strong>Created On:</strong> {new Date(user.createdAt).toLocaleDateString()} At {new Date(user.createdAt).toLocaleTimeString()} </p>)}
        {user.updatedAt && (<p><strong>Updated On:</strong> {new Date(user.updatedAt).toLocaleDateString()} At {new Date(user.updatedAt).toLocaleTimeString()}</p>)}
      </div>
    </div>
    <div className='flex flex-col justify-center items-center max-w-8xl'>
      <Button className='mb-10' onClick={handleLogout}>Logout</Button>
      {
        user.role === "admin" && <Button className='mb-10' onClick={()=>{router.push(`/${localStorage.getItem("lang") || "en"}/generateInviteCode`);}}>Generate Invite Code</Button>
      }
      {
        user.role === "admin" && <Button className='mb-10' onClick={()=>{router.push(`/${localStorage.getItem("lang") || "en"}/extendExpiryDate`);}}>Extend User Account Expiry Date</Button>
      }
      {
        user.role === "admin" && <Button className='mb-10' onClick={async()=>{await getAllUserStats();}}>Get All User&apos;s Statistics</Button>
      }
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
                    <p className=" mb-2 text-white">Total Number Of Submissions: {user.user.totalDocuments || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Pending Submissions: {user.user.pendingCount || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Approved Submissions: {user.user.approvedCount || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Partially Approved Submissions: {user.user.partiallyApprovedCount || 0}</p>
                    <p className=" mb-2 text-white">Total Number Of Rejected Submissions: {user.user.rejectedCount || 0}</p>
                    <p className=" mb-2 text-white">Created On: {new Date(user.user.createdAt).toLocaleDateString()} At {new Date(user.user.createdAt).toLocaleTimeString()}</p>
                    <p className=" text-white">Updated On: {new Date(user.user.updatedAt).toLocaleDateString()} At {new Date(user.user.updatedAt).toLocaleTimeString()}</p>
                  </div>
                ))
              }
            </div>
          </section>
        )
      }
      {
        user.adminLevel === "super" && <Button className='mb-10' onClick={async()=>{await getAllAdminStats();}}>Get All Admin&apos;s Statistics</Button>
      }
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
    </div>
    </>
  );
}
