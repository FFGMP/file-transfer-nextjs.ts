import { create } from "zustand";

export type StoreFile = {
  files: File[];
  addFile: (file: File) => void;
  removeFile: (fileName: string) => void;
  resetFiles: () => void;
};

export const useStoreFiles = create<StoreFile>()((set) => ({
  files: [],
  removeFile: (fileName: string) =>
    set((state: StoreFile) => ({
      files: state.files.filter((file) => file.name !== fileName),
    })),
  addFile: (file: File) =>
    set((state: StoreFile) => ({
      files: [...state.files, file],
    })),
  resetFiles: () => set((state: StoreFile) => ({ files: [] })),
}));
