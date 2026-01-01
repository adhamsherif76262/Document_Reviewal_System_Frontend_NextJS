/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import api from "../../lib/api";

export function useInviteCode() {
  const [inviteCodeLoading, setInviteCodeLoading] = useState<boolean>(false);
  const [inviteCodemessage, setInviteCodeMessage] = useState<string>("");
  const [code, setCode] = useState("");

  const generateInvite = async (generatedFor: string) => {
    setInviteCodeLoading(true);
    setInviteCodeMessage("");
    try {
    const res = await api.post("/api/users/generate-invite-code", { generatedFor });
    setCode(res.data.code);
    return{data: res.data ,success : true}
    }
    catch (err: any) {
      setInviteCodeMessage(err?.response?.data?.message || 'Invide Code Generation failed');
      const msg = err?.response?.data?.message || 'Forgot Password failed'
      return{success : false , error : msg}
    } finally {
      setInviteCodeLoading(false);
    }  };

  return { generateInvite, inviteCodeLoading, code , inviteCodemessage};
}
