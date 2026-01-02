// components/logs/logs-data-table.tsx

'use client'

import {
  flexRender,
  getCoreRowModel,
//   getPaginationRowModel,
  getSortedRowModel,
//   getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { columns } from '../users/single-user-docs-columns'
import { Document } from '../../types/document'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'

interface Props {
  data: Document[]
  page: number
  // limit: number
  limit: string
}

export function SingleUserDocsDataTable({ data  , page , limit}: Props) {
  const router = useRouter()
  const [columnVisibility, setColumnVisibility] = useState({})
  const {lang} = useParams()
  const table = useReactTable({
    data,
    columns,
      state: {
        columnVisibility,
        pagination: {
          pageIndex: page - 1, // backend is 1-based
          pageSize: Number(limit),     // 🔥 THIS IS THE FIX
        },
    },
    manualPagination:true,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <section className='w-full' dir='ltr'>
        <div className="flex items-center justify-between py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className='hover:cursor-pointer font-black text-xl mx-auto'>
                <Settings className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={value =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-2xl border bg-card shadow-2xl">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead  key={header.id} className='text-white bg-black font-black text-md'>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    className="
                        cursor-pointer text-md 
                        transition-colors
                        hover:bg-primary/10
                        data-[state=selected]:bg-primary/20
                        even:bg-primary/10
                        even:text-whites
                        odd:bg-background
                        
                        "
                    onClick={() =>
                      router.push(`/${lang}/dashboard/${row.original._id}`)
                    }
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className='font-black'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No Submissions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
    </section>
  )
}
