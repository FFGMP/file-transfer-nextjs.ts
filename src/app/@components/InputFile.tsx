"use client";

function sendFileToAPI(file: HTMLInputElement) {
  if (file.files) {
    const formData = new FormData();
    for (let index = 0; index < file.files.length; index++) {
      console.log(file.files[index].name);
      formData.append(file.files[index].name, file.files[index]);
    }

    try {
      fetch("http://localhost:3000/upload/api", {
        method: "post",
        body: formData,
      });
    } catch (error) {
      console.error("Servers cannot be reached!", error);
    }
  }
}

export function InputFile() {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-800 w-full sm:w-[600px] h-[500px] rounded-md">
      <label
        className="h-full w-full flex flex-col justify-center items-center cursor-pointer border-4 border-dashed border-neutral-600 rounded-md p-4"
        htmlFor="fileDrop"
      >
        <span className="text-neutral-400 select-none">
          Drag and drop files here or click to browse
        </span>
      </label>
      <input
        className="w-full hidden"
        id="fileDrop"
        type="file"
        multiple
        onChange={(e) => {
          sendFileToAPI(e.target);
        }}
      ></input>
    </div>
  );
}
