'use client'

import clsx from "clsx"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TrophyIcon } from "@heroicons/react/24/outline"

export default function HotTournament({ data, activeId }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleSearchParams = (id) => {
    const params = new URLSearchParams(searchParams)
    params.set('tournament', id)
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="fixed flex flex-col w-[240px] mt-4 p-4 border border-gray-200 rounded-md bg-white">
      <div className="flex gap-2 pb-2 text-lg">
        <TrophyIcon className="w-6 text-blue-500" />
        <p className="font-medium">热门赛事</p>
      </div>
      {
        data.map((item, i) => (
          <p 
            className={clsx(
              "py-2 border-t border-t-gray-100 cursor-pointer hover:text-blue-500",
              { "text-blue-500": item.id === activeId }
            )} 
            onClick={() => handleSearchParams(item.id)} 
            key={i}
          >
            { item.title }
          </p>
        ))
      }
    </div>
  )
}