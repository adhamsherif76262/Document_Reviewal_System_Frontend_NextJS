"use client"
import { useState } from 'react'
import { useResetPassword } from '../../hooks/useResetPassword'
import { Button } from '../../../components/ui/button'

export default function PasswordResetpage() {

    const [email , setEmail] = useState<string>("")
    const [otp , setOtp] = useState<string>("")
    const [password , setPassword] = useState<string>("")
    const [confirmPassword , setConfirmPassword] = useState<string>("")
    // const {forgotPasswordLoading , forgotPasswordStatus , forgotPasswordMessage , forgotPassword} = useForgotPassword()
    const {resetPasswordLoading , resetPasswordStatus , resetPasswordMessage , resetPassword} = useResetPassword()
    if(resetPasswordLoading) return <div className='text-blue-600 text-center'>Resetting Your Password</div>;
    const handlePasswordReset = async () => {
        if(password !== confirmPassword) return alert("Passwords do not match")
        await resetPassword(email , otp , password)
    }
  return (
    <section>
        <h1 className='text-4xl text-center'>Reset Your Password</h1>
        <div className='flex flex-col justify-center items-center mx-[25%]'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 my-4'>Email</label>
            <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />
            <label htmlFor='otp' className='block text-sm font-medium text-gray-700 my-4'>OTP</label>
            <input
                type='text'
                id='otp'
                name='otp'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 my-4'>New Password</label>
            <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />
            <label htmlFor='confirmpassword' className='block text-sm font-medium text-gray-700 my-4'>Confirm Your New Password</label>
            <input
                type='password'
                id='confirmpassword'
                name='confirmpassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />
            <Button className='my-10' onClick={handlePasswordReset}>Reset Password</Button>
        </div>
        {
            resetPasswordMessage && <h1 className={`${resetPasswordStatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{resetPasswordMessage}</h1>
        }
    </section>
  )
}
