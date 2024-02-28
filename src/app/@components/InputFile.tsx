"use client";
import { AsyncResponse } from "../@types/types";
import { FileUpload } from "../@types/types";

async function sendFileToAPI(
  file: HTMLInputElement
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
const uploadFiles = async (v: HTMLInputElement) => {
  var apiReturnValues;
  apiReturnValues = await sendFileToAPI(v);
  console.log(apiReturnValues.status);
};

export function InputFile() {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-800 w-full sm:w-[600px] h-[500px] transition-all duration-200 rounded-md">
      <label
        className="h-full w-full flex flex-col justify-center items-center cursor-pointer border-4 border-dashed border-neutral-600 rounded-md p-4"
        htmlFor="fileDrop"
      >
        <span className="text-neutral-400 select-none">
          Drag and drop files here or click to browse
        </span>
      </label>
      <input
        className="w-full hidden"
        id="fileDrop"
        type="file"
        multiple
        onChange={(e) => {
          uploadFiles(e.target);
        }}
      ></input>
    </div>
  );
}
