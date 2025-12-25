// components/logs/logs-pagination.tsx

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface Props {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

export function LogsPagination({ page, pages, onPageChange }: Props) {

    const [jump, setJump] = useState('')

  const handleJump = () => {
    const pageNumber = Number(jump)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pages) {
      onPageChange(pageNumber)
      setJump('')
    }
  }

  // return (
  //   <div className="flex items-center justify-center gap-2">
  //     <Button
  //       variant="outline"
  //       disabled={page === 1}
  //       onClick={() => onPageChange(page - 1)}
  //       className='hover:cursor-pointer'
  //     >
  //       Previous
  //     </Button>
  //     <span className="text-sm">
  //       Page {page} of {pages}
  //     </span>
  //     <Button
  //       variant="outline"
  //       disabled={page === pages}
  //       onClick={() => onPageChange(page + 1)}
  //       className='hover:cursor-pointer'
  //     >
  //       Next
  //     </Button>
  //   </div>
  // )

   return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
        className='cursor-pointer bg-black font-black hover:bg-white hover:text-black text-white transition-all duration-300'
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page <strong>{page} of {pages || 1} </strong>
        </span>

        <Button
        className='cursor-pointer bg-black font-black hover:bg-white hover:text-black text-white transition-all duration-300'
          variant="outline"
          disabled={page === pages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Jump to</span>
        <Input
          type="number"
          min={1}
          max={pages}
          value={jump}
          onChange={e => setJump(e.target.value)}
          className="w-20"
        />
        <Button className='cursor-pointer bg-black font-black hover:bg-white hover:text-black text-white transition-all duration-300' onClick={handleJump}>Go</Button>
      </div>
    </div>
  )
}
