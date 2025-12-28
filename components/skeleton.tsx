// components/logs/logs-table-skeleton.tsx

import { Skeleton } from '../src/components/ui/skeleton'

interface Props {
  L: number
}

export function TableSkeleton({L}:Props) {
// export function LogsTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: L }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 gap-4 rounded-md border p-4"
        >
          <Skeleton  className="bg-gray-400 h-10 w-full" />
          <Skeleton  className="bg-gray-400 h-10 w-full" />
          <Skeleton  className="bg-gray-400 h-10 w-full" />
          <Skeleton  className="bg-gray-400 h-10 w-full" />
        </div>
      ))}
    </div>
  )
}
