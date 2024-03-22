import { SelectTeam } from "./SelectTeam"
import { getAllTeam } from "../api/team"
import useSWR from "swr"

export const MatchComponent = ({ onChange, status, teams, matches = [] }) => {
  const staticURL = process.env.NEXT_PUBLIC_STATIC_URL
  const { data, isLoading } = useSWR(['team'], getAllTeam)
  if (isLoading) {
    return <div>Loading...</div>
  }
  const handleMatchScore = (ids) => {
    const match = matches.find(match => {
      const teamIds = match.teams.map(team => team.id)
      return teamIds.includes(ids[0]) && teamIds.includes(ids[1])
    })
    const arr = [0, 0]
    if (!match) {
      return arr
    }
    const { games } = match
    if (games && games.length > 0) {
      games.map(game => {
        const radiant = game.records.find(record => record.radiant)
        if (ids[0] === game.radiantTeamId) {
          if (radiant.win) {
            arr[0] += 1
          } else {
            arr[1] += 1
          }
        } else {
          if (!radiant.win) {
            arr[0] += 1
          } else {
            arr[1] += 1
          }
        }
      }) 
    }
    return arr
  }
  const upper = data.find(team => team.id === teams[0])
  const lower = data.find(team => team.id === teams[1])
  const score = handleMatchScore(teams)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', fontSize: 12 }}>
      {
        [upper, lower].map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex' }}>
            {
              status === 'display' ? 
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flex: 1,
                border: '1px solid #eee', 
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 30 }}>
                  { item ? <img style={{ width: 15 }} src={`${staticURL}${item.logo}`} /> : null }
                </div>
                <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  { item ? item.name : 'TBD' }
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: 30,
                  height: '100%',
                  borderLeft: '1px solid #eee',
                }}>
                  { score[index] }
                </div>
              </div>
              : null
            } 
            {
              status === 'editable' ? 
              <div style={{ 
                flex: 1,
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',  
              }}>
                <SelectTeam value={teams[index]} onChange={(teamId) => onChange(teamId, index)} />
              </div> : null
            } 
          </div>
        ))
      }
    </div>
  )
}