'use client'

import { useQueryParams } from "@/app/hooks/useQueryParams"
import clsx from "clsx"
import { useTranslations } from "next-intl"

export const TabComponent = ({ length }) => {
  const t = useTranslations('Match')
  const [searchParams, handleSearchParams] = useQueryParams()
  const tabIndex = searchParams.tab ? Number(searchParams.tab) : 1
  return (
    <section className="p-2 md:px-4">
      <div className="flex w-full h-9 p-1 rounded-sm text-black/60 bg-black/5">
        {
          [...Array(length)].map((_, index) => (
            <div
              onClick={() => handleSearchParams('tab', index + 1)}
              key={index} 
              className={clsx(
                "flex flex-1 h-full justify-center items-center cursor-pointer rounded-sm",
                tabIndex === index + 1 ? "bg-white text-black" : ""
              )}
            >
              { t('tab', { number: index + 1 }) }
            </div>
          ))
        }
      </div>
    </section>
  )
} 