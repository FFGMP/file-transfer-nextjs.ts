import { useStoreFiles } from "@/app/store/store";

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
  const { removeFile } = useStoreFiles();
  return (
    <>
      <div className="flex w-full flex-col rounded-md">
        {Array.from(getFiles as Array<File>).map((v, i) => (
          <div
            className="flex flex-row items-center justify-between border-b-2 border-neutral-600 p-2 text-neutral-50 first:pt-1 last:border-b-0 last:pb-1"
            key={i}
          >
            <div className="truncate">
              <div>
                <p title={v.name} className="truncate ">
                  {v.name}
                </p>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-2 text-sm">{formatSize(v.size)}</p>
                <p className="select-none">|</p>
                <p className="ml-2 text-sm">{v.name.match(/\.[0-9a-z]+$/i)}</p>
              </div>
            </div>
            <div className="flex flex-row">
              <button
                title="Remove file"
                value={v.name}
                onClick={(e) => {
                  removeFile((e.target as HTMLButtonElement).value);
                }}
                className="h-full select-none"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
