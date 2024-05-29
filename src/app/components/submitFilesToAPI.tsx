"use client";

import { useEffect, useState } from "react";
import { useStoreFiles } from "../store/store";
import { AsyncResponse, APISuccessType, FileManager } from "../types/types";
import { useRouter } from "next/navigation";

async function sendFileToAPI(
  arrayFiles: Array<File>,
): Promise<AsyncResponse<APISuccessType<FileManager>>> {
  const formData = new FormData();
  if (arrayFiles) {
    for (let index = 0; index < arrayFiles.length; index++) {
      formData.append(arrayFiles[index].name, arrayFiles[index]);
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

  const data: APISuccessType<FileManager> = await response.json();

  return {
    status: "success",
    data: data,
  };
}

const uploadFilesEvent = async (v: Array<File>) => {
  return await sendFileToAPI(v);
};

export function SubmitFilesToAPI() {
  const { files, resetFiles } = useStoreFiles();
  const router = useRouter();
  const [isSubmitLoading, setSubmitLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      resetFiles();
      setSubmitLoading(false);
    };
  }, []);

  return (
    <div className={files.length > 0 ? "" : "hidden"}>
      <button
        className={`mb-2 mt-2 rounded-md border border-white bg-neutral-900 p-2 duration-300  md:mb-0 ${isSubmitLoading ? "cursor-not-allowed bg-neutral-950" : "hover:bg-neutral-950"}`}
        onClick={() => {
          setSubmitLoading(true);
          uploadFilesEvent(files).then((v) => {
            if (v.status === "success") {
              if (v.data.path != "") {
                router.push("/download/" + v.data.path);
              }
            } else {
              setSubmitLoading(false);
            }
          });
        }}
        disabled={isSubmitLoading}
      >
        {isSubmitLoading ? <p>Loading</p> : <p>Submit</p>}
      </button>
    </div>
  );
}
