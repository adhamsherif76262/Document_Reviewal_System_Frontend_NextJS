// components/logs/columns.tsx

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Document } from '../../types/document'
import { format } from 'date-fns'

export const columns: ColumnDef<Document>[] = [
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
    accessorKey: 'Status',
    header: 'Status',
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
    accessorKey: 'Certificate',
    // header: 'Certificate Status',
    header: 'Certificate',
    cell: ({ row }) => (
      <span className={`font-black ${row.original.certificate?.status === "approved" ? "text-green-600": row.original.certificate?.status === "rejected" ? "text-red-600" : row.original.certificate?.status === "pending" ? "text-yellow-500"  : "text-black"}`}>{row.original.certificate?.status}</span>
    ),
  },
  {
      accessorKey: 'User Name',
      header: 'User Name',
    cell: ({ row }) => (
      <span className="font-black">{row.original.user.name}</span>
    ),
  },
//   {
//       accessorKey: 'userEmail',
//       header: 'User Email',
//     cell: ({ row }) => (
//       <span className="font-black">{row.original.user.email}</span>
//     ),
//   },
  {
      accessorKey: 'Current Holder',
    //   header: 'Current Holder Name',
      header: 'Current Holder',
      cell: ({ row }) => (
          <span className="font-black">{row.original.custody.currentHolder.name}</span>
        ),
    },
//   {
    //   accessorKey: 'currentHolderEmail',
    //   //   header: 'Current Holder',
    //     header: 'Current Holder Email',
    //   cell: ({ row }) => (
    //       <span className="font-black">{row.original.custody.currentHolder.email}</span>
    //     ),
    // },
    {
      accessorKey: 'Re-submission ?',
      header: 'Re-submission ?',
      cell: ({ row }) => (
        <span className={`"font-black" ${!row.original.hasPendingResubmission ? "text-red-600" : "text-green-600"}`}>{row.original.hasPendingResubmission ? "Yes" : "No"}</span>
      ),
    },
    //   {
        //     accessorKey: 'actor',
//     header: 'Actor',
//   },
  {
    accessorKey: 'Created At',
    header: 'Created At',
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), 'dd MMM yyyy, hh:mm:ss aa'),
  },
]
