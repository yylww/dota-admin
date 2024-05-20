import { getLatestTournamentId, getTournament } from "@/app/lib/tournament";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function TournamentRouter({ current }) {
  const locale = useLocale()
  const t = await getTranslations('tips')
  const latestTournamentId = await getLatestTournamentId()
  const prevTournament = current < latestTournamentId ? await getTournament(current + 1) : null
  const nextTournament = current > 1 ? await getTournament(current - 1) : null
  return (
    <div className="flex flex-col gap-2 p-2 bg-white">
      {
        latestTournamentId !== current ?
        <div>
          <span>{ t('previous') }</span>
          <Link className="text-blue-500" href={`?tournament=${current+1}`}>{ locale === 'en' ? prevTournament.title_en : prevTournament.title }</Link>
        </div> :
        <span></span>
      }
      {
        current > 1 ?
        <div>
          <span>{ t('next') }</span>
          <Link className="text-blue-500" href={`?tournament=${current-1}`}>{ locale === 'en' ? nextTournament.title_en : nextTournament.title }</Link>
        </div> :
        <span></span>
      }
    </div>
  )
}