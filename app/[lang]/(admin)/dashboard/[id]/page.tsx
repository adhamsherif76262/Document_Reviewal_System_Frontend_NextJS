// // app/(dashboard)/logs/[id]/page.tsx
// "use client"
// // import api from '../../../../../lib/api'
// // import { LogsResponse } from '../../../../../types/log'
// import { useEffect , useState } from 'react'
// import { getDocumentById } from '../../../../hooks/useGetDocumentById'
// // import { LogsTableSkeleton } from '../../../../../components/logs/logs-table-skeleton'

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

//       getDocumentById({id: id}).then(res => {
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

import { getDocumentById } from '../../../../hooks/useGetDocumentById'
// import { getUserById } from '../../../../hooks/useGetUserById'

import { TableSkeleton } from '../../../../../components/skeleton'

import { Document } from '../../../../../types/document'
// import { user } from '../../../../../types/user'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  FileText,
  Globe,
  Hash,
  RotateCcw,
  CalendarCheck,
  CalendarPlus,
  CalendarClock,
  Gavel,
  ShieldCheck,
  ShieldX,
  Shield,
  UserStar,
  NotebookTabs,
  ShieldEllipsisIcon,
  Clock,
  Mail,
  Phone,
  User,
  Calendar,
  ChevronRightIcon,
  Hourglass,
  BadgeCheckIcon,
  MessageCircleMoreIcon,
  CheckCircle,
  XCircle,
} from 'lucide-react'

import {
  
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useAuth } from '../../../../context/AuthContext'
import Image from 'next/image'
import React from 'react'
import { json } from 'stream/consumers'

