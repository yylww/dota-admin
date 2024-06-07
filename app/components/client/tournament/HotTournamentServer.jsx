import { getTournaments } from "@/app/lib/tournament"
import { getTranslations } from "next-intl/server"
import { TrophyIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import clsx from "clsx"
import { useLocale } from "next-intl"

export default async function HotTournamentServer({ tournamentId }) {
  const data = await getTournaments()
  const locale = useLocale()
  const t = await getTranslations()
  return (
    <div className="flex flex-col w-full p-4 border border-gray-200 rounded-md bg-white">
      <div className="flex gap-2 pb-2 text-lg">
        <TrophyIcon className="w-5 text-blue-500" />
        <p className="font-medium">{ t('Index.hotTournaments') }</p>
      </div>
      <div>
        {
          data.map((item, i) => (
            <Link
              href={`/?tournament=${item.id}`} 
              className={clsx(
                "py-2 border-t border-t-gray-100 cursor-pointer block hover:text-blue-500",
                { "text-blue-500": item.id === tournamentId }
              )} 
              key={i}
            >
              { locale === 'en' ? item.title_en : item.title }
            </Link>
          ))
        }
      </div>
    </div>
  )
}