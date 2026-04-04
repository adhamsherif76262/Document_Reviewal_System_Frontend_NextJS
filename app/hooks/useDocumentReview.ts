/* eslint-disable @typescript-eslint/no-explicit-any */

// hooks/useDocumentReview.ts
import { useEffect, useState } from 'react'
import api from '../../lib/api'
import {resolveTemplateKey} from '../../lib/TemplateKeyResolver'
import { getDocumentById } from './useGetDocumentById'
import { fetchTemplateByKey } from "../../templates/api";
// import { ParamValue } from 'next/dist/server/request/params'
import {computeDocumentStatus} from "../../lib/review/computeDocumentStatus"
import { useParams, useRouter } from 'next/navigation';
type ReviewStatus = 'approved' | 'rejected' | 'pending'

type FieldReview = {
  status: ReviewStatus
  adminComment: string
}

export function useDocumentReview(documentId : any) {
  const {id , lang} = useParams()
  const router = useRouter()
  const [document, setDocument] = useState<any>(null)
  const [template, setTemplate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [overallComment, setOverallComment] = useState('')
  const [reviewState, setReviewState] = useState<Record<string, FieldReview>>({})

  // 1️⃣ Load document + template
  useEffect(() => {
    async function load() {
      setLoading(true)
        // console.log(params)
      const doc = await getDocumentById(documentId)
    //   const tpl = fetchTemplateByKey(doc.docType)?.states?.[doc.state]
        const templateKey = resolveTemplateKey(doc.docType)

      const tpl = await fetchTemplateByKey(templateKey , doc.state)

      const initialReview: Record<string, FieldReview> = {}

      Object.entries(doc.fields).forEach(([key, field]: any) => {
        initialReview[key] = {
          status: field.review?.status ?? 'pending',
          adminComment: field.review?.adminComment ?? ''
        }
      })

      setDocument(doc)
      setTemplate(tpl)
      setReviewState(initialReview)
      setLoading(false)
    }

    load()
  }, [])

  // // 2️⃣ Field review mutation
  // function setFieldReview(
  //   fieldKey: string,
  //   status: ReviewStatus,
  //   adminComment = ''
  // ) {
  //   setReviewState(prev => ({
  //     ...prev,
  //     [fieldKey]: {
  //       status,
  //       adminComment: status !== 'pending' ? adminComment : ''
  //       // adminComment: ''
  //       // adminComment: adminComment ? adminComment : ''
  //       // adminComment: adminComment
  //     }
  //   }))
  // }

  function setFieldReview(fieldKey: string, status: ReviewStatus, adminComment?: string) {
  setReviewState(prev => {
    const prevField = prev[fieldKey];
    const isStatusChanging = prevField?.status !== status;
    const isResolved = status === 'approved' || status === 'rejected';

    // If status is changing to Approved/Rejected, wipe it.
    // If we are just typing (status is the same), keep the new adminComment.
    const finalComment = (isStatusChanging && isResolved) 
      ? '' 
      : (adminComment ?? prevField?.adminComment ?? '');

    return {
      ...prev,
      [fieldKey]: {
        ...prevField, // Keep other properties if any
        status,
        adminComment: finalComment
      }
    };
  });
}


  // 3️⃣ Submit review (HOOK-OWNED)
//   async function submitReview() {
//     setSubmitting(true)

//     const fieldsReview: Record<string, FieldReview> = {}

//     Object.entries(reviewState).forEach(([key, value]) => {
//       if (value.status !== 'pending') {
//         fieldsReview[key] = value
//       }
//     })

//     await api.post(`api/documents/${documentId}/review`, {
//       status: 'partiallyApproved',
//       comment: overallComment,
//       fieldsReview
//     })

//     setSubmitting(false)
//   }


async function submitReview() {
  setSubmitting(true)

  const fieldsReview: Record<string, FieldReview> = {}
  const statuses: ReviewStatus[] = []

  Object.entries(reviewState).forEach(([key, value]) => {
    statuses.push(value.status)

    // if (value.status !== 'pending') {
    //   fieldsReview[key] = value
    // }
    fieldsReview[key] = value
  })

  const documentStatus = computeDocumentStatus(statuses)
  alert(documentId)
  await api.post(`/api/documents/${id}/review`, {
    status: documentStatus,
    comment: overallComment,
    fieldsReview
  })

  setSubmitting(false)

  router.push(`/${lang}/dashboard/${id}`)
}

  return {
    document,
    template,
    reviewState,
    overallComment,
    setOverallComment,
    setFieldReview,
    submitReview,
    loading,
    submitting
  }
}



// // hooks/useDocumentReview.ts
// import { useEffect, useState } from 'react'
// import api from '../../lib/api'
// import { getDocumentById } from './useGetDocumentById'
// import { computeDocumentStatus } from '../../lib/review/computeDocumentStatus'

// type ReviewStatus = 'approved' | 'rejected' | 'pending'

// type FieldReview = {
//   status: ReviewStatus
//   adminComment: string
// }

// export function useDocumentReview(documentId: any) {
//   const [document, setDocument] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [submitting, setSubmitting] = useState(false)

//   const [overallComment, setOverallComment] = useState('')
//   const [reviewState, setReviewState] = useState<Record<string, FieldReview>>({})

//   // 1️⃣ Load document and initialize review state
//   useEffect(() => {
//     async function load() {
//       setLoading(true)
//       const doc = await getDocumentById(documentId)

//       const initialReview: Record<string, FieldReview> = {}
//       Object.entries(doc.fields).forEach(([key, field]: any) => {
//         initialReview[key] = {
//           status: field.review?.status ?? 'pending',
//           adminComment: field.review?.adminComment ?? ''
//         }
//       })

//       setDocument(doc)
//       setReviewState(initialReview)
//       setLoading(false)
//     }

//     load()
//   }, [])

//   // 2️⃣ Field review mutation
//   function setFieldReview(
//     fieldKey: string,
//     status: ReviewStatus,
//     adminComment = ''
//   ) {
//     setReviewState(prev => ({
//       ...prev,
//       [fieldKey]: {
//         status,
//         adminComment: status === 'pending' ? '' : adminComment
//       }
//     }))
//   }

//   // 3️⃣ Submit review
//   async function submitReview() {
//     setSubmitting(true)

//     const fieldsReview: Record<string, FieldReview> = {}
//     const statuses: ReviewStatus[] = []

//     Object.entries(reviewState).forEach(([key, value]) => {
//       statuses.push(value.status)
//       if (value.status !== 'pending') fieldsReview[key] = value
//     })

//     const documentStatus = computeDocumentStatus(statuses)

//     await api.post(`/api/documents/${documentId}/review`, {
//       status: documentStatus,
//       comment: overallComment,
//       fieldsReview
//     })

//     setSubmitting(false)
//   }

//   return {
//     document,
//     reviewState,
//     overallComment,
//     setOverallComment,
//     setFieldReview,
//     submitReview,
//     loading,
//     submitting
//   }
// }