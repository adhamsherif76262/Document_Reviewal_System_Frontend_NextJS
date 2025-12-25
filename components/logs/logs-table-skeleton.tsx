// components/logs/logs-table-skeleton.tsx

import { Skeleton } from '../../src/components/ui/skeleton'

export function LogsTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 gap-4 rounded-md border p-4"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  )
}
