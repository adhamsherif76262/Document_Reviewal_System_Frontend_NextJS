/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import api from '../../lib/api'

export function useGetAllUserStats() {

    const [userStatsLoading , setUserStatsLoading] = useState<boolean>(false)
    const [userStatsStatus , setUserStatsStatus] = useState<string>("")
    const [userStatsMessage , setUserStatsMessage] = useState<string>("")
    const [userStats , setUserStats] = useState<any>(null)
    const getAllUserStats = async() =>{
        setUserStatsLoading(true)
        setUserStatsStatus("")
        setUserStatsMessage("")
        try {
            const res = await api.get("api/users/stats")
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
