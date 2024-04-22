import Image from "next/image"
import dayjs from "dayjs"
import Link from "next/link"
import clsx from "clsx"
import { getMatches } from "@/app/lib/match"

export default async function Page({ searchParams }) {
  const ids = searchParams.ids.split(',').map(id => +id)
  const battles = await getMatches({ status: 2, ids, take: 10, orderBy: { startTime: 'desc' } })
  return (
    <div className="flex flex-col p-4 bg-gray-500 text-gray-100">
      <div className="mb-4">最近10（或不足）次交手记录</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
          battles && battles.length > 0 ?
          battles.map((item, i) => {
            const { id, tournament, stage, startTime, homeTeam, awayTeam, homeScore, awayScore } = item
            return (
              <div className="flex flex-col item-center gap-2 w-full border border-gray-400 p-2 px-4" key={i}>
                <div className="flex justify-between">
                  <div>{ tournament.title } { stage.title }</div>
                  <div className="flex items-center justify-center">{ dayjs(startTime).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div className="flex gap-4 md:gap-6 lg:gap-10">
                  <div className="flex flex-1 flex-col justify-between gap-1">
                    <div className="flex items-center gap-4">
                      <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={homeTeam.tag} />
                      <span className="flex-1">{homeTeam.name}</span>
                      <span className={clsx(
                        { "text-green-500": homeScore > awayScore }, 
                        { "text-yellow-500": homeScore === awayScore }, 
                        { "text-red-500": homeScore < awayScore }, 
                      )}>{homeScore}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-5 h-auto" alt={awayTeam.tag} />
                      <span className="flex-1">{awayTeam.name}</span>
                      <span className={clsx(
                        { "text-green-500": homeScore < awayScore }, 
                        { "text-yellow-500": homeScore === awayScore }, 
                        { "text-red-500": homeScore > awayScore }, 
                      )}>{awayScore}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link href={`/main/matches/${id}`}>
                      <button className="px-4 py-2 rounded-md bg-gray-900 text-sm">比赛数据</button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          }) : <div className="flex justify-center items-center w-full h-16 border border-gray-400">暂无比赛</div>
        }
      </div>
      
    </div>
  )
}