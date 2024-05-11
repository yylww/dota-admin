'use client'

import dayjs from "dayjs"
import Match from "./Match"
import ScrollToToday from "./ScrollToToday"
import { useEffect, useState } from "react"

export default function MatchListClient({ data }) {
  const [formatData, setFormatData] = useState({})
  const [sortDate, setSortDate] = useState([])
  const handleData = (matches) => {
    const data = {}
    matches.map(match => {
      const { tournament, stage, startTime } = match
      const date = dayjs(startTime).format('YYYY-MM-DD')
      const title = `${tournament.title}-${stage.title}`
      if (data[date]) {
        data[date].matches = [...data[date].matches, match]
      } else {
        data[date] = {
          title,
          matches: [match],
        }
      }
    })
    return data
  }
  
  useEffect(() => {
    const formatData = handleData(data)
    const sortDate = Object.keys(formatData).sort((a, b) => dayjs(b).unix() - dayjs(a).unix())
    setFormatData(formatData)
    setSortDate(sortDate)
  }, [data])

  return (
    <div className="flex flex-col gap-2 md:gap-4 p-2 md:p-4">
      {
        sortDate.map((item, i) => {
          const { title, matches } = formatData[item]
          return (
            <div className="flex flex-col gap-2 px-2 md:px-4 py-2 md:py-4 border border-gray-200 rounded-md bg-white" key={i}>
              <div className="flex items-center gap-2">
                <div className="text-base md:text-lg">{ item }</div>
                { dayjs().format('YYYY-MM-DD') === item ? <ScrollToToday /> : null }
              </div>
              <div className="font-medium">{ title }</div>
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