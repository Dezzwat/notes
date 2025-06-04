"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
    const [nm_lengkap, setNm_lengkap] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {

        try {
            setLoading(true);
            setError("");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({
                    nm_lengkap,
                    email,
                    username,
                    password
                })
            })
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Registration failed")
            };

            router.push("/login")
        } catch (e) {
            console.log(e)
            setError(e.message)
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="flex items-center justify-center h-full min-h-[calc(100vh-theme(spacing.40))] p-4">
            <Card className="bg-gray-700 border-black w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-yellow-300 font-bold text-center text-3xl">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label className="text-white" htmlFor="nm_lengkap">Nama Lengkap</Label>
                            <Input
                                id="nm_lengkap"
                                name="nm_lengkap"
                                value={nm_lengkap}
                                onChange={(e) => { setNm_lengkap(e.target.value) }}
                                required
                                placeholder="Nama lengkap"
                                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-white" htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                placeholder="you@example.com"
                                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-white" htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                required
                                placeholder="Username "
                                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-white" htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                                placeholder="••••••••"
                                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button onClick={handleRegister} type="submit" className="bg-yellow-300 hover:bg-yellow-200 text-black w-full" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}