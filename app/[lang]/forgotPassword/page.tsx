"use client"
import { useState } from 'react'
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
export default function ForgotPasswordpage() {
  const router = useRouter();
  const [email , setEmail] = useState<string>("")
  const {forgotPasswordLoading , forgotPasswordStatus , forgotPasswordMessage , forgotPassword} = useForgotPassword()

  if(forgotPasswordLoading) return <div className="text-blue-600 text-center">Sending OTP</div>;
  return (
    <section>
        
        <h1 className='text-4xl text-center'>Forgot Password</h1>
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
            <Button
                onClick={() => forgotPassword(email)}
                className='w-full px-3 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                Send OTP
            </Button>
            <Button
                onClick={() => router.push(`/${localStorage.getItem("lang") || "en"}/passwordReset`)}
                className='w-full px-3 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                Reset Your Password
            </Button>
        </div>
        {
            forgotPasswordMessage && <h1 className={`${forgotPasswordStatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{forgotPasswordMessage}</h1>
        }
    </section>
  )
}
