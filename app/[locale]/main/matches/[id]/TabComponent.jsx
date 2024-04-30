'use client'

import clsx from "clsx"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const TabComponent = ({ length, tabIndex }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleTabIndex = (number) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', number)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex w-full h-12 bg-white md:text-lg">
      {
        [...Array(length)].map((_, index) => (
          <div 
            key={index} 
            className={clsx(
              "flex flex-1 h-full justify-center items-center cursor-pointer border-b-2",
              tabIndex === index ? "text-blue-500 border-b-blue-500" : "border-b-gray-200"
            )}
            onClick={() => handleTabIndex(index+1)}
          >
            Game {index + 1}
          </div>
        ))
      }
    </div>
  )
} 