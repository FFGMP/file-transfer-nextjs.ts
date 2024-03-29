import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { promises } from "fs";
import { APIErrorType, APISuccessType, FileManager } from "@/app/types/types";
import crypto from "crypto";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const files = await request.formData();
  var managerStatusArray: Array<FileManager>;
  const randomStringToURL = crypto.randomBytes(32).toString("hex");

  const path = join("../", "uploads/" + randomStringToURL + "/");
  try {
    await promises.mkdir(path);
  } catch (error) {
    return NextResponse.json(errorReturn, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  const filePromises = Array.from(files).map(
    async (fileForm): Promise<FileManager> => {
      let fileStatus: FileManager = {
        filename: "",
        statusofFile: false,
        error: "No valid files were uploaded!",
      };
      var file = fileForm[1];

      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const pathPlusFilename = join(
          "../",
          "uploads/" + randomStringToURL + "/",
          file.name.replace("/", ""),
        );

        try {
          await promises.writeFile(pathPlusFilename, buffer);
          fileStatus = { filename: file.name, statusofFile: true };
        } catch (error) {
          fileStatus = {
            filename: file.name,
            statusofFile: false,
            error: "Error: " + error,
          };
        }
      }
      return fileStatus;
    },
  );
  managerStatusArray = await Promise.all(filePromises);

  if (managerStatusArray.length > 0) {
    const successReturn: APISuccessType<Array<FileManager>> = {
      status: "success",
      message: "Files were uploaded!",
      data: managerStatusArray,
      path: randomStringToURL,
    };
    return NextResponse.json(successReturn, {
      status: 200,
      statusText: "Ok",
    });
  }

  return NextResponse.json(errorReturn, {
    status: 500,
    statusText: "Internal Server Error",
  });
}

const errorReturn: APIErrorType = {
  status: "failed",
  error: {
    code: "500",
    message: "Something went wrong.",
  },
};
