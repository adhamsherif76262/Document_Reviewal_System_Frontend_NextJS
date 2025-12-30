// types/document.ts

import { StaticImport } from "next/dist/shared/lib/get-img-props"

// ======================
// Shared / Reusable
// ======================

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'none'
export type DocumentStatus = 'pending' | 'partiallyApproved' | 'approved' | 'rejected'
// export type FieldType = 'text' | 'image' | 'pdf'

export interface BasicUser {
  _id: string
  name: string
  email: string
  expiryStatus: string
  phone?: string
  isVerified?: boolean
  expirable?: boolean
  role?: string
  adminLevel?: 'super' | 'regular' | null
  lastOTPResend?: string | null
  submittedAt?: string | null
  uploadedAt?: string | null
  expiryDate?: string | null
  createdAt: string
  updatedAt: string
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

type TextField = {
  type: 'text';
  value: string;
  review?: {
    status: 'approved' | 'rejected' | 'pending';
    adminComment?: string;
  };
};

type ImageField = {
  type: 'image';
  value: string[];
  review?: {
    status: 'approved' | 'rejected' | 'pending';
    adminComment?: string;
  };
};

type PdfField = {
  type: 'pdf';
  value: string;
  review?: {
    status: 'approved' | 'rejected' | 'pending';
    adminComment?: string;
  };
};

export interface DocumentField {
  // type: FieldType
  type: TextField | ImageField | PdfField
  value: string[]
  // value: string | StaticImport
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
  comment: string | undefined
  // submittedAt?: string | undefined

  rejectedAt?: string
  rejectedBy?: BasicUser | null

  approvedAt?: string
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
