"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronRight, Loader, Trash, Upload } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from "file-saver";
import { Button } from "./ui/button";
import { classifyPhotos } from "@/http/classifyPhotos";

const FileUpload = () => {
  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);
  const [isFilesClassifying, setIsFilesClassifying] = useState(false);

  const handleFileChange = (e: any) => {
    const newFiles = Array.from(e.target.files as File[]).map((file: File) => ({
      id: uuidv4(),
      file: file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileDelete = (idToDelete: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== idToDelete));
  };

  const handleSubmit = () => {
    setIsFilesClassifying(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file.file);
    });
    classifyPhotos(formData)
      .then((res) => {
        let filename = res.headers["content-disposition"]
          .split("filename=")[1]
          .split(".")[0];
        let extension = res.headers["content-disposition"]
          .split(".")[1]
          .split(";")[0];

        var blob = new Blob([res.data], { type: "application/zip" });
        saveAs(blob, `${filename}.${extension}`);
      })
      .catch(err => console.log(err))
      .finally(() => setIsFilesClassifying(false));
  };

  return (
    <div>
      <div className={cn("flex items-center justify-center mb-2", files.length === 0 && "h-full")}>
        <label
          className={cn(
            files.length > 0
              ? "flex items-center gap-x-2 bg-emerald-500 text-white hover:bg-emerald-600 p-3 rounded-lg cursor-pointer transition m-2"
              : "flex flex-col items-center jusitfy-center border-2 border-dashed p-14 shadow-lg md:hover:scale-[1.05] transition m-5 text-zinc-500 rounded-md hover:cursor-pointer "
          )}
          htmlFor="document-file"
        >
          <p className="text-center">
            {files.length > 0 ? "Добавить файлы..." : "Выбрать файлы..."}
          </p>
          <Upload className={cn(files.length === 0 && "text-zinc-400 w-10 h-10")} />
        </label>
        <input
          key={files.length}
          type="file"
          accept="image/*"
          id="document-file"
          multiple
          onChange={handleFileChange}
          hidden
        />
      </div>

      <ScrollArea className={cn("h-60 md:h-72 pr-2", files.length === 0 && "hidden")}>
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 my-1 border-y-2 border-dashed border-zinc-400"
          >
            <p className="max-w-[80%] line-clamp-2">{file.file.name}</p>
            <Trash
              onClick={() => handleFileDelete(file.id)}
              className="text-rose-500 w-7 h-7 cursor-pointer"
            />
          </div>
        ))}
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {files.length > 0 && (
        <div className="mt-5 flex justify-end">
          <Button
            className="flex items-center group bg-zinc-300 ml-auto text-black hover:bg-zinc-400"
            onClick={handleSubmit}
          >
            {isFilesClassifying ? (
              <>
                <Loader className="text-zinc-500 animate-spin" />
              </>
            ) : (
              <>
                <p>Подтвердить</p>
                <ChevronRight className="text-zinc-500 group-hover:translate-x-1 transition" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
