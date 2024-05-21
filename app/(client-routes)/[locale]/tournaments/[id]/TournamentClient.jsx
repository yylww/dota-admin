'use client'

import { useFormatter, useLocale, useTranslations } from "next-intl"
import SwissSystem from "@/app/components/client/tournament/SwissSystem"
import { DoubleElimination } from "@/app/components/admin/DoubleElimination"
import { SingleElimination } from "@/app/components/admin/SingleElimination"
import { Standings } from "@/app/components/client/tournament/Standings"
import { Group } from "@/app/components/client/tournament/Group"
import { LocalRangeDate } from "@/app/components/client/LocalTime"

export default function TournamentClient({ data }) {
  const locale = useLocale()
  const t = useTranslations('tips')
  const { title, title_en, startDate, endDate, bonus, stages } = data
  const format = useFormatter()
  return (
    <div className="flex flex-col gap-2 md:gap-4 md:pt-4">
      <div className="bg-white p-2 md:p-4">
        <h2 className="font-bold text-lg">{ locale === 'en' ? title_en : title }</h2>
        <LocalRangeDate data={[startDate, endDate]} />
        <p>
          <span>{ t('prizePool') }</span>
          <span>${ format.number(bonus) }</span></p>
      </div>
      {
        stages.map((stage, i) => {
          const { title, title_en, startDate, endDate, mode, groups, matches } = stage
          return (
            <div className="bg-white p-2 md:p-4" key={i}>
              <p className="font-medium">{ locale === 'en' ? title_en : title }</p>
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