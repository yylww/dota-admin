import { SelectTeam } from "./SelectTeam"
import Image from "next/image"

export const MatchComponent = ({ onChange, status, teams, match }) => {
  const { homeTeamId, homeTeam, homeScore, awayTeam, awayScore } = match
  const upper = teams[0] === homeTeamId ? { ...homeTeam, score: homeScore } : { ...awayTeam, score: awayScore }
  const lower = teams[1] === homeTeamId ? { ...homeTeam, score: homeScore } : { ...awayTeam, score: awayScore }

  return (
    <div className="flex flex-col w-full h-full text-sm">
      {
        [upper, lower].map((item, index) => (
          <div key={index} className="flex flex-1">
            {
              status === 'display' ? 
              <div className="flex flex-1 justify-between items-center border">
                <div className="flex justify-center items-center w-[30px]">
                  { item ? <Image src={item.logo} width={15} height={15} style={{ width: "15px", height: "auto" }} alt={item.name} /> : null }
                </div>
                <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                  { item ? item.name : 'TBD' }
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