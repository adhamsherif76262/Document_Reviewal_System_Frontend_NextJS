/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../../lib/api";

export function useInviteCode() {
  const [inviteCodeLoading, setInviteCodeLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState("");

  const generateInvite = async (generatedFor: string) => {
    setInviteCodeLoading(true);
    setError("");
    try {
    const res = await api.post("/api/users/generate-invite-code", { generatedFor });
    setCode(res.data.code);
    }
    catch (err: any) {
      setError(err?.response?.data?.message || 'Invide Code Generation failed');
    } finally {
      setInviteCodeLoading(false);
    }  };

  return { generateInvite, inviteCodeLoading, code , error};
}
