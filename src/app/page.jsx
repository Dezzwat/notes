import Link from "next/link";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col items-center gap-8 mt-20">
        <h1 className="text-center text-6xl font-bold text-yellow-300">
          Welcome to NotesApp
        </h1>
        <p className="text-white text-center text-lg italic">
          A simple and powerful note-taking app for your everyday thoughts.
        </p>

        <Link href="/Notes/Create">
          <Button
            variant="outline"
            className="bg-yellow-300 border-black text-black font-semibold hover:bg-yellow-200"
          >
            Buat Catatan Baru
          </Button>
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Feature</h2>
        <div className="flex gap-4">
          <Card
            title={"Take Notes"}
            content={
              "Create and organize your notes with ease. Add title and content to each note."
            }
          />
          <Card
            title={"View Notes"}
            content={
              "Browse all your notes and find them easily whenever you need."
            }
          />
          <Card
            title={"Edit Notes"}
            content={
              "Update and modify your notes whenever needed with just a few clicks."
            }
          />
        </div>
      </div>
    </div>
  );
}
