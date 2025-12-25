// components/logs/logs-filters.tsx

'use client'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LOG_ACTIONS = [
  'login',
  'logout',
  'register',
  'verifyEmail',
  'forgotPassword',
  'resetPassword',
  'fileSubmission',
  'fileReSubmission',
  'approved',
  'partiallyApproved',
  'rejected',
  'assign',
  'reviewReturn',
  'ListAllDocs',
  'GetAllReviews',
  'ExtendUserAccountExpiryDate',
  'GenerateRegistrationCode',
  'SyncDocTypeAssignments',
  'GetDocTypeAssignments',
  'SubmitFinalCertificate',
  'ResubmitFinalCertificate',
  'ApproveFinalCertificate',
  'RejectFinalCertificate',
  'GetAllPersonalDocs',
  'GetAllUsersStats',
  'GetAllAdminsStats',
] as const

interface Props {
  limit: number
  actor: string
  action: string
  startDate: string
  endDate: string
  onChange: (key: string, value: string) => void
  onReset: () => void
}

export function LogsFilters({
  limit,
  actor,
  action,
  startDate,
  endDate,
  onChange,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 flex-col items-between">
        <Card>
      <CardHeader>
        <CardTitle className='text-center text-xl font-black'>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="limit">Limit</Label>
                <Input
                    type="text"
                    inputMode="numeric"          // phone-like numeric keypad (mobile)
                    pattern="\d*"                // digits only
                    maxLength={20}  
                    min={1}
                    id="limit"
                    // type='number'
                    placeholder="Number Of Logs"
                    value={limit}
                    onChange={e => onChange('limit', e.target.value)}
                    className="w-[175px]"
                />
            </div>
            <div className="flex flex-col items-center justify-between gap-y-4">

              <Label htmlFor="actor">Actor</Label>
              <Input
                id="actor"
                placeholder="Actor"
                value={actor}
                onChange={e => onChange('actor', e.target.value)}
                className="w-[175px]"
                />
            </div>
            {/* <div className="flex flex-col items-center justify-between gap-y-4">
              <Label htmlFor="action">Action</Label>
              <Input
                id="action"
                placeholder="Action"
                value={action}
                onChange={e => onChange('action', e.target.value)}
                className="w-[175px]"
                />
            </div> */}
            <div className="flex flex-col items-center justify-between gap-y-4">
              <Label htmlFor="action">Action</Label>
                        
              <Select
                value={action || 'all'}
                onValueChange={(value) =>
                  onChange('action', value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className="w-[175px]">
                  <SelectValue placeholder="Select Action" />
                </SelectTrigger>
              
                <SelectContent>
                  {/* All actions (no filter) */}
                  <SelectItem value="all">All Actions</SelectItem>
              
                  {/* Specific actions */}
                  {LOG_ACTIONS.map(action => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-center justify-between gap-y-4">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={e => onChange('startDate', e.target.value)}
                className="w-[175px]"
                />
            </div>
            <div className="flex flex-col items-center justify-between gap-y-4">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={e => onChange('endDate', e.target.value)}
                    className="w-[175px]"
                    />
            </div>

              <Button
                variant="outline"
                className="lg:col-span-full xl:col-span-1 mt-7 w-[175px] mx-auto cursor-pointer bg-black font-black
                 hover:bg-white hover:text-black text-white transition-all duration-300"
                onClick={onReset}
              >
                Reset
              </Button>
        </div>
      </CardContent>
        </Card>
    </div>


    // <div className="flex flex-wrap gap-4">
    //   <Input
    //     type='number'
    //     placeholder="Number Of Logs Per Page"
    //     value={limit}
    //     onChange={e => onChange('limit', e.target.value)}
    //     className="w-[175px]"
    //   />
    //   <Input
    //     placeholder="Actor"
    //     value={actor}
    //     onChange={e => onChange('actor', e.target.value)}
    //     className="w-[175px]"
    //   />
    //   <Input
    //     placeholder="Action"
    //     value={action}
    //     onChange={e => onChange('action', e.target.value)}
    //     className="w-[175px]"
    //   />
    //   <Input
    //     type="date"
    //     value={startDate}
    //     onChange={e => onChange('startDate', e.target.value)}
    //   />
    //   <Input
    //     type="date"
    //     value={endDate}
    //     onChange={e => onChange('endDate', e.target.value)}
    //   />
    //   <Button variant="outline" onClick={onReset}>
    //     Reset
    //   </Button>
    // </div>
  )
}
