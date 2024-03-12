"use client";

export function DownloadButton({ path }: { path: string }) {
  return (
    <>
      <a
        href={`../api/downloadFiles?path=${encodeURIComponent(JSON.stringify(path))}`}
      >
        <button
          className={`mb-2 mt-2 rounded-md border border-white bg-neutral-900 p-2 duration-300  hover:bg-neutral-950 md:mb-0`}
        >
          Download
        </button>
      </a>
    </>
  );
}
