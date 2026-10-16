"use client";

import { useState, useRef } from "react";
import { motion, spring, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";

export default function NavBar() {
  const lienKetNavBar = [
    { tenHienThi: "Trang chủ", lienKet: "/" },
    { tenHienThi: "Giới thiệu", lienKet: "/gioi-thieu" },
    { tenHienThi: "Test Page", lienKet: "/tets-page"},
  ];

  const [moMenu, setMoMenu] = useState(false);
  const [thuGonNavBar, setThuGonNavBar] = useState(false);

  const { scrollY } = useScroll();
  const viTriCuonCuoi = useRef(0);

  useMotionValueEvent(scrollY, "change", (viTriHienTai) => {
    const viTriMoi = Math.max(0, viTriHienTai);
    const chenhLech = viTriMoi - viTriCuonCuoi.current;

    if (viTriMoi === 0) {
      setThuGonNavBar(false);
      viTriCuonCuoi.current = 0;
      return;
    }

    if (Math.abs(chenhLech) < 5) {
      return;
    }

    setThuGonNavBar(chenhLech > 0);
    viTriCuonCuoi.current = viTriMoi;
  });

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full border-b border-black flex justify-between items-center bg-(--navbar-background) text-(--foreground) px-5 lg:px-30 ${thuGonNavBar ? "h-12 lg:h-14" : "h-17 lg:h-20"} transition-all duration-200 ease-in-out`}
    >
      <span className={`font-dela-gothic-one text-2xl ${thuGonNavBar ? "text-xl" : "text-2xl" } transition-all duration-200 ease-in-out`}>Portfolio</span>
      <div className="hidden lg:flex">
        {lienKetNavBar.map((chiMuc) => (
          <Link
            key={chiMuc.lienKet}
            href={chiMuc.lienKet}
            className={`group px-2 text-md font-semibold lg:px-5 ${thuGonNavBar ? "lg:text:lg" : "lg:text-xl"} transition-all duration-200 ease-in-out`}
          >
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: spring, damping: 25, stiffness: 400 }}
            >
              {chiMuc.tenHienThi}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-linear-to-r from-purple-500 to-pink-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform ease-in-out duration-300"
              ></span>
            </motion.span>
          </Link>
        ))}
      </div>
      <button
        type="button"
        className="h-10 w-10 flex justify-center items-center cursor-pointer lg:hidden z-51 touch-manipulation"
        aria-label="Menu"
        onClick={() => setMoMenu(!moMenu)}
      >
        {moMenu ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width={`${thuGonNavBar ? "24" : "32"}`}
            height={`${thuGonNavBar ? "24" : "32"}`}
            className="transition-all duration-200 ease-in-out"
          >
            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width={`${thuGonNavBar ? "24" : "32"}`}
            height={`${thuGonNavBar ? "24" : "32"}`}
            className="transition-all duration-200 ease-in-out"
          >
            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
          </svg>
        )}
      </button>

      {moMenu && (
        <div className="w-full h-auto py-3 absolute top-full right-0 bg-[#f5ebe0] border-t border-b border-black flex flex-col justify-center items-center lg:hidden">
          {lienKetNavBar.map((chiMuc) => (
            <Link
              key={chiMuc.lienKet}
              href={chiMuc.lienKet}
              className="px-2 text-md font-semibold py-1 my-2"
              onClick={() => setMoMenu(!moMenu)}
            >
              {chiMuc.tenHienThi}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
