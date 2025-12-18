/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react'
import api from '../../lib/api'
export function useVerifyEmail() {

    const [verifyloading , setVerifyLoading] = useState<boolean>(false)
    const [verifystatus , setVerifyStatus] = useState<string>("")
    const [verifymessage , setVerifyMessage] = useState<string>("")

    const verifyEmail = async (email :string , otp:string)=>{

        setVerifyLoading(true)
        setVerifyStatus("")
        setVerifyMessage("")

        try{
            const res = await api.post("api/users/verify-email" , {email , otp})
            setVerifyStatus(res.status === 200 ? "success" : "failure")
            setVerifyMessage(res.data.message)
            return{data: res.data ,success : true}
        }catch(err : any){
            // setVerifyMessage(err?.response?.data?.message || 'Email Verification failed')
            const msg = err?.response?.data?.message || 'Email Verification failed'
            return{success : false , error : msg}
        }finally{
            setVerifyLoading(false)
        }
    }
    return{verifymessage,verifystatus,verifyloading , verifyEmail}
}
