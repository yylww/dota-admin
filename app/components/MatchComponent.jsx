import { SelectTeam } from "./SelectTeam"

export const MatchComponent = ({ onChange, status, teams, score, height }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {
      [1, 2].map((_, index) => (
        <div key={index} style={{ display: 'flex', height }}>
          {
            status === 'display' ? 
            <>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flex: 4,
                border: '1px solid #eee', 
              }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <img style={{ width: 15 }} src='http://localhost:3000/static/teams/OG.png' />
                </div>
                <div style={{ flex: 3, whiteSpace: 'nowrap' }}>{ teams && teams[index] ? teams[index] : 'TBD' }</div>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flex: 1,
                border: '1px solid #eee',
                borderLeft: 0,
                textAlign: 'center',
              }}>
                { score && score[index] ? score[index] : 0 }
              </div>
            </> : null
          } 
          {
            status === 'create' ? 
            <div style={{ 
              flex: 1,
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',  
            }}>
              <SelectTeam value={teams} onChange={(teamId) => onChange(teamId, index)} />
            </div> : null
          } 
          {
            status === 'update' ? 
            <>
              <div style={{ 
                flex: 4,
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',  
              }}>
                <SelectTeam value={teams} onChange={(teamId) => onChange(teamId, index)} />
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                flex: 1,
                border: '1px solid #eee',
                borderLeft: 0,
                textAlign: 'center',
              }}>
                { score && score[index] ? score[index] : 0 }
              </div>
            </> : null
          } 
        </div>
      ))
    }
  </div>
)