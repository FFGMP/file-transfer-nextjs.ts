import { NextRequest, NextResponse } from "next/server";
import { promises } from "fs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const pathFromClient = (await request.formData()).get("path") as string;
  var filesDirUploads: Array<string> = [];
  var files: Array<string>;
  var arrayWithBLOB: Array<Buffer> = [];

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

  const teste: Promise<Array<Buffer | undefined>> = Promise.all(
    files.map(async (v) => {
      try {
        const contents = await promises.readFile(
          "../uploads/" + pathFromClient + "/" + v,
        );
        return contents;
      } catch (error) {
        console.error(error);
      }
    }),
  );

  const headers = new Headers();

  headers.set("Content-Type", "application/octet-stream");
  headers.set("Content-Disposition", 'attachment; filename="picture.file"');

  return new NextResponse((await teste)[0], {
    status: 200,
    statusText: "OK",
    headers,
  });
}
