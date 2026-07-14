/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSubmitCertificate.ts
import { useState } from "react";
import api from "../../lib/api";

export const useSubmitCertificate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitCertificate = async (docId: string, files: File[]) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("certificateImages", file); // must match backend (req.files)
      });

      const res = await api.post(
        `/api/certificates/${docId}/submitfinalcertificate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // important if you're using cookies/auth
        }
      );

      setSuccess(res.data.message);
    } catch (error: any) {
        const msg = error?.response?.data?.message || 'Error Submitting Certificate'
        // alert(msg)
        setError(msg);
      return{success : false , error : msg}
    //     return{success : false , error : error}
    } finally {
      setLoading(false);
    }
  };

  return {
    submitCertificate,
    loading,
    error,
    success,
  };
};