/* eslint-disable @typescript-eslint/no-explicit-any */
// // components/review/ReviewFieldRow.tsx
// import { useParams } from 'next/navigation'
// import { ReviewStatusToggle } from './ReviewStatusToggle'
// import { Textarea } from '@/components/ui/textarea'

// export function ReviewFieldRow({ field, value, review, onChange }: any) {
    
//     const normalizedReview = review ?? {
//       status: "pending",
//       adminComment: "",
//     };

//     const {lang} = useParams()
//     console.log(review)
//     console.log(field.name)
//     // console.log(stat)
//     console.log(lang)
//   return (
//     <div className="border rounded-lg p-4 space-y-3">
//       <div className="font-medium">{field.label[lang]}</div>

//       {/* Value preview */}
//       <div className="text-sm text-muted-foreground">
//         {typeof value === 'string' ? value : 'File uploaded'}
//       </div>

        
//       <ReviewStatusToggle
//         value={normalizedReview.status}
//         onChange={(status: any) =>
//           onChange(field.name, status, normalizedReview.adminComment)
//         }
//       />

//       <Textarea
//         disabled={normalizedReview.status === 'pending'}
//         value={normalizedReview.adminComment}
//         placeholder="Admin comment…"
//         onChange={(e : any) =>
//           onChange(field.name, normalizedReview.status, e.target.value)
//         }
//       />
//     </div>
//   )
// }


// components/review/ReviewFieldRow.tsx
import { Textarea } from '@/components/ui/textarea'
import { ReviewStatusToggle } from './ReviewStatusToggle'
import ImageModalCarousel from '../docs/imageModalCarousel'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { useParams } from 'next/navigation'
import { PdfFieldList } from '../docs/pdfFieldRenderer'

export function ReviewFieldRow({ fieldKey, templateFieldLabel, field, review, onChange }: any) {
      const formatKeyToLabel = (key: string): string => {
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };
const {lang} = useParams()
  const normalizedReview = review ?? { status: 'pending', adminComment: '' }
    // console.log(fieldKey)
    // console.log(field[fieldKey])
      const [open, setOpen] = useState(false);
      const [startIndex, setStartIndex] = useState(0);

        // 1. Create local state to hold the "draft" text
  const [localComment, setLocalComment] = useState(normalizedReview.adminComment)

  // 2. If the status changes externally (wipes the comment), update our local state
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalComment(normalizedReview.adminComment)
  }, [normalizedReview.adminComment])

  
  return (
    <div className="border rounded-lg p-4 mx-auto text-center">
      {/* <div className="font-medium">{field.label?.en ?? fieldKey}</div> */}
      <div className="font-black mb-4 text-2xl">{formatKeyToLabel(fieldKey)}</div>
      <div className="font-black font-sans text-2xl">{templateFieldLabel}</div>
           
      {/* Value preview */}
      <div className={`grid ${field.type === 'image' ? "lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 my-10 mx-auto gap-4" : "grid-cols-1 my-10 mx-auto gap-4"}`}>
        {field.type === 'image' && Array.isArray(field.value)
          ? field.value.map((url: string, idx: number) => (
            //   <img
            //     key={idx}
            //     src={url}
            //     alt={fieldKey}
            //     className="max-h-32 object-contain mb-1"
            //   />
                         <Image
             onClick={() => {
               setStartIndex(idx);
               setOpen(true);
             }}
             width={300}
             height={300}
               key={url}
               src={url}
               alt=""
               className="xxxs:w-96 xxxs:h-72 sm:w-76 sm:h-72 object-cover rounded-2xl border hover:blur-xs transition-all duration-500 hover:cursor-pointer mx-auto"
             >
             </Image>
            ))
          : typeof field.value === 'string'
          ? field.value
          : field.type === 'pdf' && (
              <PdfFieldList pdfs={field.value} fieldName={formatKeyToLabel(fieldKey)} textSize='text-2xl'/>
            )}
           {open && (
             <ImageModalCarousel
               images={field.value || []}
               startIndex={startIndex}
               onClose={() => setOpen(false)}
             />
           )} 
      </div>

      <ReviewStatusToggle
        value={normalizedReview.status}
        onChange={(status: any) =>
          onChange(fieldKey, status, normalizedReview.adminComment)
        }
      />
        <div className='mt-10'dir={lang === "ar" ? "rtl" : "ltr"}>
            <label className="text-2xl font-black text-center mb-5" >{lang === "ar" ? "تعليق المدير" : "Admin Comment"}</label>
            <Textarea
              className='mt-5'
              disabled={normalizedReview.status === 'pending'}
              // 3. Use local state for the value
              value={localComment}
              // 4. Update local state immediately (fast)
              onChange={(e) => setLocalComment(e.target.value)}
              // 5. Sync to the "heavy" global state only when the user clicks away
              onBlur={() => onChange(fieldKey, normalizedReview.status, localComment)}
              // value={normalizedReview.adminComment}
              placeholder={lang === "en" ? "Admin Comment ..." : "تعليق المدير..."}
              // onChange={(e: any) =>
              //   onChange(fieldKey, normalizedReview.status, e.target.value)
              // }
            />
        </div>
    </div>
  )
}