"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AsyncResponse } from "../@types/types";
import { FileUpload } from "../@types/types";
import { FileProperties } from "../@types/types";

async function sendFileToAPI(
  file: HTMLInputElement,
): Promise<AsyncResponse<FileUpload>> {
  const formData = new FormData();
  if (file.files) {
    for (let index = 0; index < file.files.length; index++) {
      formData.append(file.files[index].name, file.files[index]);
    }
  }

  const response = await fetch("http://localhost:3000/api/upload", {
    method: "post",
    body: formData,
  });

  if (!response.ok) {
    return {
      status: "failed",
      error: {
        code: "500",
        message: "Internal Server Error",
      },
    };
  }

  const data: FileUpload = await response.json();

  return {
    status: "success",
    data: data,
  };
}

const uploadFilesEvent = async (v: HTMLInputElement) => {
  await sendFileToAPI(v);
};

function fileDragHandler(
  e: React.DragEvent<HTMLSpanElement>,
  setFiles: Dispatch<SetStateAction<Array<FileProperties>>>,
) {
  e.preventDefault();
  if (e.dataTransfer.items) {
    Array.from(e.dataTransfer.items).map((item) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        setFiles((prevFiles) => {
          if (file?.name) {
            return [
              ...prevFiles,
              { filename: file.name, size: file?.size, extension: file?.type },
            ];
          }
          return prevFiles;
        });
      }
    });
  }
}

export function InputFile({ setFilesToListComponent }: any) {
  const [getFiles, setFiles] = useState<Array<FileProperties>>([]);
  useEffect(() => {
    setFilesToListComponent(getFiles);
  }, [getFiles]);
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center rounded-md bg-neutral-800 transition-all duration-500 sm:w-[600px]">
      <label
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border-4 border-dashed border-neutral-600 p-4"
        htmlFor="fileDrop"
        onDrop={(e) => {
          fileDragHandler(e, setFiles);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <span className="select-none text-neutral-400">
          Drag and drop files here or click to browse
        </span>
      </label>
      <input
        className="hidden w-full"
        id="fileDrop"
        type="file"
        multiple
        onChange={(e) => {
          uploadFilesEvent(e.target);
        }}
      ></input>
    </div>
  );
}
