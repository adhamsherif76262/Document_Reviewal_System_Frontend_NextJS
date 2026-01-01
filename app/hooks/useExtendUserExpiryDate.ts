/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import api from '../../lib/api';

export function useExtendUserExpiryDate() {
    const [extendExpiryDateMessage, setExtendExpiryDateMessage] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [extendExpiryDateloading, setExtendExpiryDateLoading] = useState<boolean>(false);

    const handleExtendUserExpiryDate = async (email :string) => {
        setExtendExpiryDateLoading(true);
        setExtendExpiryDateMessage("");
        setStatus("");
        try {
            const userRes = await api.get(`/api/users/${email}/getUserByEmail`);
            // setStatus(userRes.status === 200 ? "success" : "failure")
            // setMessage(userRes.data.message);
            const res = await api.patch(`/api/users/${userRes.data._id}/extend-user-expiry`);
            setStatus(res.status === 200 ? "success" : "failure")
            setExtendExpiryDateMessage(res.data.message);
            return{data: res.data ,success : true}
        } catch (err: any) {
            setExtendExpiryDateMessage(err.response?.data?.message || "Failed to extend user expiry date");
            const msg = err?.response?.data?.message || 'Extending User Account Expiry Date Has Failed'
            return{success : false , error : msg}
        } finally {
            setExtendExpiryDateLoading(false);
        }
    };

    return {
        extendExpiryDateMessage,
        status,
        extendExpiryDateloading,
        handleExtendUserExpiryDate,
    };
}
