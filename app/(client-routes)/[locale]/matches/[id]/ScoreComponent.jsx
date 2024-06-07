import { LocalTime } from "@/app/components/client/LocalTime"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export const ScoreComponent = ({ data }) => {
  const locale = useLocale()
  const { startTime, bo, tournament, homeTeam, homeScore, awayTeam, awayScore } = data
  return (
    <section className="py-4 md:pt-6">
      <div className="flex justify-center mb-4">
        <Link href={`/tournaments/${tournament.id}`} className="flex text-black/60">
          <h1>{ locale === 'en' ? tournament.title_en : tournament.title }</h1>
          <ChevronDoubleRightIcon className="w-4" />
        </Link>
      </div>  
      <div className="flex gap-10 md:gap-20 justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center w-[60px]">
          <div className="relative w-12 h-12">
            <Image src={homeTeam.logo} fill className="object-contain" alt={homeTeam.name} />
          </div>
          <div>{homeTeam.tag}</div>
        </div>
        <div className="flex flex-col justify-center text-center">
          <div className="flex justify-center gap-2">
            <div className={clsx("flex justify-center items-center text-5xl", homeScore > awayScore ? "" : "opacity-50")}>{ homeScore }</div>
            <div className="flex flex-col justify-center gap-[6px]">
              <div className="w-[5px] h-[5px] rounded-full bg-black/60"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-black/60"></div>
            </div>
            <div className={clsx("flex justify-center items-center text-5xl", homeScore > awayScore ? "opacity-50" : "")}>{ awayScore }</div>
          </div>
          <LocalTime data={startTime} format="MM-DD HH:mm" className="text-sm text-black/60" />
          <div className="text-sm text-black/60">BO{bo}</div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center w-[60px]">
          <div className="relative w-12 h-12">
            <Image src={awayTeam.logo} fill className="object-contain" alt={awayTeam.name} />
          </div>
          <div>{awayTeam.tag}</div>
        </div>
      </div>
    </section>
  )
}