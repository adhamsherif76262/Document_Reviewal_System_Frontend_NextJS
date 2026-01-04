/* eslint-disable @typescript-eslint/no-explicit-any */
// types/metrics.ts
export interface DocumentStatuses {
  pending: number
  approved: number
  partiallyApproved: number
  rejected: number
  status: string
}
export interface UsersRoles {
  regularUsers:number
  admins:number
  superAdmins:number
}
export interface ReviewsCount {
  rejected:number
  partiallyApproved:number
  approved:number
}
export interface LogsActionsCount {
  SubmitFinalCertificate:number
  GetDocTypeAssignments:number
  SyncDocTypeAssignments:number
  GenerateRegistrationCode:number
  ExtendUserAccountExpiryDate:number
  GetAllReviews:number
  ListAllDocs:number
  assign:number
  reviewReturn:number
  rejected:number
  partiallyApproved:number
  approved:number
  fileReSubmission:number
  fileSubmission:number
  resetPassword:number
  forgotPassword:number
  verifyEmail:number
  register:number
  logout:number
  login:number
  GetAllAdminsStats:number
  GetAllUsersStats:number
  GetAllPersonalDocs:number
  RejectFinalCertificate:number
  ApproveFinalCertificate:number
  ResubmitFinalCertificate:number
}

export interface MetricsResponse {
  totalDocuments: number
  totalUsers: number
  usersRoles: UsersRoles | null
  totalReviews: number
  totalLogs: number
  logsActionsCount: LogsActionsCount | null
  reviewsCount: ReviewsCount | null
  documentStatuses: DocumentStatuses | null
}
