import { getTournaments } from "../../lib/tournament"
import HotTournament from "../../components/client/HotTournament"
import MatchList from "../../components/client/MatchList"
import ScrollToTop from "../../components/client/ScrollToTop"
import { getTranslations } from "next-intl/server"
import IntlClientProvider from "@/app/components/client/IntlClientProvider"

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }) {
  const t = await getTranslations('main')
  const tournamentId = Number(searchParams.tournament)
  const tournaments = await getTournaments()
  const hotTournaments = tournaments.map(item => ({ id: item.id, title: item.title }))
  const tournament = tournamentId ? tournaments.find(item => item.id === tournamentId) : tournaments[0]
  const matches = tournament.stages.reduce((prev, current) => [...prev, ...current.matches], [])
  return (
    <div className="flex justify-between">
      <div className="hidden md:block">
        <HotTournament title={t('tournament')} data={hotTournaments} activeId={tournamentId || tournament.id} />
      </div>
      <IntlClientProvider>
        <MatchList data={matches} width="w-[750px]" />
      </IntlClientProvider>
      {/* <ScrollToTop /> */}
    </div>
  )
}