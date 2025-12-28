// types/document.ts

// ======================
// Shared / Reusable
// ======================

export type ReviewStatus = 'pending' | 'approved' | 'rejected'
export type DocumentStatus = 'pending' | 'partiallyApproved' | 'approved' | 'rejected'
export type FieldType = 'text' | 'image' | 'pdf'

export interface BasicUser {
  _id: string
  name: string
  email: string
  phone?: string
  role?: 'user' | 'admin'
  adminLevel?: 'super' | 'regular' | null
}

// ======================
// Field Review
// ======================

export interface FieldReview {
  status: ReviewStatus
  adminComment: string | null
}

// ======================
// Document Field
// ======================

export interface DocumentField {
  type: FieldType
  value: string[] | string
  tab: string
  review: FieldReview
}

// Dynamic object:
// fields: { [fieldName]: DocumentField }
export type DocumentFields = Record<string, DocumentField>

// ======================
// Certificate
// ======================

export interface DocumentCertificate {
  images: string[]
  uploadedBy: BasicUser
  uploadedAt: string
  status: ReviewStatus
  comment: string | null

  rejectedAt?: string | null
  rejectedBy?: BasicUser | null

  approvedAt?: string | null
  approvedBy?: BasicUser | null
}

// ======================
// Custody
// ======================

export interface DocumentCustody {
  currentHolder: BasicUser
  previousHolders: BasicUser[]
}

// ======================
// Activity Log
// ======================

export interface DocumentActivity {
  action: string
  by: string
  role: 'user' | 'admin'
  timestamp: string
}

// ======================
// Main Document
// ======================

export interface Document {
  _id: string

  user: BasicUser

  docType: string
  state: 'Domestic' | 'Imported'

  fields: DocumentFields

  status: DocumentStatus

  certificate?: DocumentCertificate | null

  submittedAt: string
  lastReviewedAt?: string | null

  custody: DocumentCustody

  assignedAdmins: BasicUser[]

  hasPendingResubmission: boolean
  adminComment: string | null

  docNumber: string

  activityLog: DocumentActivity[]

  createdAt: string
  updatedAt: string
}

// ======================
// API Responses
// ======================

export interface DocumentsResponse {
  total: number
  page: number
  pages: number
  documents: Document[]
}

export interface SingleDocumentResponse {
  document: Document
}
