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

const Limit_Values = [
  '1',
  '10',
  '25',
  '50',
] as const

interface Props {
  limit: string
  admin: string
  createdBefore: string
  createdAfter: string
  onChange: (key: string, value: string) => void
  onReset: () => void
}
export function AdminsFilters({
  limit,
  admin,
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
                    onChange('limit', value === 'all' ? '100' : value)
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
                        <SelectItem key={limit} value={limit}>
                        {limit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-center justify-between gap-y-4">
                <Label htmlFor="admin">admin</Label>
                <Input
                  id="admin"
                  placeholder="Admin Name Or Email"
                  value={admin}
                  onChange={(e) => onChange('admin', e.target.value)}
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
