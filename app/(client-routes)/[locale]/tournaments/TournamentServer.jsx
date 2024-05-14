import { getTournaments } from "@/app/lib/tournament"
import { useFormatter, useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default async function TournamentServer() {
  const locale = useLocale()
  const format = useFormatter()
  const data = await getTournaments()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 md:pt-4">
      {
        data.map((item, i) => {
          const { id, title, title_en, logo, startDate, endDate, bonus } = item
          const rangeDate = format.dateTimeRange(startDate, endDate, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
          return (
            <Link href={`/tournaments/${id}`} key={i}>
              <div className="bg-white">
                <Image src={logo} width={0} height={0} sizes="100%" priority className="w-full h-auto" alt={title_en} />
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex justify-between">
                    <span>{ locale === 'en' ? title_en : title}</span>
                    <span className="text-yellow-500">${ format.number(bonus) }</span>
                  </div>
                  <span>{ rangeDate }</span>
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}