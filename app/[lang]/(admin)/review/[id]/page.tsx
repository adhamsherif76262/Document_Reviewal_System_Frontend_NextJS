// app/[lang]/review/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useDocumentReview } from '../../../../hooks/useDocumentReview'
import { ReviewTabs } from '../../../../../components/review/ReviewTabs'
import { Button } from '../../../../../src/components/ui/button'
import { Textarea } from '../../../../../src/components/ui/textarea'
import { TableSkeleton } from '../../../../../components/skeleton'
import { useEffect, useState } from 'react'

export default function ReviewPage() {
  const { id , lang } = useParams()
  const router = useRouter()

  const {
    document,
    template,
    reviewState,
    overallComment,
    setOverallComment,
    setFieldReview,
    submitReview,
    loading,
    submitting
  } = useDocumentReview({id})

  // 1. Create local state to hold the "draft" text
const [localComment, setLocalComment] = useState(overallComment)

// 2. If the status changes externally (wipes the comment), update our local state
useEffect(() => {
  setLocalComment(overallComment)
}, [overallComment])

  if (loading) return <TableSkeleton L={10} />
  
  if (!document || !template) return <div className="p-6">Either Template Or Submission Was Not found</div>


  return (
    <div className="max-w-8xl mx-auto xxs:p-6 xxxs:p-0 space-y-6">
      <h1 className="text-2xl font-black text-center">
        {lang === "ar" ? `مراجعة التقديم رقم ${document.docNumber} و عنوان  ${document.docType}` : `Review Submission Number ${document.docNumber}`}
      </h1>

      <ReviewTabs
        template={template}
        document={document}
        reviewState={reviewState}
        onReviewChange={setFieldReview}
      />

      <div className="flex flex-col justify-center align-center text-center">
        <label className="text-2xl font-black text-center mb-5" >{lang === "ar" ? "ملخص المراجعة الشامل" : "Overall Review Summary"}</label>
        <Textarea
        // className={`${lang === "ar" ? "text-right" : "ltr"}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
          // 3. Use local state for the value
          value={localComment}
          // 4. Update local state immediately (fast)
          onChange={(e) => setLocalComment(e.target.value)}
          // 5. Sync to the "heavy" global state only when the user clicks away
          onBlur={(e) => setOverallComment(e.target.value)}
          // value={overallComment}
          // onChange={(e) => setOverallComment(e.target.value)}
          placeholder={lang === "en" ? "Overall Review Summary" : "ملخص المراجعة الشامل..."}
        />
      </div>

      <div 
      className={`
        ${!submitting ? "animate-pulse" : "animate-none"}
        sticky bottom-0
        bg-backgrsound
        bg-gray-s200
        rounded-3xl
        max-w-fit
        mx-auto
        shadow-2xl
        border-t
        p-3 sm:p-4
        z-50 inset-0
        flex flex-col sm:flex-row
        gap-2
      `}>
        <Button
          disabled={submitting}
          onClick={submitReview}
          className="w-full sm:w-auto hover:cursor-pointer hover:bg-transparent hover:text-black transition-all duration-300"
        >
          
          {submitting
          ? lang === "en"
            ? "Submitting Review ..."
            : "جارٍ إرسال التقييم ..."
          : lang === "en"
          ? "Submit Review"
          : "إرسال التقييم"}
        </Button>
      </div>
    </div>
  )
}



// 'use client'

// import { useDocumentReview } from '../../../../hooks/useDocumentReview'
// import { ReviewTabs } from '../../../../../components/review/ReviewTabs'
// import { useParams } from 'next/navigation'

// export default function ReviewPage() {
//   const {id} = useParams()
//   const { document, reviewState, setFieldReview, submitReview, overallComment, setOverallComment, loading, submitting } =
//     useDocumentReview({id})

//   if (loading) return <div>Loading...</div>

//   return (
//     <div className="space-y-6">
//       <ReviewTabs
//         document={document}
//         reviewState={reviewState}
//         onReviewChange={setFieldReview}
//       />

//       <div>
//         <label className="font-medium">Overall Comment</label>
//         <textarea
//           className="w-full border rounded p-2"
//           value={overallComment}
//           onChange={(e) => setOverallComment(e.target.value)}
//           placeholder="Overall review comment..."
//         />
//       </div>

//       <button
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//         disabled={submitting}
//         onClick={submitReview}
//       >
//         {submitting ? 'Submitting...' : 'Submit Review'}
//       </button>
//     </div>
//   )
// }