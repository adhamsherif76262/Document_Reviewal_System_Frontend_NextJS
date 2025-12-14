/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import api from '../../lib/api'

export function useForgotPassword() {

    const [forgotPasswordLoading , setForgotPasswordLoading] = useState<boolean>(false)
    const [forgotPasswordStatus , setForgotPasswordStatus] = useState<string>("")
    const [forgotPasswordMessage , setForgotPasswordMessage] = useState<string>("")

    const forgotPassword = async( email : string) =>{
        setForgotPasswordLoading(true)
        setForgotPasswordStatus("")
        setForgotPasswordMessage("")
        try {
            const res = await api.post("api/users/forgot-password" , {email})
            setForgotPasswordStatus(res.status === 200 ? "success" : "failure")
            setForgotPasswordMessage(res.data.message)
            return res.data
        } catch (error :any) {

            setForgotPasswordMessage(error?.response?.data?.message || 'Forgot Password failed')
        }finally{
            setForgotPasswordLoading(false)
        }
    }


    return {forgotPasswordLoading , forgotPasswordStatus , forgotPasswordMessage , forgotPassword}
}
