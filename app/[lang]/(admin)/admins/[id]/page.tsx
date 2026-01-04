
"use client"

import { useEffect, useState } from 'react'
import { useParams , useRouter } from 'next/navigation'
import { getAdminById } from '../../../../hooks/useGetAdminById'
import { TableSkeleton } from '../../../../../components/skeleton'

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
  Clock,
  Mail,
  Phone,
  User,
  CheckCircle,
  XCircle,
} from 'lucide-react'

import { format } from 'date-fns'
import { Pagination } from '../../../../../components/pagination'
import { SingleReviewFilters } from '../../../../../components/admins/single-admin-reviews-filters'
import { SingleReviewDataTable } from '../../../../../components/admins/single-admin-reviews-data-table'
// import { useAuth } from '../../../../context/AuthContext'
// import { json } from 'stream/consumers'

export default function AdminDetailsPage() {

  // const { user } = useAuth();

  const { id , lang} = useParams()
  // const router = useRouter()
  const [userData, setUserData] = useState<user | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)

  const [filters, setFilters] = useState({
    // page: number
    limit: "25",
    docType:"",
    docNumber:"",
    state:"",
    status : "",
    fieldReviewedKey : "",
    fieldReviewedStatus : "",      
    startDate : "",
    endDate : "",
  })

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

    async function loadAdminDetails() {
      try {
        const user = await getAdminById({ id  , page , filters})
        if (cancelled) return
        setUserData(user)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadAdminDetails()

    return () => {
      cancelled = true
    }
  }, [page , filters , id])
  
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


        <h1 className='text-center font-black text-2xl animate-pulse'>User Statistics</h1>
        {loading ? (
          <TableSkeleton L={1} />
        ) : userData ?(
          <div className="mb-12 mt-5 stats stats-vesrtical lg:stats-horizontal gap-0 shadow-[0_0px_8px_8px_rgba(0,0,0,0.25)] rounded-xl grid lg:grid-rows-1 sm:grid-rows-2 xxxs:grid-rows-4">
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Total Number Of <br /> Reviews</div>
          <div className="stat-value text-xl text-center">{userData?.pagination.totalReviews}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Total Number Of <br /> Partially Approved <br /> Reviews</div>
          <div className="stat-value text-xl text-center">{userData?.partiallyApprovedCount}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Total Number Of <br /> Approved Reviews</div>
          <div className="stat-value text-xl text-center">{userData?.approvedCount}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
        <div className="stat">
          <div className="stat-title text-black font-black text-lg text-center">Total Number Of <br /> Rejected Reviews</div>
          <div className="stat-value text-xl text-center">{userData?.rejectedCount}</div>
          {/* <div className="stat-desc text-black">↘︎ 90 (14%)</div> */}
        </div>
          </div>
        ):null}

      <Card>
        <h1 className='text-2xl font-black text-center animate-pulse'>User Details</h1>
        <CardHeader className='flex xs:flex-row xxxs:flex-col xxxs:items-center xs:items-center xs:justify-between xxxs:justify-between'>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback className='w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white animate-avatar-pulse-rings animate-bounce'>
                {getUserInitials(userData?.admin.name)}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {userData?.admin.name}
              </CardTitle>
              <CardDescription>{userData?.admin.email}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 xxxs:text-center xs:text-left xxxs:mx-auto xs:mx-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <div className="flex xxs:flex-row xxs :items-center xxs:justify-start  xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p>{userData?.admin.email}</p>
            </div>

            <div className="flex xxs:flex-row xxs:items-center xxxs:flex-col xxxs:justify-center xxxs:items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p>{userData?.admin.phone}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Role</p>
              <Badge variant = {"outline"}  className='h-8 w-20 text-lg'>{userData?.admin.role}</Badge>
            </div>

            <div>
              <p className="text-muted-foreground">Verified</p>
              <BooleanBadge value={userData?.admin.isVerified || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expirable</p>
              <BooleanBadge value={userData?.admin.expirable || false} />
            </div>

            <div>
              <p className="text-muted-foreground">Expiry Status</p>
              <Badge variant="outline" className='h-10 w-30 text-primary text-lg' >
                  {userData?.admin.expiryStatus ==="active" ? <CheckCircle className='h-5 w-5 text-primary' /> : <XCircle className='h-5 w-5 text-primary'/>}
                  {userData?.admin.expiryStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Created At</p>
              <div className="flex items-center gap-2">
                <Clock className='h-5 w-5 text-primary'/>
                {formatDate(userData?.admin.createdAt)}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground">Updated At</p>
                <div className="flex items-center gap-2">
                  <Clock className='h-5 w-5 text-primary'/>
                  {formatDate(userData?.admin.updatedAt)}
                </div>
            </div>
          </div>
          
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                {userData?.admin.lastOTPResend && (
                  <div>
                    <p className="text-muted-foreground">Last OTP Resend</p>
                    <div className="flex items-center gap-2">
                      <Clock className='h-5 w-5 text-primary'/>
                      {formatDate(userData?.admin.lastOTPResend)}
                    </div>
                  </div>
                )}
              </div>
            </>
        </CardContent>
      </Card>


      <div className="space-y-6">
        <SingleReviewFilters
          {...filters}
          onChange={(key, value) => {
            setFilters(prev => ({ ...prev, [key]: value }))
            // setLoading(true)
            setPage(1)
          } }
          onReset={() => {
            setFilters({               
              limit: "25",
              docType:"",
              docNumber:"",
              state:"",
              status : "",
              fieldReviewedKey : "",
              fieldReviewedStatus : "", 
              startDate : "",    
              endDate : "",
            })
            setLoading(true)
            setPage(1)
          } } />

        {loading ? (
          <TableSkeleton L={7} />
        ) : userData ? (
          <section dir={"ltr"}>
            <div className='flex xxxs:flex-col xxxs:items-center xxxs:justify-between md:flex-row md:items-center md:justify-evenly'>
              <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Filtered Submissions :</p> <strong className='text-xl xxxs:pb-5 md:pb-0'>{userData.pagination.totalReviews}</strong></span>
              {/* <span className='flex flex-col items-center justify-between'><p className='font-black xxxs:text-lg xxxs:text-center xxxs:pb-5 xxs:text-xl'>Total Number Of Exsisting Submissions :</p> <strong className='text-xl'>{metricsData?.totalDocuments}</strong> </span> */}
            </div>
           {/* <pre className="rounded-md border p-6 text-lg max-w-full overflow-hidden">
               {JSON.stringify(data.documents, null, 2)}
           </pre>             */}
           
           <SingleReviewDataTable data={userData.reviews} page={page} limit={filters.limit} />
            <Pagination
              page={userData.pagination.page}
              pages={userData.pagination.pages}
              onPageChange={(newPage) => {
                setLoading(true)
                setPage(newPage)
              } } />
          </section>
        ) : null}
      </div>
      
      {/* <pre className="rounded-md border p-6 text-lg bg-muted/30">
        {JSON.stringify(userData, null, 2)}
      </pre> */}
    </div>
  )
}
