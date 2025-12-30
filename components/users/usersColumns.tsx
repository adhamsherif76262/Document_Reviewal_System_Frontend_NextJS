// components/users/usersColumns.tsx
'use client'
import { format} from 'date-fns'
// import { format, isValid } from 'date-fns'

// function formatDateSafe(date?: string | null) {
//   if (!date) return '—'
//   const d = new Date(date)
//   return isValid(d) ? format(d, 'dd MMM yyyy, hh:mm:ss aa') : '—'
// }



import { ColumnDef } from '@tanstack/react-table'
import { user } from '../../types/user'

export const columns: ColumnDef<user>[] = [
  {
    accessorKey: 'name', // ✅ MUST match data key
    header: 'User Name',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.user.name}
      </span>
    ),
  },
  {
    accessorKey: 'email', // ✅
    header: 'User Email',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.user.email}
      </span>
    ),
  },
  {
    accessorKey: 'phone', // ✅
    header: 'User Phone',
    cell: ({ row }) => (
      <span className="font-black">
        {row.original.user.phone}
      </span>
    ),
  },
  {
    accessorKey: 'expiryStatus', // ✅
    header: 'Expiry Status',
    cell: ({ row }) => (
      <span className={`font-black ${row.original.user.expiryStatus === "active" ? "text-green-600" : "text-red-600"}`}>
        {row.original.user.expiryStatus}
      </span>
    ),
  },
  {
    accessorKey: 'isverified', // ✅
    header: 'Is Verified?',
    cell: ({ row }) => (
      <span
        className={`font-black ${
          row.original.user.isVerified ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {row.original.user.isVerified ? 'Yes' : 'No'}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) =>
      format(new Date(row.original.user.createdAt), 'dd MMM yyyy, hh:mm:ss aa'),
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expires At',
    cell: ({ row }) =>
      format(new Date(row.original.user.expiryDate), 'dd MMM yyyy, hh:mm:ss aa'),
  },
  {
    accessorKey: 'lastOTPResend',
    header: 'Last OTP Resend At',
    cell: ({ row }) =>
      format(new Date(row.original.user.lastOTPResend), 'dd MMM yyyy, hh:mm:ss aa'),
  },
]
