// // app/(dashboard)/logs/[id]/page.tsx
// "use client"
// // import api from '../../../../../lib/api'
// // import { LogsResponse } from '../../../../../types/log'
// import { useEffect , useState } from 'react'
// import { getLogById } from '../../../../hooks/useGetLogById'
// import { LogsTableSkeleton } from '../../../../../components/logs/logs-table-skeleton'

// import { useParams } from 'next/navigation'
// import { getUserById } from '../../../../hooks/useGetUserById'
// export default function LogDetailsPage() {
//   // const { data } = await api.get(`/api/admin/logs/${params.id}/getLogById`)
//     const [logData, setLogData] = useState<JSON | null>()
//     const [actorData, setActorData] = useState<JSON | null>()
//     const [loading, setLoading] = useState<boolean>(false)
//     const {id} = useParams()
//     useEffect(() => {
//       let cancelled = false

//       getLogById({id: id}).then(res => {
//         if (!cancelled) {
//           setLogData(res)
//         }
//         getUserById({id: res.admin || res.user}).then(response => {
//           if (!cancelled) {
//             setActorData(response)
//           }
//         })
//       })


//       return () => {
//         cancelled = true
//       }
//     }, [id])

//   // useEffect(() => {
//   //   let cancelled = false

//   //   getUserById({id: id}).then(res => {
//   //     if (!cancelled) {
//   //       setActorData(res)
//   //     }
//   //   })

//   //   return () => {
//   //     cancelled = true
//   //   }
//   // }, [id])

//   return (
//     <>
//       <pre className="rounded-md border p-6 text-lg">
//         {JSON.stringify(logData, null, 2)}
//       </pre>
//       <pre className="rounded-md border p-6 text-lg">
//           {JSON.stringify(actorData, null, 2)}
//       </pre>
//     </>
//   )
// }

"use client"

import { useEffect, useState } from 'react'
import { useParams , useRouter } from 'next/navigation'

import { getLogById } from '../../../../hooks/useGetLogById'
import { getUserById } from '../../../../hooks/useGetUserById'

import { TableSkeleton } from '../../../../../components/skeleton'

import { Log } from '../../../../../types/log'
import { user } from '../../../../../types/user'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  Shield,
  Clock,
  Mail,
  Phone,
  User,
  Calendar,
  MessageCircleMoreIcon,
  CheckCircle,
  XCircle,
} from 'lucide-react'

import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

