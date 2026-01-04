// components/users/usersColumns.tsx
'use client'
import { format} from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { user } from '../../types/user'

export const columns: ColumnDef<user>[] = [
  {
    accessorKey: 'Admin Name', // ✅ MUST match data key
    header: 'Admin Name',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: 'Admin Email', // ✅
    header: 'Admin Email',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: 'Admin Phone', // ✅
    header: 'Admin Phone',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.phone}
      </span>
    ),
  },
  {
    accessorKey: 'Admin Level', // ✅
    header: 'Admin Level',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.adminLevel}
      </span>
    ),
  },
  {
    accessorKey: 'Total Reviewes', // ✅
    header: 'Total Reviewes',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.totalReviewed}
      </span>
    ),
  },
  {
    accessorKey: 'Created At',
    header: 'Created At',
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), 'dd MMM yyyy, hh:mm:ss aa'),
  },
  {
    accessorKey: 'Last OTP Resend At',
    header: 'Last OTP Resend At',
    cell: ({ row }) =>
        row.original.lastOTPResend ? format(new Date(row.original.lastOTPResend), 'dd MMM yyyy, hh:mm:ss aa') : "No OTP Resends"
    },
]
