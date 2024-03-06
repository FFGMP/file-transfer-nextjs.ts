import { AsyncResponse } from "@/app/@types/types";

async function listDownloadAPI(path: string): Promise<AsyncResponse<string>> {
  const formData = new FormData();
  formData.append("path", path);
  try {
    const response = await fetch("http://localhost:3000/api/download", {
      method: "post",
      body: formData,
      cache: "no-cache",
    });
    response.json().then((v) => {
      console.log(v);
    });
    /* console.log(
      response.json().then((value) => {
        //console.log(value);
      }),
    );*/
  } catch (error) {}
  return {
    status: "success",
    data: "",
  };
}

export const DownloadDiv = ({ teste }: { teste: string }) => {
  listDownloadAPI(teste);
  return (
    <div className="mt-4 flex h-fit w-full flex-col rounded-md border border-neutral-600 bg-neutral-800 p-4 transition-all duration-200 sm:w-[600px] md:ml-4 md:mt-0 md:h-[500px]">
      <div>
        <h1 className="flex w-full select-none flex-col items-center justify-center text-lg font-bold text-neutral-300">
          Download
        </h1>
      </div>
      <div></div>
    </div>
  );
};
