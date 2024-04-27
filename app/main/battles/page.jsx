import Image from "next/image"
import dayjs from "dayjs"
import Link from "next/link"
import clsx from "clsx"
import { getMatches } from "@/app/lib/match"
import MatchList from "@/app/components/main/MatchList"
import { match } from "assert"

export default async function Page({ searchParams }) {
  const ids = searchParams.ids.split(',').map(id => +id)
  const matches = await getMatches({ status: 2, ids, orderBy: { startTime: 'asc' } })
  const handleData = (matches) => {
    const data = {}
    matches.map(match => {
      const { startTime, stage, tournament, } = match
      const date = dayjs(startTime).format('YYYY-MM-DD')
      const title = `${tournament.title}-${stage.title}`
      if (data[date]) {
        data[date] = {
          title,
          matches: [...data[date].matches, match],
        }
      } else {
        data[date] = {
          title,
          matches: [match],
        }
      }
    })
    return data
  }
  const formatData = handleData(matches)
  return (
    <div className="bg-white">
      {
        matches && matches.length > 0 ?
        <MatchList data={formatData} width={990} /> : 
        <div className="flex justify-center items-center h-16">无交手记录</div>
      }
    </div>
  )
}