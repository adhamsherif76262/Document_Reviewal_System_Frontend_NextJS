/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from "../../lib/api";
import axios, { AxiosError, isAxiosError } from 'axios';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: (email: string) => Promise<void>;
}

interface User {
  // [x: string]: ReactNode;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  adminLevel?: string;
  expiryStatus?: string;
  lastOTPResend?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  expiryDate?: Date;
  role?: string;
  preferredVerificationMethod?: string;
  verificationStatus?: string;
  isVerified?: boolean;
  expirable?: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // ✅ Load user on mount

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users/me");
        setUser(res.data);
        console.log(res.data)
      } catch (err : any) {
        setError( err.response?.data?.message || "Failed to fetch user data");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post(
        '/api/users/login',
        { email, password } // ✅ important to send cookies
      );
      setUser(res.data); // API returns user info only, token is in cookie
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(res.data)
    }catch (err: any) {
  const msg =
    err?.response?.data?.message ||
    "Login failed";

  setError(msg);
} finally {
      setLoading(false);
    }
  };
  
  const logout = async (email:string) => {
    setLoading(true);
        setError("");
    try {
      await api.post('/api/users/logout', {email});
      setUser(null);
    } catch (err:any) {
      // console.error('Logout failed:', err);
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout , error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};