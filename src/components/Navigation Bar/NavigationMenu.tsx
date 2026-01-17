'use client'

import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Định nghĩa các giá trị nhận vào
interface NavigationMenuProps {
  name: string
  id: string
}

interface NavigationMenuPropsSets {
  list: NavigationMenuProps[]
  isOpen: boolean
  onClose: () => void
}

export default function NavigationMenu({ list, isOpen, onClose }: NavigationMenuPropsSets) {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="w-full h-full fixed inset-0 top-20 z-50"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
            >
              <div
                className="absolute w-50 bg-white top-5 right-7 rounded-2xl p-2 shadow-2xl border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ul>
                  {list.map((item) => (
                    <li
                      key={item.id}
                      className="h-10 font-semibold flex items-center px-3 border border-transparent hover:border-gray-300 rounded-xl transition-all duration-300 hover:bg-gray-100 cursor-pointer"
                      onClick={onClose}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
