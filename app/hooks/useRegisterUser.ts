/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import api from '../../lib/api'
export function useRegisterUser() {
// const { login  , error } = useAuth();
const [registerLoading, setregisterLoading] = useState<boolean>(false);
const [regeisterMessage, setRegeisterMessage] = useState<string>("");
const [registerStatus, setRegisterStatus] = useState<string>("");

const registerUser = async (userData: {name: string, email: string, password: string , phone:string , preferredVerificationMethod:string , invitationCode:string}) => {
    setregisterLoading(true);
    setRegeisterMessage("");
    setRegisterStatus("");
    try {
        const res = await api.post('/api/users/register', userData);
        // login(res.data.token);
        setRegeisterMessage(res.data.message)
        setRegisterStatus(res.status === 201 ? "success" : "failure")
        // return 
        return{data: res.data ,success : true}

    } catch (err: any) {
        // setRegeisterMessage(err?.response?.data?.message || 'User Registration failed');
        const msg = err?.response?.data?.message || 'User Registration failed';
        return{success : false , error : msg}
    } finally {
        setregisterLoading(false);
    }
};

return { registerUser, registerLoading , regeisterMessage , registerStatus};
}
