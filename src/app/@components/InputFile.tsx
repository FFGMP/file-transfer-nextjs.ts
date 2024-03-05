"use client";
import { useStoreFiles } from "../@store/store";
import { StoreFile } from "../@store/store";

function fileDragHandler(
  e: React.DragEvent<HTMLSpanElement>,
  addFile: StoreFile["addFile"],
) {
  e.preventDefault();
  if (e.dataTransfer.items) {
    Array.from(e.dataTransfer.items).map((item) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file?.name) {
          addFile(file);
        }
      }
    });
  }
}

function filesAddedToTheInput(
  e: React.ChangeEvent<HTMLInputElement>,
  addFile: StoreFile["addFile"],
) {
  e.preventDefault();
  if (e.target.files) {
    Array.from(e.target.files).map((item) => {
      if (item?.name) {
        addFile(item);
      }
    });
  }
}

export function InputFile() {
  const { addFile } = useStoreFiles();

  return (
    <div className="mt-2 flex h-[500px] w-full flex-col items-center justify-center rounded-md bg-neutral-800 transition-all duration-500 sm:w-[600px] md:mt-0">
      <label
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border-4 border-dashed border-neutral-600 p-4"
        htmlFor="fileDrop"
        onDrop={(e) => {
          fileDragHandler(e, addFile);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <span className="select-none text-neutral-400">
          Drag and drop files here or click to browse
        </span>
      </label>
      <input
        className="hidden w-full"
        id="fileDrop"
        type="file"
        multiple
        onChange={(e) => {
          //uploadFilesEvent(e.target);
          filesAddedToTheInput(e, addFile);
        }}
      ></input>
    </div>
  );
}
