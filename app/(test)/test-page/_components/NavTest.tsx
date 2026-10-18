"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";

export default function NavTest() {
  const lienKet = [
    { displayed: "Link 1", href: "/link1" },
    { displayed: "Link 2", href: "/link2" },
    { displayed: "Link 3", href: "/link3" },
  ];

  const [navBarThuGon, setNavBarThuGon] = useState(false);
  const { scrollY } = useScroll();
  const viTriCuoiCung = useRef(0);

  useMotionValueEvent(scrollY, "change", (viTriHienTai) => {
    const viTriMoi = Math.max(0, viTriHienTai)
    const chenhLech = viTriMoi - viTriCuoiCung.current

    if (viTriMoi === 0) {
        setNavBarThuGon(false);
        viTriCuoiCung.current = 0;
        return;
    }

    if (Math.abs(chenhLech) < 10) {
        return;
    }

    setNavBarThuGon(chenhLech > 0);
    viTriCuoiCung.current = viTriHienTai;
  });

  return (
    <div className={` ${navBarThuGon ? "h-15 px-5" : "h-27 px-17"} w-full bg-yellow-100 flex justify-between items-center  fixed top-0 left-0 transition-all duration-200 ease-in-out z-51`}>
      {/* Logo chính */}
      <a key={"Logo"} href={"https://buitheanh.dev"} className={`font-dela-gothic-one text-2xl ${navBarThuGon ? "text-lg" : "text-3xl"} transition-all duration-200 ease-in-out`}>Logo</a>

      {/* Danh sách liên kết máy tính */}
      <div>
        {lienKet.map((chiMuc) => (
          <Link
            href={chiMuc.href}
            key={chiMuc.href}
            className={`font-nunito ${navBarThuGon ? "text-sm" : "text-base"} px-2 group transition-all duration-200 ease-in-out`}
          >
            <motion.span className="inline-block relative"
            whileHover={{ scale:1.07 }}
            transition={{ type:"spring", damping:25, stiffness:400 }}>
              {chiMuc.displayed}
              <span
                aria-hidden="true"
                className="h-0.5 w-full bg-linear-to-r from-purple-500 to-yellow-500 absolute -bottom-0.5 left-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-in-out"
              ></span>
            </motion.span>
          </Link>
        ))}
      </div>
    </div>
  );
}
