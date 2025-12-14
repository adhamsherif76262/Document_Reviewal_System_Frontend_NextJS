"use client"
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useExtendUserExpiryDate } from '../../hooks/useExtendUserExpiryDate'
export default function ExtendExpiryDatepage() {

    const [email, setEmail] = useState<string>("")
    const {handleExtendUserExpiryDate , loading , message , status} = useExtendUserExpiryDate()

    if(loading) return <div className='text-blue-600 text-center'>Extending The Specified User&lsquo;s Account Expiry Date</div>;

  return (

    <section className='flex flex-col items-center justify-center mx-[25%]'>
        <label className='mt-10' htmlFor="email"> Enter Expired User&lsquo;s Account Email ::</label>

        <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
        />
        <Button className='mt-10' onClick={async() => await handleExtendUserExpiryDate(email)}>Extend User Account Expiry Date</Button>
        {
            message && <h1 className={`${status === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{message}</h1>
        }
    </section>
  )
}
