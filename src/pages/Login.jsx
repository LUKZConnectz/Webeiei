import { useState } from "react";

import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    setStatus(error ? error.message : "ตรวจสอบอีเมล");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-5">RiderLog</h1>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-3 rounded-xl" type="email" />
        <button onClick={login} className="w-full bg-indigo-500 text-white mt-4 py-3 rounded-xl hover:bg-indigo-600">Login</button>
        {status && <p className="text-sm text-gray-500 mt-4">{status}</p>}
      </div>
    </div>
  );
}
