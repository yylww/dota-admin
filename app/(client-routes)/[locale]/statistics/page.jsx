import { getTranslations } from "next-intl/server"
import DataList from "./DataList"
import { getStatisticData } from "@/app/lib/statistics"
import { getTournaments } from "@/app/lib/tournament"
import { getTeams } from "@/app/lib/team"
import Picker from "@/app/components/client/Picker"

export async function generateMetadata() {
  const t = await getTranslations()
  return {
    title: t('Statistic.metadata.title'),
    description: t('Statistic.metadata.description')
  }
}

export default async function Page({ params: { locale }, searchParams }) {
  const tournamentId = searchParams.tournament ? Number(searchParams.tournament) : null
  const teamId = searchParams.team ? Number(searchParams.team) : null
  const statisticData = getStatisticData({ tournamentId, teamId })
  const tournamentData = getTournaments()
  const teamData = getTeams()
  const [statistics, tournaments, teams] = await Promise.all([statisticData, tournamentData, teamData])
  const t = await getTranslations()
  const tournamentArr = [
    { value: null, label: t('Statistic.all') },
    ...tournaments.map(({id, title, title_en}) => ({ value: id, label: locale === 'en' ? title_en : title })),
  ]
  const teamArr = [
    { value: null, label: t('Statistic.all') },
    ...teams.map(({id, name, logo}) => ({ value: id, label: name, logo })).sort((a, b) => a.label.localeCompare(b.label)),
  ]
  return (
    <section className="bg-white">
      <div className="z-30 sticky top-0 flex gap-1 p-2 md:p-4 bg-white">
        <div className="w-[58%]">
          <Picker 
            type="tournament" 
            placeholder={t('Statistic.selectTournament')}
            data={tournamentArr} 
          />
        </div>
        <div className="w-[42%]">
          <Picker 
            type="team" 
            placeholder={t('Statistic.selectTeam')}
            data={teamArr} 
          />
        </div>
      </div>
      {
        statistics.length === 0 ?
        <div className="min-h-20 flex justify-center items-center">{t('Statistic.noData')}</div> :
        <DataList data={statistics} teamId={teamId} />
      }
    </section>
  )
}