"use client";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) window.location.href = "/admin"; // redirect ke admin
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center p-6 text-black">
            <h1 className="text-xl font-bold mb-4">Login Admin</h1>
            <input
                placeholder="Email"
                className="border p-2 mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 mb-2"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Login
            </button>
        </div>
    );
}
