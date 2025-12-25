// components/logs/columns.tsx

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Log } from '../../types/log'
import { format } from 'date-fns'

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <span className="font-black">{row.original.action}</span>
    ),
  },
  {
    accessorKey: 'actor',
    header: 'Actor',
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => (
      <p className="max-w-[700px] truncate text-muted-foreground">
        {row.original.message}
      </p>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), 'dd MMM yyyy, hh:mm:ss aa'),
  },
]
