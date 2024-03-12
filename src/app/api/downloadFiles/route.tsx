import { NextRequest, NextResponse } from "next/server";
import { promises } from "fs";
import JSZip from "jszip";

async function zipToDownload(
  files: ({ filename: string; content: Buffer } | undefined)[],
): Promise<Blob> {
  const zip = new JSZip();
  files.map((file) => {
    if (file != undefined) {
      zip.file(file.filename, file.content);
    }
  });
  const downloadZIP = zip.generateAsync({ type: "blob" });

  return downloadZIP;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  let pathFromClient: string = "";
  let filesDirUploads: Array<string> = [];
  let files: Array<string>;

  try {
    pathFromClient = JSON.parse(searchParams.get("path") || "");
  } catch (error) {}

  //Caso nao exista body com "path" da erro e nao prossegue
  if (!pathFromClient) {
    return NextResponse.json({
      status: "failed",
      error: {
        code: "500",
        message: "Something went wrong.",
      },
    });
  }

  try {
    filesDirUploads = await promises.readdir("../uploads/");
  } catch (err) {
    console.error(err);
  }

  // Compare the directory requested by the user with the ones that are present in the actual directory.
  // This is done to avoid any potential vulnerabilities.
  const directoryComparision = filesDirUploads.filter(
    (filesDir) => filesDir == pathFromClient,
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
    files = await promises.readdir("../uploads/" + pathFromClient);
  } catch (err) {
    return NextResponse.json({
      status: "failed",
      error: {
        code: "500",
        message: "Something went wrong.",
      },
    });
  }

  const filesToZIP: Promise<
    ({ filename: string; content: Buffer } | undefined)[]
  > = Promise.all(
    files.map(async (v) => {
      try {
        const content = await promises.readFile(
          "../uploads/" + pathFromClient + "/" + v,
        );

        return { filename: v, content: content };
      } catch (error) {
        console.error(error);
      }
    }),
  );

  const zip = await zipToDownload(await filesToZIP);
  return new NextResponse(zip);
}
