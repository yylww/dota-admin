export const MatchComponent = ({ height }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', height }}>
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
        <div style={{ flex: 3, whiteSpace: 'nowrap' }}>OG</div>
      </div>
      <div style={{ 
        flex: 1,
        border: '1px solid #eee',
        borderLeft: 0,
        textAlign: 'center',
      }}>1</div>
    </div>
    <div style={{ display: 'flex', height: `${height}px` }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flex: 4,
        border: '1px solid #eee', 
      }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <img style={{ width: 15 }} src='http://localhost:3000/static/teams/Team_Spirit.png' />
        </div>
        <div style={{ flex: 3, whiteSpace: 'nowrap' }}>Team Spirit</div>
      </div>
      <div style={{ 
        flex: 1, 
        border: '1px solid #eee',
        borderLeft: 0,
        textAlign: 'center',
      }}>1</div>
    </div>
  </div>
)