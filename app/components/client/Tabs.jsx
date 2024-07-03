'use client'

import { useQueryParams } from "@/app/hooks/useQueryParams"
import clsx from "clsx"

export default function Tabs({ data, query }) {
  const [searchParams, handleSearchParams] = useQueryParams()
  const tabIndex = searchParams[query] ? Number(searchParams[query]) : 1
  return (
    <section className="z-20 sticky top-0 bg-white p-2 md:px-4">
      <div className="flex w-full h-[30px] p-1 rounded-sm text-black/60 bg-gray-100">
        {
          data.map((item, i) => (
            <div
              onClick={() => handleSearchParams(query, i + 1)}
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