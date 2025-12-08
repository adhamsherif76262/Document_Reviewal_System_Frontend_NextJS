'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from "../../lib/api";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface User {
  // [x: string]: ReactNode;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  adminLevel?: string;
  lastOTPResend?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
  preferredVerificationMethod?: string;
  verificationStatus?: string;
  isVerified?: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await api.get('/api/users/my-submissions');
//         setUser(data.user); // adjust if API returns differently
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users/me");
        setUser(res.data);
        console.log(res.data)
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await api.post(
        '/api/users/login',
        { email, password } // ✅ important to send cookies
      );
      setUser(data); // API returns user info only, token is in cookie
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/api/users/logout', {});
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};



// import { useEffect, useState, createContext, useContext } from "react";
// import axios from "axios";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check if user is logged in on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/users/me", { withCredentials: true });
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const login = async (email, password) => {
//     const res = await axios.post("/api/users/login", { email, password }, { withCredentials: true });
//     setUser(res.data); // Update context state
//   };

//   const logout = async () => {
//     await axios.post("/api/users/logout", {}, { withCredentials: true });
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
