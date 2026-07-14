/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useReviewCertificate.ts
import { useState } from "react";
import axios from "axios";
import api from "../../lib/api";

type ActionType = "approve" | "reject";

export const useReviewCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reviewCertificate = async (
    Doc_Id: string,
    action: ActionType,
    comment?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await api.patch(
        `/api/certificates/${Doc_Id}/reviewfinalcertificate`,
        {
          action,
          comment,
        },
        {
          withCredentials: true, // or Authorization header if using token
        }
      );

      setSuccess(res.data.message || `Certificate ${action}d successfully`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    reviewCertificate,
    loading,
    error,
    success,
  };
};