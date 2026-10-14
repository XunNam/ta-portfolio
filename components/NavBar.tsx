import Link from "next/link";



export default function NavBar() {
  const lienKetNavBar = [
    { tenHienThi: "Trang chủ", lienKet: "/" },
    { tenHienThi: "Giới thiệu", lienKet: "/gioi-thieu" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-17 border-b border-black flex justify-between items-center bg-[#f5ebe0] text-[#171717] px-5 lg:px-30 lg:h-20">
      <span className="font-dela-gothic-one text-3xl">Portfolio</span>
      <div>
        {lienKetNavBar.map((chiMuc) => (
          <Link
            key={chiMuc.lienKet}
            href={chiMuc.lienKet}
            className="px-2 text-lg font-semibold lg:px-5 lg:text-xl"
          >
            {chiMuc.tenHienThi}
          </Link>
        ))}
      </div>
    </nav>
  );
}
