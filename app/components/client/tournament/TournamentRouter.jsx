import { getTournaments } from "@/app/lib/tournament";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function TournamentRouter({ current }) {
  const locale = useLocale()
  const t = await getTranslations()
  const tournaments = await getTournaments()
  const currentIndex = tournaments.findIndex((item) => item.id === current)
  const prevTournament = currentIndex > 0 ? tournaments[currentIndex - 1] : null
  const nextTournament = currentIndex < (tournaments.length - 1) ? tournaments[currentIndex + 1] : null
  return (
    <div className="flex flex-col gap-2 p-2 bg-white">
      {
        currentIndex !== 0 ?
        <div>
          <span>{ t('Tournament.next') }</span>
          <Link className="text-blue-500" href={`?tournament=${tournaments[currentIndex-1].id}`}>{ locale === 'en' ? prevTournament.title_en : prevTournament.title }</Link>
        </div> :
        <span></span>
      }
      {
        (currentIndex < tournaments.length - 1) ?
        <div>
          <span>{ t('Tournament.previous') }</span>
          <Link className="text-blue-500" href={`?tournament=${tournaments[currentIndex+1].id}`}>{ locale === 'en' ? nextTournament.title_en : nextTournament.title }</Link>
        </div> :
        <span></span>
      }
    </div>
  )
}