export default function LogDetailsPage() {
  const { id , lang} = useParams()
  const router = useRouter()
  const [logData, setLogData] = useState<Log | null>(null)
  const [actorData, setActorData] = useState<user | null>(null)
  const [adminData, setAdminData] = useState<user | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  
  const getUserInitials = (name: string | undefined) => {
    if(name){
          return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    }
  }

  /* helpers */
  const formatDate = (date?: string) =>
    date ? format(new Date(date), 'PPP • p') : '—'
  
  const BooleanBadge = ({ value }: { value: boolean }) => (
    <Badge variant={value ? 'default' : 'destructive'} className='h-8 w-15 text-lg animate-pulses'>
      {value ? 'Yes' : 'No'}
    </Badge>
  )

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function loadLogDetails() {
      try {
        const log = await getLogById({ id })
        if (cancelled) return
        setLogData(log)
        if(log.user && log.admin){
          // alert("User & Admin")
          const actorId =  log.user._id
          const adminId =  log.admin._id
          if (!actorId) return
          const actor = await getUserById({ id: actorId })
          const admin = await getUserById({ id: adminId })
          // console.log( "aCOTR ==>" + actor)
          
          if (cancelled) return
          setActorData(actor)
          setAdminData(admin)
        }else if(log.admin && (!log.user || log.user === null)){
          // alert("Admin Only")
          const actorId =  log.admin._id
          if (!actorId) return
          const actor = await getUserById({ id: actorId })
          console.log(actor)
          if (cancelled) return
          setActorData(actor)
        }else if(log.user && (!log.admin || log.admin === null)){
          // alert("User Only")
          const actorId =  log.user._id
          if (!actorId) return
          const actor = await getUserById({ id: actorId })
          console.log(actor)
          if (cancelled) return
          setActorData(actor)
        }else{alert("Neither")}

        // console.log(actor)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadLogDetails()

    return () => {
      cancelled = true
    }
  }, [id])

  // =========================
  // 🦴 Skeleton
  // =========================
  if (loading) {
    return <TableSkeleton L={2}/>
  }

  // =========================
  // 🧾 Content
  // =========================
  return (
    <div dir='ltr' className="space-y-6">
      <Card>
        <CardHeader className='xxxs:px-0 xxs:px-6'>
          <div className="flex sm:flex-row sm:items-center sm:justify-between xxxs:flex-col xxxs:items-center xxxs:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Log Action
            </CardTitle>

            <Badge variant="outline" className="text-lg xxxs:my-5 sm:my-0 max-w-[300px]">
              {logData?.action}
            </Badge>
            {
              logData?.document && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/dashboard/${logData?.document}`)}>View Full Submission</Button>)
            }
            
          </div>

          <CardDescription className="flex xxxs:flex-col xxxs:items-center xxxs:justify-between sm:flex-row sm:items-center sm:justify-start gap-2">
            <Calendar className='h-5 w-5 text-primary'/>
            {formatDate(logData?.createdAt)}
          </CardDescription>
        </CardHeader>

        <CardContent className="xxxs:text-sm sm:text-md xl:text-lg leading-relaxed text-muted-foreground flex xxxs:flex-col xxxs:items-center xxxs:justify-between sm:flex-row sm:items-center sm:justify-start gap-2">
          <MessageCircleMoreIcon className='h-5 w-5 text-primary'/>
          {logData?.message}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex xs:flex-row xxxs:flex-col xxxs:items-center xs:items-center xs:justify-between xxxs:justify-between'>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className='w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white animate-avatar-pulse-rings animate-bounce'>
                {/* {actorData?.name?.charAt(0).toUpperCase()} */}
                {getUserInitials(actorData?.name)}
              </AvatarFallback>
                {/* Animated ring around avatar */}
                {/* <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-avatar-ring-pulse" />
                <span className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-avatar-ring-pulse-delayed" /> */}
            </Avatar>

            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {actorData?.name}
              </CardTitle>
              <CardDescription>{actorData?.email}</CardDescription>
            </div>
          </div>
            {
              logData?.user && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/users/${logData?.user?._id}`)}>Submission History</Button>)
            }
            {
              (logData?.admin && (!logData?.user)) && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/admins/${logData?.admin?._id}`)}>Reviews History</Button>)
            } 
        </CardHeader>

        <CardContent className="space-y-6 xxxs:text-center xs:text-left xxxs:mx-auto xs:mx-0">
          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {actorData?.email}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {actorData?.phone}
            </div>
          </div>

          <Separator />

          {/* Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Role</p>
              <Badge variant = {"outline"}  className='h-8 w-20 text-lg'>{actorData?.role}</Badge>
            </div>

            <div>
              <p className="text-muted-foreground">Verified</p>
              <BooleanBadge value={actorData?.isVerified || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expirable</p>
              <BooleanBadge value={actorData?.expirable || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expiry Status</p>
              <Badge variant="outline" className='h-10 w-30 text-primary text-lg' >
                  {actorData?.expiryStatus ==="active" ? <CheckCircle className='h-5 w-5 text-primary' /> : <XCircle className='h-5 w-5 text-primary'/>}
                  {actorData?.expiryStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Created At</p>
              <div className="flex items-center gap-2">
                <Clock className='h-5 w-5 text-primary'/>
                {formatDate(actorData?.createdAt)}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground">Updated At</p>
                <div className="flex items-center gap-2">
                  <Clock className='h-5 w-5 text-primary'/>
                  {formatDate(actorData?.updatedAt)}
                </div>
            </div>

            {actorData?.expiryDate && (
              <div >
                <p className="text-muted-foreground">Expiry Date</p>
                <div className="flex items-center gap-2">
                  <Clock className='h-5 w-5 text-primary'/>
                  {formatDate(actorData?.expiryDate)}
                </div>
              </div>
            )}
          </div>
          
          {/* Optional Fields */}
          {/* {(actorData?.adminLevel || actorData?.lastOTPResend) && ( */}
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                {actorData?.adminLevel ? (
                  <div>
                    <p className="text-muted-foreground">Administration Level</p>
                    <Badge variant="secondary" className='h-10 w-30 text-primary text-xl font-black'>
                      {actorData?.adminLevel}
                    </Badge>
                  </div>
                ):(
                  <div>
                    <p className="text-muted-foreground">Level</p>
                    <Badge variant="secondary" className='h-10 w-40 text-primary text-xl font-black'>
                      Regular User
                      {/* {actorData?.adminLevel} */}
                    </Badge>
                  </div>
                )
              }

                {actorData?.lastOTPResend && (
                  <div>
                    <p className="text-muted-foreground">Last OTP Resend</p>
                    <div className="flex items-center gap-2">
                      <Clock className='h-5 w-5 text-primary'/>
                      {formatDate(actorData?.lastOTPResend)}
                    </div>
                  </div>
                )}
              </div>
            </>
          {/* )} */}
        </CardContent>
      </Card>

      {
        adminData && (
        <Card>
          <CardHeader className='flex xs:flex-row xxxs:flex-col xxxs:items-center xs:items-center xs:justify-between xxxs:justify-between'>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className='w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white animate-avatar-pulse-rings animate-bounce'>
                  {/* {adminData?.name?.charAt(0).toUpperCase()} */}
                  {getUserInitials(adminData?.name)}
                </AvatarFallback>
                  {/* Animated ring around avatar */}
                  {/* <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-avatar-ring-pulse" />
                  <span className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-avatar-ring-pulse-delayed" /> */}
              </Avatar>

              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {adminData?.name}
                </CardTitle>
                <CardDescription>{adminData?.email}</CardDescription>
              </div>
            </div>
            {
              logData?.admin && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/admins/${logData?.admin?._id}`)}>Reviews History</Button>)
            } 
          </CardHeader>

          <CardContent className="space-y-6 xxxs:text-center xs:text-left xxxs:mx-auto xs:mx-0">
            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {adminData?.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {adminData?.phone}
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
              <div>
                <p className="text-muted-foreground">Role</p>
                <Badge variant = {"outline"}  className='h-8 w-20 text-lg'>{adminData?.role}</Badge>
              </div>

              <div>
                <p className="text-muted-foreground">Verified</p>
                <BooleanBadge value={adminData?.isVerified || false} />
              </div>

              <div>
                <p className="text-muted-foreground">Expirable</p>
                <BooleanBadge value={adminData?.expirable || false} />
              </div>

              <div>
                <p className="text-muted-foreground">Expiry Status</p>
                <Badge variant="outline" className='h-10 w-30 text-primary text-lg' >
                    {adminData?.expiryStatus ==="active" ? <CheckCircle className='h-5 w-5 text-primary' /> : <XCircle className='h-5 w-5 text-primary'/>}
                    {adminData?.expiryStatus}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
              <div>
                <p className="text-muted-foreground">Created At</p>
                <div className="flex items-center gap-2">
                  <Clock className='h-5 w-5 text-primary'/>
                  {formatDate(adminData?.createdAt)}
                </div>
              </div>

              <div>
                <p className="text-muted-foreground">Updated At</p>
                  <div className="flex items-center gap-2">
                    <Clock className='h-5 w-5 text-primary'/>
                    {formatDate(adminData?.updatedAt)}
                  </div>
              </div>

              {/* {actorData?.expiryDate && (
                <div >
                  <p className="text-muted-foreground">Expiry Date</p>
                  <div className="flex items-center gap-2">
                    <Clock className='h-5 w-5 text-primary'/>
                    {formatDate(actorData?.expiryDate)}
                  </div>
                </div>
              )} */}
            </div>
            
            {/* Optional Fields */}
            {/* {(actorData?.adminLevel || actorData?.lastOTPResend) && ( */}
              <>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                  {adminData?.adminLevel ? (
                    <div>
                      <p className="text-muted-foreground">Administration Level</p>
                      <Badge variant="secondary" className='h-10 w-30 text-primary text-xl font-black'>
                        {adminData?.adminLevel}
                      </Badge>
                    </div>
                  ):(
                    <div>
                      <p className="text-muted-foreground">Level</p>
                      <Badge variant="secondary" className='h-10 w-40 text-primary text-xl font-black'>
                        Regular User
                        {/* {adminData?.adminLevel} */}
                      </Badge>
                    </div>
                  )
                }

                  {adminData?.lastOTPResend && (
                    <div>
                      <p className="text-muted-foreground">Last OTP Resend</p>
                      <div className="flex items-center gap-2">
                        <Clock className='h-5 w-5 text-primary'/>
                        {formatDate(adminData?.lastOTPResend)}
                      </div>
                    </div>
                  )}
                </div>
              </>
            {/* )} */}
          </CardContent>
        </Card>
        )
      }
      {/* <pre className="rounded-md border p-6 text-lg bg-muted/30">
        {JSON.stringify(logData, null, 2)}
      </pre>

      <pre className="rounded-md border p-6 text-lg bg-muted/30">
        {JSON.stringify(actorData, null, 2)}
      </pre> */}
    </div>
  )
}
