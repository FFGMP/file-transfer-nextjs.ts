import { NextRequest, NextResponse } from "next/server";
import { AsyncResponse, fileUpload } from "@/app/@types/types";
import { join } from "path";
import { writeFile, writeFileSync } from "fs";

export async function GET(): Promise<NextResponse<AsyncResponse<fileUpload>>> {
  console.log("Done");
  return new NextResponse(
    JSON.stringify({
      status: "success",
      data: { ficheiros: ["file1", "file2"], status: true },
    }),
    { status: 200 }
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const files = await request.formData();
  files.forEach(async (file: FormDataEntryValue) => {
    if (file instanceof File) {
      console.log(file);
      //Reading Each file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join("/", "testesNextJS", file.name);
      writeFile(path, buffer, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    }
  });

  return NextResponse.json([{ sussess: "true" }]);
}
