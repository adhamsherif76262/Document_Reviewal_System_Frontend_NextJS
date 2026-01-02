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

const State_Values = [
    "Imported",
    "Domestic",
    "General",
] as const

const Status_Values = [
    "pending",
    "partiallyApproved",
    "approved",
    "rejected"
] as const
const Certificate_Status_Values = [
    "approved",
    "rejected",
    "pending",
    "none",
] as const

const Doc_Types = [
    'Domestic Organic Pesticide',
    'Imported Organic Pesticide',
    'Domestic Organic Nutrition',
    'Imported Organic Nutrition',
    'Organic Farm',
    'Exporters Organic Production',
    'Importers Organic Production',
    'Warehouse',
    'Factory Or Production Unit',
    'Conformity Office Or Entity',
    'Consultancy Firms Or Scientific Offices',
    'Organic Feed Logo',
    // 'Under_Development_1',
    // 'Under_Development_2',
    // 'Under_Development_3',
] as const

const Limit_Values = [
  '1',
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
] as const

interface Props {
  // limit: number
  limit: string
  currentHolderName: string
  state: string
  docNumber : string,
  hasPendingResubmission: boolean | string
  status: string
  certificateStatus: string
  docType: string
  createdBefore: string
  createdAfter: string
  onChange: (key: string, value: string) => void
  onReset: () => void
}
export function SingleUserDocsFilters({
  limit,
  docType,
  docNumber,
  currentHolderName,
  state,
  hasPendingResubmission,
  status,
  certificateStatus,
  createdBefore,
  createdAfter,
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
          <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="state">State</Label>

                <Select
                  value={state || 'all'}
                  onValueChange={(value) =>
                    onChange('state', value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger className="w-[175px]">
                    <SelectValue placeholder="Select Submission State" />
                  </SelectTrigger>
                
                  <SelectContent>
                    {/* All actions (no filter) */}
                    <SelectItem value="all">All States</SelectItem>
                
                    {/* Specific actions */}
                    {State_Values.map(state => (
                      // <SelectItem key={action} value={"l"}>
                        <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="status">Status</Label>

                <Select
                  value={status || 'all'}
                  onValueChange={(value) =>
                    onChange('status', value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger className="w-[175px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                
                  <SelectContent>
                    {/* All actions (no filter) */}
                    <SelectItem value="all">All Statuses</SelectItem>
                
                    {/* Specific actions */}
                    {Status_Values.map(status => (
                      // <SelectItem key={action} value={"l"}>
                        <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="certificateStatus">Certificate Status</Label>

                <Select
                  value={certificateStatus || 'all'}
                  onValueChange={(value) =>
                    onChange('certificateStatus', value === 'all' ? '1500' : value)
                  }
                  
                >
                  <SelectTrigger className="w-[175px]">
                    <SelectValue placeholder="Select Certificate Status" />
                  </SelectTrigger>
                
                  <SelectContent>
                    {/* All actions (no filter) */}
                    <SelectItem value="all">All Certificate Statuses</SelectItem>
                
                    {/* Specific actions */}
                    {Certificate_Status_Values.map(certificateStatus => (
                      // <SelectItem key={action} value={"l"}>
                        <SelectItem key={certificateStatus} value={certificateStatus}>
                        {certificateStatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="docType">Submission Type</Label>

                <Select
                  value={docType || 'all'}
                  onValueChange={(value) =>
                    onChange('docType', value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger className="w-[175px]">
                    <SelectValue placeholder="Select Submission Type" />
                  </SelectTrigger>
                
                  <SelectContent>
                    {/* All actions (no filter) */}
                    <SelectItem value="all">All Submission Types</SelectItem>
                
                    {/* Specific actions */}
                    {Doc_Types.map(docType => (
                      // <SelectItem key={action} value={"l"}>
                        <SelectItem key={docType} value={docType}>
                        {docType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="docNumber">Submission Number</Label>
                <Input
                  id="docNumber"
                  placeholder="Submission Number"
                  value={docNumber}
                  onChange={(e) => onChange('docNumber', e.target.value)}
                  className="w-[175px]"
                  />
              </div>
              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="currentHolderName">Current Holder Name</Label>
                <Input
                  id="currentHolderName"
                  placeholder="Current Holder Name"
                  value={currentHolderName}
                  onChange={(e) => onChange('currentHolderName', e.target.value)}
                  className="w-[175px]"
                  />
              </div>

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="createdBefore">Created Before</Label>
                <Input
                  id="createdBefore"
                  type="date"
                  value={createdBefore}
                  onChange={e => onChange('createdBefore', e.target.value)}
                  className="w-[175px]"
                  />
              </div>
              <div className="flex flex-col items-center justify-between gap-y-4">
                    <Label htmlFor="createdAfter">Created After</Label>
                    <Input
                      id="createdAfter"
                      type="date"
                      value={createdAfter}
                      onChange={e => onChange('createdAfter', e.target.value)}
                      className="w-[175px]"
                      />
              </div>

                <Button
                  variant="outline"
                  className="col-span-full mt-7 w-[175px] mx-auto cursor-pointer bg-black font-black
                   hover:bg-white hover:text-black text-white transition-all duration-300"
                  onClick={onReset}
                >
                  Reset
                </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