export default function DocumentDetailsPage() {

  const { user } = useAuth();

  const { id , lang} = useParams()
  const router = useRouter()
  const [docData, setDocData] = useState<Document | null>(null)
  // const [actorData, setActorData] = useState<user | null>(null)
  // const [adminData, setAdminData] = useState<user | null>(null)
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

    async function loadDocDetails() {
      try {
        const Doc = await getDocumentById({ id })
        if (cancelled) return
        setDocData(Doc)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadDocDetails()

    return () => {
      cancelled = true
    }
  }, [id])

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  
  // =========================
  // 🦴 Skeleton
  // =========================
  if (loading) {
    return <TableSkeleton L={12}/>
  }

  // =========================
  // 🧾 Content
  // =========================
  return (
    <div dir='ltr' className="space-y-6">

      <Card>
        <h1 className='text-2xl font-black text-center animate-pulse'>Submission Custody Details</h1>
        <CardHeader className='px-0 py-4 mx-4 rounded-4xl bg-gray-500'>
        <h2 className='text-xl font-black text-white text-center'>Current Holder Details</h2>
          <div className="grid grid-cols-1 xxxlg:grid-cols-[1fr_2fr_1fr_1fr] gap-4 text-center text-lg pb-4">
            <div className="flex items-center gap-4 mx-auto">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="h-5 w-5" />
                  {docData?.custody?.currentHolder?.name}
                </CardTitle>
              </div>
            </div>

              {/* <CardContent className="space-y-6 xxxs:text-center xs:text-left xxxs:mx-auto xs:mx-0"> */}
              <div className="text-white font-black flex xxs:flex-row xxs:items-center xxs:justify-start  xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2 mx-auto">
                <Mail className="h-4 w-4 text-muted-foregsround" />
                <p className='xxxs:text-sm xxs:text-lg'>{docData?.user.email}</p>
              </div>

              <div className="text-white font-black flex xxs:flex-row xxs:items-center xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2">
                <Phone className="h-4 w-4 text-mutsed-foreground" />
                <p>{docData?.user.phone}</p>
              </div>
              <div className='flex flex-row items-center text-white justify-center'>
                {/* <p className="text-muted-foreground">Role :</p> */}
                <UserStar />
                <Badge variant = {"secondary"}  className='h-8 w-20 text-lg font-black'>{docData?.user.role}</Badge>
              </div>
            </div>
            {
              docData?.custody.currentHolder.role && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0 mx-auto font-black' onClick={()=>router.push(`/${lang}/users/${docData?.custody?.currentHolder?._id}`)}>Submission History</Button>)
            }
            {
              (docData?.custody.currentHolder.adminLevel && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0 mx-auto font-black' onClick={()=>router.push(`/${lang}/admins/${docData?.custody?.currentHolder?._id}`)}>Reviews History</Button>))
            }
            {/* </CardContent> */}
        </CardHeader>

        <div className="bg-gray-500 p-4 mx-4 rounded-4xl">
          <h2 className='text-xl font-black text-white text-center mb-4'>Previous Holders&apos; Details</h2>
          <div className='tabs tabs-box bg-gray-500 border-2 rounded-xl'>
            {
              docData?.custody.previousHolders.map((PreviousHolder , index)=>(
              <>
                <input type="radio" name="my_tabs_6" className="tab text-white font-black shadow-3xl" aria-label={`Previous Holder ${index + 1}`} defaultChecked/>
                <div className="tab-content bg-base-100 border-base-300 xxxs:px-1 xxxs:py-2 xs:p-6 bg-card rounded-xl text-center">
                  <div className="grid md:grid-cols-[1fr_2.5fr_1fr_0.5fr] sm:grid-cols-[1fr_1.5fr] xxxs:grid-cols-1 w-full max-w-full gap-2">
                    <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <User className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 font-black text-blasck hover:text-white'>
                          {PreviousHolder.name}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline" className='px-0 font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <Mail className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 px-0 font-black xxxs:text-[9px] xxs:text-sm text-blasck'>
                          {PreviousHolder.email}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline"  className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <Phone className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 font-black text-blasck'>
                          {PreviousHolder.phone}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline"  className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <UserStar className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription  className='text-center pt-1 font-black text-blasck'>
                          {PreviousHolder.role ? PreviousHolder.role : PreviousHolder.adminLevel}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </div>
                    {
                      PreviousHolder.role && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:mb-0 mt-6 text-center font-black' onClick={()=>router.push(`/${lang}/users/${PreviousHolder._id}`)}>Submission History</Button>)
                    }
                    {
                      (PreviousHolder.adminLevel && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:mb-0 mt-6 text-center font-black' onClick={()=>router.push(`/${lang}/admins/${PreviousHolder._id}`)}>Reviews History</Button>))
                    }
                </div>
              </>
              ))
            }
          </div>
        </div>
      </Card>

      <Card>
        <h1 className='text-2xl font-black text-center animate-pulse'>User Details</h1>
        <CardHeader className='flex xs:flex-row xxxs:flex-col xxxs:items-center xs:items-center xs:justify-between xxxs:justify-between'>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className='w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white animate-avatar-pulse-rings animate-bounce'>
                {getUserInitials(docData?.user.name)}
              </AvatarFallback>
                {/* Animated ring around avatar */}
                {/* <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-avatar-ring-pulse" />
                <span className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-avatar-ring-pulse-delayed" /> */}
            </Avatar>

            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {docData?.user.name}
              </CardTitle>
              <CardDescription>{docData?.user.email}</CardDescription>
            </div>
          </div>
            {
              docData?.user && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/users/${docData?.user?._id}`)}>Submission History</Button>)
            }
            {/* {
              (logData?.admin && (!logData?.user)) && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/admins/${logData?.admin?._id}`)}>Reviews History</Button>)
            }  */}
        </CardHeader>

        <CardContent className="space-y-6 xxxs:text-center xs:text-left xxxs:mx-auto xs:mx-0">
          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <div className="flex xxs:flex-row xxs :items-center xxs:justify-start  xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p>{docData?.user.email}</p>
            </div>

            <div className="flex xxs:flex-row xxs:items-center xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p>{docData?.user.phone}</p>
            </div>
          </div>

          <Separator />

          {/* Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Role</p>
              <Badge variant = {"outline"}  className='h-8 w-20 text-lg'>{docData?.user.role}</Badge>
            </div>

            <div>
              <p className="text-muted-foreground">Verified</p>
              <BooleanBadge value={docData?.user.isVerified || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expirable</p>
              <BooleanBadge value={docData?.user.expirable || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expiry Status</p>
              <Badge variant="outline" className='h-10 w-30 text-primary text-lg' >
                  {docData?.user.expiryStatus ==="active" ? <CheckCircle className='h-5 w-5 text-primary' /> : <XCircle className='h-5 w-5 text-primary'/>}
                  {docData?.user.expiryStatus}
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
                {formatDate(docData?.user.createdAt)}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground">Updated At</p>
                <div className="flex items-center gap-2">
                  <Clock className='h-5 w-5 text-primary'/>
                  {formatDate(docData?.user.updatedAt)}
                </div>
            </div>

            {docData?.user.expiryDate && (
              <div >
                <p className="text-muted-foreground">Expiry Date</p>
                <div className="flex items-center gap-2">
                  <Clock className='h-5 w-5 text-primary'/>
                  {formatDate(docData?.user.expiryDate)}
                </div>
              </div>
            )}
          </div>
          
          {/* Optional Fields */}
          {/* {(actorData?.adminLevel || actorData?.lastOTPResend) && ( */}
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                {docData?.user.adminLevel ? (
                  <div>
                    <p className="text-muted-foreground">Administration Level</p>
                    <Badge variant="secondary" className='h-10 w-30 text-primary text-xl font-black'>
                      {docData?.user.adminLevel}
                    </Badge>
                  </div>
                ):(
                  <div>
                    <p className="text-muted-foreground">Level</p>
                    <Badge variant="secondary" className='h-10 w-40 text-primary text-xl font-black'>
                      Regular User
                      {/* {docData?.user.adminLevel} */}
                    </Badge>
                  </div>
                )
              }

                {docData?.user.lastOTPResend && (
                  <div>
                    <p className="text-muted-foreground">Last OTP Resend</p>
                    <div className="flex items-center gap-2">
                      <Clock className='h-5 w-5 text-primary'/>
                      {formatDate(docData?.user.lastOTPResend)}
                    </div>
                  </div>
                )}
              </div>
            </>
          {/* )} */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='text-center'>
          <CardTitle className="flex items-center gap-2 text-2xl font-black mx-auto animate-pulse">
            {/* <FileText className="h-6 w-6 text-primary" /> */}
            <NotebookTabs className="h-6 w-6 text-primary"/>
            Submission Details
          </CardTitle>
          <CardDescription>
            Submission Metadata & Review State
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-lg">

          {/* Core Info */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_2fr] gap-4">

            <div className="flex xs:flex-row xs:items-center xs:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between gap-2">
                <div className='flex items-center justify-between'>
                  <FileText className="h-5 w-5 text-muted-foregrsound mx-2" />
                  <span className="font-medium">Type:</span>
                </div>
              <Badge variant="secondary" className='xxxs:text-sm xxs:text-lg font-black'>{docData?.docType}</Badge>
            </div>

            <div className="flex xs:flex-row xs:items-center xs:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between gap-2">
                <div className='flex items-center justify-between'>
                  <Globe className="h-5 w-5 text-muted-foregrousnd mx-2" />
                  <span className="font-medium">State:</span>
                </div>
              <Badge variant="outline" className='text-lg font-black'>{docData?.state}</Badge>
            </div>

            <div className="flex xs:flex-row xs:items-center xs:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between gap-2">
                <div className='flex items-center justify-between'>
                  <Hash className="h-5 w-5 text-muted-foregrounsd mx-2" />
                  <span className="font-medium">Submission Number</span>
                </div>
              <Badge variant="default" className='text-lg font-black'>{docData?.docNumber}</Badge>
            </div>

          </div>

          <Separator />

          {/* Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">

            <div className="flex gap-2 sm:flex-row sm:items-center sm:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between">
                <div className='flex flex-row items-center justify-between'>
                  {docData?.status === 'approved' ? (
                    <ShieldCheck className="h-6 w-6 text-emerald-500 mx-3" />
                  ) : docData?.status === 'rejected' ? (
                    <ShieldX className="h-6 w-6 text-red-500 mx-3" />
                  ) : docData?.status === 'partiallyApproved' ? (
                    <ShieldEllipsisIcon  className="h-6 w-6 text-yellow-500 mx-3" />
                  ) : (
                    <Clock className="h-6 w-6 text-black mx-3" />
                  )}
                  <span className="font-medium ">Status:</span>
                </div>
              <Badge variant="outline" className={`text-lg text-white ${docData?.status === 'approved' ? 'bg-green-600' : docData?.status === 'rejected' ? 'bg-red-600' : docData?.status === 'partiallyApproved' ? 'bg-yellow-600' : 'bg-black'}`}>
                {docData?.status}
              </Badge>
            </div>
            
            <div className="flex sm:flex-row sm:items-center sm:justify-start gap-2 xxxs:flex-col xxxs:items-center xxxs:justify-center sm:mt-0 xxxs:mt-6">
              <div className='flex flex-row items-center justify-between' >
                <RotateCcw className="h-5 w-5 text-muted-foreground mx-3" />
                <span className="font-medium">Pending Resubmission:</span>
              </div>
              <BooleanBadge value={docData?.hasPendingResubmission || false} />
            </div>
            
          </div>
            
          <Separator />
            
          {/* Admin Comment */}
          {docData?.adminComment && (
            <>
              <div className="flex items-start gap-2">
                <MessageCircleMoreIcon className="h-6 w-6 text-muted-foreground mt-1" />
                <div>
                  <p className="text-muted-foreground">Admin Comment</p>
                  <p className="font-medium">{docData.adminComment}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Submitted</p>
                {formatDate(docData?.submittedAt)}
              </div>
            </div>
        
            <div className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Created</p>
                {formatDate(docData?.createdAt)}
              </div>
            </div>
        
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Updated</p>
                {formatDate(docData?.updatedAt)}
              </div>
            </div>
        
            {docData?.lastReviewedAt && (
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">Last Reviewed</p>
                  {formatDate(docData.lastReviewedAt)}
                </div>
              </div>
            )}

          </div>
          
        </CardContent>
      </Card>

      {
        user?.role === "admin" && (
          <Accordion
            type="single"
            collapsible
            className="w-full bg-card font-black text-black p-6 rounded-2xl shadow-2xl"
            defaultValue="item-1"
          >
            <h1 className='text-center text-2xl font-black animate-pulse'>Assigned Admins</h1>
            {
              docData?.assignedAdmins.map((admin , index)=>(
                <AccordionItem key={index} value={`item-${index+1}`}>
                  <AccordionTrigger className='cursor-pointer'>{admin.name}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance hover:cursor-text">
                    <div className="grid xl:grid-cols-[1fr_2.5fr_1fr_0.5fr_2fr_2fr] lg:grid-cols-3 sm:grid-cols-2 xxxs:grid-cols-1 w-full max-w-full gap-2">
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <User className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck hover:text-white'>
                            {admin.name}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='px-0 font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <Mail className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 px-0 font-black xxxs:text-[10px] xxs:text-sm text-blasck'>
                            {admin.email}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline"  className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <Phone className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {admin.phone}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline"  className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <UserStar className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription  className='text-center pt-1 font-black text-blasck'>
                            {admin.adminLevel}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline"  className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                            <CalendarPlus className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {formatDate(admin.createdAt)}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline"  className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                            <CalendarClock  className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {formatDate(admin.updatedAt)}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </div>
                    <Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/admins/${docData?.assignedAdmins[index]?._id}`)}>Reviews History</Button>
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        )
      }

      <ul  className="pt-10 bg-card rounded-xl shadow-xl xxs:max-h-[500px] xxxs:max-h-[600px]">
        <h1 className='text-2xl font-black text-center mb-5 -mt-5 animate-pulse'>Submission Activity Log</h1>
        <ul className="timeline timeline-snap-icon max-sm:timeline-compact timeline-vertical overflow-y-scroll max-h-[425px]">
          {
            docData?.activityLog.map((Activity_Log , index) =>(
              <li key={index} className='xs:mx-auto xxxs:mx-0'>
                {index > 0 ? <hr/> : ""}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={`${index % 2 === 0 ? "timeline-start" : "timeline-end"} mb-10 xxs:text-end`}>

                  <time className={`font-mono italic flex xxs:flex-row xxs:items-center xxs:justify-between xxxs:justify-between xxxs:flex-col xxxs:items-center`}><Hourglass className='h-5 w-5 mx-3 xxxs:mb-3 xxs:mb-0'/><strong className='xxs:text-[17px] sm:text-[14px] md:text-[17px] xxxs:text-sm'>{formatDate(Activity_Log.timestamp)}</strong></time>
                  <div className={`text-lg my-5 flex items-center ${index % 2 === 0 ? "sm:justify-end" : "xxxs:justify-start"}`}><Shield className='h-5 w-5 mx-3'/>{Activity_Log.action}</div>
                  <div className={`xxxs:text-md xxs:text-lg my-5 mx-3 flex items-center ${index % 2 === 0 ? "sm:justify-end" : "xxxs:justify-start"}`}>By <strong className='px-2'>{Activity_Log.role}</strong> <strong>{Activity_Log.by}</strong></div>
                </div>
                {index+1 !== docData.activityLog.length ? <hr/> : ""}
              </li>
            ))
          }
        </ul>
      </ul>

      {
        docData?.certificate?.status !== "none" ? 
        ( 
          <Accordion
            type="single"
            collapsible
            className="w-full bg-card font-black text-black xxxs:p-3 xs:p-6 rounded-2xl shadow-2xl"
            defaultValue="item-1"
          >
            <h1 className='text-center text-2xl font-black animate-pulse'>Submission&apos;s Final Certificate</h1>
            {
              <>
                {/* Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 my-8">
          
              <div className="flex gap-2 sm:flex-row sm:items-center sm:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between">
                  <div className='flex flex-row items-center justify-between'>
                    {docData?.certificate?.status === 'approved' ? (
                      <ShieldCheck className="h-6 w-6 text-emerald-500 mx-3" />
                    ) : docData?.certificate?.status === 'rejected' ? (
                      <ShieldX className="h-6 w-6 text-red-500 mx-3" />
                    ) : (
                      <Clock className="h-6 w-6 text-black mx-3" />
                    )}
                    <span className="font-medium">Status:</span>
                  </div>
                <Badge variant="outline" className={`text-lg text-white ${docData?.certificate?.status === 'approved' ? 'bg-green-600' : docData?.certificate?.status === 'rejected' ? 'bg-red-600' : 'bg-black'}`}>
                  {docData?.certificate?.status}
                </Badge>
              </div>
                  
              {/* Admin Comment */}
                {docData?.certificate?.comment && (
                  <>
                    <div className="flex flex-row items-start gap-2 xxxs:mt-5 sm:mt-0 text-center mx-auto">
                      <div className='flex flex-col items-center justify-between'>
                        <div className='flex flex-row items-center justify-between'>
                          <MessageCircleMoreIcon className="h-6 w-6 text-muted-foregrounsd mt-0 mx-3" />
                          <p className="text-muted-fosreground">Super Admin Comment</p>
                        </div>
                        <p className="font-medium">{docData?.certificate?.comment}</p>
                      </div>
                    </div>
                  </>
                )}
                </div>                      
                <AccordionItem value={`item-1`}>
                <AccordionTrigger className='cursor-pointer'>Uploaded By</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance hover:cursor-text">
                  <div className="grid xl:grid-cols-[1fr_2.5fr_1fr_0.5fr_2fr] lg:grid-cols-3 sm:grid-cols-2 xxxs:grid-cols-1 w-full max-w-full gap-2">
                    <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <User className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 font-black text-blasck hover:text-white'>
                          {docData?.certificate?.uploadedBy.name}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline" className='px-0 font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <Mail className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 px-0 font-black xxxs:text-[10px] xxs:text-sm text-blasck'>
                          {docData?.certificate?.uploadedBy.email}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <Phone className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 font-black text-blasck'>
                          {docData?.certificate?.uploadedBy.phone}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <UserStar className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 font-black text-blasck'>
                          {docData?.certificate?.uploadedBy.adminLevel}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                    <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                      <ItemContent>
                        <CalendarClock className="h-8 w-8 text-center mx-auto" />
                        <ItemDescription className='text-center pt-1 font-black text-blasck'>
                          {formatDate(docData?.certificate?.uploadedAt)}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </div>
                  {/* <Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={() => router.push(`/${lang}/admins/${docData?.assignedAdmins[index]?._id}`)}>Reviews History</Button> */}
                </AccordionContent>
                </AccordionItem>
                {
                  docData?.certificate?.approvedBy && (
                <AccordionItem value={`item-2`}>
                  <AccordionTrigger className='cursor-pointer'>Approved By</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance hover:cursor-text">
                    <div className="grid xl:grid-cols-[1fr_2.5fr_1fr_0.5fr_2fr] lg:grid-cols-3 sm:grid-cols-2 xxxs:grid-cols-1 w-full max-w-full gap-2">
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <User className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck hover:text-white'>
                            {docData?.certificate?.approvedBy?.name}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='px-0 font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <Mail className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 px-0 font-black xxxs:text-[10px] xxs:text-sm text-blasck'>
                            {docData?.certificate?.approvedBy?.email}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <Phone className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {docData?.certificate?.approvedBy?.phone}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <UserStar className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {docData?.certificate?.approvedBy?.adminLevel}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <CalendarClock className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {formatDate(docData?.certificate?.approvedAt)}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </div>
                    {/* <Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={() => router.push(`/${lang}/admins/${docData?.assignedAdmins[index]?._id}`)}>Reviews History</Button> */}
                  </AccordionContent>
                </AccordionItem>
                  )
                }
                {
                  docData?.certificate?.rejectedBy && (
                <AccordionItem value={`item-3`}>
                  <AccordionTrigger className='cursor-pointer'>Rejected By</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance hover:cursor-text">
                    <div className="grid xl:grid-cols-[1fr_2.5fr_1fr_0.5fr_2fr] lg:grid-cols-3 sm:grid-cols-2 xxxs:grid-cols-1 w-full max-w-full gap-2">
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <User className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck hover:text-white'>
                            {docData?.certificate?.rejectedBy?.name}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='px-0 font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <Mail className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 px-0 font-black xxxs:text-[10px] xxs:text-sm text-blasck'>
                            {docData?.certificate?.rejectedBy?.email}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <Phone className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {docData?.certificate?.rejectedBy?.phone}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <UserStar className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {docData?.certificate?.rejectedBy?.adminLevel}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                      <Item variant="outline" className='font-black hover:text-white hover:bg-black transition-all duration-300'>
                        <ItemContent>
                          <CalendarClock className="h-8 w-8 text-center mx-auto" />
                          <ItemDescription className='text-center pt-1 font-black text-blasck'>
                            {formatDate(docData?.certificate?.rejectedAt)}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </div>
                    {/* <Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={() => router.push(`/${lang}/admins/${docData?.assignedAdmins[index]?._id}`)}>Reviews History</Button> */}
                  </AccordionContent>
                </AccordionItem>
                  )
                }
                <AccordionItem value={`item-4`} >
              <AccordionTrigger className='cursor-pointer'>Certificate Images</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4  p-0 text-balance">
                <div className="w-full max-w-full p-0">
                  <Item variant="outline" className='p-0 max-w-fit max-h-fit mx-auto'>
                        <ItemContent className='flex p-0 m-0 flex-row items-center justify-evenly rounded-4xl'>                                
                          <Carousel
                            // orientation="vertical"
                            plugins={[plugin.current]}
                            // opts={{
                            //   align: "start",
                            // }}
                            className="w-full sm:max-w-[450px] xs:max-w-[300px] xxs:max-w-[250px] xxxs:max-w-[150px] py-0"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                          >
                            {/* <CarouselContent className='h-[300px]'> */}
                            <CarouselContent className="xxxs:h-[200px] xxs:h-[325px] xs:h-[400px] sm:h-[500px]">
                              {docData?.certificate?.images.map((img, index) => (
                                // <CarouselItem key={index} className='py-0 msd:basis-1/2'>
                                <CarouselItem key={index} className="h-full flex items-center justify-center">
                                  <div className="py-0">
                                    <Card className='py-0'>
                                      <CardContent className="flex aspect-auto items-center justify-center p-0 ">
                                        <Image 
                                        loading='lazy'
                                          className='font-black hover:blur-xs transition-all duration-500 hover:cursor-pointer rounded-lg object-contain max-h-[500px]' 
                                        src={img}
                                        width={500} height={50} 
                                        // fill
                                          // sizes="(max-width: 640px) 90vw, 450px"
                                          // priority={index === 0}
                                        alt={`Certificate Image ${index + 1}`}></Image>
                                        {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                        </ItemContent>
                  </Item>
                </div>
              </AccordionContent>
                </AccordionItem>
              </>
            }
          </Accordion>
        ) 
        :(
          <section className="w-full bg-card font-black text-black xxxs:p-3 xs:p-6 rounded-2xl shadow-2xl">
            <h1 className='text-center text-2xl font-black animate-pulse'>Submission&apos;s Final Certificate</h1>
            <div className='text-center mt-5'>There Is No Final Certificate Uploaded For This Submission.</div>
          </section>
        ) 
      }
      
      {/* <pre className="rounded-md border p-6 text-lg bg-muted/30">
        {JSON.stringify(docData, null, 2)}
      </pre>

      <pre className="rounded-md border p-6 text-lg bg-muted/30">
        {JSON.stringify(actorData, null, 2)}
      </pre> */}
    </div>
  )
}
