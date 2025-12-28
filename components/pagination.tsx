// components/logs/logs-pagination.tsx

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface Props {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pages, onPageChange }: Props) {

    const [jump, setJump] = useState('')

  const handleJump = () => {
    const pageNumber = Number(jump)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber !== page && pageNumber <= pages) {
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
    <div className="flex sm:flex-row sm:flex-wrap xxxs:flex-col xxxs:items-center xxxs:justify-between sm:items-center sm:justify-between gap-4 mt-5">
      <div className="flex items-center gap-2">
        <Button
        className='cursor-pointer bg-black text-md font-black hover:bg-white hover:text-black text-white transition-all duration-300'
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground text-md font-black">
          Page <strong>{page} of {pages || 1} </strong>
        </span>

        <Button
        className='cursor-pointer bg-black text-md font-black hover:bg-white hover:text-black text-white transition-all duration-300'
          variant="outline"
          disabled={page === pages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-md font-black">Jump to</span>
        <Input
          type="number"
          min={1}
          max={pages}
          value={jump}
          onChange={e => setJump(e.target.value)}
          className="w-20 bg-black text-white text-md font-black"
        />
        <Button className='cursor-pointer bg-black text-md font-black hover:bg-white hover:text-black text-white transition-all duration-300' onClick={handleJump}>Go</Button>
      </div>
    </div>
  )
}
