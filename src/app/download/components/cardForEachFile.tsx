export function CardForEachFile({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col truncate border-b border-neutral-600 py-2 first:pt-0 last:border-b-0 last:pb-0">
      {children}
    </div>
  );
}
