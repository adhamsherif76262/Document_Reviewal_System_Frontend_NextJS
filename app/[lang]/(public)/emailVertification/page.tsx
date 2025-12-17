"use client"
import { useState } from 'react'
import { useResendVertification } from '../../../hooks/useResendVertification'
import { useVerifyEmail } from '../../../hooks/useVerifyEmail'
import { Button } from '../../../../src/components/ui/button'

export default function EmailVertificationPage() {

  const {resendLoading , resendstatus , resendVertification , resendmessage} = useResendVertification()
  const {verifymessage,verifystatus,verifyloading , verifyEmail} = useVerifyEmail()
    const [email , setEmail] = useState<string>("")
    const [otp , setOtp] = useState<string>("")

    if (resendLoading) return <div className='text-blue-600 text-center'>Resending your vertification OTP</div>;
    if (verifyloading) return <div className='text-blue-600 text-center'>Verifying Your Email</div>;

    const handleVertification = async () => {
        await verifyEmail(email , otp)
    }
    const handleResendVertification = async () => {
        await resendVertification(email)
    }
  return (
    <section>
        <h1 className='my-14 font-black text-4xl text-center'>Email Vertification</h1>
        <form action="login" method='post'>

            <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Email :: <input onChange={(e)=>{setEmail(e.target.value)}} className='border-2' title='User Email' type="email" name="" /></label>
            <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Vertification OTP :: <input onChange={(e)=>{setOtp(e.target.value)}} className='border-2' title='User Vertification OTP' type="text" name="" /></label>
        </form>

      <div className='flex flex-row justify-between items-start'>
        <Button onClick={handleResendVertification} type='button'> Resend Email Vertification</Button>
        {
            resendmessage && <h1 className={`${resendstatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{resendmessage}</h1>
        }
        <Button onClick={handleVertification} type='button'> Verify Email</Button>
        {
            verifymessage && <h1 className={`${verifystatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{verifymessage}</h1>
        }
      </div>
    </section>
  )
}
