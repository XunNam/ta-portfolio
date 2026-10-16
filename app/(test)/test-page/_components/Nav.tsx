"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";

export default function Nav() {
  const link = [
    { displayed: "Link 1", href: "link1" },
    { displayed: "Link 2", href: "link2" },
  ];

  const [thuGonNavBar, setThuGonNavBar] = useState(false);
  const { scrollY } = useScroll();
  const viTriCuoi = useRef(0);

  useMotionValueEvent(scrollY, "change", (capNhapThuGon) => {
    const viTriMoi = Math.max(0, capNhapThuGon);
    const chenhLech = viTriMoi - viTriCuoi.current;

    if (viTriMoi === 0) {
        setThuGonNavBar(false);
        viTriCuoi.current = 0;
        return;
    }

    if (Math.abs(chenhLech) < 5) {
        return;
    }

    setThuGonNavBar(chenhLech > 0);
    viTriCuoi.current = viTriMoi;
  })

  return (
    <div className={`${thuGonNavBar ? "h-17" : "h-27" } w-full bg-purple-600 flex flex-row justify-evenly items-center p-5 fixed top-0 left-0 z-50 transition-all duration-200 ease-in-out`}>
      <h1 className="font-dela-gothic-one text-3xl text-yellow-200">Test</h1>
      <h1>
        {link.map((chiMuc) => (
          <Link
            href={chiMuc.displayed}
            key={chiMuc.href}
            className="text-3xl text-yellow-200 px-5 group"
          >
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", damping:20, stiffness: 400 }}
              
            >
              {chiMuc.displayed}
              <span
                className="h-0.5 w-full bg-yellow-200 absolute -bottom-1 left-0 origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-200 ease-in-out"
                aria-hidden="true"
              ></span>
            </motion.span>
          </Link>
        ))}
      </h1>
    </div>
  );
}
