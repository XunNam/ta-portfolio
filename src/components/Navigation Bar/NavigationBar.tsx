'use client'

import { useState } from 'react'
import NavigationMenu from './NavigationMenu'
import { motion } from 'motion/react'

// Icon
import MenuBars from '@/icons/MenuBars'
import XClose from '@/icons/XClose'

export default function NavigationBar() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  // Danh sách liên kết
  const lienKet = [
    { name: 'Giới thiệu', id: 'gioi-thieu' },
    { name: 'Kỹ năng', id: 'ky-nang' },
    { name: 'Dự án', id: 'du-an' },
    { name: 'Liên hệ', id: 'lien-he' },
  ]

  const hieuUngTruot = {
    hidden: {
      originX: 1,
      scaleX: 0,
      transition: {
        scaleX: { duration: 0.2, ease: 'easeInOut' },
        originX: { duration: 0 },
      },
    },

    visible: {
      scaleX: 1,
      originX: 0,
      transition: {
        scaleX: { duration: 0.2, ease: 'easeInOut' },
        originX: { duration: 0 },
      },
    },
  }
  return (
    <>
      <div className="h-20 border-b border-zinc-300 flex justify-between items-center px-7 lg:justify-around">
        <p className="font-bold text-2xl bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Portfolio.
        </p>

        <div
          className="cursor-pointer relative lg:hidden"
          onClick={() => {
            setMenuOpen(!isMenuOpen)
          }}
        >
          {isMenuOpen ? <XClose /> : <MenuBars />}
          <NavigationMenu list={lienKet} isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
        </div>

        <div className="hidden lg:flex">
          <ul className="flex gap-x-10 font-inter font-semibold">
            {lienKet.map((item) => (
              <motion.li
                key={item.id}
                className="relative block w-fit"
                initial="hidden"
                whileHover="visible"
                animate="hidden"
              >
                <span className="block cursor-pointer py-1 text-gray-700 transition-colors duration-300 hover:text-indigo-500">
                  {item.name}
                </span>

                <motion.span
                  className="absolute w-full block h-px bg-indigo-500 bottom-0 left-0"
                  variants={hieuUngTruot}
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
