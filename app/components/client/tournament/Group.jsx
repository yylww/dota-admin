import Image from 'next/image'
import clsx from 'clsx'

export const Group = ({ list, matches }) => {
  const tableData = []
  const lastRow = [{ color: 'white' }]
  const getMatch = (teamA, teamB, matches) => {
    const result = matches.find(match => {
      const teamIds = [match.homeTeamId, match.awayTeamId]
      if (teamIds.includes(teamA) && teamIds.includes(teamB)) {
        return true
      }
    })
    return result
  }
  const handleCellData = (teamIds, match) => {
    const { homeTeamId, homeScore, awayScore } = match
    const score = teamIds[0] === homeTeamId ? [homeScore, awayScore] : [awayScore, homeScore] 
    // 0: 左边胜 1: 平局 2: 右边胜
    let color = 'green'
    if (score[0] > score[1]) {
      color = 'green'
    } else if (score[0] === score[1]) {
      color = 'yellow'
    } else {
      color = 'red'
    }
    return {
      color,
      score: score.join(':'),
    }
  }
  
  list.forEach((teamA) => {
    let rowData = []
    let match = null
    list.forEach((teamB) => {
      if (teamA.teamId === teamB.teamId) {
        rowData.push({ color: 'gray' })
      } else {
        match = getMatch(teamA.teamId, teamB.teamId, matches)
        rowData.push(handleCellData([teamA.teamId, teamB.teamId], match))
      }
    })
    const teamData = teamA.teamId === match.homeTeamId ? match.homeTeam : match.awayTeam
    lastRow.push(teamData)
    tableData.push([teamData, ...rowData])
  })
  tableData.push(lastRow)
  
  return (
    <table className="w-full border-collapse">
      <tbody>
        {
          tableData.map((rowData, i) => (
            <tr key={i}>
              {
                rowData.map((colData, j) => {
                  return (
                    <td 
                      key={j}
                      className={clsx(`w-8 h-8 text-center border bg-${colData.color || 'white'}-100`)} 
                    >
                      {
                        colData.color === 'gray' ? null :
                        <div className="flex justify-center items-center">
                          {
                            colData.color ? colData.score :
                            <div className="relative w-6 h-6">
                              <Image src={`${colData.logo}`} fill className="object-contain" alt={colData.name} />
                            </div>
                          }
                        </div> 
                      }
                    </td>
                  )
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}