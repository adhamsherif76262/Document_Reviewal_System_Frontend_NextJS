/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../../lib/api";

export function useInviteCode() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState("");

  const generateInvite = async (generatedFor: string) => {
    setLoading(true);
    setError("");
    try {
    const res = await api.post("/api/users/generate-invite-code", { generatedFor });
    setCode(res.data.code);
    }
    catch (err: any) {
      setError(err?.response?.data?.message || 'Invide Code Generation failed');
    } finally {
      setLoading(false);
    }  };

  return { generateInvite, loading, code , error};
}
