'use client'

import { SelectTeam } from "./SelectTeam"
import Image from "next/image"
import useSWR from "swr"
import { getTeams } from "../../lib/team"
import clsx from "clsx"

export const MatchComponent = ({ onChange, status, teams, match = {} }) => {
  const { data, isLoading, error } = useSWR('teams', getTeams)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error</div>
  }
  const { homeScore = 0, awayScore = 0 } = match
  const homeTeam = data.find(item => item.id === teams[0])
  const awayTeam = data.find(item => item.id === teams[1])
  const upper = { ...homeTeam, score: homeScore, win: homeScore > awayScore }
  const lower = { ...awayTeam, score: awayScore, win: awayScore > homeScore }

  return (
    <div className="flex flex-col w-full h-full text-sm">
      {
        [upper, lower].map((item, index) => (
          <div key={index} className="flex flex-1">
            {
              status === 'display' ? 
              <div className="flex flex-1 justify-between items-center border bg-gray-100">
                <div className="relative flex justify-center items-center w-5 h-5 mx-2">
                  { item.logo ? <Image src={item.logo} fill sizes="100%" className="object-contain" alt={item.name} /> : null }
                </div>
                <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                  <span className={clsx({ "font-bold": item.win })}>{ item.tag || 'TBD' }</span>
                </div>
                <div className="flex justify-center items-center w-[30px] h-full border-l">
                  { item.score }
                </div>
              </div>
              : null
            } 
            {
              status === 'editable' ? 
              <div className="flex flex-1 justify-between items-center">
                <SelectTeam value={teams[index]} onChange={(teamId) => onChange(teamId, index)} />
              </div> : null
            } 
          </div>
        ))
      }
    </div>
  )
}