"use client"
import React from 'react'
import { useInviteCode } from '../../hooks/useInviteCode'
import { Button } from '../../../components/ui/button'
import { useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
export default function GenerateInviteCodePage() {
    const [generatedFor, setgeneratedFor] = useState<string>("")
    // const {user , loading} = useAuth()
    const {generateInvite , loading , error , code} = useInviteCode()
    const handlegenerateInvite = async () => {
        // alert(generatedFor)
        await generateInvite(generatedFor)
        // alert(code)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setgeneratedFor(event.target.value)
    }
      if (loading) return <div className='text-blue-600 text-center'>Loading user info...</div>;
    //   if (error) return <div className='text-red-600 text-center'>{error}</div>;
    //   if (code) return <div>{code}</div>;
  return (
    <div>
        <form action="register" method='post'>
            <label htmlFor="">
                Generate Invite Code For User Name ::
                <input onChange={handleChange} title='UserName' type="text"  className='border-5 mx-auto'/>
                <Button type='button' onClick={handlegenerateInvite}>Generate</Button>
            </label>
        </form>
        {
            code && <h2 className='text-green-600 text-center'>{code}</h2>
        }
        {
            error && <h2 className='text-red-600 text-center'>{error}</h2>
        }
    </div>
  )
}
