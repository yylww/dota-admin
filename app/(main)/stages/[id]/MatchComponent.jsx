export const MatchComponent = ({ teams, score, height }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {
      [1, 2].map((_, index) => (
        <div key={index} style={{ display: 'flex', height }}>
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
            flex: 1,
            border: '1px solid #eee',
            borderLeft: 0,
            textAlign: 'center',
          }}>{ score && score[index] ? score[index] : 0 }</div>
        </div>
      ))
    }
  </div>
)