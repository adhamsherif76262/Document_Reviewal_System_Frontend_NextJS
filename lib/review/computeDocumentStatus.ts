// lib/review/computeDocumentStatus.ts

type ReviewStatus = 'approved' | 'rejected' | 'pending'
type DocumentStatus = 'approved' | 'rejected' | 'partiallyApproved'

export function computeDocumentStatus(
  fieldStatuses: ReviewStatus[]
): DocumentStatus {
  if (fieldStatuses.length === 0) {
    return 'partiallyApproved'
  }

  const hasPending = fieldStatuses.some(s => s === 'pending')
  const hasApproved = fieldStatuses.some(s => s === 'approved')
  const hasRejected = fieldStatuses.some(s => s === 'rejected')

  if (hasPending) return 'partiallyApproved'
  if (hasApproved && hasRejected) return 'partiallyApproved'
  if (hasApproved) return 'approved'

  return 'rejected'
}