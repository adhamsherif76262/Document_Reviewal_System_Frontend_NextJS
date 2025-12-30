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

const Expiry_Statuses = [
    "active",
    "expired"
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
//   '250',
//   '300',
//   '350',
//   '400',
//   '450',
//   '500',
//   '550',
//   '600',
//   '650',
//   '700',
//   '800',
//   '900',
//   '1000',
] as const

interface Props {
  limit: string
  name: string
  email: string
  expiryStatus: string
  expiryBefore: string
  expiryAfter: string   
  createdBefore: string
  createdAfter: string
  onChange: (key: string, value: string) => void
  onReset: () => void
}
export function UsersFilters({
  limit,
  name,
  email,
  expiryStatus, 
  expiryBefore,
  expiryAfter,
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
          <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-4 ">
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
                <Label htmlFor="expiryStatus">expiryStatus</Label>

                <Select
                  value={expiryStatus || 'all'}
                  onValueChange={(value) =>
                    onChange('expiryStatus', value === 'all' ? '' : value)
                  }
                >
                  <SelectTrigger className="w-[175px]">
                    <SelectValue placeholder="Select The Expiry Status" />
                  </SelectTrigger>
                
                  <SelectContent>
                    {/* All actions (no filter) */}
                    <SelectItem value="all">All expiryStatus</SelectItem>
                
                    {/* Specific actions */}
                    {Expiry_Statuses.map(expiryStatus => (
                      // <SelectItem key={action} value={"l"}>
                        <SelectItem key={expiryStatus} value={expiryStatus}>
                        {expiryStatus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="name">name</Label>
                <Input
                  id="name"
                  placeholder="User Name"
                  value={name}
                  onChange={(e) => onChange('name', e.target.value)}
                  className="w-[175px]"
                  />
              </div>
              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="email"
                  placeholder="User email"
                  value={email}
                  onChange={(e) => onChange('email', e.target.value)}
                  className="w-[175px]"
                  />
              </div>

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="expiryBefore">Expires Before</Label>
                <Input
                  id="expiryBefore"
                  type="date"
                  value={expiryBefore}
                  onChange={e => onChange('expiryBefore', e.target.value)}
                  className="w-[175px]"
                  />
              </div>
              <div className="flex flex-col items-center justify-between gap-y-4">
                    <Label htmlFor="expiryAfter">Expires After</Label>
                    <Input
                      id="expiryAfter"
                      type="date"
                      value={expiryAfter}
                      onChange={e => onChange('expiryAfter', e.target.value)}
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
