'use client'

import clsx from "clsx"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const TabComponent = ({ locale, length, tabIndex }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleTabIndex = (number) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', number)
    replace(`${pathname}?${params.toString()}`)
  }

  const arr = [{a:[1,2]}, {a:[3,4]}, {a:[5,6]}]
  const data = arr.reduce((prev, current) => {
    console.log(prev, current)
    return [...prev, ...current.a]
  }, [])
  console.log(data);

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
            { locale === 'en' ? `Game ${index+1}` : `第${index+1}场` }
          </div>
        ))
      }
    </div>
  )
} 