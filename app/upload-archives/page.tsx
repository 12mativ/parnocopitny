import ArchiveUpload from "@/components/archive-upload";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center overflow-y-auto h-full p-2">
      <div className="p-4 rounded-lg bg-zinc-100 min-w-[100%] md:min-w-[50%] shadow-lg">
        <div className="w-fit mb-2">
          <Link href={"/"} className="w-fit">
            <ArrowLeft className="w-8 h-8 rounded-full hover:bg-zinc-300 transition" />
          </Link>
        </div>
        <>
          <p className="text-sm font-semibold text-zinc-700 w-[80%]">
            Выберите архив с фото, который необходимо классифицировать.
          </p>
          <ArchiveUpload />
        </>
        <div className="flex justify-end pt-2">
          <div className="relative w-[50px] h-[75px]">
            <Image src={'/1.png'} fill alt="deer" />
          </div>
        </div>
        
      </div>
    </div>
  );
}
