import { NextRequest, NextResponse } from "next/server";
import { APISuccessType, APIErrorType } from "@/app/@types/types";
import { promises } from "fs";

export async function POST(
  request: NextRequest,
): Promise<
  NextResponse<APISuccessType<Array<string>>> | NextResponse<APIErrorType>
> {
  const formDataPath: string = (await request.formData()).get("path") as string;
  var filesDirUploads: Array<string> = [];
  var files: Array<string>;

  try {
    var filesDirUploads = await promises.readdir("../uploads/");
  } catch (err) {
    console.error(err);
  }

  // Compare the directory requested by the user with the ones that are present in the actual directory.
  // This is done to avoid any potential vulnerabilities.
  const directoryComparision = filesDirUploads.filter(
    (filesDir) => filesDir == formDataPath,
  );

  if (directoryComparision.length === 0) {
    return NextResponse.json({
      status: "failed",
      error: {
        code: "500",
        message: "Something went wrong.",
      },
    });
  }

  try {
    files = await promises.readdir("../uploads/" + formDataPath);
  } catch (err) {
    return NextResponse.json({
      status: "failed",
      error: {
        code: "500",
        message: "Something went wrong.",
      },
    });
  }

  return NextResponse.json({
    status: "success",
    message: "Files were uploaded!",
    data: files,
    path: formDataPath,
  });
}
