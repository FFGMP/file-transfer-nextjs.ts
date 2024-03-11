import { NextRequest, NextResponse } from "next/server";
import { APISuccessType, APIErrorType, FileStatsType } from "@/app/types/types";
import { promises } from "fs";

function formatSize(size: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}

export async function POST(
  request: NextRequest,
): Promise<
  | NextResponse<APISuccessType<Array<FileStatsType>>>
  | NextResponse<APIErrorType>
> {
  const formDataPath: string = (await request.formData()).get("path") as string;
  var filesDirUploads: Array<string> = [];
  var files: Array<string>;
  var filesStats: Array<FileStatsType> = [];

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
        code: "404",
        message: "Something went wrong. Your file does not exist.",
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

  try {
    await Promise.all(
      files.map(async (v) => {
        const fileStats = await promises.stat(
          "../uploads/" + formDataPath + "/" + v,
        );
        filesStats.push({
          fileName: v,
          size: formatSize(fileStats.size).toString(),
          type: v.match(/\.[0-9a-z]+$/i)?.toString(),
        });
      }),
    );
  } catch (error) {
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
    message: "Have your files!",
    data: filesStats,
    path: formDataPath,
  });
}
