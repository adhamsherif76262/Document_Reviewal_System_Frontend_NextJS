"use client"

import { useEffect, useState } from 'react'
import { useParams , useRouter } from 'next/navigation'

import { getReviewById } from '../../../../hooks/useGetReviewById'
import { getUserById } from '../../../../hooks/useGetUserById'

import { TableSkeleton } from '../../../../../components/skeleton'
import { SingleReviewDataTable } from '../../../../../components/reviews/single-review-data-table'
// import { Pagination } from '../../../../../components/pagination'

import { Reviews } from '../../../../../types/reviews'
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
  FileText,
  Globe,
  Hash,
  CalendarPlus,
  CalendarClock,
  ShieldCheck,
  ShieldX,
  NotebookTabs,
  ShieldEllipsisIcon,
  Clock,
  Mail,
  Phone,
  User,
  MessageCircleMoreIcon,
  CheckCircle,
  XCircle,
} from 'lucide-react'

import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
// import { useAuth } from '../../../../context/AuthContext'

export default function ReviewDetailsPage() {

//   const { user } = useAuth();

  const { id , lang} = useParams()
  const router = useRouter()
  const [reviewData, setReviewData] = useState<Reviews | null>(null)
  const [userData, setUserData] = useState<user | null>(null)
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
  
      async function loadUserDetails() {
        try {
          const user = await getUserById({ id:reviewData?.reviewedBy._id , page:1 , filters:{}})
          if (cancelled) return
          setUserData(user)
        } finally {
          if (!cancelled) {
            setLoading(false)
          }
        }
      }        
      loadUserDetails()
  
      return () => {
        cancelled = true
      }
    }, [reviewData?.reviewedBy._id])


  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function loadReviewDetails() {
      try {
        const Doc = await getReviewById({ id })
        if (cancelled) return
        setReviewData(Doc)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadReviewDetails()

    return () => {
      cancelled = true
    }
  }, [id])
  
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
        <h1 className='text-2xl font-black text-center animate-pulse'>Admin Details</h1>
        <CardHeader className='flex xs:flex-row xxxs:flex-col xxxs:items-center xs:items-center xs:justify-between xxxs:justify-between'>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className='w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white animate-avatar-pulse-rings animate-bounce'>
                {getUserInitials(userData?.user.name)}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {userData?.user.name}
              </CardTitle>
              <CardDescription>{userData?.user.email}</CardDescription>
            </div>
          </div>
            {
              userData && (<Button className='hover:text-black hover:bg-white cursor-pointer transition-all duration-400 xxxs:mb-5 sm:my-0' onClick={()=>router.push(`/${lang}/admins/${userData?.user._id}`)}>Reviews History</Button>)
            }
        </CardHeader>

        <CardContent className="space-y-6 xxxs:text-center xs:text-left xxxs:mx-auto xs:mx-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <div className="flex xxs:flex-row xxs :items-center xxs:justify-start  xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p>{userData?.user.email}</p>
            </div>

            <div className="flex xxs:flex-row xxs:items-center xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p>{userData?.user.phone}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Role</p>
              <Badge variant = {"outline"}  className='h-8 w-20 text-lg'>{userData?.user.role}</Badge>
            </div>

            <div>
              <p className="text-muted-foreground">Verified</p>
              <BooleanBadge value={userData?.user.isVerified || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expirable</p>
              <BooleanBadge value={userData?.user.expirable || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expiry Status</p>
              <Badge variant="outline" className='h-10 w-30 text-primary text-lg' >
                  {userData?.user.expiryStatus ==="active" ? <CheckCircle className='h-5 w-5 text-primary' /> : <XCircle className='h-5 w-5 text-primary'/>}
                  {userData?.user.expiryStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Created At</p>
              <div className="flex items-center gap-2">
                <Clock className='h-5 w-5 text-primary'/>
                {formatDate(userData?.user.createdAt)}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground">Updated At</p>
                <div className="flex items-center gap-2">
                  <Clock className='h-5 w-5 text-primary'/>
                  {formatDate(userData?.user.updatedAt)}
                </div>
            </div>
          </div>
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                {userData?.user.adminLevel ? (
                  <div>
                    <p className="text-muted-foreground">Administration Level</p>
                    <Badge variant="secondary" className='h-10 w-30 text-primary text-xl font-black'>
                      {userData?.user.adminLevel}
                    </Badge>
                  </div>
                ):(
                  <div>
                    <p className="text-muted-foreground">Level</p>
                    <Badge variant="secondary" className='h-10 w-40 text-primary text-xl font-black'>
                      Regular User
                    </Badge>
                  </div>
                )
              }

                {userData?.user.lastOTPResend && (
                  <div>
                    <p className="text-muted-foreground">Last OTP Resend</p>
                    <div className="flex items-center gap-2">
                      <Clock className='h-5 w-5 text-primary'/>
                      {formatDate(userData?.user.lastOTPResend)}
                    </div>
                  </div>
                )}
              </div>
            </>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='text-center'>
          <CardTitle className="flex items-center gap-2 text-2xl font-black mx-auto animate-pulse">
            <NotebookTabs className="h-6 w-6 text-primary"/>
            Submission Review Details
          </CardTitle>
          <CardDescription>
            Submission Metadata & Review State
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-lg">

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_2fr] gap-4">

            <div className="flex xs:flex-row xs:items-center xs:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between gap-2">
                <div className='flex items-center justify-between'>
                  <FileText className="h-5 w-5 text-muted-foregrsound mx-2" />
                  <span className="font-medium">Type:</span>
                </div>
              <Badge variant="secondary" className='xxxs:text-sm xxs:text-lg font-black'>{reviewData?.docType}</Badge>
            </div>

            <div className="flex xs:flex-row xs:items-center xs:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between gap-2">
                <div className='flex items-center justify-between'>
                  <Globe className="h-5 w-5 text-muted-foregrousnd mx-2" />
                  <span className="font-medium">State:</span>
                </div>
              <Badge variant="outline" className='text-lg font-black'>{reviewData?.state}</Badge>
            </div>

            <div className="flex xs:flex-row xs:items-center xs:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between gap-2">
                <div className='flex items-center justify-between'>
                  <Hash className="h-5 w-5 text-muted-foregrounsd mx-2" />
                  <span className="font-medium">Submission Number</span>
                </div>
              <Badge variant="default" className='text-lg font-black'>{reviewData?.docNumber}</Badge>
            </div>

          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
              <div className="flex gap-2 sm:flex-row sm:items-center sm:justify-start xxxs:flex-col xxxs:items-center xxxs:justify-between">
                <div className='flex flex-row items-center justify-between'>
                  {reviewData?.status === 'approved' ? (
                    <ShieldCheck className="h-6 w-6 text-emerald-500 mx-3" />
                  ) : reviewData?.status === 'rejected' ? (
                    <ShieldX className="h-6 w-6 text-red-500 mx-3" />
                  ) : reviewData?.status === 'partiallyApproved' ? (
                    <ShieldEllipsisIcon  className="h-6 w-6 text-yellow-500 mx-3" />
                  ) : (
                    <Clock className="h-6 w-6 text-black mx-3" />
                  )}
                  <span className="font-medium ">Status:</span>
                </div>
              <Badge variant="outline" className={`text-lg text-white ${reviewData?.status === 'approved' ? 'bg-green-600' : reviewData?.status === 'rejected' ? 'bg-red-600' : reviewData?.status === 'partiallyApproved' ? 'bg-yellow-600' : 'bg-black'}`}>
                {reviewData?.status}
              </Badge>
              </div>
                                    
            {reviewData?.comment && (
              <div className="flex items-start gap-2 xxxs:mx-auto sm:mx-0">
                <MessageCircleMoreIcon className="h-6 w-6 text-muted-foreground mt-1" />
                <div>
                  <p className="text-muted-foreground">Admin Comment</p>
                  <p className="font-medium">{reviewData.comment}</p>
                </div>
              </div>
            )}


            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
                <div className="flex items-center gap-2 xxxs:mx-auto sm:mx-0">
                  <CalendarPlus className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    {formatDate(reviewData?.createdAt)}
                  </div>
                </div>
            
                <div className="flex items-center gap-2 xxxs:mx-auto sm:mx-0">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Updated</p>
                    {formatDate(reviewData?.updatedAt)}
                  </div>
                </div>
            {/* </div> */}
          </div>
        </CardContent>
      </Card>      
        {loading ? (
          <TableSkeleton L={7} />
        ) : reviewData ? (
                <section dir={"ltr"}>
                 <SingleReviewDataTable data={reviewData.fieldsReviewed} documentId={reviewData.document}/>
                 {/* <Pagination
                   page={"data.page"}
                   pages={data.pages}
                   onPageChange={(newPage) => {
                     setLoading(true)
                     setPage(newPage)
                 } } /> */}
                </section>
        ) : null}

      {/* <pre className="rounded-md border p-6 text-lg bg-muted/30">
        {JSON.stringify(reviewData, null, 2)}
      </pre> */}
    </div>
  )
}
