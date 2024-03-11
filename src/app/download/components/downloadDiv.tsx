"use server";

import {
  AsyncResponse,
  APISuccessType,
  FileStatsType,
  APIErrorType,
} from "@/app/types/types";
import { CardForEachFile } from "./cardForEachFile";
import { notFound } from "next/navigation";
import { DownloadButton } from "./downloadButton";

async function listDownloadAPI(
  path: string,
): Promise<
  | AsyncResponse<APISuccessType<Array<FileStatsType>>>
  | AsyncResponse<APIErrorType>
> {
  const formData = new FormData();
  formData.append("path", path);

  try {
    const response = await fetch(
      "http://localhost:3000/api/downloadListFiles",
      {
        method: "post",
        body: formData,
        //cache: "no-cache",
      },
    );
    if (response.ok) {
      const filesList = await response.json();
      //console.log(filesList);
      return {
        status: "success",
        data: filesList,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "failed",
      error: {
        code: "500",
        message: "Something went wrong! The file list could not be returned.",
      },
    };
  }
  return {
    status: "failed",
    error: {
      code: "500",
      message: "Something went wrong! Cause you should not be here!",
    },
  };
}

async function listFilesEvent(
  path: string,
): Promise<Array<FileStatsType> | undefined> {
  const jsonFromAPI = await listDownloadAPI(path);

  if (jsonFromAPI.status === "success") {
    if (
      jsonFromAPI.data.status === "failed" &&
      jsonFromAPI.data.error.code === "404"
    ) {
      notFound();
    } else if (jsonFromAPI.data.status === "success") {
      return jsonFromAPI.data.data;
    }
  }

  return undefined;
}

export const DownloadDiv = async ({ path }: { path: string }) => {
  const filesList = await listFilesEvent(path);
  //console.log(filesList);
  return (
    <div className="mt-4 flex h-[500px] w-full flex-col justify-between rounded-md border border-neutral-600 bg-neutral-800 p-4 transition-all duration-200 sm:w-[600px] md:mt-0">
      <div>
        <div>
          <h1 className="mb-2 flex w-full select-none flex-col items-center justify-center  text-lg font-bold text-neutral-300">
            Download
          </h1>
        </div>
        <div className="max-h-80  overflow-auto rounded-md border border-neutral-600 p-2 text-neutral-50">
          {filesList?.map((v, id) => (
            <CardForEachFile key={id}>
              <div>
                <p className="truncate" title={v.fileName}>
                  {v.fileName}
                </p>
              </div>
              <div className="flex flex-row">
                <div>
                  <p>{v.size}</p>
                </div>
                <div>
                  <p className="mx-2 select-none">|</p>
                </div>
                <div>
                  <p>{v.type}</p>
                </div>
              </div>
            </CardForEachFile>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <DownloadButton />
      </div>
    </div>
  );
};
