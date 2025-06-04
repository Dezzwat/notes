"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {

        try {
            setLoading(true);
            setError("");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({
                    username,
                    password
                })
            })
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Login failed")
            };
            const dataresponse = await response.json()
            localStorage.setItem("token",dataresponse.token)
            window.location.href ="/Notes"
        } catch (e) {
            console.log(e)
            setError(e.message)
        } finally {
            setLoading(false)
        }
    };


  return (
    <div className="flex items-center justify-center h-full min-h-[calc(100vh-theme(spacing.40))] p-4 ">
      <Card className="bg-gray-700 border-black w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-yellow-300 font-bold text-center text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-white" htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Masukan Username"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-white" htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleLogin} type="submit" className="bg-yellow-300 hover:bg-yellow-200 w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}