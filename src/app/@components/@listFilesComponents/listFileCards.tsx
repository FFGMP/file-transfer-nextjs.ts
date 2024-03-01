import { FileProperties } from "@/app/@types/types";

function formatSize(size: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}

export function FileCards({ getFiles }: any) {
  return (
    <>
      <div className="mb-3 flex w-full flex-col rounded-md">
        {Array.from(getFiles as Array<FileProperties>).map((v, i) => (
          <div
            className="flex flex-col border-b-2 border-neutral-600 p-3 text-neutral-50 last:border-b-0"
            key={i}
          >
            <div>
              <p title={v.filename} className="truncate ">
                {v.filename}
              </p>
            </div>
            <div className="flex flex-row items-center">
              <p className="mr-2 text-sm">{formatSize(v.size)}</p>
              <p>|</p>
              <p className="ml-2 text-sm">
                {v.filename.match(/\.[0-9a-z]+$/i)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
