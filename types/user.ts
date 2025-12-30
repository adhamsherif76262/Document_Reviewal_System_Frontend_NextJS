import { User } from 'lucide-react';
/* eslint-disable @typescript-eslint/no-explicit-any */
// types/user.ts

import {Document} from "./document"
export interface user {
    _id: string
    name: string
    email: string
    password: string
    role: string
    adminLevel: string
    expiryStatus: string
    phone: string
    preferredVerificationMethod: string
    isVerified: boolean
    expirable: boolean
    lastOTPResend: string
    expiryDate: string
    createdAt: string
    updatedAt: string
  
}
export interface EmbededUser {
  user:user
  totalDocuments: number
  pendingCount: number
  approvedCount:number
  partiallyApprovedCount?: number
  rejectedCount: number

  pendingDocuments: Document[]
  partiallyApprovedDocuments?: Document[],
  approvedDocuments: Document[],
  rejectedDocuments: Document[]

}

export interface UsersResponse {
  pagination: {
      totalUsers  : number
      totalPages  : number
      currentPage : number  
  }
  // page: number
  // pages: number
  users: user[]
}
