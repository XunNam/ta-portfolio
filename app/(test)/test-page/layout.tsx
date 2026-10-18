import NavTesst from "./_components/NavTest";

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <NavTesst />
      </nav>
      {children}
    </>
  );
}
