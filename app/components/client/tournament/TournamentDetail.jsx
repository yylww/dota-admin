import { useLocale } from "next-intl"
import SwissSystem from "@/app/components/client/tournament/SwissSystem"
import { DoubleElimination } from "@/app/components/admin/DoubleElimination"
import { SingleElimination } from "@/app/components/admin/SingleElimination"
import { Standings } from "@/app/components/client/tournament/Standings"
import { Group } from "@/app/components/client/tournament/Group"
import { LocalRangeDate } from "@/app/components/client/LocalTime"
import { Achievements } from "@/app/components/client/tournament/Achievements"
import { getTournament } from "@/app/lib/tournament"
import { getTranslations } from "next-intl/server"
import TournamentStatictis from "./TournamentStatictis"

export default async function TournamentDetail({ id }) {
  const data = await getTournament(id)
  const t = await getTranslations()
  const { title, title_en, startDate, endDate, bonus, stages, achievements } = data
  const formatter = new Intl.NumberFormat()
  const locale = useLocale()
  const games = stages
    .reduce((prev, current) => [...prev, ...current.matches], [])
    .reduce((prev, current) => [...prev, ...current.games], [])
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="bg-white p-2 md:p-4">
        <h2 className="font-bold text-lg">{locale === 'en' ? title_en : title}</h2>
        <LocalRangeDate data={[startDate, endDate]} />
        <p>
          <span>{t('Tournament.prizePool')}</span>
          <span>${formatter.format(bonus)}</span>
        </p>
      </div>
      <div className="bg-white p-2 md:p-4">
        <p className="font-medium mb-2">{t('Tournament.ranking')}</p>
        <Achievements data={achievements} />
      </div>
      <TournamentStatictis data={games} />
      {
        stages.map((stage, i) => {
          const { title, title_en, startDate, endDate, mode, groups, matches } = stage
          return (
            <div className="bg-white p-2 md:p-4" key={i}>
              <p className="font-medium">{locale === 'en' ? title_en : title}</p>
              <div className="mb-2">
                <LocalRangeDate data={[startDate, endDate]} />
              </div>
              {
                mode === 0 ?
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {
                      groups.map((group, j) => (
                        <div className="flex flex-col gap-2" key={j}>
                          <Standings title={['Group A', 'Group B', 'Group C', 'Group D'][j]} list={group.list} matches={matches} />
                          <Group list={group.list} matches={matches.filter(item => !item.extra)} />
                        </div>
                      ))
                    }
                  </div> : null
              }
              {
                mode === 1 ?
                  <div className="w-full py-2 overflow-x-auto">
                    <DoubleElimination width={128} matchMap={groups} matches={matches} status="display" />
                  </div> : null
              }
              {
                mode === 2 ?
                  <div className="w-full py-4 overflow-x-auto">
                    <SingleElimination width={128} matchMap={groups} matches={matches} status="display" />
                  </div> : null
              }
              {
                mode === 3 ?
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {
                      groups.map((group, j) => (
                        <div key={j}>
                          <Standings title={['Group A', 'Group B', 'Group C', 'Group D'][j]} list={group.list} matches={matches} />
                        </div>
                      ))
                    }
                  </div> : null
              }
              {
                mode === 4 ? <SwissSystem data={stage} /> : null
              }
            </div>
          )
        })
      }
    </div>
  )
}