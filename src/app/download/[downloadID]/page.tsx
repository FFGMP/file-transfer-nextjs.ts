import { DownloadDiv } from "../@components/downloadDiv";

export default function Download({
  params,
}: {
  params: { downloadID: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <DownloadDiv teste={params.downloadID} />
    </main>
  );
}
