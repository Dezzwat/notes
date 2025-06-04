"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import jwt from "jsonwebtoken";
import { Loader } from "lucide-react";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      router.push("/");
    } else {
      try {
        const decodedToken = jwt.decode(savedToken);
        setUser(decodedToken.userId);
        setToken(savedToken);
      } catch (error) {
        console.error("Error decoding token", error);
        router.push("/");
      }
    }

    const timeout = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [router]);

  useEffect(() => {
    document.getElementById("title")?.focus();
  }, []);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      setError(true);
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    if (!token || !user) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Token atau data pengguna tidak valid.",
      });
      return;
    }

    setLoading(true);
    setError(false);

    const requestBody = { id_user: user, title, content };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal menambahkan catatan");
      }

      toast({
        className: cn("bg-green-500", "text-white"),
        title: "Catatan dibuat",
        description: "Catatan berhasil ditambahkan.",
      });

      router.push("/Notes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
 };

    return (
        <Card className="bg-gray-700 border-black w-[400px] mx-auto p-6 space-y-4">
            <h1 className="text-3xl text-center font-bold text-yellow-300">Buat Catatan Baru</h1>

            <div>
                <Label htmlFor="title" className="text-white ml-2 block text-lg font-medium mb-1">
                    Judul
                </Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul"
                    className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                />
            </div>

            <div>
                <label htmlFor="content" className="text-white block font-medium mb-1">
                    Isi
                </label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    placeholder="Catatan "
                    className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button className="bg-black text-white" variant="secondary" onClick={() => router.back()}>
                    Batal
                </Button>
                <Button className=" bg-yellow-300 hover:bg-yellow-200 text-black" onClick={handleCreate} disabled={loading}>
                    {loading ? "Menyimpan..." : "Simpan"}
                </Button>
            </div>
        </Card>
    );
}