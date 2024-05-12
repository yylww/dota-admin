'use client'

import dayjs from "dayjs"
import Match from "./Match"
import ScrollToToday from "./ScrollToToday"
import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

export default function MatchListClient({ data }) {
  const locale = useLocale()
  const t = useTranslations('tips')
  const [formatData, setFormatData] = useState({})
  const [sortDate, setSortDate] = useState([])
  const handleData = (matches) => {
    const data = {}
    matches.map(match => {
      const { tournament, stage, startTime } = match
      const date = dayjs(startTime).format('YYYY-MM-DD')
      const title = `${tournament.title}-${stage.title}`
      const title_en = `${tournament.title_en}-${stage.title_en}`
      if (data[date]) {
        data[date].matches = [...data[date].matches, match]
      } else {
        data[date] = {
          title,
          title_en,
          matches: [match],
        }
      }
    })
    return data
  }
  
  useEffect(() => {
    const formatData = handleData(data)
    const sortDate = Object.keys(formatData).sort((a, b) => dayjs(a).unix() - dayjs(b).unix())
    setFormatData(formatData)
    setSortDate(sortDate)
  }, [data])

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {
        sortDate.map((item, i) => {
          const { title, title_en, matches } = formatData[item]
          return (
            <div className="flex flex-col gap-2 px-2 md:px-4 py-2 md:py-4 md:border md:border-gray-200 md:rounded-md bg-white" key={i}>
              <div className="flex items-center gap-2">
                <div className="text-base md:text-lg">{ item }</div>
                { dayjs().format('YYYY-MM-DD') === item ? <ScrollToToday /> : null }
                { dayjs().add(1, 'day').format('YYYY-MM-DD') === item ? <div className="px-2 rounded-md bg-blue-500 text-white">{ t('tomorrow') }</div> : null }
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