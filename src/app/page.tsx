"use client";

import { useState } from "react";
import { InputFile } from "./@components/inputFile";
import { ListFiles } from "./@components/listFiles";
import { FileProperties } from "./@types/types";

export default function Home() {
  const [getFilesforList, setFilesforList] = useState<Array<FileProperties>>();

  return (
    <main className="my-2 flex min-h-screen flex-col items-center justify-center md:flex-row">
      <InputFile setFilesToListComponent={setFilesforList} />
      <ListFiles getFiles={getFilesforList} />
    </main>
  );
}
