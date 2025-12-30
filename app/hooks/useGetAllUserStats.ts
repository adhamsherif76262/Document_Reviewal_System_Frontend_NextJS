/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import api from '../../lib/api'

// import { UsersResponse } from '../../types/user'

interface GetAllUsersParams {
  page: number
  limit?: string
  name?: string
  email?: string
  expiryStatus?: string
  expiryBefore?: string | null
  expiryAfter?: string | null
  createdBefore?: string
  createdAfter?: string
}

export function useGetAllUserStats() {

    const [userStatsLoading , setUserStatsLoading] = useState<boolean>(false)
    const [userStatsStatus , setUserStatsStatus] = useState<string>("")
    const [userStatsMessage , setUserStatsMessage] = useState<string>("")
    const [userStats , setUserStats] = useState<any>(null)
    const getAllUserStats = async(params: GetAllUsersParams) =>{
        setUserStatsLoading(true)
        setUserStatsStatus("")
        setUserStatsMessage("")
        try {
            const res = await api.get("api/users/stats" , {params})
            setUserStatsStatus(res.status === 200 ? "success" : "failure")
            setUserStatsMessage(res.data.message)
            setUserStats(res.data)
            return res.data
            
        } catch (error:any) {
            setUserStatsMessage(error?.response?.data?.message || 'Failed to get all user stats')
        }finally{setUserStatsLoading(false)}
    }

    return {userStatsLoading , userStatsStatus , userStatsMessage, userStats , getAllUserStats}
}
