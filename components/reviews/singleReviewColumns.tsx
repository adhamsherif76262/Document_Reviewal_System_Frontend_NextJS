// components/logs/columns.tsx

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ReviewedFields } from '../../types/reviews'

  /**
 * Converts "firstName" or "first_name" to "First Name"
 */
  const formatKeyToLabel = (key: string): string => {
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };

export const columns: ColumnDef<ReviewedFields>[] = [
  {
    accessorKey: 'Field Reviewed Name',
    header: 'Field Reviewed Name',
    cell: ({ row }) => (
      <span className="font-black">{formatKeyToLabel(row.original.fieldKey)}</span>
    ),
  },
  {
    accessorKey: 'Field Reviewed Status',
    header: 'Field Reviewed Status',
    cell: ({ row }) => (
      <span className={`font-black ${row.original.status === "approved" ? "text-green-600": row.original.status === "rejected" ? "text-red-600" : "text-black"}`}>{row.original.status}</span>
    ),
  },
]
