"use client";

import { ChevronRight, Trash, Upload } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { classifyArchive } from "@/http/classifyArchive";

const FileUpload = () => {
  const [archive, setArchive] = useState<File[] | null>(null);
  const [isFilesClassifying, setIsFilesClassifying] = useState(false);

  const handleFileChange = (e: any) => {
    // const newFiles = Array.from(e.target.files as File[]).map((file: File) => ({
    //   id: uuidv4(),
    //   file: file,
    // }));
    setArchive(e.target.files);
  };

  const handleArchiveDelete = () => {
    setArchive(null);
  };

  const handleSubmit = () => {
    setIsFilesClassifying(true);
    const formData = new FormData();

    formData.append("zip", archive![0]);

    classifyArchive(formData).finally(() => setIsFilesClassifying(false))
  };

  return (
    <div>
      <div className={cn("flex items-center justify-center mb-2", archive && "h-full")}>
        <label
          className={cn(
            archive
              ? "hidden"
              : "flex flex-col items-center jusitfy-center border-2 border-dashed p-14 shadow-lg md:hover:scale-[1.05] transition m-5 text-zinc-500 rounded-md hover:cursor-pointer "
          )}
          htmlFor="document-file"
        >
          <p className="text-center">
            {archive ? "Добавить файлы..." : "Выбрать файлы..."}
          </p>
          <Upload className={cn(archive && "text-zinc-400 w-10 h-10")} />
        </label>
        <input
          type="file"
          accept=".zip"
          id="document-file"
          onChange={handleFileChange}
          hidden
        />
      </div>

      <div>
        {archive && (
          <div
            className="flex items-center justify-between py-3 my-1 border-y-2 border-dashed border-zinc-400"
          >
            <p className="max-w-[80%] line-clamp-2">{archive[0].name}</p>
            <Trash
              onClick={() => handleArchiveDelete()}
              className="text-rose-500 w-7 h-7 cursor-pointer"
            />
          </div>
        )}
      </div>

      {archive && (
        <div className="mt-5 flex justify-end">
          <Button
            className="flex items-center group bg-zinc-300 ml-auto text-black hover:bg-zinc-400"
            onClick={handleSubmit}
          >
            <p>Подтвердить</p>
            <ChevronRight className="text-zinc-500 group-hover:translate-x-1 transition" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
