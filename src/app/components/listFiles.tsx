"use client";

import { FileCards } from "./listFilesComponents/listFileCards";
import { useStoreFiles } from "../store/store";

function formatSize(size: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}

export function ListFiles() {
  const { files } = useStoreFiles();

  return (
    <div className="mt-4 flex h-fit w-full flex-col rounded-md border border-neutral-600 bg-neutral-800 p-4 transition-all duration-200 sm:w-[600px] md:ml-4 md:mt-0 md:h-[500px]">
      <div>
        <h1 className="flex w-full select-none flex-col items-center justify-center text-lg font-bold text-neutral-300">
          Files:
        </h1>
      </div>
      {Array.isArray(files) && Array.from(files).length > 0 && (
        <div className="overflow-auto rounded-l-md border border-neutral-600">
          <FileCards getFiles={files} />
        </div>
      )}
    </div>
  );
}