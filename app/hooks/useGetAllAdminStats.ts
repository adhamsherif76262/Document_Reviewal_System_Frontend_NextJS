/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react'
import api from '../../lib/api';

export function useGetAllAdminStats() {

    const [adminstatsloading, setAdminstatsLoading] = useState<boolean>(false);
     const [adminstatsstatus, setAdminstatsStatus] = useState<string>("");
     const [adminstatsmessage, setAdminstatsMessage] = useState<string>("");;
     const [adminstats, setAdminstats] = useState<any>(null);

     const getAllAdminStats = async () => {
        setAdminstatsLoading(true);
        setAdminstatsStatus("");
        setAdminstatsMessage("");
        try {
            const res = await api.get('/api/users/admins');
            setAdminstatsStatus(res.status === 200 ? "success" : "failure")
            setAdminstatsMessage(res.data.message)
            setAdminstats(res.data);
            return res.data
        } catch (err:any) {
            setAdminstatsMessage(err?.response?.data?.message || 'Failed to get all admin stats')
        } finally {
            setAdminstatsLoading(false);
        }
     }

     return { adminstatsloading, adminstatsmessage, adminstats, adminstatsstatus, getAllAdminStats };
}
