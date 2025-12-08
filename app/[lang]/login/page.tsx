"use client";

import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async () => {
    await login(email, password);
    router.push(`/${localStorage.getItem("lang") || "en"}/dashboard`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="Password" />
      <button onClick={handle} className="btn-primary">Login</button>
    </div>
  );
}
