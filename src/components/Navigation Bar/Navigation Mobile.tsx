'use client'
import { createPortal } from 'react-dom'

// Định nghĩa kiểu dữ liệu yêu cầu (một Object)
interface MenuItem {
  name: string
  id: string
}

// Định nghĩa yêu cầu 1 mảng chứa các Object trên
interface MenuList {
  list: MenuItem[]
}

export default function NavigationMobile({ list }: MenuList) {
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 h-screen w-full bg-black/30 top-20 backdrop-blur-2xl z-50 flex items-start p-15">
          <div className="w-[90%] h-fit bg-black/50 px-7 py-15 rounded-3xl flex flex-col justify-center items-center">
            <p className="text-3xl font-bold font-inter text-center">Menu</p>

            <ul>
              {list.map((item) => (
                <li
                  className="cursor-pointer w-40 h-12 my-10 px-5 text-lg font-medium hover:bg-black/70 border hover:border-gray-500 flex items-center transition-all duration-300 rounded-2xl"
                  key={item.id}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
