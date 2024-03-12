"use client";

import { FileCards } from "./listFilesComponents/listFileCards";
import { useStoreFiles } from "../store/store";
import { SubmitFilesToAPI } from "./submitFilesToAPI";

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
    <div className="mb-3 mt-4 flex h-[500px] w-full flex-col justify-between rounded-md border border-neutral-600 bg-neutral-800 p-4 transition-all duration-200 sm:w-[600px] md:mb-0 md:ml-7 md:mt-0">
      <div>
        <div>
          <h1 className="mb-2 flex w-full select-none flex-col items-center justify-center  text-lg font-bold text-neutral-300">
            Files:
          </h1>
        </div>
        {Array.isArray(files) && Array.from(files).length > 0 && (
          <div className="max-h-80  overflow-auto rounded-md border border-neutral-600 p-2 text-neutral-50">
            <FileCards getFiles={files} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <SubmitFilesToAPI />
      </div>
    </div>
  );
}
