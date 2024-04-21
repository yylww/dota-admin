import Image from "next/image"
import dayjs from "dayjs"
import Link from "next/link"
import clsx from "clsx"
import { getMatches } from "@/app/lib/match"

export default async function Page() {
  const upcoming = await getMatches({ status: 0, orderBy: { startTime: 'asc' } })
  const ongoing = await getMatches({ status: 1, orderBy: { startTime: 'asc' } })
  const concluded = await getMatches({ status: 2, take: 10 })
  return (
    <div className="flex flex-col p-4 bg-gray-500 text-gray-100">
      <div>赛事预告</div>
      {
        upcoming && upcoming.length > 0 ?
        upcoming.map((item, i) => {
          const { startTime, homeTeam, awayTeam, homeScore, awayScore } = item
          return (
            <div className="flex item-center w-full border-b border-b-gray-400 p-2 gap-4" key={i}>
              <div className="flex items-center justify-center w-40">{ dayjs(startTime).format('MM-DD HH:mm')}</div>
              <div className="flex flex-1 flex-col justify-between gap-1">
                <div className="flex items-center justify-between gap-4">
                  <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={homeTeam.tag} />
                  <span className="flex-1">{homeTeam.name}</span>
                  <span>{homeScore}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={awayTeam.tag} />
                  <span className="flex-1">{awayTeam.name}</span>
                  <span>{awayScore}</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-40">
                <Link href="/main/battle">
                  <button className="px-4 py-1 rounded-full bg-blue-500 text-white">交手记录</button>
                </Link>
              </div>
            </div>
          )
        }) : <div className="flex justify-center items-center w-full h-16 border-b border-b-gray-400">暂无比赛</div>
      }
      <div className="my-4">正在进行</div>
      {
        ongoing && ongoing.length > 0 ?
        ongoing.map((item, i) => {
          const { homeTeam, awayTeam, homeScore, awayScore } = item
          return (
            <div className="flex item-center w-full border-b border-b-gray-400 p-2 gap-4" key={i}>
              <div className="flex items-center justify-center w-40">进行中</div>
              <div className="flex flex-1 flex-col justify-between gap-1">
                <div className="flex items-center justify-between gap-4">
                  <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={homeTeam.tag} />
                  <span className="flex-1">{homeTeam.name}</span>
                  <span>{homeScore}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={awayTeam.tag} />
                  <span className="flex-1">{awayTeam.name}</span>
                  <span>{awayScore}</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-40">
                <Link href="/main/battle">
                  <button className="px-4 py-1 rounded-full bg-blue-500 text-white">交手记录</button>
                </Link>
              </div>
            </div>
          )
        }) : <div className="flex justify-center items-center w-full h-16 border-b border-b-gray-400">暂无比赛</div>
      }
      <div className="my-4">最近结束</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
          concluded && concluded.length > 0 ?
          concluded.map((item, i) => {
            const { id, homeTeam, awayTeam, homeScore, awayScore } = item
            return (
              <div className="flex item-center w-full border border-gray-400 p-2 gap-4 md:gap-6 lg:gap-10" key={i}>
                <div className="flex flex-1 flex-col justify-between gap-1">
                  <div className="flex items-center justify-between gap-4">
                    <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={homeTeam.tag} />
                    <span className="flex-1">{homeTeam.name}</span>
                    <span className={clsx(homeScore > awayScore ? "text-green-500" : "text-red-300")}>{homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={awayTeam.tag} />
                    <span className="flex-1">{awayTeam.name}</span>
                    <span className={clsx(homeScore < awayScore ? "text-green-500" : "text-red-300")}>{awayScore}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center md:px-4">
                  <Link href={`/main/matches/${id}`}>
                    <button className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm">比赛数据</button>
                  </Link>
                </div>
              </div>
            )
          }) : <div className="flex justify-center items-center w-full h-16 border-b border-b-gray-400">暂无比赛</div>
        }
      </div>
    </div>
  )
}