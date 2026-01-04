// types/reviews.ts

export interface ReviewedFields {
  fieldKey: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Admin {
  _id: string
  email: string
  name: 'user' | 'admin'
  phone: string
  adminLevel: string
}

// ======================
// Main Review
// ======================

export interface Reviews {
  _id: string
  reviewedBy: Admin
  document: string
  state: 'Domestic' | 'Imported'
  status: 'pending' | 'partiallyApproved' | 'approved' | 'rejected'
  docNumber: string
  docType: string
  comment: string | null
  fieldsReviewed : ReviewedFields[]
  createdAt: string
  updatedAt: string
}

// ======================
// API Responses
// ======================

export interface ReviewsResponse {
  total: number
  count: number
  page: number
  pages: number
  reviews: Reviews[]
}
