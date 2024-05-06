import dayjs from "dayjs"
import { getTournaments } from "../../lib/tournament"
import HotTournament from "../../components/client/HotTournament"
import MatchList from "../../components/client/MatchList"
import ScrollToTop from "../../components/client/ScrollToTop"
import { getTranslations } from "next-intl/server"

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }) {
  const t = await getTranslations('main')
  const tournamentId = Number(searchParams.tournament)
  const tournaments = await getTournaments()
  const hotTournaments = tournaments.map(item => ({ id: item.id, title: item.title }))
  const tournament = tournamentId ? tournaments.find(item => item.id === tournamentId) : tournaments[0]
  const { title, stages } = tournament
  const handleData = (stages) => {
    const data = {}
    stages.map(stage => {
      const matches = stage.matches
      matches.map(match => {
        const date = dayjs(match.startTime).format('YYYY-MM-DD')
        if (data[date]) {
          data[date] = {
            title: `${title}-${stage.title}`,
            matches: [...data[date].matches, match],
          }
        } else {
          data[date] = {
            title: `${title}-${stage.title}`,
            matches: [match],
          }
        }
      })
    })
    return data
  }
  const formatData = handleData(stages)
  return (
    <div className="flex justify-between">
      <div className="hidden md:block">
        <HotTournament title={t('tournament')} data={hotTournaments} activeId={tournamentId || tournament.id} />
      </div>
      <MatchList data={formatData} width="w-[750px]" />
      <ScrollToTop />
    </div>
  )
}