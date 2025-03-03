import dayjs from "dayjs"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

export default function Match({ data }) {
  const locale = useLocale()
  const t = useTranslations('Match')
  const { id, startTime, status, bo, extra, homeTeam, homeTeamId, awayTeam, awayTeamId, homeScore, awayScore, games } = data
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
    <div className="flex flex-col item-center gap-2 w-full rounded-sm md:rounded-md border border-gray-200 p-2 md:px-4">
      <div className="flex gap-2 md:gap-6">
        <div className={clsx(
          "flex flex-col w-10 items-center justify-center",
          ["", "text-blue-500", "text-gray-400"][status]
        )}>
          <span>{ status === 1 ? 'Live' : dayjs(startTime).format('HH:mm') }</span>
          { extra ? <span className="text-xs text-gray-400">{ t('extra') }</span> : null }
        </div>
        <div className="flex flex-1 flex-col justify-between gap-1 px-2 md:px-6 border-x border-x-gray-100">
          <div className="flex items-center gap-2 md:gap-4 h-7 md:h-8">
            <Image src={homeTeam.logo} width={0} height={0} sizes="100%" className="w-4 md:w-5 h-auto" alt={homeTeam.tag} />
            <span className="flex-1 hidden md:inline">{homeTeam.name}</span>
            <span className="flex-1 inline md:hidden">{homeTeam.tag}</span>
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
            <span className="flex-1 hidden md:inline">{awayTeam.name}</span>
            <span className="flex-1 inline md:hidden">{awayTeam.tag}</span>
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
          { 
            status === 0 ? 
            <Link href={`/battles?ids=${homeTeam.id},${awayTeam.id}`}>
              <button className="w-[72px] md:w-24 py-1 text-sm text-center rounded-full border border-blue-500 text-blue-500">{ t('record') }</button>
            </Link> : null 
          }
          { 
            status === 1 ? 
            <Link href={locale === 'en' ? "https://www.twitch.tv/search?term=dota2" : "https://www.huya.com/g/7"} target="_blank">
              <button className="w-[72px] md:w-24 py-1 text-sm text-center rounded-full border border-blue-500 text-blue-500">{ t('live') }</button>
            </Link> : null 
          }
          { 
            status === 2 ? 
            <Link href={`/matches/${id}`}>
              <button className="w-[72px] md:w-24 py-1 text-sm text-center rounded-full border border-blue-500 text-blue-500">{ t('data') }</button>
            </Link> : null 
          }
        </div>
      </div>
    </div>
  )
}