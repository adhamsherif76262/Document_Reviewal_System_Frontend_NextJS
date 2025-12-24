/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../../lib/api";

export function useResetPassword() {
  const [resetPasswordLoading , setResetPasswordLoading] = useState<boolean>(false)
  const [resetPasswordStatus , setResetPasswordStatus] = useState<string>("")
  const [resetPasswordMessage , setResetPasswordMessage] = useState<string>("")

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    setResetPasswordLoading(true)
    setResetPasswordStatus("")
    setResetPasswordMessage("")
    try {
      const res = await api.post("api/users/reset-password", { email, otp, newPassword });
      setResetPasswordStatus(res.status === 200 ? "success" : "failure")
      setResetPasswordMessage(res.data.message)
      return{data: res.data ,success : true}
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Reset Password failed'
      return{success : false , error : msg}
    }finally{
      setResetPasswordLoading(false)
    }
  };

  return {resetPasswordLoading , resetPasswordStatus , resetPasswordMessage , resetPassword}
}
