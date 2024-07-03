import dayjs from "dayjs"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

export default function Match({ data }) {
  const t = useTranslations('Match')
  const { id, startTime, status, extra, homeTeam, awayTeam, homeScore, awayScore } = data
  return (
    <Link href={`/matches/${id}`} className="flex justify-between items-center p-2 border-t border-x border-gray-50 last:border-b last:border-b-gray-50 first:rounded-t-md last:rounded-b-md">
      <div className={clsx(
        "flex flex-col w-[36px] items-center justify-center text-sm",
        ["", "text-blue-500", "text-gray-500"][status]
      )}>
        <span>{ status === 1 ? 'Live' : dayjs(startTime).format('HH:mm') }</span>
        { extra ? <span className="mt-[-6px] md:mt-[-8px] text-[9px]">{ t('extra') }</span> : null }
      </div>
      <div className="flex-1 flex justify-between gap-4">
        <div className="flex-1 flex items-center justify-end gap-2 text-sm">
          <span className="hidden md:inline">{homeTeam.name}</span>
          <span className="inline md:hidden">{homeTeam.tag}</span>
          <div className="relative w-6 h-6">
            <Image src={homeTeam.logo} fill sizes="100%" className="object-contain" alt={homeTeam.tag} />
          </div>
        </div>
        <div className="flex gap-1 justify-between items-center">
          <div className={clsx("flex items-center justify-center w-[15px] md:w-[18px] h-[20px] md:h-[24px] rounded-sm bg-slate-100", {"text-gray-500": homeScore < awayScore})}>{ homeScore }</div>
          <div>:</div>
          <div className={clsx("flex items-center justify-center w-[15px] md:w-[18px] h-[20px] md:h-[24px] rounded-sm bg-slate-100", {"text-gray-500": homeScore > awayScore})}>{ awayScore }</div>
        </div>
        <div className="flex-1 flex items-center gap-2 text-sm">
          <div className="relative w-6 h-6">
            <Image src={awayTeam.logo} fill sizes="100%" className="object-contain" alt={awayTeam.tag} />
          </div>
          <span className="hidden md:inline">{awayTeam.name}</span>
          <span className="inline md:hidden">{awayTeam.tag}</span>
        </div>
      </div>
      <ChevronRightIcon className="w-4 text-gray-400" />
    </Link>
  )
}