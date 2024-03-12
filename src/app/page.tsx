import { InputFile } from "./components/inputFile";
import { ListFiles } from "./components/listFiles";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <div className="flex flex-col items-center justify-center md:flex-row">
        <InputFile />
        <ListFiles />
      </div>
    </main>
  );
}
