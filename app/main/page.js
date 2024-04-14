import Image from "next/image"
import { fetcher } from "../utils/fetcher"
import dayjs from "dayjs"
import Link from "next/link"

export default async function Page() {
  const upcoming = await fetcher('/api/matches?status=0&take=10')
  const ongoing = await fetcher('/api/matches?status=1&take=10')
  const concluded = await fetcher('/api/matches?status=2&take=10')
  return (
    <div className="flex flex-col gap-2">
      <div>赛事预告</div>
      {
        upcoming && upcoming.length > 0 ?
        upcoming.map((item, i) => {
          const { startTime, homeTeam, awayTeam, homeScore, awayScore } = item
          return (
            <div className="flex item-center w-full border p-2 gap-4" key={i}>
              <div className="flex items-center justify-center w-40">{ dayjs(startTime).format('MM-DD HH:mm')}</div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                  <Image src={homeTeam.logo} width={20} height={20} style={{ width: "20px", height: "auto" }} alt={homeTeam.tag} />
                  <span className="flex-1">{homeTeam.name}</span>
                  <span>{homeScore}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Image src={awayTeam.logo} width={20} height={20} style={{ width: "20px", height: "auto" }} alt={awayTeam.tag} />
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
        }) : <div className="flex justify-center items-center w-full h-16 border">暂无比赛</div>
      }
      <div>正在进行中</div>
      {
        ongoing && ongoing.length > 0 ?
        ongoing.map((item, i) => {
          const { homeTeam, awayTeam, homeScore, awayScore } = item
          return (
            <div className="flex item-center w-full border p-2 gap-4" key={i}>
              <div className="flex items-center justify-center w-40">进行中</div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                  <Image src={homeTeam.logo} width={20} height={20} style={{ width: "20px", height: "auto" }} alt={homeTeam.tag} />
                  <span className="flex-1">{homeTeam.name}</span>
                  <span>{homeScore}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Image src={awayTeam.logo} width={20} height={20} style={{ width: "20px", height: "auto" }} alt={awayTeam.tag} />
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
        }) : <div className="flex justify-center items-center w-full h-16 border">暂无比赛</div>
      }
      <div>最近结束</div>
      {
        concluded && concluded.length > 0 ?
        concluded.map((item, i) => {
          const { homeTeam, awayTeam, homeScore, awayScore } = item
          return (
            <div className="flex item-center w-full border p-2 gap-4" key={i}>
              <div className="flex items-center justify-center w-40">已结束</div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                  <Image src={homeTeam.logo} width={20} height={20} style={{ width: "20px", height: "auto" }} alt={homeTeam.tag} />
                  <span className="flex-1">{homeTeam.name}</span>
                  <span>{homeScore}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Image src={awayTeam.logo} width={20} height={20} style={{ width: "20px", height: "auto" }} alt={awayTeam.tag} />
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
        }) : <div className="flex justify-center items-center w-full h-16 border">暂无比赛</div>
      }
      
    </div>
  )
}