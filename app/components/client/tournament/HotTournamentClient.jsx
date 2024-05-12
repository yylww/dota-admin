'use client'

import { useQueryParams } from "@/app/hooks/useQueryParams"
import clsx from "clsx"
import { useLocale } from "next-intl"

export default function HotTournamentClient({ data }) {
  const locale = useLocale()
  const [searchParams, handleSearchParams] = useQueryParams()
  const activeId = searchParams.tournament ? +searchParams.tournament : data[0].id
  return (
    <div>
      {
        data.map((item, i) => (
          <p 
            className={clsx(
              "py-2 border-t border-t-gray-100 cursor-pointer hover:text-blue-500",
              { "text-blue-500": item.id === activeId }
            )} 
            onClick={() => handleSearchParams('tournament', item.id)} 
            key={i}
          >
            { locale === 'en' ? item.title_en : item.title }
          </p>
        ))
      }
    </div>
  )
}