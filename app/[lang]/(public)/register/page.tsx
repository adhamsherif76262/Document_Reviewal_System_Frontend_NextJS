"use client"
import  { useState } from 'react'
import { Button } from '../../../../src/components/ui/button'
import { useRegisterUser } from '../../../hooks/useRegisterUser'

export default function Registerationpage() {
    const { registerUser , registerLoading , regeisterMessage , registerStatus } = useRegisterUser()
    const [name , setName] = useState<string>("")
    const [email , setEmail] = useState<string>("")
    const [password , setPassword] = useState<string>("")
    const [phone , setPhone] = useState<string>("")
    const [invitationCode , setInvitationCode] = useState<string>("")
    const [preferredVerificationMethod , setPreferredVerificationMethod] = useState<string>("email")
    
    if (registerLoading) return <div className='text-blue-600 text-center'>Loading user info...</div>;

    const handleSubmit = async () => {
        // alert(generatedFor)
        await registerUser({name , email , password , phone , preferredVerificationMethod , invitationCode})
        // alert(code)
    }

  return (
    <section>
        <h1 className='text-center text-3xl font-black mt-10'>
            Registeration page
        </h1>
        <form action="emailVertification" method='post' className=''>
           <label className='flex flex-row justify-between align-center mb-5 mx-5 mt-10'>Enter Your Name<input onChange={(e) => {setName(e.target.value)}} className='border-2' title='User Name' type="text" name="" /></label>
           <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Email<input onChange={(e) => {setEmail(e.target.value)}} className='border-2' title='User Email' type="email" name="" /></label>
           <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Password<input onChange={(e) => {setPassword(e.target.value)}} className='border-2' title='User Password' type="password" name="" /></label>
           <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your phone<input onChange={(e) => {setPhone(e.target.value)}} className='border-2' title='User Phone' type="text" name="" /></label>
           <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Invitation Code<input onChange={(e) => {setInvitationCode(e.target.value)}} className='border-2' title='User Invitation Code' type="text" name="" /></label>
           <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Preferred Verification Method<input onChange={(e) => {setPreferredVerificationMethod(e.target.value)}} className='border-2' title='User Preferred Verification Method' type="text" name="" /></label>
        </form>
        <Button type='button' onClick={handleSubmit}>Register</Button>
        {
            regeisterMessage && <h1 className={`${registerStatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{regeisterMessage}</h1>
        }
    </section>
  )
}
