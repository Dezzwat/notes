"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import jwt from "jsonwebtoken";

export default function CreateNotePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({})
    const token = localStorage.getItem("token")
     useEffect(() => {
        if (!token) {
            return router.push("/login");
        }
        const decodePayload = jwt.decode(token)
        setPayload(decodePayload);
    }, []);
    const router = useRouter();
    const { toast } = useToast();
    const handleCreate = async () => {
        if (!title.trim() || !content.trim()) {
            toast({
                title: "Gagal menyimpan",
                description: "Judul dan isi tidak boleh kosong.",
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id_user: payload.userId,
                    title,
                    content,
                }),
            });

            if (!res.ok) throw new Error("Gagal menambahkan catatan");

            toast({
                className: cn("bg-green-500", "text-white"),
                title: "Catatan dibuat",
                description: "Catatan berhasil ditambahkan.",
            });

            router.push("/Notes");
        } catch (error) {
            toast({
                title: "Gagal menyimpan",
                description: "Terjadi kesalahan saat menambahkan catatan.",
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