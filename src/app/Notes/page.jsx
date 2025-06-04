"use client";

import React, { useEffect, useState } from "react";
import CardNotes from "@/components/my-component/CardNotes";
import { Loader } from "lucide-react";
import jwt from "jsonwebtoken";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AllNotesPage = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [otherNotes, setOtherNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState(null);

  // Ambil dan decode token JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setPayload(decoded);
      } catch (error) {
        console.error("Gagal decode token:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (payload) {
      fetchNotes();
    }
  }, [payload]);
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
      const data = await response.json();
      const allNotes = data.data.notes;

      const user = allNotes.filter(
        (note) => note.id_user === payload?.userId
      );
      const others = allNotes.filter(
        (note) => note.id_user !== payload?.userId
      );

      setUserNotes(user);
      setOtherNotes(others);
    } catch (err) {
      console.error("Gagal fetch catatan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container max-w-screen-lg mx-auto p-4">
        <h1 className="mt-6 text-4xl font-bold text-center text-yellow-300 mb-10">
          All Notes
        </h1>

        {loading ? (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
            <Loader size={48} className="animate-spin" />
            <p className="text-lg font-semibold">Loading ...</p>
          </div>
        ) : (
          <Tabs defaultValue="user" className="text-white">
            <TabsList className="flex justify-center rounded-xl mb-6 bg-transparent">
              <TabsTrigger
                value="user"
                className="text-white data-[state=active]:bg-yellow-300 px-6 py-2 rounded-xl"
              >
                Catatan User
              </TabsTrigger>
              <TabsTrigger
                value="others"
                className="text-white data-[state=active]:bg-yellow-300 px-6 py-2 rounded-xl"
              >
                Catatan Lain
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {userNotes.length > 0 ? (
                  userNotes.map((note) => (
                    <CardNotes key={note.id_notes} note={note} isOwner={true} />
                  ))
                ) : (
                  <p className="text-white">Belum ada catatan buatan Anda.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="others">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {otherNotes.length > 0 ? (
                  otherNotes.map((note) => (
                    <CardNotes key={note.id_notes} note={note} isOwner={false} />
                  ))
                ) : (
                  <p className="text-white">Tidak ada catatan dari pengguna lain.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default AllNotesPage;