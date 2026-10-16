import Nav from "./_components/Nav";

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <Nav />
      </nav>
      {children}
    </>
  );
}
