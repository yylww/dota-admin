'use client'

import { useQueryParams } from "@/app/hooks/useQueryParams"
import clsx from "clsx"

export default function Tabs({ data }) {
  const [searchParams, handleSearchParams] = useQueryParams()
  const tabIndex = searchParams.tab ? Number(searchParams.tab) : 1
  return (
    <section className="sticky top-0 p-2 md:px-4 bg-white">
      <div className="flex w-full h-[30px] p-1 rounded-sm text-black/60 bg-black/5">
        {
          data.map((item, i) => (
            <div
              onClick={() => handleSearchParams('tab', i + 1)}
              key={i} 
              className={clsx(
                "flex flex-1 h-full justify-center items-center cursor-pointer rounded-sm",
                tabIndex === i + 1 ? "bg-white text-black" : ""
              )}
            >
              { item }
            </div>
          ))
        }
      </div>
    </section>
  )
} 