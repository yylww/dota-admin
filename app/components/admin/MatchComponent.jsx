import { SelectTeam } from "./SelectTeam"
import Image from "next/image"
import useSWR from "swr"
import { getTeams } from "../../lib/team"

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
  const upper = { ...homeTeam, score: homeScore }
  const lower = { ...awayTeam, score: awayScore }

  return (
    <div className="flex flex-col w-full h-full text-sm">
      {
        [upper, lower].map((item, index) => (
          <div key={index} className="flex flex-1">
            {
              status === 'display' ? 
              <div className="flex flex-1 justify-between items-center border">
                <div className="flex justify-center items-center w-[30px]">
                  { item.logo ? <Image src={item.logo} width={0} height={0} sizes="100%" className="w-4 h-auto" alt={item.name} /> : null }
                </div>
                <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                  { item.name || 'TBD' }
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