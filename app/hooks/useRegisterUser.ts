/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import api from '../../lib/api'
export function useRegisterUser() {
// const { login  , error } = useAuth();
const [loading, setLoading] = useState<boolean>(false);
const [message, setMessage] = useState<string>("");
const [status, setStatus] = useState<string>("");

const registerUser = async (userData: {name: string, email: string, password: string , phone:string , preferredVerificationMethod:string , inviteCode:string}) => {
    setLoading(true);
    setMessage("");
    setStatus("");
    try {
        const res = await api.post('/api/users/register', userData);
        // login(res.data.token);
        setMessage(res.data.message)
        setStatus(res.status === 201 ? "success" : "failure")
        return res.data
    } catch (err: any) {
        setMessage(err?.response?.data?.message || 'User Registration failed');
    } finally {
        setLoading(false);
    }
};

return { registerUser, loading , message , status};
}
