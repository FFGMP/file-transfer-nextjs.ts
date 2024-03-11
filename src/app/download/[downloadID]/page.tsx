import { DownloadDiv } from "../components/downloadDiv";

export default function Download({
  params,
}: {
  params: { downloadID: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <DownloadDiv path={params.downloadID} />
    </main>
  );
}
