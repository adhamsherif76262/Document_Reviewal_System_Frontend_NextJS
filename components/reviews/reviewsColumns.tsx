// components/logs/columns.tsx

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Reviews } from '../../types/reviews'
import { format } from 'date-fns'

export const columns: ColumnDef<Reviews>[] = [
  {
    accessorKey: 'Submission Type',
    header: 'Submission Type',
    cell: ({ row }) => (
      <span className="font-black">{row.original.docType}</span>
    ),
  },
  {
    accessorKey: 'State',
    header: 'State',
    cell: ({ row }) => (
      <span className="font-black">{row.original.state}</span>
    ),
  },
  {
    accessorKey: 'Review Status',
    header: 'Review Status',
    cell: ({ row }) => (
      <span className={`font-black ${row.original.status === "approved" ? "text-green-600": row.original.status === "rejected" ? "text-red-600" : row.original.status === "partiallyApproved" ? "text-yellow-500" : "text-black"}`}>{row.original.status}</span>
    ),
  },
  {
    accessorKey: 'Number',
    // header: 'Submission Number',
    header: 'Number',
    cell: ({ row }) => (
      <span className="font-black text-blue-950">{row.original.docNumber}</span>
    ),
  },
  {
      accessorKey: 'Admin Name',
      header: 'Admin Name',
    cell: ({ row }) => (
      <span className="font-black">{row.original.reviewedBy.name}</span>
    ),
  },
  {
      accessorKey: 'Admin Email',
      header: 'Admin Email',
    cell: ({ row }) => (
      <span className="font-black">{row.original.reviewedBy.email}</span>
    ),
  },
  {
      accessorKey: 'Admin Level',
      header: 'Admin Level',
    cell: ({ row }) => (
      <span className="font-black">{row.original.reviewedBy.adminLevel}</span>
    ),
  },
  {
    accessorKey: 'Created At',
    header: 'Created At',
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), 'dd MMM yyyy, hh:mm:ss aa'),
  },
]
