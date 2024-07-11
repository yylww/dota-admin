'use client'

import Match from "./Match"
import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import dayjs from "dayjs"
import ScrollToToday from "./ScrollToToday"

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
          const { title, title_en, matches, today } = formatData[item]
          return (
            <div className="flex flex-col gap-2 md:rounded-md bg-white p-2 md:p-4" key={i}>
              <div className="flex items-center gap-2 text-sm">
                { today ? <ScrollToToday /> : null }
                <div className="font-medium">{ item }</div>
                <div className="text-gray-500">{ locale === 'en' ? title_en : title }</div>
              </div>
              <div>
                {
                  matches.map((match, j) => (
                    <Match key={j} data={match} />
                  ))
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}