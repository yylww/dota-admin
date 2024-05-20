'use client'

import Match from "./Match"
import ScrollToToday from "./ScrollToToday"
import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import dayjs from "dayjs"

export default function MatchListClient({ data }) {
  const locale = useLocale()
  const [formatData, setFormatData] = useState({})
  const handleData = (matches) => {
    const data = {}
    matches.map(match => {
      const { tournament, stage, startTime } = match
      const date = dayjs(startTime).format('YYYY-MM-DD')
      const today = date === dayjs().format('YYYY-MM-DD')
      const title = `${tournament.title} - ${stage.title}`
      const title_en = `${tournament.title_en} - ${stage.title_en}`
      if (data[date]) {
        data[date].matches = [...data[date].matches, match]
      } else {
        data[date] = {
          title,
          title_en,
          today,
          matches: [match],
        }
      }
    })
    return data
  }
  
  useEffect(() => {
    const formatData = handleData(data)
    setFormatData(formatData)
  }, [data])

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {
        Object.keys(formatData).map((item, i) => {
          const { title, title_en, today, matches } = formatData[item]
          return (
            <div className="flex flex-col gap-2 px-2 md:px-4 py-2 md:py-4 md:border md:border-gray-200 md:rounded-md bg-white" key={i}>
              <div className="flex items-center gap-2">
                <div className="md:text-lg">{ item }</div>
                { today ? <ScrollToToday /> : null }
              </div>
              <div className="font-medium">{ locale === 'en' ? title_en : title }</div>
              {
                matches.map((match, j) => (
                  <Match key={j} data={match} />
                ))
              }
            </div>
          )
        })
      }
    </div>
  )
}