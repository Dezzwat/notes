import React from "react";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDelete } from "@/components/my-component/DialogDelete";
import Link from "next/link";

const CardNotes = ({ note ,isOwner }) => {
  return (
    <div className="bg-gray-700 min-h-[160px] flex flex-col gap-4 justify-between rounded-lg shadow-md p-4 max-w-sm w-full">
      <div>
        <h3 className="text-xl font-semibold text-yellow-300">{note.title}</h3>
        <p className="text-white mt-2 line-clamp-3">{note.content}</p>
      </div>

      <div className="text-sm text-gray-400">
        <p>Created at: {new Date(note.created_at).toLocaleString()}</p>
        <p>Updated at: {new Date(note.updated_at).toLocaleString()}</p>
      </div>
      {
      isOwner ? (
      <div className="flex gap-1 self-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {/* <DialogEdit note={note}/> */}
              <Link
                    href={`/Notes/${note.id_notes}/edit`}
                    className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition">
                    <SquarePen size={18} />
                  </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View & Edit Notes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DialogDelete note={note} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Notes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ) : (
      <div>

      </div>
    )
      }
      </div>
  );
};

export default CardNotes;