'use client'

import { useState } from 'react'
import NavigationMobile from './Navigation Mobile'

export default function NavigationBar() {
  // Tạo danh sách các liên kết
  const lienKet = [
    { name: 'Giới thiệu', id: 'gioi-thieu' },
    { name: 'Dự án', id: 'du-an' },
    { name: 'Liên hệ', id: 'lien-he' },
  ]

  // Khai báo trạng thái Menu
  const [isMenuOpen, setMenuOpen] = useState(false)

  // Khai báo trạng thái sáng tối
  const [isDarkMode, setDarkMode] = useState(true)

  return (
    <>
      <div className="w-full border-b border-gray-600 h-20 flex items-center px-7">
        <div className="w-full mx-auto flex justify-between">
          {/* --- Tạo logo Portfolio --- */}
          <p className="text-xl font-medium font-roboto-mono bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-default">
            Portfolio.
          </p>

          {/* --- Tạo Menu cho giao diện điện thoại --- */}
          {/* --- Chuyển đổi dạng hiển thị nút Menu --- */}
          <div className="cursor-pointer lg:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
            {!isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            )}
          </div>

          {/* --- Tạo Menu cho giao diện máy tính --- */}
          {/* --- Tạo danh sách liên kết --- */}
          <ul className="lg:flex lg:gap-x-10 hidden">
            {lienKet.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer hover:text-gray-500 transition-all duration-300"
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/**
           * --- Nút chuyển đổi giao diện sáng tối và ngôn ngữ ---
           * (Tính năng chưa hoàn thiện)
           */}
          <div className="cursor-pointer lg:flex hidden" onClick={() => setDarkMode(!isDarkMode)}>
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-brightness-high-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-moon-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
              </svg>
            )}
          </div>
        </div>

        {/* --- Menu giao diện điện thoại --- */}
        {isMenuOpen && <NavigationMobile list={lienKet} />}
      </div>
    </>
  )
}
