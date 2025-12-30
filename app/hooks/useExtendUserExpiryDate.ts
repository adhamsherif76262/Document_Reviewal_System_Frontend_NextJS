/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import api from '../../lib/api';

export function useExtendUserExpiryDate() {
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [extendExpiryDateloading, setExtendExpiryDateLoading] = useState<boolean>(false);

    const handleExtendUserExpiryDate = async (email :string) => {
        setExtendExpiryDateLoading(true);
        setMessage("");
        setStatus("");
        try {
            const userRes = await api.get(`/api/users/${email}/getUserByEmail`);
            // setStatus(userRes.status === 200 ? "success" : "failure")
            // setMessage(userRes.data.message);
            const res = await api.patch(`/api/users/${userRes.data._id}/extend-user-expiry`);
            setStatus(res.status === 200 ? "success" : "failure")
            setMessage(res.data.message);
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Failed to extend user expiry date");
        } finally {
            setExtendExpiryDateLoading(false);
        }
    };

    return {
        message,
        status,
        extendExpiryDateloading,
        handleExtendUserExpiryDate,
    };
}
