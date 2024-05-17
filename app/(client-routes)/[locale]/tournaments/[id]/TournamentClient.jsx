'use client'

import { useFormatter, useLocale } from "next-intl"
import SwissSystem from "@/app/components/client/stage/SwissSystem"
import { DoubleElimination } from "@/app/components/admin/DoubleElimination"
import { SingleElimination } from "@/app/components/admin/SingleElimination"
import { Standings } from "@/app/components/client/stage/Standings"
import { Group } from "@/app/components/client/stage/Group"

export default function TournamentClient({ data }) {
  const locale = useLocale()
  const { title, title_en, startDate, endDate, bonus, stages } = data
  const format = useFormatter()
  const rangeDate = format.dateTimeRange(startDate, endDate, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  return (
    <div className="flex flex-col gap-2 md:gap-4 md:pt-4">
      <div className="bg-white p-2 md:p-4">
        <h2 className="font-bold text-lg">{ locale === 'en' ? title_en : title }</h2>
        <p>{ rangeDate }</p>
        <p>
          <span>Prize pool: </span>
          <span>${ format.number(bonus) }</span></p>
      </div>
      {
        stages.map((stage, i) => {
          const { title, title_en, startDate, endDate, mode, groups, matches } = stage
          const dateRange = format.dateTimeRange(startDate, endDate, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
          return (
            <div className="bg-white p-2 md:p-4" key={i}>
              <p className="font-medium">{ locale === 'en' ? title_en : title }</p>
              <p className="mb-2">{ dateRange }</p>
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