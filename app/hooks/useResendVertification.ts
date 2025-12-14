/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import api from '../../lib/api';

export function useResendVertification() {
    const [resendLoading , setResendLoading] = useState<boolean>(false)
    const [resendstatus , setResendStatus] = useState<string>("")
    const [resendmessage , setResendMessage] = useState<string>("")

    const resendVertification = async (email: string) => {
        setResendLoading(true);
        setResendStatus("");
        setResendMessage("")
        try {
            const res = await api.post('/api/users/resend-verification', { email });
            setResendStatus(res.status === 200 ? "success" : "failure")
            setResendMessage(res.data.message)
            return res.data;
        } catch (err: any) {
            setResendMessage(err?.response?.data?.message || 'Resend Verification failed')
        }finally{
            setResendLoading(false)
        }
    }


  return{resendLoading , resendstatus , resendVertification , resendmessage}
};

