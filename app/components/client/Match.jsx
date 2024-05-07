import dayjs from "dayjs"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import LocalTime from "./LocalTime"

export default function Match({ data }) {
  const tz = dayjs.tz.guess()
  const t = useTranslations('button')
  const { id, startTime, status, bo, homeTeam, homeTeamId, awayTeam, awayTeamId, homeScore, awayScore, games } = data
  const homeDots = [...Array(bo)].map((_, i) => {
    if (games[i]) {
      const { radiantTeamId, radiantWin } = games[i]
      if (radiantTeamId === homeTeamId) {
        return radiantWin
      } else {
        return !radiantWin
      }
    } else {
      return false
    }
  })
  const awayDots = [...Array(bo)].map((_, i) => {
    if (games[i]) {
      const { radiantTeamId, radiantWin } = games[i]
      if (radiantTeamId === awayTeamId) {
        return radiantWin
      } else {
        return !radiantWin
      }
    } else {
      return false
    }
  })
  return (
    <div className="flex flex-col item-center gap-2 w-full rounded-md border border-gray-200 p-2 md:px-4">
      <div className="flex gap-2 md:gap-6">
        <div className={clsx(
          "flex items-center justify-center",
          ["", "text-blue-500", "text-gray-400"][status]
        )}>
          { dayjs(startTime).tz(tz).format('HH:mm')}
          {/* <LocalTime date={startTime} /> */}
        </div>
        <div className="flex flex-1 flex-col justify-between gap-1 px-2 md:px-6 border-x border-x-gray-100">
          <div className="flex items-center gap-2 md:gap-4 h-7 md:h-8">
            <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-4 md:w-5 h-auto" alt={homeTeam.tag} />
            <span className="flex-1">{homeTeam.name}</span>
            <div className="flex gap-1 px-1 md:px-2 py-1 rounded-full bg-gray-100">
              {
                homeDots.map((item, i) => (
                  <div className={clsx(
                    "w-2 h-2 rounded-full bg-gray-300",
                    { "bg-yellow-500": item },
                  )} key={i}></div>
                ))
              }
            </div>
            <span className={clsx(
              "w-4 text-center",
              { "text-blue-500": homeScore > awayScore },  
            )}>{ status === 0 ? "-" : homeScore }</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 h-7 md:h-8">
            <Image src={awayTeam.logo} width={0} height={0} sizes="100%" className="w-4 md:w-5 h-auto" alt={awayTeam.tag} />
            <span className="flex-1">{awayTeam.name}</span>
            <div className="flex gap-1 px-1 md:px-2 py-1 rounded-full bg-gray-100">
              {
                awayDots.map((item, i) => (
                  <div className={clsx(
                    "w-2 h-2 rounded-full bg-gray-300",
                    { "bg-yellow-500": item },
                  )} key={i}></div>
                ))
              }
            </div>
            <span className={clsx(
              "w-4 text-center",
              { "text-blue-500": homeScore < awayScore }, 
            )}>{ status === 0 ? "-" : awayScore }</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link href={status === 2 ? `/matches/${id}` : `/battles?ids=${homeTeam.id},${awayTeam.id}`}>
            <button className="px-2 md:px-4 md:py-1 rounded-full border border-blue-500 text-blue-500 text-sm">
              { 
                status === 2 ? 
                <span>
                  <span className="hidden md:inline">{ t('data') }</span>
                  <span className="md:hidden">{ t('data_sm') }</span>
                </span> : 
                <span>
                  <span className="hidden md:inline">{ t('record') }</span>
                  <span className="md:hidden">{ t('record_sm') }</span>
                </span> 
              }
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}