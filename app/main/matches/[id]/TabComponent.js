'use client'

import clsx from "clsx"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export const TabComponent = ({ length }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [tabIndex, setTabIndex] = useState(searchParams.get('tab') ? Number(searchParams.get('tab')) : 1)
  const handleTabIndex = (number) => {
    setTabIndex(number)
    const params = new URLSearchParams(searchParams)
    params.set('tab', number)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex w-full h-12 bg-black text-white border-b border-b-gray-400">
      {
        [...Array(length)].map((item, index) => (
          <div 
            key={index} 
            className={clsx(
              "flex flex-1 h-full justify-center items-center cursor-pointer border-t-2",
              tabIndex === index + 1 ? "text-yellow-500 bg-gray-700 border-t-yellow-500 " : "border-t-black"
            )}
            onClick={() => handleTabIndex(index+1)}
          >
            第{index + 1}场
          </div>
        ))
      }
    </div>
  )
} 