"use client";

import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../../src/components/ui/button";

export default function LoginPage() {
  const {user , login , error , loading} = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { lang } = useParams();

  if(user){
    router.push(`/${lang}/${user.role === "user" ? "submissions" : "dashboard"}`);
  }
  const handleLogin = async () => {
    await login(email, password);
  };
  // const userMessage = apiError?.response?.data?.message || apiError?.message || 'An unknown error occurred.';


  const handleForgotPassword = async ()=> {
    router.push(`/${lang}/forgotPassword`);
  }
    
  return (
    // <form action="" method="">
    // </form>
       <section>
        <div className="p-6 max-w-md mx-auto">
          <input onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="Password" />
          <Button onClick={handleLogin} className="btn-primary">Login</Button>
          {error && <h2 className="text-red-600 text-center mt-24">{error}</h2>}
          {loading && <div className="text-3xl text-blue-700">Logging You In...</div>}
        </div>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
          <Button onClick={() => router.push(`/${lang}/register`)} className="text-sm text-blue-600 hover:underline">Register</Button>
        </div>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-gray-600">Forgot your password?</p>
          <Button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:underline">Reset Password</Button>
        </div>
      </section>
  );
}
