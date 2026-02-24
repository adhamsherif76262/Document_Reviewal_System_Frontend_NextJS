/* eslint-disable @typescript-eslint/no-explicit-any */
// components/review/ReviewStatusToggle.tsx
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
// import { useParams } from 'next/navigation'

// export function ReviewStatusToggle({ value, onChange }: any) {
//   const {lang} = useParams()
//   return (
//     <ToggleGroup
//     variant="outline"
//       type="single"
//       value={value}
//       onValueChange={(v : any) => v && onChange(v)}
//       className='mx-auto'
//     >
//       <ToggleGroupItem className='bg-red-700 text-white' value="rejected">{lang === "ar" ? "رفض" : "Reject"}</ToggleGroupItem>
//       <ToggleGroupItem className='bg-green-700 text-white'  value="approved">{lang === "ar" ? "موافقة" : "Approve"}</ToggleGroupItem>
//       <ToggleGroupItem className='bg-yellow-600 text-white'      value="pending">{lang === "ar" ? "تعليق" : "Hang"}</ToggleGroupItem>
//     </ToggleGroup>
//   )
// }


import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useParams } from 'next/navigation'

export function ReviewStatusToggle({ value, onChange }: any) {
  const { lang } = useParams()

  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={value}
      onValueChange={(v: any) => v && onChange(v)}
      className='mx-auto gap-0'
    >
      {/* REJECTED */}
      <ToggleGroupItem 
        value="rejected"
        className="
          bg-white text-black 
          data-[state=on]:bg-red-700 data-[state=on]:text-white 
          hover:bg-red-50 hover:text-red-700 data-[state=on]:hover:bg-red-800 data-[state=on]:hover:text-white
        "
      >
        {lang === "ar" ? "رفض" : "Reject"}
      </ToggleGroupItem>

      {/* APPROVED */}
      <ToggleGroupItem 
        value="approved"
        className="
          bg-white text-black 
          data-[state=on]:bg-green-700 data-[state=on]:text-white 
          hover:bg-green-50 hover:text-green-700 data-[state=on]:hover:bg-green-800 data-[state=on]:hover:text-white
        "
      >
        {lang === "ar" ? "موافقة" : "Approve"}
      </ToggleGroupItem>

      {/* PENDING */}
      <ToggleGroupItem 
        value="pending"
        className="
          bg-white text-black 
          data-[state=on]:bg-yellow-600 data-[state=on]:text-white 
          hover:bg-yellow-50 hover:text-yellow-700 data-[state=on]:hover:bg-yellow-700 data-[state=on]:hover:text-white
        "
      >
        {lang === "ar" ? "تعليق" : "Hang"}
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
