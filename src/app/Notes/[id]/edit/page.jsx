"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function EditNotePage({ params }) {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
      return;
    }
    setToken(storedToken);

    const fetchNote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (!res.ok) throw new Error("Catatan tidak ditemukan");

        const { data } = await res.json();
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        toast({
          title: "Gagal mengambil catatan",
          description: "Pastikan catatan tersedia.",
        });
      }
    };

    fetchNote();
  }, [id, toast, router]);


  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_notes: id,
          id_user: note.id_user,
          title,
          content,
        }),
      });

      if (!res.ok) throw new Error("Gagal memperbarui catatan");

      toast({
        className: cn("bg-green-500", "text-white"),
        title: "Catatan diperbarui",
        description: "Perubahan telah disimpan.",
      });

      router.push("/Notes");
    } catch (error) {
      toast({
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat memperbarui catatan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative z-10 flex items-center justify-center min-h-screen py-10 px-4">
        {!note ? (
          <div className="flex flex-col items-center justify-center gap-4 text-white">
            <Loader size={48} className="animate-spin" />
            <p className="text-lg font-semibold">Loading Catatan...</p>
          </div>
        ) : (
          <Card className="max-w-xl w-full p-8 space-y-6 bg-white/5 border-white/10 text-white rounded-2xl shadow-2xl">
            <h1 className="text-yellow-300 text-3xl text-center font-bold ">
              Edit Catatan
            </h1>

            <div>
              <Label htmlFor="title" className="block text-lg font-medium mb-2">
                Judul
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <Label htmlFor="content" className="block text-lg font-medium mb-2">
                Isi
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-white bg-black"
              >
                Batal
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-yellow-300 hover:bg-yellow-200 text-black font-semibold"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}