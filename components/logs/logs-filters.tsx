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
// import { useEffect, useState } from "react"

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

const Limit_Values = [
  '10',
  '25',
  '50',
  '75',
  '100',
  '125',
  '150',
  '175',
  '200',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '800',
  '900',
  '1000',
] as const

interface Props {
  // limit: number
  limit: string
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
  
  // const [searchTerm, setSearchTerm] = useState<string>('');

  // useEffect(() => {
  //   // 1. Set a timer to run your function after 500ms
  //   const delayDebounceFn = setTimeout(() => {
  //     if (searchTerm) {
  //       console.log("Input stopped changing. Calling function with:", searchTerm);
  //       // Your function logic here (e.g., fetch data)
  //       onChange("actor",searchTerm)
  //     }
  //   }, 100);

  //   // 2. Clean up: if the user types again, this clears the previous timer
  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchTerm]);
  
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

                <Select
                  value={limit || 'all'}
                  onValueChange={(value) =>
                    onChange('limit', value === 'all' ? '1500' : value)
                  }
                >
                  <SelectTrigger className="w-[175px]">
                    <SelectValue placeholder="Select Limit" />
                  </SelectTrigger>
                
                  <SelectContent>
                    {/* All actions (no filter) */}
                    <SelectItem value="all">All Limits</SelectItem>
                
                    {/* Specific actions */}
                    {Limit_Values.map(limit => (
                      // <SelectItem key={action} value={"l"}>
                        <SelectItem key={limit} value={limit}>
                        {limit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="flex flex-col items-center justify-between gap-y-4">
                  <Label htmlFor="limit">Limit</Label>
                  <Input
                      type="text"
                      inputMode="numeric"          // phone-like numeric keypad (mobile)
                      pattern="\d*"                // digits only
                      maxLength={3}
                      minLength={1}
                      // max={200}  
                      // min={1}
                      id="limit"
                      // type='number'
                      placeholder="Number Of Logs"
                      value={limit}
                      onChange={e => onChange('limit', e.target.value)}
                      className="w-[175px]"
                  />
              </div> */}
              <div className="flex flex-col items-center justify-between gap-y-4">

                <Label htmlFor="actor">Actor</Label>
                <Input
                  id="actor"
                  placeholder="Actor"
                  value={actor}
                  onChange={(e) => onChange('actor', e.target.value)}

                  // onChange={(e) => {
                  //   setTimeout(() => {
                  //     onChange('actor', e.target.value)
                  //   }, 200);
                  // }}
                  // onChange={(e) => setSearchTerm(e.target.value)}
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
                      // <SelectItem key={action} value={"l"}>
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



        <ul className="timeline timeline-vertical lg:timeline-horizontal overflow-auto">
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">1998</div>
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
    <div className="timeline-end timeline-box">iMac</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2001</div>
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
    <div className="timeline-end timeline-box">iPod</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2007</div>
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
    <div className="timeline-end timeline-box">iPhone</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2015</div>
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
    <div className="timeline-end timeline-box">Apple Watch</div>
  </li>
  <li>
    <div className="timeline-start">1984</div>
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
    <div className="timeline-end timeline-box text-white">First Macintosh computer</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">1998</div>
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
    <div className="timeline-end timeline-box">iMac</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2001</div>
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
    <div className="timeline-end timeline-box">iPod</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2007</div>
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
    <div className="timeline-end timeline-box">iPhone</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start">2015</div>
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
    <div className="timeline-end timeline-box">Apple Watch</div>
  </li>
</ul>



{/* <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
  <li>
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
    <div className="timeline-start mb-10 md:text-end">
      <time className="font-mono italic">1984</time>
      <div className="text-lg font-black">First Macintosh computer</div>
      The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh
      personal computer. It played a pivotal role in establishing desktop publishing as a general
      office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed
      in a beige case with integrated carrying handle; it came with a keyboard and single-button
      mouse.
    </div>
    <hr />
  </li>
  <li>
    <hr />
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
    <div className="timeline-end md:mb-10">
      <time className="font-mono italic">1998</time>
      <div className="text-lg font-black">iMac</div>
      iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has
      been the primary part of Apple's consumer desktop offerings since its debut in August 1998,
      and has evolved through seven distinct forms
    </div>
    <hr />
  </li>
  <li>
    <hr />
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
    <div className="timeline-start mb-10 md:text-end">
      <time className="font-mono italic">2001</time>
      <div className="text-lg font-black">iPod</div>
      The iPod is a discontinued series of portable media players and multi-purpose mobile devices
      designed and marketed by Apple Inc. The first version was released on October 23, 2001, about
      8+1⁄2 months after the Macintosh version of iTunes was released. Apple sold an estimated 450
      million iPod products as of 2022. Apple discontinued the iPod product line on May 10, 2022. At
      over 20 years, the iPod brand is the oldest to be discontinued by Apple
    </div>
    <hr />
  </li>
  <li>
    <hr />
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
    <div className="timeline-end md:mb-10">
      <time className="font-mono italic">2007</time>
      <div className="text-lg font-black">iPhone</div>
      iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile
      operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on
      January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As
      of November 1, 2018, more than 2.2 billion iPhones had been sold. As of 2022, the iPhone
      accounts for 15.6% of global smartphone market share
    </div>
    <hr />
  </li>
  <li>
    <hr />
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
    <div className="timeline-start mb-10 md:text-end">
      <time className="font-mono italic">2015</time>
      <div className="text-lg font-black">Apple Watch</div>
      The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness
      tracking, health-oriented capabilities, and wireless telecommunication, and integrates with
      iOS and other Apple products and services
    </div>
  </li>
</ul> */}
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
